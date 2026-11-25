'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { MembershipData } from '@features/member/types'
import {
  checkMembershipTypeRepository,
  createMembershipPayment as postMembershipPayment,
} from '@services/membership'

const INITIAL_MEMBERSHIP_DATA: MembershipData = {
  price: 0,
  priceCalculated: 0,
  discount: 0,
  planName: '',
  noRepositories: 0,
  size: '',
  transactionToken: 'TOKEN',
  transactionDescription: 'description',
  repoName: '',
}

type MembershipStore = {
  data: MembershipData
  isLoading: boolean
  setData: (data: Partial<MembershipData>) => void
  getData: () => MembershipData
  setIsLoading: (isLoading: boolean) => void
  submit: () => Promise<void>
  createMembershipPayment: () => Promise<void>
  reset: () => void
}

export const useMembershipStore = create<MembershipStore>()(
  persist(
    (set, get) => ({
      data: INITIAL_MEMBERSHIP_DATA,
      isLoading: false,
      setData: (data) =>
        set((state) => ({
          data: {
            ...state.data,
            ...data,
          },
        })),
      getData: () => get().data,
      setIsLoading: (isLoading) => set({ isLoading }),
      submit: async () => {
        const response = await checkMembershipTypeRepository(get().data)
        set((state) => ({
          data: {
            ...state.data,
            ...response,
          },
        }))
      },
      createMembershipPayment: async () => {
        try {
          await postMembershipPayment(get().data)
          get().reset()
        } catch (error) {
          console.error(error)
          window.location.assign('/membership-request-status/error')
        }
      },
      reset: () =>
        set({
          data: {
            price: 0,
            priceCalculated: 0,
            planName: '',
            discount: 0,
            repoName: '',
            noRepositories: 0,
            size: '',
            transactionToken: 'TOKEN',
            transactionDescription: 'description',
          },
          isLoading: false,
        }),
    }),
    {
      name: 'membership-request',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ data: state.data }),
      skipHydration: true,
    },
  ),
)
