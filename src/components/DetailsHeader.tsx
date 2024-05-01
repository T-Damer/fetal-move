import goMain from 'helpers/goMain'

export default function ({ deleteEntry }: { deleteEntry: () => void }) {
  return (
    <div className="flex justify-between items-center">
      <a
        onClick={goMain}
        className="cursor-pointer hover:opacity-50 transition-opacity"
      >
        ◄ Назад
      </a>

      <a className="text-red-400 cursor-pointer" onClick={deleteEntry}>
        Удалить
      </a>
    </div>
  )
}
