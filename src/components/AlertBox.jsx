import React from 'react'
import Button from './Button'
import styles from './AlertBox.module.scss'

const AlertBox = ({ title, btnOnClick, situation = 'makeDictation' }) => (
  <div className={styles.alertBoxWrapper}>
    <div className={styles.alertBox}>
      <div className={styles.text}>
        {(situation === 'doDictation')
          ? (
            <>
              <div>The {title} test will start.</div>

              <div>Are you ready?</div>
            </>
          )
          : (
            <>
              <div>Input does not match required format.</div>

              <div>Please enter a valid title or select your time limit.</div>
            </>
          )}
      </div>

      <div className={styles.btnRow}>
        <Button color="primary" onClick={() => btnOnClick('yes')}>Yes</Button>
        <Button color="gray" onClick={() => btnOnClick('cancel')}>Cancel</Button>
      </div>
    </div>
  </div>
)

export default AlertBox
