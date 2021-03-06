import React from 'react'
import appStyles from '../App.module.scss'
import Input from '../components/Input'
import Button from '../components/Button'
import WordInput from '../components/WordInput'
import styles from './CreateDictation.module.scss'
import { downloadAsFile } from '../utils/downloadAsFile'
import RadioRow from '../components/RadioRow'
import FileInput from '../components/FileInput'
import AlertBox from '../components/AlertBox'

const TIME_MODE_DEFAULT = 'default'
const TIME_MODE_CUSTOM = 'setYourOwn'

const CreateDictation = () => {
  const [words, setWords] = React.useState([''])
  const [title, setTitle] = React.useState('')
  const [timeMode, setTimeMode] = React.useState(TIME_MODE_DEFAULT)
  const [time, setTime] = React.useState(null)
  const [isAlert, setIsAlert] = React.useState(false)

  const onChange = (value, i) => {
    const newArray = [...words]
    newArray[i] = value
    setWords(newArray)
  }

  const plusBtnOnClick = (i) => {
    const newArray = [...words]
    newArray.splice(i + 1, 0, '')
    setWords(newArray)
  }

  const minusBtnOnClick = (i) => {
    if (words.length !== 1) {
      const newArray = [...words]
      newArray.splice(i, 1)
      setWords(newArray)
    }
  }

  const download = () => {
    const dictation = {
      title,
      words,
      time
    }
    const output = JSON.stringify(dictation)
    downloadAsFile(output, title + '.dictation')
  }

  const radioBtnOnClick = (value) => {
    setTimeMode(value)
  }

  const timeInputOnChange = (value) => {
    setTime(value)
  }

  const loadDictation = (e) => {
    if (e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = () => {
      clearDictation()
      /** @type {string} */
      const text = fileReader.result
      const dictation = JSON.parse(text)
      setTitle(dictation.title)
      setWords(dictation.words)
      if (dictation.time === null) {
        setTimeMode(TIME_MODE_DEFAULT)
      } else {
        setTimeMode(TIME_MODE_CUSTOM)
        setTime(dictation.time)
      }
    }
    fileReader.readAsText(file)
  }

  const clearDictation = () => {
    setTime('')
    setTimeMode(TIME_MODE_DEFAULT)
    setTitle('')
    setWords([''])
  }

  return (
    <div className={styles.wrapper}>
      {isAlert
        ? <AlertBox title={null} btnOnClick={() => setIsAlert(false)}/>
        : null
      }

      <div className={appStyles.submitRow}>
        <FileInput onChange={loadDictation} color="primary" label="Load Dictation..."/>
        <Button color="danger" onClick={clearDictation}>Clear Dictation</Button>
      </div>

      <div>
        <h3>Title</h3>
        <Input onChange={(e) => {setTitle(e.target.value)}} value={title}/>
      </div>

      <div>
        <h3>Words</h3>
        <div className={appStyles.questionsContainer}>
          {
            words.map((word, i) => (
              <div className={appStyles.wrapper} key={i}>
                <WordInput
                  i={i}
                  value={word}
                  onChange={onChange}
                  plusBtnOnClick={plusBtnOnClick}
                  minusBtnOnClick={minusBtnOnClick}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div>
        <h3>Time limit</h3>
        <div className={styles.radioRowWrapper}>
          <RadioRow
            i={0}
            label="Use default time"
            onClick={radioBtnOnClick}
            value={TIME_MODE_DEFAULT}
            isChecked={timeMode === TIME_MODE_DEFAULT}
          />
        </div>
        <div className={styles.radioRowWrapper}>
          <RadioRow
            i={1}
            label="Custom(seconds):"
            value={TIME_MODE_CUSTOM}
            onClick={radioBtnOnClick}
            isChecked={timeMode === TIME_MODE_CUSTOM}
          />
          <Input
            value={time}
            onChange={(e) => {timeInputOnChange(e.target.value)}}
            onClick={() => radioBtnOnClick(TIME_MODE_CUSTOM)}
          />
        </div>
      </div>

      <div className={appStyles.submitRow}>
        <Button color="primary" onClick={download}>Download file</Button>
      </div>
    </div>
  )
}

export default CreateDictation
