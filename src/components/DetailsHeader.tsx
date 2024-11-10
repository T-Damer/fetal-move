import Button from 'components/Button'
import ButtonTypes from 'types/Button'
import TrashBin from 'components/Icons/TrashBin'
import goMain from 'helpers/goMain'
import ArrowLeft from './Icons/ArrowLeft'

export default function ({ deleteEntry }: { deleteEntry: () => void }) {
  return (
    <div className="flex justify-between items-center print:hidden">
      <Button onClick={goMain}>
        <ArrowLeft />
      </Button>

      <Button buttonType={ButtonTypes.error} onClick={deleteEntry}>
        <TrashBin />
      </Button>
    </div>
  )
}
