'use client'

import { create } from 'zustand'

import type {
  RegistrationData,
  RegistrationResponse,
} from '@features/registration/types'
import { registerProduct } from '@services/registration'

const INITIAL_DATA: RegistrationData = {
  firstName: '',
  lastName: '',
  organisation: '',
  country: '',
  accountType: 'institution',
  email: '',
  productType: '',
  agreeNewsletter: false,
  dateRequest: '',
  termsId: '',
  agreedToNewTerms: false,
  turnstileToken: '',
  libraryEmail: '',
  description: '',
  paidAccess: false,
}

type RegistrationStore = {
  data: RegistrationData
  isModalFormActive: boolean
  isModalConditionsActive: boolean
  isModalSuccessActive: boolean
  isModalExitActive: boolean
  isModalErrorActive: boolean
  isLoading: boolean
  responseData: RegistrationResponse | null
  error: string | null
  setData: (data: Partial<RegistrationData>) => void
  setIsModalFormActive: (isActive: boolean) => void
  setIsModalConditionsActive: (isActive: boolean) => void
  setIsModalSuccessActive: (isActive: boolean) => void
  setIsModalExitActive: (isActive: boolean) => void
  setIsModalErrorActive: (isActive: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  registerSubmit: () => Promise<void>
  reset: () => void
}

export const useRegistrationStore = create<RegistrationStore>()((set, get) => ({
  data: INITIAL_DATA,
  isModalFormActive: false,
  isModalConditionsActive: false,
  isModalSuccessActive: false,
  isModalExitActive: false,
  isModalErrorActive: false,
  isLoading: false,
  responseData: null,
  error: null,
  setData: (data) =>
    set((state) => ({
      data: {
        ...state.data,
        ...data,
      },
    })),
  setIsModalFormActive: (isModalFormActive) => set({ isModalFormActive }),
  setIsModalConditionsActive: (isModalConditionsActive) => set({ isModalConditionsActive }),
  setIsModalSuccessActive: (isModalSuccessActive) => set({ isModalSuccessActive }),
  setIsModalExitActive: (isModalExitActive) => set({ isModalExitActive }),
  setIsModalErrorActive: (isModalErrorActive) => set({ isModalErrorActive }),
  setIsLoading: (isLoading) => set({ isLoading }),
  registerSubmit: async () => {
    if (!get().data.turnstileToken) {
      set({ isModalErrorActive: true })
      return
    }

    set({ isLoading: true, error: null })

    try {
      const responseData = await registerProduct(get().data)
      set({
        responseData,
        isModalSuccessActive: true,
      })
    } catch (error) {
      set({
        isModalErrorActive: true,
        error: error instanceof Error ? error.message : 'Request failed',
      })
    } finally {
      set({ isLoading: false })
    }
  },
  reset: () =>
    set({
      data: { ...INITIAL_DATA },
      isModalFormActive: false,
      isModalConditionsActive: false,
      isModalSuccessActive: false,
      isModalExitActive: false,
      isModalErrorActive: false,
      isLoading: false,
      responseData: null,
      error: null,
    }),
}))
