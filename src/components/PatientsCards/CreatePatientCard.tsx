import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useSetAtom } from 'jotai'
import Button from 'components/Button'
import ButtonTypes from 'types/Button'
import Card from 'components/Card'
import HumanIcon from 'components/Icons/HumanIcon'
import Patient from 'types/Patient'
import handleError from 'helpers/handleError'
import nameToDataStore from 'atoms/patientsDataStore'
import { read, utils } from 'xlsx'
import patientsDataStore from 'atoms/patientsDataStore'

function AddPatientForm() {
  const [historySerial, setHistorySerial] = useState<number | undefined>()
  const setPatientsData = useSetAtom(nameToDataStore)

  const clearData = useCallback(() => {
    setHistorySerial(undefined)
  }, [])

  const onSubmit = useCallback(() => {
    if (!historySerial) {
      const e = 'Нет серийного номера истории'
      handleError({ e, toastMessage: e })
      return
    }

    setPatientsData((prevData) => ({
      ...prevData,
      [crypto.randomUUID()]: new Patient(historySerial),
    }))

    clearData()
  }, [historySerial, setPatientsData, clearData])

  const disabled = useMemo(() => !historySerial, [historySerial])

  return (
    <div className="flex flex-col gap-2 justify-center">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="number"
          min="0"
          step="1"
          placeholder="№ Истории"
          className="grow"
          onInput={(e) => setHistorySerial(e.currentTarget.valueAsNumber)}
          value={historySerial || ''}
          required
        />
        <HumanIcon />
      </label>

      <div className="flex items-center gap-x-2 pr-1.5">
        <Button
          buttonType={ButtonTypes.success}
          disabled={disabled}
          onClick={onSubmit}
          className="w-1/2"
        >
          Добавить
        </Button>

        <Button
          buttonType={ButtonTypes.error}
          onClick={clearData}
          disabled={disabled}
          className="w-1/2"
        >
          Очистить
        </Button>
      </div>
    </div>
  )
}

function ImportPatient() {
  const setPatients = useSetAtom(patientsDataStore)
  const [parsedResult, setParsedResult] = useState<Patient | null>(null)
  const onClick = useCallback(() => {
    if (!parsedResult) return

    const rand = crypto.randomUUID()
    console.log(rand)

    setPatients((prev) => ({
      ...prev,
      [rand]: parsedResult,
    }))
  }, [parsedResult])

  return (
    <div className="flex flex-col gap-2 justify-center">
      <input
        type="file"
        class="file-input file-input-bordered w-full"
        onInput={async (e) => {
          const file = e.currentTarget?.files?.[0]

          if (!file) {
            const e = 'Не получилось загрузить файл'
            handleError({ e, toastMessage: e })
            return
          }

          const data = await file.arrayBuffer()
          const workBook = read(data)
          const workSheet = workBook.Sheets[workBook.SheetNames[0]]
          const result = utils.sheet_to_json(workSheet)
          const parsedHistory = result[0] as { [title: string]: string }

          const serial = parsedHistory['№ Истории']

          if (!serial) {
            const e = 'Неправильный формат файла или нету номера истории'
            handleError({ e, toastMessage: e })
            return
          }

          console.log(parsedHistory)

          const newPatient = new Patient(Number(serial))
          for (const [title, value] of Object.entries(parsedHistory)) {
            // Iterate over Patient properties, find the field with a matching title
            for (const sectionKey in newPatient) {
              const section = newPatient[sectionKey as keyof Patient]
              if (section && typeof section === 'object') {
                // Iterate through each property in the section
                for (const fieldKey in section) {
                  const field = section[fieldKey as keyof typeof section]
                  if (
                    field &&
                    typeof field === 'object' &&
                    'title' in field &&
                    field.title === title
                  ) {
                    field.value = value
                    break
                  }
                }
              }
            }
          }

          setParsedResult(newPatient)
        }}
      />
      <Button
        buttonType={ButtonTypes.success}
        onClick={onClick}
        disabled={!parsedResult}
      >
        Загрузить
      </Button>
    </div>
  )
}

export default function () {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2">
      <Card dashedOutline>
        <AddPatientForm />
      </Card>
      <Card dashedOutline>
        <ImportPatient />
      </Card>
    </div>
  )
}
