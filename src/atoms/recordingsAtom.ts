import { atomWithStorage } from 'jotai/utils'
import Recording from 'types/Recording'

interface RecordingsStore {
  [id: string]: Recording
}

export default atomWithStorage<RecordingsStore>(
  'recordings-data',
  {},
  undefined,
  {
    getOnInit: true,
  }
)
