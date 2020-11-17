import React from 'react'
import { CookiesProvider } from 'react-cookie'

// TODO: Move to map component once this is released
//       https://github.com/vercel/next.js/issues/12079#issuecomment-678858809
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

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
