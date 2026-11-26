export type DiagnosticMeta = {
  title?: string
  description?: string
  keywords?: string | string[]
}

export type DiagnosticHeader = {
  overline?: string
  title?: string
  description?: string
}

export type DiagnosticRepositoryUrlField = {
  label: string
  placeholder?: string
  inputId?: string
}

export type DiagnosticForm = {
  id?: string
  repositoryUrl: DiagnosticRepositoryUrlField
  submitLabel: string
  submittingLabel: string
}

export type DiagnosticErrors = {
  requiredUrl: string
  generic: string
}

export type DiagnosticCheckCopy = {
  title: string
  details?: string
  info?: string
  recommendation?: string
}

export type DiagnosticCheckDefinition = {
  label: string
  success: DiagnosticCheckCopy
  error: DiagnosticCheckCopy
}

export type DiagnosticCheckId =
  | 'oaiPmh'
  | 'oaiPmhUa'
  | 'blockingHeaders'
  | 'blockingHeadersUa'
  | 'robotsDisallow'
  | 'robotsCrawlDelay'
  | 'robotsEssentialParts'

export type DiagnosticChecksConfig = Partial<Record<DiagnosticCheckId, DiagnosticCheckDefinition>>

export type DiagnosticChecks = {
  title: string
  item?: DiagnosticChecksConfig
}

export type DiagnosticOverallState = {
  title: string
  summary: string
}

export type DiagnosticResultsConfig = {
  overall: {
    success: DiagnosticOverallState
    warning?: DiagnosticOverallState
    error: DiagnosticOverallState
  }
  helpLabels: {
    whatIsChecks: string
    recommendation: string
  }
}

/** Shape returned by `getSections('diagnostic')` (oacore/content `diagnostic/diagnostic.yml`). */
export type BlockingDiagnosticPageData = {
  id?: string
  meta?: DiagnosticMeta
  section?: {
    caption?: string
  }
  header?: DiagnosticHeader
  form: DiagnosticForm
  errors: DiagnosticErrors
  results: DiagnosticResultsConfig
  checks: DiagnosticChecks
}

export type DiagnosticCheckStates = Record<DiagnosticCheckId, boolean>
