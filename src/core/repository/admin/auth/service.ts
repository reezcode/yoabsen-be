
import client from "../../../../database/client";
import { AdminLoginModel } from "./model";

const loginAdmin = async(model: AdminLoginModel) => {
    try {
        const {data, error} = await client.auth.signInWithPassword({
            email: model.email,
            password: model.password
        })
        if(error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error;
    }
}

const refreshSession = async (token: string) => {
    try {
        const {data, error} = await client.auth.refreshSession()
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