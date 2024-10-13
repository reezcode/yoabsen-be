import { listStaff } from "../staff/service"
import { getListPermitStaff } from "../staff_permit/service"

const dashboardAdmin = async () => {
    try {
        const totalStaff = (await listStaff()).length
        const totalPermit = (await getListPermitStaff()).length
        return {
            "total_staff": totalStaff,
            "total_permit": totalPermit
        }
    } catch (error: any) {
        throw error
    }
}

export { dashboardAdmin }
