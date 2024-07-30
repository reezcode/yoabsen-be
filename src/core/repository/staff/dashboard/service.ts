import client from "../../../../database/client"
import { CustomError } from "../../../commons/exceptions";
import { currDateTime, currentDate } from "../../../utils/date";
import { getUserUUID } from "../profile/user"

const getDashboard = async (token: string) => {
    try {
        const userId = await getUserUUID(token);
        const user = await client.from('staff').select('*').eq('id', userId).single()
        const workHour = await client.from('work_hour').select('*').eq('day', currDateTime.getDay()).single()
        const att =  (await client.from('attendance_history').select('*').eq('user_id', userId).eq('date', currentDate)).data?.length
        console.log(att)
        if(user && workHour){
            return {
                name: user.data?.name,
                job_position: user.data?.rel_position,
                photo_url: user.data?.photo_url,
                att_status: att, // 0 : belum absen masuk, 1 : sudah absen masuk
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