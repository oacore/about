'use client'

import { Select } from 'antd'
import { useRef } from 'react'

import styles from './DocsToggler.module.css'

export type DocsTogglerProps = {
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

/** The old @oacore/design "drop-arrow": orange square with a white caret. */
const DropArrow = () => (
  <svg aria-hidden className={styles.arrow} height="34" viewBox="0 0 34 34" width="34">
    <path d="M0 0h34v34H0z" fill="currentColor" />
    <path d="M9.916 14.167L17 21.25l7.083-7.083H9.917z" fill="#fff" />
  </svg>
)


const DocsToggler = ({ value, options, onChange }: DocsTogglerProps) => {
  const selectAreaRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.toggler}>
      <div className={styles.label}>CORE DOCUMENTATION</div>
      <div className={styles.selectArea} ref={selectAreaRef}>
        <Select
          aria-label="Select documentation"
          className={styles.select}
          classNames={{ popup: { root: styles.popup } }}
          getPopupContainer={() => selectAreaRef.current ?? document.body}
          onChange={onChange}
          options={options.map((option) => ({ label: option, value: option }))}
          popupMatchSelectWidth={false}
          suffixIcon={<DropArrow />}
          value={value}
          variant="borderless"
        />
      </div>
    </div>
  )
}

export default DocsToggler
