import Recording from 'types/Recording'
import { utils, WorkBook, write } from 'xlsx'
import { saveAs } from 'file-saver'

const fileExtension = '.xlsx'
const empty = '-'

function calculateDuration(start: string, end?: string): string {
  if (!end) return empty
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffMs = endDate.getTime() - startDate.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  return `${diffMins} минут`
}

function createWorksheetForRecording(recording: Recording) {
  const worksheetData = [
    ['Поле', 'Значение'],
    ['Время начала', recording.startTime],
    ['Время конца', recording.endTime || empty],
    ['Длительность', calculateDuration(recording.startTime, recording.endTime)],
    ['Описание мамы', recording.description || empty],
  ]
  return utils.aoa_to_sheet(worksheetData)
}

function createXlsxBlob(data: Recording[]) {
  const workBook: WorkBook = {
    Sheets: {},
    SheetNames: [],
  }

  data.forEach((recording, index) => {
    const sheetName = `Запись ${index + 1}`
    workBook.Sheets[sheetName] = createWorksheetForRecording(recording)
    workBook.SheetNames.push(sheetName)
  })

  const excelBuffer = write(workBook, { bookType: 'xlsx', type: 'array' })
  return new Blob([excelBuffer], { type: 'application/octet-stream' })
}

export default function exportToXlsx(fileName: string, data: Recording[]) {
  const blob = createXlsxBlob(data)
  saveAs(blob, fileName + fileExtension)
}
