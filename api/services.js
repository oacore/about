import apiRequest from './index'

// eslint-disable-next-line import/prefer-default-export
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
