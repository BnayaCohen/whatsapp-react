import { useEffect, useState } from "react"
import { ReactComponent as MicIcon } from '../assets/imgs/MicIcon.svg'

export function RecordBtn({ updateText }) {

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const speechRecord = new Recognition()
  let [isRecording, setRecording] = useState(false)

  useEffect(() => {
    speechRecord.continuous = true
    speechRecord.interimResults = true

    speechRecord.onstart = () => {
      setRecording(() => true)
      console.log('start');
    }

    speechRecord.onend = () => {
      setRecording(() => false)
      console.log('stop');
    }

    speechRecord.onresult = (evt) => {
      updateText(evt.results[0][0].transcript)
    }

    return () => { speechRecord.stop() }
  }, [])

  const toggleMic = () => {
    if (isRecording) speechRecord.stop()
    else speechRecord.start()
  }

  return (
    <section className="microphone-container" onClick={toggleMic} >
        <MicIcon className={`microphone-btn ${isRecording ? 'recording' : ''}`}/>
    </section >
  )
}