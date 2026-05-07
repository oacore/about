import React from 'react'
import { classNames } from '@oacore/design/lib/utils'

import successIcon from '../../../public/images/icons/success.svg'
import errorIcon from '../../../public/images/icons/error.svg'
import dropdown from '../../../public/images/icons/dropdownArrow.svg'
import info from '../../../public/images/icons/infoGreen.svg'
import warning from '../../../public/images/icons/warningRed.svg'
import styles from '../styles.module.scss'
import { Markdown } from '../../../components'
import { diagnosticCheckIds } from '../map-health-check'

function CheckRow({ checkDef, passed, helpLabels }) {
  if (!checkDef) return null

  const copy = passed ? checkDef.success : checkDef.error
  const helpText = passed ? copy.info : copy.recommendation ?? copy.info
  const hasBody = !!(copy.details || helpText?.trim())

  const header = (
    <>
      <span className={styles.resultsCheckLabel}>{checkDef.label}</span>
      <span className={styles.resultsCheckTitle}>{copy.title}</span>
    </>
  )

  return (
    <li className={styles.resultsCheck}>
      {hasBody ? (
        <details
          className={classNames.use(styles.resultsCheckDetails, {
            [styles.resultsCheckDetailsError]: !passed,
          })}
        >
          <summary
            className={classNames.use(styles.resultsCheckSummary, {
              [styles.resultsCheckSummaryError]: !passed,
            })}
          >
            <img src={passed ? successIcon : errorIcon} alt="passed" />
            <span className={styles.resultsCheckSummaryMain}>{header}</span>
            <span className={styles.resultsCheckChevron} aria-hidden>
              <img src={dropdown} alt="dropdown" />
            </span>
          </summary>
          <div className={styles.resultsDetailsPanel}>
            <span className={styles.resultsDetailsTextHeader}>Details</span>
            {copy.details ? (
              <p className={styles.resultsDetailsText}>{copy.details}</p>
            ) : null}
            {helpText?.trim() ? (
              <div
                className={classNames.use(styles.resultsHelpWrapper, {
                  [styles.resultsHelpWrapperError]: !passed,
                })}
              >
                <img src={passed ? info : warning} alt="passed" />
                <div>
                  <p className={styles.resultsHelpLabel}>
                    {passed
                      ? helpLabels.whatIsChecks
                      : helpLabels.recommendation}
                  </p>
                  <Markdown className={styles.resultsHelpBody}>
                    {helpText}
                  </Markdown>
                </div>
              </div>
            ) : null}
          </div>
        </details>
      ) : (
        <div className={styles.resultsCheckInner}>
          <div className={styles.resultsCheckHeader}>{header}</div>
        </div>
      )}
    </li>
  )
}

export default function DiagnosticResults({
  resultsConfig,
  checksConfig,
  states,
  checks,
}) {
  const allPass = diagnosticCheckIds.every((id) => states[id])
  const overall = allPass
    ? resultsConfig.overall.success
    : resultsConfig.overall.error

  const bannerClass = allPass
    ? `${styles.resultsBanner} ${styles.resultsBannerSuccess}`
    : `${styles.resultsBanner} ${styles.resultsBannerError}`

  return (
    <div className={styles.resultsRoot}>
      <div className={bannerClass}>
        <img src={allPass ? successIcon : errorIcon} alt="" />
        <div className={styles.resultsInnerBanner}>
          <h2 className={styles.resultsBannerTitle}>{overall.title}</h2>
          <Markdown className={styles.resultsBannerSummary}>
            {overall.summary}
          </Markdown>
        </div>
      </div>
      <div className={styles.resultsBody}>
        <p className={styles.bodyTitle}>{checks.title}</p>
        <ul className={styles.resultsCheckList}>
          {diagnosticCheckIds.map((id) => (
            <CheckRow
              key={id}
              checkDef={checksConfig[id]}
              passed={states[id]}
              helpLabels={resultsConfig.helpLabels}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
