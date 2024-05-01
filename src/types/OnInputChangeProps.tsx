export default interface OnInputChangeProps {
  value: string | number | Date | null | undefined
  headerId: string
  inputKey: string
}

export type OnChangeInput = (props: OnInputChangeProps) => void
