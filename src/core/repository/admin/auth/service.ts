
import client from "../../../../database/client";
import { AdminLoginModel } from "./model";

const loginAdmin = async(model: AdminLoginModel) => {
    try {
        const {data, error} = await client.auth.signInWithPassword({
            email: model.email,
            password: model.password
        })
        if(data) {
            const datum = await client.from('staff').select('role').eq('id', data.user?.id!).single()
            if(datum.data?.role! === 'Admin') {
                return data
            } else {
                throw new Error('User not found')
            }
        } else {
            throw new Error(error?.message)
        }

    } catch (error) {
        throw error;
    }
}

const refreshSession = async (token: string) => {
    try {
        const {data, error} = await client.auth.refreshSession({
            refresh_token: token
        })
        if(data){
            return data
        } else {
            throw new Error(error?.message)
        }
    } catch (error) {
        throw error
    }
}

export {loginAdmin, refreshSession}