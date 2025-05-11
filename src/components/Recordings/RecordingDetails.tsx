import { useCallback } from 'preact/hooks'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Card from 'components/Card'
import scrollTop from 'helpers/scrollTop'
import toLocalTime from 'helpers/toLocalTime'

export default function ({
  id,
  startTime,
  endTime,
}: {
  id: string
  startTime: string
  endTime: string | undefined
}) {
  const [, setLocation] = useHashLocation()

  const onPress = useCallback(() => {
    setLocation(`/record/${id}`)
    scrollTop()
  }, [id, setLocation])

  return (
    <Card>
      <div className="flex-1 flex flex-col" onClick={onPress} id={id}>
        <span className="font-bold truncate-2 leading-snug">
          {toLocalTime(startTime)}
        </span>
        {endTime ? (
          <span className="font-bold truncate-2 leading-snug">
            {toLocalTime(endTime)}
          </span>
        ) : null}
      </div>
    </Card>
  )
}
