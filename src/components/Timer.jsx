import React from 'react'
import styles from './Timer.module.scss'
import containerStyles from './Container.module.scss'

const Timer = ({ remainingTime }) => {
  const remainingMin = Math.floor(remainingTime / 60)

  return (
    <div className={containerStyles.container + ' ' + styles.wrapper}>
      <div className={styles.timer}>
        <div>
          Remaining Time
        </div>
        <div>
          {remainingMin < 10 ? '0' + remainingMin : remainingMin}
          :
          {remainingTime < 10 ? '0' + remainingTime : remainingTime}
        </div>
      </div>
    </div>
  )
}

export default Timer
