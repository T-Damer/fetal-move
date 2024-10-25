import { useAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'preact/hooks'
import Button from 'components/Button'
import ButtonTypes from 'types/Button'
import Card from 'components/Card'
import HumanIcon from 'components/Icons/HumanIcon'
import Patient from 'types/Patient'
import handleError from 'helpers/handleError'
import nameToDataStore from 'atoms/patientsDataStore'

function AddPatientForm() {
  const [historySerial, setHistorySerial] = useState<number | undefined>()
  const [patientsData, setPatientsData] = useAtom(nameToDataStore)

  const clearData = useCallback(() => {
    setHistorySerial(undefined)
  }, [])

  const onSubmit = useCallback(() => {
    if (!historySerial) {
      const e = 'Нет серийного номера истории'
      handleError({ e, toastMessage: e })
      return
    }

    if (
      Object.entries(patientsData).find(
        ([, data]) => historySerial === data.passport.historySerial.value
      )
    ) {
      alert('Такой номер уже существует\nПожалуйста используйте другой')
      return
    }

    setPatientsData((prevData) => ({
      ...prevData,
      [crypto.randomUUID()]: new Patient(historySerial),
    }))

    clearData()
  }, [historySerial, patientsData, setPatientsData, clearData])

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

export default function () {
  return (
    <Card dashedOutline>
      <AddPatientForm />
    </Card>
  )
}
