import { useCallback, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const useCookies = (names = []) => {
  const [values, setValues] = useState(names.map(() => undefined))

  useEffect(() => {
    setValues(names.map((name) => cookies.get(name)))
  }, [typeof document == 'object' ? document.cookie : '', names.join(',')])

  const setCookie = useCallback(cookies.set.bind(cookies), [cookies])
  const removeCookie = useCallback(cookies.remove.bind(cookies), [cookies])

  return [...values, setCookie, removeCookie]
}

export default useCookies
