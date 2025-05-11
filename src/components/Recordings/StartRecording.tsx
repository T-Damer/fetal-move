import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useSetAtom } from 'jotai'
import Button from 'components/Button'
import ButtonTypes from 'types/Button'
import Card from 'components/Card'
import recordsAtom from 'atoms/recordingsAtom'
import { v4 } from 'uuid'

function AddPatientForm() {
  const setRecordsList = useSetAtom(recordsAtom)
  const [_, setStartTime] = useState<Date | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(null)

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [elapsedTime])

  useEffect(() => {
    let interval: number | null = null

    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  const onStart = useCallback(() => {
    const start = new Date()
    const recordId = v4()

    setStartTime(start)
    setIsRecording(true)
    setElapsedTime(0)
    setCurrentRecordId(recordId)

    setRecordsList((prevData) => ({
      ...prevData,
      [recordId]: { startTime: String(start) },
    }))
  }, [setRecordsList])

  const onStop = useCallback(() => {
    if (!isRecording || !currentRecordId) return

    const endTime = new Date()
    setIsRecording(false)

    setRecordsList((prevData) => ({
      ...prevData,
      [currentRecordId]: {
        ...prevData[currentRecordId],
        endTime: String(endTime),
        duration: elapsedTime,
      },
    }))

    setCurrentRecordId(null)
  }, [isRecording, currentRecordId, elapsedTime, setRecordsList])

  return (
    <>
      {isRecording ? (
        <>
          <div className="text-2xl font-mono text-center">{formattedTime}</div>
          <Button
            buttonType={ButtonTypes.error}
            onClick={onStop}
            className="w-full h-full"
          >
            Остановить запись
          </Button>
        </>
      ) : (
        <Button
          buttonType={ButtonTypes.success}
          onClick={onStart}
          className="w-full h-full"
        >
          Начать запись
        </Button>
      )}
    </>
  )
}

export default function () {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2">
      <Card dashedOutline>
        <AddPatientForm />
      </Card>
    </div>
  )
}
