import request from './index'

const apiRequest = (url, ...args) =>
  request(`${process.env.API_URL}${url}`, ...args)

const fetchDataProviderAdd = async (params) => {
  const { data } = await apiRequest(`/data-providers`, {
    method: 'POST',
    body: { ...params },
  })
  return data
}

export default fetchDataProviderAdd
