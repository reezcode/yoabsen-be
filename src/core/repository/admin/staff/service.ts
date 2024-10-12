import client from "../../../../database/client"
import { Role, StaffModel } from "./model"

const createStaff = async (model: StaffModel) => {
    try {
        const { data, error } = await client.auth.signUp({
            phone: model.phone_number,
            password: model.password,
            options: {
                data: {
                    display_name: model.name.toLowerCase().replace(/\s+/g, ''),
                    phone: model.phone_number
                }
            }
        })
        if(error) {
            throw new Error(error.message)
        } else {
            const {error} =  await client.from('staff').insert({
                id: data.session?.user.id,
                code: model.code,
                name: model.name,
                email: model.email,
                id_position: model.id_position,
                rel_position: model.rel_position,
                extra_salary: model.extra_salary,
                salary: model.salary,
                phone_number: model.phone_number,
                qr_link: model.qr_link,
                role: Role.STAFF
            })
            if(error) {
                throw new Error(error.message)
            } else {
                return data
            }
        }
    } catch (error) {
        throw error
    }
}

const updateStaff = async (id: string,model: StaffModel) => {
    try {
        const {error} =  await client.from('staff').update({
            code: model.code,
            name: model.name,
            email: model.email,
            id_position: model.id_position,
            rel_position: model.rel_position,
            extra_salary: model.extra_salary,
            salary: model.salary,
            phone_number: model.phone_number,
            qr_link: model.qr_link,
            role: model.role
        }).eq('id', id)
        if(error) {
            throw new Error(error.message)
        } else {
            return model
        }
    } catch (error) {
        throw error
    }
}

const deleteStaff = async (id: string) => {
    try {
        const {error} =  await client.from('staff').delete().eq('id', id)
        if(error) {
            throw new Error(error.message)
        } else {
            return id
        }
    } catch (error) {
        throw error
    }
}

const getStaff = async (id: string) => {
    try {
        const {data, error} = await client.from('staff').select().eq('id', id)
        if(error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

const listStaff = async () => {
    try {
        const {data, error} = await client.from('staff').select()
        if(error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

export { createStaff, deleteStaff, getStaff, listStaff, updateStaff }
