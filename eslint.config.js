import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import { globalIgnores } from 'eslint/config'

const eslintConfig = [
  globalIgnores(['.next/**', 'dist', 'out', 'node_modules']),
  ...nextCoreWebVitals,
]

export default eslintConfig
