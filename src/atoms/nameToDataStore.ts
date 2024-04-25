import { atomWithStorage } from 'jotai/utils'

interface NameToData {
  [name: string]: { ['Birth Date']: number; id: string }
}

export default atomWithStorage<NameToData>('nameToData', {})
