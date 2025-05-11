import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import DetailsHeader from 'components/DetailsHeader'
import NotFound from 'components/NotFound'
import handleError from 'helpers/handleError'
import patientsDataStore from 'atoms/recordingsAtom'
import goMain from 'helpers/goMain'
import toLocalTime from 'helpers/toLocalTime'

export default function ({ id }: { id: string }) {
  const [recordsList, setRecordsList] = useAtom(patientsDataStore)
  const currentRecord = recordsList[id]

  const deleteEntry = useCallback(() => {
    if (!currentRecord) {
      const e = 'Не удалось найти запись при удалении 🤔'
      handleError({ e, toastMessage: e })
      return
    }

    delete recordsList[id]

    goMain()
    setRecordsList(recordsList)
  }, [currentRecord, id, recordsList, setRecordsList])

  if (!currentRecord) return <NotFound />

  return (
    <div className="flex flex-col gap-x-2">
      <DetailsHeader deleteEntry={deleteEntry} />

      <div className="flex flex-col gap-y-4 my-2">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Время начала</span>
          <span>{toLocalTime(currentRecord.startTime)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Время конца</span>
          <span>{toLocalTime(currentRecord.startTime)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Описание</span>
          <textarea
            rows={12}
            class="textarea textarea-lg textarea-neutral leading-6"
            placeholder="Описание движений плода (можно редактировать)"
            value={currentRecord.description}
            onChange={(ev) => {
              const updated = {
                ...currentRecord,
                description: ev.currentTarget.value,
              }

              setRecordsList((prev) => ({
                ...prev,
                [id]: updated,
              }))
            }}
          />
        </div>
      </div>
    </div>
  )
}
