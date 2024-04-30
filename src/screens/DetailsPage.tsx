import { navigate } from 'wouter-preact/use-browser-location'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import Button from 'components/Button'
import patientsDataStore, {
  AvailableInputKeys,
  AvailableSections,
  PlainInputObject,
} from 'atoms/patientsDataStore'
import saveObjectAsJson from 'helpers/saveObjectAsJson'

export default function ({ id }: { id: string }) {
  const [patientsData, setPatientsData] = useAtom(patientsDataStore)
  const currentPatient = patientsData[id]

  const deleteEntry = useCallback(() => {
    if (!currentPatient) {
      console.error('cant find the patient while deleting')
      return
    }

    delete patientsData[id]

    navigate('/birth-history')
    setPatientsData(patientsData)
  }, [currentPatient, id, patientsData, setPatientsData])

  const onChange = useCallback(
    ({
      value,
      headerId,
      inputKey,
    }: {
      value: string
      headerId: string
      inputKey: string
    }) => {
      const subHeaderData = currentPatient[headerId as AvailableSections]

      const updated = {
        ...currentPatient,
        [headerId]: {
          ...subHeaderData,
          [inputKey]: {
            ...(subHeaderData[inputKey as AvailableInputKeys] as object), // TS complains if you don't convert
            value,
          },
        },
      }

      setPatientsData((prev) => ({
        ...prev,
        [id]: updated,
      }))
    },
    [currentPatient, id, setPatientsData]
  )

  const saveAndExport = useCallback(() => {
    saveObjectAsJson('person.csv', currentPatient)
  }, [currentPatient])

  if (!currentPatient) return <p>404 :(</p>

  return (
    <div className="flex flex-col gap-x-2">
      <div className="flex justify-between items-center">
        <a
          onClick={() => navigate('/birth-history')}
          className="cursor-pointer hover:opacity-50 transition-opacity"
        >
          ◄ Назад
        </a>

        <a className="text-red-400 cursor-pointer" onClick={deleteEntry}>
          Удалить
        </a>
      </div>

      {Object.entries(currentPatient).map(([headerId, data]) => (
        <>
          <h2 id={headerId}>{data.header}</h2>
          {Object.entries(data).map(([inputKey, inputValue]) => {
            const input = inputValue as PlainInputObject

            if (!input?.title) return null

            const value = input.preprocess?.(input.value) || input.value

            return (
              <span>
                {input.title}:{' '}
                <input
                  value={value}
                  onChange={(e) =>
                    onChange({
                      value: e.currentTarget.value,
                      headerId,
                      inputKey,
                    })
                  }
                >
                  {value}
                </input>
              </span>
            )
          })}
        </>
      ))}

      <Button isGreen onSubmit={saveAndExport}>
        Поделиться
      </Button>
    </div>
  )
}
