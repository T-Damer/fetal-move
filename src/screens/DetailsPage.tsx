import { navigate } from 'wouter-preact/use-browser-location'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import nameToBirthDateStorage from 'atoms/nameToBirthDateStorage'

export default function ({ name }: { name: string }) {
  const [patientsData, setPatientsData] = useAtom(nameToBirthDateStorage)
  const birthDate = patientsData[name]

  const birth = new Date(birthDate)

  const deleteEntry = useCallback(() => {
    if (!patientsData[name]) {
      console.error('cant find the patient while deleting')
      return
    }

    delete patientsData[name]

    navigate('/birth-history')
    setPatientsData(patientsData)
  }, [name, patientsData, setPatientsData])

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
      <span>Name: {name}</span>
      <span>Birth date: {birth.toLocaleDateString()}</span>
    </div>
  )
}
