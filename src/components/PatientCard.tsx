import { navigate } from 'wouter-preact/use-browser-location'
import { useCallback } from 'preact/hooks'
import Card from 'components/Card'
import PatientData from 'types/PatientData'

export default function ({ name, birthDate }: PatientData) {
  const onPress = useCallback(() => {
    navigate(`/birth-history/patient/${name}`)
  }, [name])

  return (
    <Card onPress={onPress}>
      <div className="flex flex-col justify-center">
        <span className="font-bold truncate-2 leading-snug">{name}</span>
        <span>{new Date(birthDate).toLocaleDateString()}</span>
      </div>
    </Card>
  )
}
