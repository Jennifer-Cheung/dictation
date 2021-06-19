import React from 'react'
import styles from '../App.module.scss'
import Input from '../components/Input'
import Button from '../components/Button'

const CreateDictation = () => {
  return (
    <div className={styles.questionsContainer}>
      <div className={styles.wrapper}>
        <p>Title</p>
        <Input/>
      </div>

      <div className={styles.wrapper}>
        <p>Words</p>
      </div>

      <div className={styles.wrapper}>
        <Button isPrimary={true}>Download file</Button>
      </div>
    </div>
  )
}

export default CreateDictation
