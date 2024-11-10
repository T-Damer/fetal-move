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
  const [fileReady, setFileReady] = useState<boolean>(false)
  const onClick = useCallback(() => {}, [])

  return (
    <div className="flex flex-col gap-2 justify-center">
      <input
        type="file"
        class="file-input file-input-bordered w-full"
        onInput={(e) => {
          const file = e.currentTarget?.files?.[0]

          if (!file) {
            const e = 'Не получилось загрузить файл'
            handleError({ e, toastMessage: e })
            return
          }

          const reader = new FileReader()
          reader.onload = (event) => {
            const data = event.target?.result
            const workbook = read(data, {
              type: 'array',
            })

            const name = workbook.SheetNames[0]
            console.log(workbook.Sheets[name])
            console.log(workbook.Sheets[name]['A1'])

            const sheetData = utils.sheet_to_json(workbook.Sheets[name], {
              header: 1,
              defval: '-',
            })

            console.log(sheetData)
          }
          reader.onerror = (e) => {
            handleError({ e, toastMessage: 'Ошибка загрузки файла 💾' })
          }
          reader.readAsDataURL(file)
          setFileReady(true)
        }}
      />
      <Button
        buttonType={ButtonTypes.success}
        onClick={onClick}
        disabled={!fileReady}
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
    </div>
  )
}
