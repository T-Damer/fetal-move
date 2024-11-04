import { useCallback } from 'preact/hooks'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Card from 'components/Card'

export default function ({
  id,
  historySerial,
}: {
  id: string
  historySerial: number
}) {
  const [, setLocation] = useHashLocation()

  const onPress = useCallback(() => {
    setLocation(`/patient/${id}`)
  }, [id, setLocation])

  return (
    <Card onPress={onPress}>
      <div className="flex flex-col justify-center overflow-hidden">
        <span className="font-bold truncate-2 leading-snug">
          {historySerial}
        </span>
        <span className="text-gray-200 truncate">{id}</span>
      </div>
    </Card>
  )
}
