import client from "../../../../database/client"

const uploadFile = async (file: File) => {
    try {
        const {data, error} = await client.storage.from('assets').upload(file.name, file)
        if(data) {
            return data
        } else {
            throw new Error(error?.message)
        }
    } catch (e) {
        throw e
    }
}

export { uploadFile }