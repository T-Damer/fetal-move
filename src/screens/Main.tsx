import { useAtomValue } from 'jotai'
import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useState } from 'preact/hooks'
import CreatePatientCard from 'components/CreatePatientCard'
import CrossIcon from 'components/CrossIcon'
import PatientCard from 'components/PatientCard'
import SearchIcon from 'components/SearchIcon'
import nameToBirthDateStorage from 'atoms/nameToDataStore'

export default function () {
  const patients = useAtomValue(nameToBirthDateStorage)
  const [parentRef] = useAutoAnimate()
  const [search, setSearch] = useState('')

  return (
    <div>
      <h1>🍼 Birth history</h1>
      <label className="input input-bordered flex items-center gap-2 m-1">
        <input
          type="text"
          className="grow"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {search ? <CrossIcon onPress={() => setSearch('')} /> : <SearchIcon />}
      </label>
      <div className="flex flex-wrap" ref={parentRef}>
        <CreatePatientCard />
        {Object.entries(patients)
          .reverse()
          .map(([name, data], index) => {
            if (!search || name.toLowerCase().includes(search.toLowerCase()))
              return (
                <PatientCard
                  name={name}
                  birthDate={data['Birth Date']}
                  key={index}
                />
              )
          })}
      </div>
    </div>
  )
}
