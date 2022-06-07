export interface User {
    id: number
    firstName: string
    lastName: string
    hash?: string
    email: string
    israeliId: number
    cityId: number
    street: string
    streetNumber: number
    registrationDate: Date
    birthday: Date
    isAdmin: boolean
}