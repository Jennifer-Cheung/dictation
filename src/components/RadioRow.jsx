import React from 'react'
import createDicStyle from '../layouts/CreateDictation.module.scss'
import styles from './RadioRow.module.scss'

const RadioRow = ({ isChecked, value, onClick, label }) => {
  return (
    <div className={createDicStyle.radioRowWrapper} onClick={() => {onClick(value)}}>
      <input className={styles.radioBtn}
             type="radio"
             checked={isChecked}
      />

      <label
        className={createDicStyle.text}
      >{label}</label>
    </div>
  )
}

export default RadioRow
