import React from 'react'
import { DesignProvider } from '@oacore/design'

import '@oacore/design/lib/index.css'

import { useInitStore, StoreProvider } from '../store'
import CookiesProvider from '../components/cookies/cookies-provider'
import 'components/index.scss'

import Main from 'main'

const App = ({ Component, pageProps }) => {
  const store = useInitStore()
  return (
    <StoreProvider store={store}>
      <CookiesProvider>
        <DesignProvider>
          <Main>
            <Component {...pageProps} />
          </Main>
        </DesignProvider>
      </CookiesProvider>
    </StoreProvider>
  )
}

export default App
