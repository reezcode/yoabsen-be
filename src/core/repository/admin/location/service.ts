import client from "../../../../database/client";
import { Location } from "./model";

const getLocation = async () => {
    try {
        const { data, error } = await client.from('location').select()
        if (error) {
            throw new Error(error.message)
        } else {
            return data[0]
        }
    } catch (error) {
        throw error
    }
}

const updateLocation = async (data: Location) => {
    try {
        const { error } = await client.from('location').update(data).eq('id', 1)
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

export { getLocation, updateLocation };

