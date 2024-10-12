interface AttendanceModel {
    status?: string,
    proof?: string,
    lat?: number,
    long?: number,
    address?: string,
}

interface PermitModel {
    name: string,
    description: string,
    date: string,
}

export {AttendanceModel, PermitModel}