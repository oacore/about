import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'
import arrow from '../../public/images/dropArrow.svg'

const DocumentSelect = ({ list, handleSelect, selectedOption }) => {
  const [showOptions, setShowOptions] = useState(false)
  const dropdownRef = useRef(null)

  const onSelectOptionClick = (option) => {
    handleSelect(option)
    setShowOptions(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target))
      setShowOptions(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.documentSelect} ref={dropdownRef}>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={styles.documentSelectLabel}
      >
        {selectedOption}
        <img className={styles.arrow} src={arrow} alt="" />
      </div>
      {showOptions && (
        <ul className={styles.documentDropdown}>
          {list.map((option) => (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              className={styles.documentItem}
              key={option}
              onClick={() => onSelectOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DocumentSelect
