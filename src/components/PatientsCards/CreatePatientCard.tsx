import { useAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'preact/hooks'
import Button from 'components/Button'
import Card from 'components/Card'
import HumanIcon from 'components/Icons/HumanIcon'
import nameToDataStore, { Patient } from 'atoms/patientsDataStore'

function AddPatientForm() {
  const [historySerial, setHistorySerial] = useState<number | undefined>()
  const [patientsData, setPatientsData] = useAtom(nameToDataStore)

  const clearData = useCallback(() => {
    setHistorySerial(undefined)
  }, [])

  const onSubmit = useCallback(() => {
    if (!historySerial) {
      console.error('No history serial')
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
          onChange={(e) => setHistorySerial(e.currentTarget.valueAsNumber)}
          value={historySerial || ''}
          required
        />
        <HumanIcon />
      </label>

      <div className="flex w-full items-center justify-between">
        <Button onSubmit={clearData} disabled={disabled}>
          Очистить
        </Button>

        <Button disabled={disabled} onSubmit={onSubmit} isGreen>
          Добавить
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
