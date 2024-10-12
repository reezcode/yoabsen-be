import client from "../../../../database/client";
import { JobPosition } from "./model";

const createJobPosition = async (data: JobPosition) => {
    try {
        const { error } = await client.from('job_position').insert(data)
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

const updateJobPosition = async (id: string, data: JobPosition) => {
    try {
        const { error } = await client.from('job_position').update(data).eq('id', id)
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

const deleteJobPosition = async (id: string) => {
    try {
        const { error } = await client.from('job_position').delete().eq('id', id)
        if (error) {
            throw new Error(error.message)
        } else {
            return id
        }
    } catch (error) {
        throw error
    }
}

const listJobPosition = async () => {
    try {
        const { data, error } = await client.from('job_position').select()
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

const getJobPosition = async (id: string) => {
    try {
        const { data, error } = await client.from('job_position').select().eq('id', id)
        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    } catch (error) {
        throw error
    }
}

export { createJobPosition, deleteJobPosition, getJobPosition, listJobPosition, updateJobPosition };
