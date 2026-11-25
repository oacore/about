'use client'

import { Collapse } from 'antd'
import classNames from 'classnames'
import type { ReactNode } from 'react'

import Markdown from '@components/Markdown/Markdown'

import { areAllChecksPassing, diagnosticCheckIds } from '../mapHealthCheck'
import type {
  DiagnosticCheckDefinition,
  DiagnosticCheckId,
  DiagnosticChecks,
  DiagnosticCheckStates,
  DiagnosticResultsConfig,
} from '../types'

import DiagnosticIcon from './DiagnosticIcon'

import styles from '../styles.module.css'

type CheckRowProps = {
  checkId: DiagnosticCheckId
  checkDef?: DiagnosticCheckDefinition
  passed: boolean
  helpLabels: DiagnosticResultsConfig['helpLabels']
}

type DiagnosticResultsProps = {
  resultsConfig: DiagnosticResultsConfig
  checks: DiagnosticChecks
  states: DiagnosticCheckStates
}

const WARNING_WHEN_FAILED = new Set<DiagnosticCheckId>([
  'robotsDisallow',
  'robotsCrawlDelay',
  'robotsEssentialParts',
])

const resolveStatusIcon = (passed: boolean, failedAsWarning: boolean) => {
  if (passed) {
    return 'success' as const
  }

  if (failedAsWarning) {
    return 'warning' as const
  }

  return 'error' as const
}

const resolveHelpIcon = (passed: boolean, failedAsWarning: boolean) => {
  if (passed) {
    return 'info' as const
  }

  if (failedAsWarning) {
    return 'infoWarning' as const
  }

  return 'warningRed' as const
}

const CheckHeader = ({ label, title }: { label: string; title: string }) => (
  <>
    <span className={styles.resultsCheckLabel}>{label}</span>
    <span className={styles.resultsCheckTitle}>{title}</span>
  </>
)

const CheckRow = ({ checkId, checkDef, passed, helpLabels }: CheckRowProps) => {
  if (!checkDef) {
    return null
  }

  const copy = passed ? checkDef.success : checkDef.error
  const helpText = passed ? copy.info : (copy.recommendation ?? copy.info)
  const hasBody = Boolean(copy.details || helpText?.trim())
  const failedAsWarning = !passed && WARNING_WHEN_FAILED.has(checkId)
  const header = <CheckHeader label={checkDef.label} title={copy.title} />

  if (!hasBody) {
    return (
      <li className={styles.resultsCheck}>
        <div className={styles.resultsCheckInner}>
          <div className={styles.resultsCheckHeader}>{header}</div>
        </div>
      </li>
    )
  }

  const detailsPanel = (
    <div className={styles.resultsDetailsPanel}>
      <span className={styles.resultsDetailsTextHeader}>Details</span>
      {copy.details ? <p className={styles.resultsDetailsText}>{copy.details}</p> : null}
      {helpText?.trim() ? (
        <div
          className={classNames(styles.resultsHelpWrapper, {
            [styles.resultsHelpWrapperError]: !passed && !failedAsWarning,
            [styles.resultsHelpWrapperWarning]: failedAsWarning,
          })}
        >
          <DiagnosticIcon name={resolveHelpIcon(passed, failedAsWarning)} />
          <div>
            <p className={styles.resultsHelpLabel}>
              {passed ? helpLabels.whatIsChecks : helpLabels.recommendation}
            </p>
            <Markdown className={styles.resultsHelpBody}>{helpText}</Markdown>
          </div>
        </div>
      ) : null}
    </div>
  )

  const labelNode: ReactNode = (
    <span className={styles.resultsCheckSummaryMain}>
      <DiagnosticIcon name={resolveStatusIcon(passed, failedAsWarning)} />
      <span className={styles.resultsCheckSummaryCopy}>{header}</span>
    </span>
  )

  return (
    <li className={styles.resultsCheck}>
      <Collapse
        bordered={false}
        className={classNames(styles.resultsCheckDetails, {
          [styles.resultsCheckDetailsError]: !passed && !failedAsWarning,
          [styles.resultsCheckDetailsWarning]: failedAsWarning,
        })}
        expandIcon={({ isActive }) => (
          <DiagnosticIcon
            className={classNames(styles.resultsCheckChevron, isActive && styles.resultsCheckChevronOpen)}
            name="dropdown"
          />
        )}
        expandIconPosition="end"
        items={[
          {
            key: checkId,
            label: labelNode,
            children: detailsPanel,
            className: classNames(styles.resultsCheckPanel, {
              [styles.resultsCheckPanelError]: !passed && !failedAsWarning,
              [styles.resultsCheckPanelWarning]: failedAsWarning,
            }),
          },
        ]}
      />
    </li>
  )
}

const DiagnosticResults = ({ resultsConfig, checks, states }: DiagnosticResultsProps) => {
  const allPass = areAllChecksPassing(states)
  const overall = allPass ? resultsConfig.overall.success : resultsConfig.overall.error
  const checksConfig = checks.item ?? {}

  return (
    <div className={styles.resultsRoot}>
      <div
        className={classNames(
          styles.resultsBanner,
          allPass ? styles.resultsBannerSuccess : styles.resultsBannerError,
        )}
      >
        <DiagnosticIcon name={allPass ? 'success' : 'error'} />
        <div className={styles.resultsInnerBanner}>
          <h2 className={styles.resultsBannerTitle}>{overall.title}</h2>
          <Markdown className={styles.resultsBannerSummary}>{overall.summary}</Markdown>
        </div>
      </div>
      <div className={styles.resultsBody}>
        <p className={styles.bodyTitle}>{checks.title}</p>
        <ul className={styles.resultsCheckList}>
          {diagnosticCheckIds.map((id) => (
            <CheckRow
              key={id}
              checkDef={checksConfig[id]}
              checkId={id}
              helpLabels={resultsConfig.helpLabels}
              passed={states[id]}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DiagnosticResults
