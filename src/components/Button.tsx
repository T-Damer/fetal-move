import { PropsWithChildren } from 'preact/compat'

export default function ({
  children,
  disabled,
  isGreen,
  onSubmit,
}: PropsWithChildren & {
  disabled?: boolean
  onSubmit?: () => void
  isGreen?: boolean
}) {
  const colors = isGreen
    ? 'hover:enabled:bg-green-500 enabled:bg-green-700  enabled:border-0 enabled:text-white'
    : 'hover:bg-red-300 border-0 '

  return (
    <button
      className={`btn w-28 transition-all disabled:opacity-70 ${colors}`}
      onClick={onSubmit}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
