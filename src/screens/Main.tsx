import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useState } from 'preact/hooks'
import CreatePatientCard from 'components/Recordings/StartRecording'
import PatientCardList from 'components/Recordings/RecordsHistoryList'
import SearchBar from 'components/SearchBar'

export default function () {
  const [parentRef] = useAutoAnimate()
  const [search, setSearch] = useState('')

  return (
    <div>
      <h1>🤰 Fet</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-wrap" ref={parentRef}>
        <CreatePatientCard />
        <PatientCardList search={search} />
      </div>
    </div>
  )
}
