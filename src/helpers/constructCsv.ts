import Recording from 'types/Recording'

// before converting we need only: title and value, no need for header, keys and stuff
// Store as:
// title1, title2
// value1, value2

export default function (dataObjToWrite: Recording[]) {
  // parse like this:
  const titles: string[] = []
  const values: string[] = []

  dataObjToWrite.forEach((record) => {
    Object.entries(record).forEach(([key, value]) => {
      titles.push(key)
      values.push(value)
    })
  })

  return {
    titles,
    values,
    plainString: titles.join('\t') + '\n' + values.join('\t'),
  }
}
