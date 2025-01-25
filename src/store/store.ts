// es store es lo mismo que un reducer pero así se lo llama en zustand
import { create } from "zustand";
import { DraftPatient, Patient } from '../types/index';
import { v4 as uuidv4 } from "uuid";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type PatientState = {
    patients: Patient[],
    activeID: Patient['id'],
    addPatient: (data: DraftPatient) => void,
    deletePatient: (id: Patient['id']) => void,
    getPatientById: (id: Patient['id']) => void,
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return {...patient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>()(
    devtools(
    persist((set) => ({
    // aca voy creando el state y las funciones que lo modifiquen
        patients: [],
        activeID: '',
        addPatient: (data) => {

            const newPatient = createPatient(data)

            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },

        deletePatient: (id) => {
            set( (state) => ({
                patients: state.patients.filter( p => p.id !== id)
            }))
        },

        getPatientById: (id) => {
            set( () => ({
                activeID: id
            }))
        },

        updatePatient: (data) => {
            set( (state) => ({
                patients: state.patients.map( 
                    patient => patient.id === state.activeID ? 
                        { id: patient.id, ...data  } : patient ),
                activeID: ''
            }))
        }
    }), {
        name: 'Patient storage',
        storage: createJSONStorage( () => localStorage)
    })
))