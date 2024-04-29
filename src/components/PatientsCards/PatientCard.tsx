import { navigate } from 'wouter-preact/use-browser-location'
import { useCallback } from 'preact/hooks'
import Card from 'components/Card'

export default function ({
  id,
  historySerial,
}: {
  id: string
  historySerial: number
}) {
  const onPress = useCallback(() => {
    navigate(`/birth-history/patient/${id}`)
  }, [id])

  return (
    <Card onPress={onPress}>
      <div className="flex flex-col justify-center">
        <span className="font-bold truncate-2 leading-snug">
          {historySerial}
        </span>
      </div>
    </Card>
  )
}
