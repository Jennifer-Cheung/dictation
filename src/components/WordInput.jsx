import React from 'react'
import Input from './Input'
import Button from './Button'
import styles from './WordInput.module.scss'

const WordInput = ({i}) => {
  return(
    <div className={styles.wordInputBar}>
      <p>{i+1}.</p>
      <Input/>
      <Button>+</Button>
      <Button>−</Button>
    </div>
  )
}

export default WordInput
