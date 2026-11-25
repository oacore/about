import { http } from '@config/axios'

import type { RegistrationData, RegistrationResponse } from '@features/registration/types'

const unwrapResponse = (payload: unknown): RegistrationResponse => {
  if (payload == null || typeof payload !== 'object' || Array.isArray(payload)) {
    return {}
  }

  if ('data' in payload) {
    const data = (payload as { data: unknown }).data
    if (data != null && typeof data === 'object' && !Array.isArray(data)) {
      return data as RegistrationResponse
    }
  }

  return payload as RegistrationResponse
}

export const registerProduct = async (data: RegistrationData): Promise<RegistrationResponse> => {
  const { productType, ...body } = data

  if (productType !== 'api' && productType !== 'dataset') {
    throw new Error('Invalid product type')
  }

  const response = await http.post<unknown>(`${productType}/register`, body)
  return unwrapResponse(response.data)
}
