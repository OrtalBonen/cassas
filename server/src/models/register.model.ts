export interface RegisterRequest {
    email: string
    israeliId: number
    password: string
    passwordConfirmation: string
    firstName: string
    lastName: string
    cityId: number
    street: string
    streetNumber: number
    dateOfBirth: Date | undefined
}

