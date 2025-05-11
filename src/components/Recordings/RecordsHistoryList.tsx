import { useAtomValue } from 'jotai'
import PatientCard from 'components/Recordings/RecordingDetails'
import recordingsAtom from 'atoms/recordingsAtom'
import Button from 'components/Button'
import ButtonTypes from 'types/Button'
import { useCallback } from 'preact/hooks'
import saveObjectAsXlsx from 'helpers/saveObjectAsXlsx'
import toLocalTime from 'helpers/toLocalTime'

export default function ({ search }: { search?: string }) {
  const recordings = useAtomValue(recordingsAtom)

  const normalizedSearch = search?.toLowerCase() || ''

  const cards = Object.entries(recordings)
    .reverse()
    .map(([id, data]) => {
      if (
        !search ||
        String(data.startTime).toLowerCase().includes(normalizedSearch) ||
        String(data.endTime).toLowerCase().includes(normalizedSearch)
      )
        return (
          <PatientCard
            key={id}
            id={id}
            startTime={data.startTime}
            endTime={data.endTime}
          />
        )
    })

  const saveAll = useCallback(() => {
    const fileNameDate = toLocalTime(String(new Date()))
    const recordingsArray = Object.values(recordings)
    saveObjectAsXlsx(fileNameDate, recordingsArray)
  }, [recordings])

  return (
    <>
      <Button
        className="w-full my-2"
        buttonType={ButtonTypes.success}
        onClick={saveAll}
      >
        Сохранить все
      </Button>
      {cards}
    </>
  )
}
