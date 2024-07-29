import client from "../../database/client"
import { CustomError } from "../commons/exceptions"

const getUserByUUID = async (id: string) => {
    try {
        // await client.auth.refreshSession()
        const { data, error } = await client.from('staff').select('*').eq('id', id).single()
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        throw error
    }
}

export { getUserByUUID }