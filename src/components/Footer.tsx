export default function () {
  const href = 'https://github.com/T-Damer'

  return (
    <footer className="flex flex-1 h-full justify-center items-end w-full mt-2">
      <span>
        Made by{' '}
        <a href={href} target="_blank">
          T-Damer
        </a>{' '}
        <b>Σ</b> {new Date().getFullYear()}
      </span>
    </footer>
  )
}
