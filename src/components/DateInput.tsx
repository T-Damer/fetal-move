import { useRef, useState } from 'preact/hooks'
import CalendarIcon from 'components/Icons/CalendarIcon'

export default function () {
  const dateInputRef = useRef<HTMLInputElement | null>(null)
  const [birthDate, setBirthDate] = useState('')

  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        className="grow"
        value={birthDate}
        onChange={(e) => setBirthDate(e.currentTarget.value)}
        type="date"
        placeholder="Birth Date"
        ref={dateInputRef}
        required
      />
      <CalendarIcon onPress={() => dateInputRef.current?.showPicker()} />
    </label>
  )
}
