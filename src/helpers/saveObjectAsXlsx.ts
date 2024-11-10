import Patient from 'types/Patient'
import { utils, WorkBook, write } from 'xlsx'
import constructCsv from './constructCsv'
import { saveAs } from 'file-saver'

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const fileExtension = '.xlsx'

function createXlsxBlob(data: Patient) {
  const { titles, values } = constructCsv(data)
  const workSheet = utils.aoa_to_sheet([titles, values])
  const workBook: WorkBook = {
    Sheets: { data: workSheet, cols: [] },
    SheetNames: ['data'],
  }
  const excelBuffer = write(workBook, { bookType: 'xlsx', type: 'array' })
  return new Blob([excelBuffer], { type: fileType })
}

export async function shareXlsx(fileName: string, data: Patient) {
  const fileData = createXlsxBlob(data)
  const file = new File([fileData], fileName, { type: fileType })

  await navigator.share({ title: fileName, files: [file] })
}

export default function (fileName: string, data: Patient) {
  const fileData = createXlsxBlob(data)

  saveAs(fileData, fileName + fileExtension)
}
