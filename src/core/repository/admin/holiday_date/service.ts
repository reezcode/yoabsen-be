import client from "../../../../database/client";
import HolidayDate from "./model";

const createHolidayDate = async (holidayDate: HolidayDate) => {
    try {
        const { error } = await client.from('holiday_date').insert(holidayDate)
        if (error) {
            throw new Error(error.message)
        } else {
            return holidayDate
        }
    } catch (error) {
        throw error
    }
}

const updateHolidayDate = async (id: string, holidayDate: HolidayDate) => {
    try {
        const { error } = await client.from('holiday_date').update(holidayDate).eq('id', id)
        if (error) {
            throw new Error(error.message)
        } else {
            return holidayDate
        }
    } catch (error) {
        throw error
    }
}

const deleteHolidayDate = async (id: string) => {
    try {
        const { error } = await client.from('holiday_date').delete().eq('id', id)
        if (error) {
            throw new Error(error.message)
        } else {
            return id
        }
    } catch (error) {
        throw error
    }
}

const listHolidayDate = async () => {
    try {
        const { data, error } = await client.from('holiday_date').select()
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

const getHolidayDate = async (id: string) => {
    try {
        const { data, error } = await client.from('holiday_date').select().eq('id', id)
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

export { createHolidayDate, deleteHolidayDate, getHolidayDate, listHolidayDate, updateHolidayDate };
