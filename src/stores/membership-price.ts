'use client'

import { create } from 'zustand'

import type { MembershipPriceData } from '@features/member/types'
import { getMembershipPrice } from '@services/membership'

const INITIAL_PRICE_DATA: MembershipPriceData = {
  repository: [],
  planName: '',
  price: 0,
  priceCalculated: 0,
  discount: 0,
}

let latestPriceRequestId = 0

type MembershipPriceStore = {
  data: MembershipPriceData
  isLoadingPrice: boolean
  setData: (data: Partial<MembershipPriceData>) => void
  setIsLoadingPrice: (isLoadingPrice: boolean) => void
  fetchPrice: () => Promise<void>
  clearPrice: () => void
  reset: () => void
}

export const useMembershipPriceStore = create<MembershipPriceStore>()((set, get) => ({
  data: INITIAL_PRICE_DATA,
  isLoadingPrice: false,
  setData: (data) =>
    set((state) => ({
      data: {
        ...state.data,
        ...data,
      },
    })),
  setIsLoadingPrice: (isLoadingPrice) => set({ isLoadingPrice }),
  fetchPrice: async () => {
    // Only the latest request may update the fee; an older, slower response is ignored.
    latestPriceRequestId += 1
    const requestId = latestPriceRequestId
    const isLatest = () => requestId === latestPriceRequestId

    const repository = [...new Set(get().data.repository)]
    set((state) => ({
      data: {
        ...state.data,
        repository,
      },
      isLoadingPrice: true,
    }))

    try {
      const payload = await getMembershipPrice(get().data)

      if (!isLatest()) {
        return
      }

      const price =
        payload.price && payload.price > 0 && Number.isInteger(payload.price) ? payload.price : 0

      // Always replace the previous fee. Keeping it (as the old site did) showed the last
      // repository's fee for a repository the API has no price for (price: -1).
      set((state) => ({
        data: {
          ...state.data,
          price,
          priceCalculated: price,
        },
      }))
    } catch (error) {
      if (!isLatest()) {
        return
      }

      set((state) => ({
        data: {
          ...state.data,
          price: 0,
          priceCalculated: -1,
        },
      }))
      console.error(error)
    } finally {
      if (isLatest()) {
        set({ isLoadingPrice: false })
      }
    }
  },
  clearPrice: () => {
    latestPriceRequestId += 1
    set((state) => ({
      data: {
        ...state.data,
        price: 0,
        priceCalculated: 0,
        discount: 0,
      },
      isLoadingPrice: false,
    }))
  },
  reset: () => {
    latestPriceRequestId += 1
    set({
      data: INITIAL_PRICE_DATA,
      isLoadingPrice: false,
    })
  },
}))
