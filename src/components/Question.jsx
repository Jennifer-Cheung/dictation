import React, { useMemo } from 'react'
import speakerIconUrl from '../speaker_icon.svg'
import Button from './Button'
import styles from './Question.module.scss'
import Input from './Input'

const Question = ({ isCorrect, placeholder, word, onChange, value, voice }) => {
  const utterance = useMemo(() => {
    const newUtterance = new SpeechSynthesisUtterance(word)
    newUtterance.voice = voice
    return newUtterance
  }, [word, voice])

  const onButtonClick = () => {
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className={styles.question}>
      <Button onClick={onButtonClick} color={'secondary'}>
        <img src={speakerIconUrl} alt="Play Audio" className={styles.speakerImage}/>
      </Button>
      <Input
        placeholder={placeholder}
        success={isCorrect === true}
        error={isCorrect === false}
        value={value}
        className={styles.questionInput}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        disabled={isCorrect !== null}
      />
    </div>
  )
}

export default Question
