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
  inputType,
}: {
  input: CommonContent
  onChange: OnChange
  inputType: 'date' | 'string' | 'number'
}) {
  const value = input.preprocess?.(input.value) || input.value

  if ('options' in input)
    return (
      <select
        class="select select-bordered select-xs "
        value={value}
        onChange={(e) =>
          onChange({ currentTarget: { value: e.currentTarget.value } })
        }
      >
        {input.options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    )

  if (inputType === 'date')
    return <DateInput value={value} onChange={onChange} />

  return (
    <input
      value={input.preprocess ? String(new Date()) : value}
      min="0"
      type={inputType}
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

        const inputType = input.preprocess
          ? 'date'
          : typeof input.value === 'number'
            ? 'number'
            : 'string'

        return (
          <label class="form-control w-full my-2">
            <b>{input.title}</b>
            <ProcessedInput
              input={input}
              onChange={({ currentTarget }) =>
                onChange({
                  value:
                    inputType === 'date'
                      ? currentTarget.valueAsDate
                      : inputType === 'number'
                        ? currentTarget.valueAsNumber
                        : currentTarget.value,
                  headerId,
                  inputKey,
                })
              }
              inputType={inputType}
            />
          </label>
        )
      })}
    </>
  ))

  return <>{elements}</>
}
