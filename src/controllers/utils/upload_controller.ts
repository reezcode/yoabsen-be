import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { upload } from '../../core/utils/upload';
import client from '../../database/client';

const uploadFileC = async (req: any, res: any) => {
    try {
        const file = req.file;
    if (!file) {
      return exceptionResponse(res, new CustomError(400,'File not found'));
    }
    const uploadResult = await upload(file);
    const data = client.storage.from('assets').getPublicUrl(uploadResult.path);
    return successResponse(res, {
        message: 'Upload success',
        content: {
            url: data.data.publicUrl
        }
    });
    } catch (e: any) {
        return exceptionResponse(res, e)
    }
}

export { uploadFileC }