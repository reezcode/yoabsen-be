import client from "../../../../database/client";
import { WorkHour } from "./model";

const updateWorkHour = async (workHourId: string, model: WorkHour) => {
    try {
        const { error } = await client.from('work_hour').update({
            start_hour: model.start_hour,
            end_hour: model.end_hour,
            tolerance: model.tolerance
        }).eq('id', workHourId)
        if (error) {
            throw new Error(error.message)
        } else {
            return model
        }
    } catch (error) {
        throw error
    }
}

const listWorkHour = async () => {
    try {
        const { data, error } = await client.from('work_hour').select()
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

const getWorkHour = async (workHourId: string) => {
    try {
        const { data, error } = await client.from('work_hour').select().eq('id', workHourId)
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

export { getWorkHour, listWorkHour, updateWorkHour };
