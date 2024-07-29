
import client from "../../../../database/client";
import { LoginModel } from "./model";

const loginUser = async(model: LoginModel) => {
    try {
        const {data, error} = await client.auth.signInWithPassword({
            phone: model.phone_number,
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

export {loginUser, refreshSession}