import request from './index'

// TODO Use API_URL from `env.config.js`
const API_URL = 'https://api.core.ac.uk/internal'

const apiRequest = (url, ...args) => request(`${API_URL}${url}`, ...args)

const fetchDataProviderAdd = async (params) => {
  const { data } = await apiRequest(`/data-providers`, {
    method: 'POST',
    body: { ...params },
  })
  return data
}

export default fetchDataProviderAdd
