import { useAtomValue } from 'jotai'
import PatientCard from 'components/PatientsCards/PatientCard'
import patientsDataStore from 'atoms/patientsDataStore'

export default function ({ search }: { search?: string }) {
  const patients = useAtomValue(patientsDataStore)

  const cards = Object.entries(patients)
    .reverse()
    .map(([id, data], index) => {
      if (
        !search ||
        String(data.passport.historySerial.value)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return (
          <PatientCard
            id={id}
            historySerial={data.passport.historySerial.value}
            key={index}
          />
        )
    })

  return <>{cards}</>
}
