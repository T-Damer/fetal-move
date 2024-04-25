import { navigate } from 'wouter-preact/use-browser-location'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import nameToDataStore from 'atoms/nameToDataStore'

export default function ({ name }: { name: string }) {
  const [patientsData, setPatientsData] = useAtom(nameToDataStore)
  const currentPatient = patientsData[name]

  const deleteEntry = useCallback(() => {
    if (!currentPatient) {
      console.error('cant find the patient while deleting')
      return
    }

    delete patientsData[name]

    navigate('/birth-history')
    setPatientsData(patientsData)
  }, [currentPatient, name, patientsData, setPatientsData])

  return (
    <div className="flex flex-col gap-x-2">
      <div className="flex justify-between items-center">
        <a
          onClick={() => navigate('/birth-history')}
          className="cursor-pointer hover:opacity-50 transition-opacity"
        >
          ◄ Go back
        </a>

        <a className="text-red-400 cursor-pointer" onClick={deleteEntry}>
          Delete
        </a>
      </div>
      {Object.entries(currentPatient).map(([entryName, data]) => (
        <span>
          {entryName}: {data}
        </span>
      ))}
    </div>
  )
}
