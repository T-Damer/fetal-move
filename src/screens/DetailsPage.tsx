import { navigate } from 'wouter-preact/use-hash-location'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import Button from 'components/Button'
import ButtonTypes from 'types/Button'
import DetailsHeader from 'components/DetailsHeader'
import ExtractedInputs from 'components/ExtractedInputs'
import NotFound from 'components/NotFound'
import OnInputChangeProps from 'types/OnInputChangeProps'
import Save from 'components/Icons/Save'
import Share from 'components/Icons/Share'
import handleError from 'helpers/handleError'
import patientsDataStore from 'atoms/patientsDataStore'
import saveObjectAsXlsx from 'helpers/saveObjectAsXlsx'
import ArrowUp from 'components/Icons/ArrowUp'
import scrollTop from 'helpers/scrollTop'

export default function ({ id }: { id: string }) {
  const [patientsData, setPatientsData] = useAtom(patientsDataStore)
  const currentPatient = patientsData[id]

  const deleteEntry = useCallback(() => {
    if (!currentPatient) {
      const e = 'Не удалось найти пациента при удалении 🤔'
      handleError({ e, toastMessage: e })
      return
    }

    delete patientsData[id]

    navigate('/birth-history')
    setPatientsData(patientsData)
  }, [currentPatient, id, patientsData, setPatientsData])

  const onChange = useCallback(
    ({ value, headerId, inputKey }: OnInputChangeProps) => {
      if (String(value).includes('\t')) {
        const e = 'Нельзя использовать tab, файл будет поврежден'
        handleError({ e, toastMessage: e })
        return
      }
      const subHeaderData =
        currentPatient[headerId as keyof typeof currentPatient]

      const updated = {
        ...currentPatient,
        [headerId]: {
          ...subHeaderData,
          [inputKey]: {
            ...subHeaderData[inputKey],
            value,
          },
        },
      }

      setPatientsData((prev) => ({
        ...prev,
        [id]: updated,
      }))
    },
    [currentPatient, id, setPatientsData]
  )

  const fileName = `ИР-${currentPatient.passport.historySerial.value}`

  const saveAndExport = useCallback(() => {
    saveObjectAsXlsx(fileName, currentPatient)
  }, [currentPatient, fileName])

  if (!currentPatient) return <NotFound />

  return (
    <div className="flex flex-col gap-x-2">
      <DetailsHeader deleteEntry={deleteEntry} />

      <ExtractedInputs currentPatient={currentPatient} onChange={onChange} />

      <div className="flex flex-row w-full gap-x-2 sticky bottom-safe-bottom z-20 print:hidden drop-shadow-md">
        <Button
          buttonType={ButtonTypes.success}
          onClick={saveAndExport}
          className="w-2/3"
          iconRight={<Save />}
        >
          Сохранить
        </Button>

        <Button
          buttonType={ButtonTypes.success}
          onClick={scrollTop}
          className="w-1/3"
        >
          <ArrowUp />
        </Button>
      </div>
    </div>
  )
}
