import { date } from "zod";
import client from "../../../../database/client";
import { CustomError } from "../../../commons/exceptions";
import { currentDate, currDateTime, timeInMinutes, currentTime } from "../../../utils/date";
import { getAddressFromLatLng } from "../../../utils/location";
import { AttendanceModel } from "./model";

const createAttendance = async (token: string, model: AttendanceModel) => {
  try {
    // Mengambil lokasi default
    const loc = await client.from('location').select('*').eq('default', true).single();
    if (loc.error) {
      throw new Error(loc.error.message);
    }

    // Pengecekan apakah user berada di lokasi dengan toleransi yang diberikan
    const isInLocation = Math.abs(loc.data.lat! - model.lat!) <= loc.data.tolerance! &&
                         Math.abs(loc.data.long! - model.long!) <= loc.data.tolerance!;
    if (!isInLocation) {
      throw new Error('You are not in the location');
    }

    // Mengambil data pengguna dari token
    const { data: userData } = await client.auth.getUser(token.replace('Bearer ', ''));
    if (!userData) {
      throw new Error('User not found');
    }

    // Mendapatkan waktu saat ini dalam timezone UTC+7
    const currentTotalMinutes = currDateTime.getHours() * 60 + currDateTime.getMinutes();
    const day = currDateTime.getDay();

    // Mengambil jam kerja untuk hari ini
    const workHour = await client.from('work_hour').select('*').eq('day', day).single();
    if (workHour.error) {
      throw new Error(workHour.error.message);
    }

    // Menghitung waktu mulai dan akhir kerja dalam menit dari jam 00:00
    const [startHour, startMinute, startSecond] = workHour.data.start_hour.split(':').map(Number);
    const [endHour, endMinute, endSecond] = workHour.data.end_hour.split(':').map(Number);
    const startTotalMinutes = timeInMinutes(startHour, startMinute);
    const endTotalMinutes = timeInMinutes(endHour, endMinute);

    // Mengambil toleransi waktu dari work_hour (dalam menit)
    const timeTolerance = workHour.data.tolerance || 0; // Toleransi waktu dalam menit

    // Cek apakah waktu sekarang dalam rentang waktu kerja + toleransi
    const allowedStart = startTotalMinutes;
    const allowedEnd = endTotalMinutes + timeTolerance;

    if (currentTotalMinutes < allowedStart || currentTotalMinutes > allowedEnd) {
      throw new CustomError(400, 'Tidak dapat absen di luar jam kerja');
    }

    // Cek apakah pengguna sudah melakukan absen masuk hari ini
    const attendance = await client.from('attendance_history')
      .select('*')
      .eq('user_id', userData.user?.id!)
      .eq('date', currentDate)
      .single();

    if (attendance.data) {
      // Jika sudah ada entri absen, cek apakah sudah ada waktu absen keluar (att_out)
      if (attendance.data.att_out) {
        throw new CustomError(400, 'Anda sudah melakukan absen keluar hari ini');
      }

      // Absen keluar jika att_out masih kosong
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
      // Absen masuk baru
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

export { createAttendance };
