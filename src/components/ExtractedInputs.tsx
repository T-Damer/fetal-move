import { CommonContent, Patient } from 'atoms/patientsDataStore'
import { OnChange } from 'types/FormEvent'
import { OnChangeInput } from 'types/OnInputChangeProps'
import DateInput from 'components/DateInput'

interface ExtractedInputsProps {
  currentPatient: Patient
  onChange: OnChangeInput
}

function ProcessedInput({
  input,
  onChange,
}: {
  input: CommonContent
  onChange: OnChange
}) {
  const { options, value, type } = input

  if (options)
    return (
      <select
        class="select select-bordered select-xs "
        value={value}
        onChange={(e) =>
          onChange({ currentTarget: { value: e.currentTarget.value } })
        }
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    )

  if (type === 'date') return <DateInput value={value} onChange={onChange} />

  return (
    <input
      value={value}
      min="0"
      type={type}
      onChange={onChange}
      placeholder={input.placeholder || '---'}
      className={`placeholder-gray-300 border-b-gray-300 w-full border-b-2 border-dotted`}
    >
      {value}
    </input>
  )
}

export default function ({ currentPatient, onChange }: ExtractedInputsProps) {
  const elements = Object.entries(currentPatient).map(([headerId, data]) => (
    <>
      <h2 id={headerId} className="underline text-right">
        {data.header}
      </h2>
      {Object.entries(data).map(([inputKey, inputValue]) => {
        const input = inputValue as CommonContent

        if (!input?.title) return null
        const { type } = input

        return (
          <label class="form-control w-full my-2">
            <b>{input.title}</b>
            <ProcessedInput
              input={input}
              onChange={({ currentTarget }) =>
                onChange({
                  value:
                    type === 'date'
                      ? currentTarget.value
                      : type === 'number'
                        ? currentTarget.valueAsNumber
                        : currentTarget.value,
                  headerId,
                  inputKey,
                })
              }
            />
          </label>
        )
      })}
    </>
  ))

  return <>{elements}</>
}
