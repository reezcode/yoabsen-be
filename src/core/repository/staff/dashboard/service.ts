import client from "../../../../database/client"
import { CustomError } from "../../../commons/exceptions";
import { getUserUUID } from "../profile/user"

const getDashboard = async (token: string) => {
    try {
        const now = new Date();
        const currDateTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
        const options = { timeZone: 'Asia/Jakarta', hour12: false };
        const year = now.toLocaleString('en-CA', { ...options, year: 'numeric' });
        const month = now.toLocaleString('en-CA', { ...options, month: '2-digit' });
        const day2 = now.toLocaleString('en-CA', { ...options, day: '2-digit' });
        const currentDate = `${year}-${month}-${day2}`;
        const userId = await getUserUUID(token);
        const user = await client.from('staff').select('*').eq('id', userId).single()
        const workHour = await client.from('work_hour').select('*').eq('day', currDateTime.getDay()).single()
        const att =  (await client.from('attendance_history').select('*').eq('user_id', userId).eq('date', currentDate))
        const data = att.data
        if(user && workHour){
            return {
                name: user.data?.name,
                job_position: user.data?.rel_position,
                photo_url: user.data?.photo_url,
                att_status: (data?.length != 0) ? att.data![0].status : null, // 0 : belum absen masuk, 1 : sudah absen masuk
                att_in: workHour.data?.start_hour,
                att_out: workHour.data?.end_hour,
                date: currentDate
            }
        } else {
            return new CustomError(400, "Error fetch dashboard data")
        }
    } catch (e) {
        throw e
    }
}

export { getDashboard }