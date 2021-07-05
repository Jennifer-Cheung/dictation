import React from 'react'
import Button from './Button'
import styles from './AlertBox.module.scss'

const AlertBox = ({ title, btnOnClick }) => (
  <div className={styles.alertBoxWrapper}>
    <div className={styles.alertBox}>
      <div className={styles.text}>
        <div>The {title} test will start.</div>

        <div>Are you ready?</div>
      </div>

      <div className={styles.btnRow}>
        <Button color="primary" onClick={() => btnOnClick('yes')}>Yes</Button>
        <Button color="gray" onClick={() => btnOnClick('cancel')}>Cancel</Button>
      </div>
    </div>
  </div>
)

export default AlertBox
