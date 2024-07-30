import client from "../../../../database/client"
import { CustomError } from "../../../commons/exceptions"

const getUserByUUID = async (id: string) => {
    try {
        const { data, error } = await client.from('staff').select('*').eq('id', id).single()
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        throw error
    }
}

const getUserUUID = async (token: string) => {
    try {
        const { data, error } = await client.auth.getUser(token.replace('Bearer ', ''));
        if (error || !data.user) {
            if (error?.message == "invalid JWT: unable to parse or verify signature, token has invalid claims: token is expired") {
                throw new CustomError(401, 'Token expired')
            } else {
                throw new CustomError(401, 'Invalid JWT')
            }
        }
        return data.user.id
    } catch (e) {
        throw e
    }
}

export { getUserByUUID, getUserUUID }