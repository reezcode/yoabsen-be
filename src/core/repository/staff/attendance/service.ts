import client from "../../../../database/client";
import { CustomError } from "../../../commons/exceptions";
import { ExtraParam } from "../../../commons/models/extra_param";
// import { currDateTime, currentDate, currentTime, timeInMinutes } from "../../../utils/date";
import { getAddressFromLatLng } from "../../../utils/location";
import { getUserUUID } from "../profile/user";
import { AttendanceModel, PermitModel } from "./model";

const createAttendance = async (token: string, model: AttendanceModel) => {
  try {
    // get default loc
    const loc = await client.from('location').select('*').eq('default', true).single();
    if (loc.error) {
      throw new Error(loc.error.message);
    }
    // user loc tolerance check
    const isInLocation = Math.abs(loc.data.lat! - model.lat!) <= loc.data.tolerance! &&
                         Math.abs(loc.data.long! - model.long!) <= loc.data.tolerance!;
    if (!isInLocation) {
      throw new Error('You are not in the location');
    }
    const { data: userData } = await client.auth.getUser(token.replace('Bearer ', ''));
    if (!userData) {
      throw new Error('User not found');
    }
    // TIME
    const now = new Date();

    // Mengubah ke timezone Asia/Jakarta
    const currDateTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const options = { timeZone: 'Asia/Jakarta', hour12: false };
    const year = now.toLocaleString('en-CA', { ...options, year: 'numeric' });
    const month = now.toLocaleString('en-CA', { ...options, month: '2-digit' });
    const day2 = now.toLocaleString('en-CA', { ...options, day: '2-digit' });
    const currentDate = `${year}-${month}-${day2}`;
    const currentTime = now.toLocaleTimeString('en-US', { ...options, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const timeInMinutes = (hour: number, minute: number) => hour * 60 + minute;
    // TIME

    const currentTotalMinutes = currDateTime.getHours() * 60 + currDateTime.getMinutes();
    const day = currDateTime.getDay();
    // get current work hour
    const workHour = await client.from('work_hour').select('*').eq('day', day).single();
    if (workHour.error) {
      throw new Error(workHour.error.message);
    }
    const [startHour, startMinute, startSecond] = workHour.data.start_hour.split(':').map(Number);
    const [endHour, endMinute, endSecond] = workHour.data.end_hour.split(':').map(Number);
    const startTotalMinutes = timeInMinutes(startHour, startMinute);
    const endTotalMinutes = timeInMinutes(endHour, endMinute);
    const timeTolerance = workHour.data.tolerance || 0; 
    const allowedStart = startTotalMinutes;
    const allowedEnd = endTotalMinutes + timeTolerance;
    const waktu = currDateTime.getHours() + ':' + currDateTime.getMinutes();
    if (currentTotalMinutes < allowedStart || currentTotalMinutes > allowedEnd) {
      throw new CustomError(400, 'Tidak dapat absen di luar jam kerja : ' + waktu);
    }
    // attendance existant check
    const attendance = await client.from('attendance_history')
      .select('*')
      .eq('user_id', userData.user?.id!)
      .eq('date', currentDate)
      .single();
    if (attendance.data) {
      if (attendance.data.att_out) {
        throw new CustomError(400, 'Anda sudah melakukan absen hari ini');
      }
      // att out when att exist and att out is null
      if (currentTotalMinutes < endTotalMinutes - timeTolerance || currentTotalMinutes > endTotalMinutes + timeTolerance) {
        throw new CustomError(400, 'Absen keluar hanya diperbolehkan pada waktu yang ditentukan');
      } else {
        const { error } = await client.from('attendance_history').update({
          att_out: currentTime,
          status: 'attend',
        }).eq('id', attendance.data.id).single();
        if (error) {
          throw new Error(error.message);
        } else {
          return {
            message: 'Berhasil absen keluar',
            content: {
              user_id: userData.user?.id,
              lat: model.lat,
              long: model.long,
              att_out: currentTime,
              proof: model.proof,
              status: 'attend',
            },
          };
        }
      }
    } else {
      // att in
      if (currentTotalMinutes > startTotalMinutes + timeTolerance) {
        throw new CustomError(400, 'Absen masuk terlalu telat');
      } else {
        const address = await getAddressFromLatLng(model.lat!, model.long!);
        const body = {
            user_id: userData.user?.id,
            lat: model.lat,
            long: model.long,
            att_in: currentTime,
            address: address,
            date: currentDate,
            status: 'come',
        }
        const { error } = await client.from('attendance_history').insert(body);
        if (error) {
          throw new Error(error.message);
        } else {
          return {
            message: 'Berhasil absen masuk',
            content: body
          };
        }
      }
    }
  } catch (e) {
    throw e;
  }
};

const getListAttendance = async (token: string,param: ExtraParam) => {
    try {
        const userId = await getUserUUID(token);
        let query = client
            .from('attendance_history')
            .select('*')
            .eq('user_id', userId)
            .order(param.order_by ?? "id", {
                ascending: param.sort === "asc" ? true : false,
              })
            .limit(param.limit ?? 99)
            .range(
                param.page ? param.page * (param.limit ?? 99) : 0,
                param.limit ?? 99 * (param.page ?? 1)
            )
            const att = await query
            if(att.error){
                throw new Error(att.error.message)
            }
            if(att) {
                return att.data
            } else {
                return {
                    content: []
                }
            }
    } catch (e) {
        throw e
    }
}

const getAttendance = async (token: string, id: string) => {
    try {
        const userId = await getUserUUID(token);
        const att = await client
            .from('attendance_history')
            .select('*')
            .eq('user_id', userId)
            .eq('id', id)
            .single()
        if(att.error){
            throw new Error(att.error.message)
        }
        if(att) {
            return att.data
        } else {
            throw new CustomError(400, 'Data not found')
        }
    } catch (e) {
        throw e
    }
}

const createPermit = async (token: string, model: PermitModel) => {
  try {
    const userUUID = await getUserUUID(token)
    const body = {
      // TODO: UBAH JADI START DATE - END DATE
      date: model.date,
      description: model.description,
      name: model.name,
      status: 'pending',
      user_id: userUUID
    }
    const {error} = await client.from('staff_permit').insert(body)
    if(error) {
      throw new Error(error.message)
    } else {
      return {
        message: 'Permit created successfully',
        content: body
      }
    }
  } catch (e) {
    throw e
  }
}

export { createAttendance, createPermit, getAttendance, getListAttendance };

