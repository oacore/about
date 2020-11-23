import React from 'react'

import CookiesProvider from '../components/cookies/cookies-provider'

import 'components/index.scss'

import Main from 'main'

const App = ({ Component, pageProps }) => (
  <CookiesProvider>
    <Main>
      <Component {...pageProps} />
    </Main>
  </CookiesProvider>
)

export default App
