import React from 'react'
import { CookiesProvider, DesignProvider } from '@oacore/design'
import '@oacore/design/lib/index.css'
import LogRocket from 'logrocket'

import { StoreProvider, useInitStore } from '../store'

import 'components/index.scss'

import Main from 'main'

const App = ({ Component, pageProps }) => {
  const store = useInitStore()

  if (process.env.NODE_ENV === 'production') LogRocket.init('cab1al/about-repo')

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
