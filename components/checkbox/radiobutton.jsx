import React, { useState } from 'react'
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from 'react-spring'

import styles from './styles.module.scss'
import { classNames } from "@oacore/design/lib/utils";


const Radiobutton = ({ id, labelText, options, setCheckbox, className }) => {
  const [isChecked, setIsChecked] = useState(false)


  // console.log(options)
  return (
    <div key="radiobutton-wrapper">
      <div>{labelText}:</div>
      {options.map((field) => {
        return (
          <div className="form-check">
            <input className="form-check-input" type="radio" name={id} id={field.id} />
              <label className="form-check-label" htmlFor={field.id} >
                {field.value}
              </label>
          </div>
        )
      })}
    </div>
  )
}

export default Radiobutton
