export type Patient = {
    id: string,
    name: string,
    caretaker: string
    date: Date
    email: string
    symptoms: string
}

export type DraftPatient = Omit<Patient, 'id'>