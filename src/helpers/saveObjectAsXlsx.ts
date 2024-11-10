import Patient from 'types/Patient'
import { utils, WorkBook, write } from 'xlsx'
import constructCsv from './constructCsv'
import { saveAs } from 'file-saver'

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const fileExtension = '.xlsx'
export const sheetName = 'data'

function createXlsxBlob(data: Patient) {
  const { titles, values } = constructCsv(data)
  const workSheet = utils.aoa_to_sheet([titles, values])
  const workBook: WorkBook = {
    Sheets: { data: workSheet },
    SheetNames: [sheetName],
  }
  const excelBuffer = write(workBook, { bookType: 'xlsx', type: 'array' })
  return { blob: new Blob([excelBuffer], { type: fileType }) }
}

export default function (fileName: string, data: Patient) {
  const { blob } = createXlsxBlob(data)

  saveAs(blob, fileName + fileExtension)
}
