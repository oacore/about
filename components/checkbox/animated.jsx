import React, { useState } from 'react'
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from 'react-spring'
import { classNames } from '@oacore/design/lib/utils'

import styles from './styles.module.scss'

const Checkbox = ({
  id,
  labelText,
  setCheckbox,
  className,
  value = false,
  isDisabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(value)
  const checkboxAnimationRef = useSpringRef()
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? '#b75400' : '#fff',
    borderColor: isChecked ? '#b75400' : '#757575',
    config: config.gentle,
    ref: checkboxAnimationRef,
  })

  const checkedboxtyle = useSpring({
    backgroundColor: '#757575',
    borderColor: '#757575',
  })

  const [checkmarkLength, setCheckmarkLength] = useState(null)

  const checkmarkAnimationRef = useSpringRef()
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  })

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  )

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label key={labelText} className={styles.labelBox}>
      <input
        id={id}
        type="checkbox"
        disabled={isDisabled}
        onChange={() => {
          setIsChecked(!isChecked)
          setCheckbox(!isChecked)
        }}
        className={styles.disabled}
      />
      <animated.svg
        style={isDisabled ? checkedboxtyle : checkboxAnimationStyle}
        className={styles.checkbox}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) setCheckmarkLength(ref.getTotalLength())
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
      <div
        className={classNames
          .use(styles.label, { [styles.labelBold]: value })
          .join(className)}
      >
        {labelText}
      </div>
    </label>
  )
}

export default Checkbox
