export default function toLocalTime(time: string) {
  const date = new Date(time)
  const localTime = date.toLocaleTimeString()
  const localDate = date.toLocaleDateString()
  return localTime + ' - ' + localDate
}
