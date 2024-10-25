// before converting we need only: title and value, no need for header, keys and stuff
// Store as:
// title1, title2
// value1, value2

import {
  AvailableInputKeys,
  CommonContent,
  Patient,
} from 'atoms/patientsDataStore'

function constructCsv(dataObjToWrite: Patient) {
  // parse like this:
  const titles: string[] = []
  const values: string[] = []

  Object.keys(dataObjToWrite).forEach((headerId) => {
    Object.values(dataObjToWrite[headerId as AvailableInputKeys]).forEach(
      (data) => {
        const { title, value } = data as CommonContent
        if (!title) return
        const safeValue = value || '-'

        titles.push(title)
        values.push(String(safeValue))
      }
    )
  })

  return titles.join(',') + '\n' + values.join(',')
}

export async function shareFile(filename: string, dataObjToWrite: Patient) {
  const csv = constructCsv(dataObjToWrite)
  const blob = new File([csv], filename, { type: 'text/csv' })

  await navigator.share({ title: filename, files: [blob] })
}

export default function (filename: string, dataObjToWrite: Patient) {
  const csv = constructCsv(dataObjToWrite)
  const blob = new Blob([csv], { type: 'text/csv' })
  const link = document.createElement('a')

  link.download = filename
  link.href = window.URL.createObjectURL(blob)
  link.dataset['downloadurl'] = ['text/csv', link.download, link.href].join(':')

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  link.dispatchEvent(evt)
  link.remove()
}
