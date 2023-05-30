import React, { useRef, useState } from 'react'

import styles from './styles.module.scss'

const TogglePanel = ({ className, title, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  const contentRef = useRef(null)

  const togglePanel = () => {
    setIsOpen((prev) => !prev)
  }

  const handleClick = (e) => {
    if (contentRef.current?.contains(e.target)) return

    setIsOpen((prev) => !prev)
  }

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={`toggle-panel ${className}`} onClick={togglePanel}>
      <div className={styles.togglePanelTitle}>
        {title}
        <div className={styles.svgWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="13"
            viewBox="0 0 19 13"
            fill="none"
            className={styles.toggleArrow}
          >
            <path
              d="M0 4L3.5 0.5L9 6L14.6569 0.5L18.1569 4L9 13L0 4Z"
              fill="#B75400"
              transform={`rotate(${isOpen ? '180' : '0'} 9 6)`}
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={handleClick} className={styles.toggleContent}>
          {content}
        </div>
      )}
    </div>
  )
}

export default TogglePanel
