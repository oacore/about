import apiRequest from './index'

export const registerKey = async (data) => {
  const { productType, ...body } = data

  const url = new URL(`/internal/${productType}/register`, process.env.API_URL)
    .href

  const response = await apiRequest(url, {
    body,
    method: 'POST',
  })

  return response
}

export const createMembershipPayment = async (body) => {
  const url = new URL('/internal/membership', process.env.API_URL)
  const response = await apiRequest(url, {
    body,
    method: 'POST',
  })

  return response
}

export const checkTypeRepository = async (body) => {
  const url = new URL('/internal/type-repository', process.env.API_URL)
  const response = await apiRequest(url, {
    body,
    method: 'POST',
  })

  return response
}

export const getMembershipPrice = async (body) => {
  const url = new URL('/internal/membership/price', process.env.API_URL)
  const response = await apiRequest(url, {
    body,
    method: 'POST',
  })

  return response
}
