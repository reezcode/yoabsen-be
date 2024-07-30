import client from "../../../../database/client";
import { CustomError } from "../../../commons/exceptions";
import { UserModel } from "./model";
import { getUserUUID } from "./user";

const getProfile = async (token: string) => {
    try {
        const { data, error } = await client.auth.getUser(token.replace('Bearer ', ''));
        if (error || !data.user) {
            if (error?.message == "invalid JWT: unable to parse or verify signature, token has invalid claims: token is expired") {
                throw new CustomError(401, 'Token expired')
            } else {
                throw new CustomError(401, 'Invalid JWT')
            }
        }
        return data.user
    } catch (e) {
        throw e
    }
}

const updateProfile = async (token: string, model: UserModel) => {
    try {
        const userId = await getUserUUID(token)
        const { error } = await client.from('staff').update({
            photo_url: model.photo_url,
        }).eq('id', userId)
        if (error) {
            throw new CustomError(400, error.message)
        } else {
            return { message: 'Update success' }
        }
    } catch (e) {
        throw e
    }
}

export { getProfile, updateProfile }