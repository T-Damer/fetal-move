import Button from 'components/Button'
import ButtonTypes from 'types/Button'
import TrashBin from 'components/Icons/TrashBin'
import goMain from 'helpers/goMain'

export default function ({ deleteEntry }: { deleteEntry: () => void }) {
  return (
    <div className="flex justify-between items-center print:hidden">
      <Button onClick={goMain}>◄</Button>

      <Button buttonType={ButtonTypes.error} onClick={deleteEntry}>
        <TrashBin />
      </Button>
    </div>
  )
}
