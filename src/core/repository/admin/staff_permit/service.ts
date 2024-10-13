import client from "../../../../database/client"
import { StaffPermit } from "./model"

const getListPermitStaff = async () => {
    try {
        const {data, error} = await client.from('staff_permit').select()
        if(error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error){
        throw error
    }
}

const permitFollowUp = async (id: string, model: StaffPermit) => {
    try {
        const {error} = await client.from('staff_permit').update(model).eq('id', id)
        if(error) {
            throw new Error(error.message)
        } else {
            if (model.status === 'approved') {
                const {error} = await client.from('attendance_history').insert({
                    status: 'permit',
                    user_id: model.user_id,
                    date: model.date,
                })
                if (error) {
                    throw new Error(error.message)
                } else {
                    return model
                }
            }
            return model
        }
    } catch (error) {
        throw error
    }
}

const deletePermit = async (id: string) => {
    try {
        const {error} = await client.from('staff_permit').delete().eq('id', id)
        if(error) {
            throw new Error(error.message)
        } else {
            return id
        }
    } catch (error) {
        throw error
    }
}

export { deletePermit, getListPermitStaff, permitFollowUp }
