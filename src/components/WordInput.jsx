import React from 'react'
import Input from './Input'
import Button from './Button'
import styles from './WordInput.module.scss'

const WordInput = ({ i, value, onChange, plusBtnOnClick, minusBtnOnClick }) => {
  return (
    <div className={styles.wordInputBar}>
      <p>{i + 1}.</p>
      <Input onChange={(e) => onChange(e.target.value, i)} value={value}/>
      <Button onClick={() => plusBtnOnClick(i)} colour={'secondary'}>+</Button>
      <Button onClick={() => minusBtnOnClick(i)} colour={'secondary'}>−</Button>
    </div>
  )
}

export default WordInput
