enum Role {
    ADMIN = "Admin",
    STAFF = "Staff"

}

interface StaffModel {
    code: number,
    name: string,
    email?: string,
    id_position: number,
    rel_position: string,
    password: string,
    extra_salary?: number,
    salary: number,
    phone_number: string,
    qr_link: string,
    role: Role,
}

export { StaffModel, Role }