import React from 'react'
import { DesignProvider } from '@oacore/design'
import '@oacore/design/lib/index.css'

import CookiesProvider from '../components/cookies/cookies-provider'
import 'components/index.scss'

import Main from 'main'

const App = ({ Component, pageProps }) => (
  <CookiesProvider>
    <DesignProvider>
      <Main>
        <Component {...pageProps} />
      </Main>
    </DesignProvider>
  </CookiesProvider>
)

export default App
