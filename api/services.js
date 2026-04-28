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

export const checkMembershipTypeRepository = async (body) => {
  const url = new URL(
    '/internal/membership/type-repository',
    process.env.API_URL
  )
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

export const postDataProviderHealthCheck = async (body) => {
  const url = new URL('/v3/data-providers/health-check', process.env.API_URL)
    .href

  const response = await apiRequest(url, {
    body,
    method: 'POST',
  })

  return response
}
