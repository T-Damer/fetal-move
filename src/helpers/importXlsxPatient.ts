import Patient from 'types/Patient'
import { read, utils } from 'xlsx'
import handleError from './handleError'
import { JSXInternal } from 'preact/src/jsx'

export default async function (
  e: JSXInternal.TargetedInputEvent<HTMLInputElement>
) {
  const file = e.currentTarget?.files?.[0]

  if (!file) {
    const e = 'Не получилось загрузить файл'
    handleError({ e, toastMessage: e })
    return
  }

  const data = await file.arrayBuffer()
  const workBook = read(data)
  const workSheet = workBook.Sheets[workBook.SheetNames[0]]
  const result = utils.sheet_to_json(workSheet)
  const parsedHistory = result[0] as { [title: string]: string }

  const serial = parsedHistory['№ Истории']

  if (!serial) {
    const e = 'Неправильный формат файла или нету номера истории'
    handleError({ e, toastMessage: e })
    return
  }

  const newPatient = new Patient(Number(serial))
  for (const [title, value] of Object.entries(parsedHistory)) {
    // Iterate over Patient properties, find the field with a matching title
    for (const sectionKey in newPatient) {
      const section = newPatient[sectionKey as keyof Patient]

      if (section && typeof section === 'object') {
        for (const fieldKey in section) {
          const field = section[fieldKey]
          if ('title' in field && field.title === title) {
            field.value = value
            break
          }
        }
      }
    }
  }

  return newPatient
}
