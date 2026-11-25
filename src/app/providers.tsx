'use client'

import '@ant-design/v5-patch-for-react-19'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

import { antdTheme } from '@config/theme'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => (
  <AntdRegistry hashPriority="high">
    <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
  </AntdRegistry>
)

export default AppProviders
