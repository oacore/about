import React from 'react'
import dynamic from 'next/dynamic'
import './docs.module.scss'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
})

const Docs = () => <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
export default Docs
