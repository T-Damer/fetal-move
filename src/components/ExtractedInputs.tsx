import { OnChange } from 'types/FormEvent'
import { OnChangeInput } from 'types/OnInputChangeProps'
import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useState } from 'preact/hooks'
import DateInput from 'components/DateInput'
import Patient, { CommonContent } from 'types/Patient'

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
        onInput={(e) =>
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
      className="placeholder:text-opacity-30 placeholder:text-slate-500 input input-bordered"
      placeholder={input.placeholder || '---'}
      {...input}
    >
      {value}
    </input>
  )
}

export default function ({ currentPatient, onChange }: ExtractedInputsProps) {
  const elements = Object.entries(currentPatient).map(([headerId, data]) => {
    const [parent] = useAutoAnimate()
    const [collapsed, setCollapsed] = useState(false)

    return (
      <>
        <h2
          id={headerId}
          className="text-right hover:opacity-70 active:opacity-50 transition-opacity cursor-pointer"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {data.header.value} {collapsed ? '+' : '-'}
        </h2>
        <section ref={parent}>
          {collapsed
            ? null
            : Object.entries(data).map(([inputKey, inputValue], index) => {
                const input = inputValue as CommonContent

                if (!index || !input?.title) return null
                const { type = 'string' } = input

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
        </section>
      </>
    )
  })

  return <>{elements}</>
}
