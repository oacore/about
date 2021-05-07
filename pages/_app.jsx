import React from 'react'
import { DesignProvider } from '@oacore/design'

import CookiesProvider from '../components/cookies/cookies-provider'
import 'components/index.scss'

// TODO: Needed for AppBar
import '@oacore/design/lib/foundation/layout.css'
import '@oacore/design/lib/foundation/colors.css'
import '@oacore/design/lib/foundation/elevation.css'
import '@oacore/design/lib/foundation/component.css'
import '@oacore/design/lib/elements/button/index.css'
import '@oacore/design/lib/elements/card/card.css'
import '@oacore/design/lib/elements/forms/index.css'
import '@oacore/design/lib/elements/logo/logo.css'
import '@oacore/design/lib/elements/icon/icon.css'
import '@oacore/design/lib/elements/app-bar/index.css'
import '@oacore/design/lib/modules/select/select.css'
import '@oacore/design/lib/modules/header/styles.css'

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
