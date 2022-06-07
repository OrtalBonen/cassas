export const validatorMessages = {
  required: (fieldName: string) => {
    return `${fieldName} is <strong>required</strong>`
  },
  invalidEmail: "Please enter a valid email address",
  invalidIsraeliId: "Please enter a valid ID",
  invalidPassword: "Password must contain between 5 to 10 characters"
}
