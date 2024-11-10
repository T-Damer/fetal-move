import Patient, { CommonContent } from 'types/Patient'

// before converting we need only: title and value, no need for header, keys and stuff
// Store as:
// title1, title2
// value1, value2

export default function (dataObjToWrite: Patient) {
  // parse like this:
  const titles: string[] = []
  const values: string[] = []

  Object.keys(dataObjToWrite).forEach((headerId) => {
    Object.values(dataObjToWrite[headerId as keyof Patient]).forEach((data) => {
      const { title, value } = data as CommonContent
      if (!title) return
      const safeValue = value || '-'

      titles.push(title)
      values.push(String(safeValue))
    })
  })

  return {
    titles,
    values,
    plainString: titles.join('\t') + '\n' + values.join('\t'),
  }
}
