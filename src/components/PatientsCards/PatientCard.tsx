import { useCallback } from 'preact/hooks'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Card from 'components/Card'
import Button from 'components/Button'
import patientsDataStore from 'atoms/patientsDataStore'
import { useAtom, useAtomValue } from 'jotai'
import handleError from 'helpers/handleError'
import scrollTop from 'helpers/scrollTop'

export default function ({
  id,
  historySerial,
}: {
  id: string
  historySerial: number
}) {
  const [patients, setPatients] = useAtom(patientsDataStore)
  const [, setLocation] = useHashLocation()

  const onPress = useCallback(() => {
    setLocation(`/patient/${id}`)
    scrollTop()
  }, [id, setLocation])

  const onCopy = useCallback(() => {
    const currentPatient = patients[id]

    if (!currentPatient) {
      const e = 'Пациент не найден'
      handleError({ e, toastMessage: e })
      return
    }

    setPatients((prev) => ({
      ...prev,
      [crypto.randomUUID()]: currentPatient,
    }))
  }, [patients])

  return (
    <Card>
      <div className="flex flex-col justify-between overflow-hidden w-full">
        <div className="flex-1 flex flex-col" onClick={onPress}>
          <span className="font-bold truncate-2 leading-snug">
            {historySerial}
          </span>
          <span className="text-[#00000080] dark:text-[#FFFFFF80] truncate">
            {id}
          </span>
        </div>
        <Button alt="Копировать" onClick={onCopy} className="w-full">
          Копировать
        </Button>
      </div>
    </Card>
  )
}
