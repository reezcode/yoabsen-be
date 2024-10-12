import client from "../../../../database/client"
import { getUserByUUID, getUserUUID } from "../../staff/profile/user";

const downloadExcel = async () => {
    try {
        const exceljs = require('exceljs');
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Absen Pegawai');
        
        // Mengambil data attendance_history
        const { data: attendanceData, error: attendanceError } = await client
            .from('attendance_history')
            .select('*')
            .order('date', { ascending: true });
        
        if (attendanceError) {
            throw new Error(attendanceError.message);
        }

        // Mengambil data staff
        const { data: staffData, error: staffError } = await client
            .from('staff')
            .select('*');
        
        if (staffError) {
            throw new Error(staffError.message);
        }

        // Membuat dictionary untuk lookup nama staff berdasarkan user_id
        var staffDictionary: Record<string, string> = {};
        staffData.forEach(staff => {
            staffDictionary[staff.id] = staff.name;
        });

        // Mengatur kolom worksheet
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nama', key: 'name', width: 20 },
            { header: 'Tanggal', key: 'date', width: 15 },
            { header: 'Absen Masuk', key: 'time_in', width: 20 },
            { header: 'Absen Keluar', key: 'time_out', width: 20 },
            { header: 'Status', key: 'status', width: 15 },
        ];

        // Menambahkan baris ke worksheet
        attendanceData.forEach((element) => {
            worksheet.addRow({
                id: element.id,
                name: staffDictionary[element.user_id ?? ''] , // Mengambil nama dari dictionary
                date: element.date,
                time_in: element.att_in,
                time_out: element.att_out,
                status: element.status
            });
        });

        // Menghasilkan buffer dari workbook
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    } catch (e) {
        throw e;
    }
};


export {
    downloadExcel
}