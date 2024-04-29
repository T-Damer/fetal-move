import { atomWithStorage } from 'jotai/utils'

type DatePreprocess = (someDate: number | string) => string
const datePreprocess = (someDate: number | string) => String(new Date(someDate))

export type PlainInputObject = {
  value: number | string
  title: string
  preprocess?: DatePreprocess
}

type Header = { header: string }
type PassportData = {
  historySerial: { value: number; title: string }
  receiptDate?: {
    value: number
    preprocess: DatePreprocess
    title: string
  }
  dischargeDate?: {
    value: number
    preprocess: DatePreprocess
    title: string
  }
}
type GynecologyData = {
  mensesFrom: { value: number; title: string }
  lastMenses: { value: number; title: string }
  sexFrom: { value: number; title: string }
}
type ObstetricData = {
  numberOfPregnancies: { value: number; title: string }
}

export type AvailableInputKeys = keyof PassportData &
  keyof GynecologyData &
  keyof ObstetricData

export class Patient {
  passport: Header & PassportData
  gynecology: Header & GynecologyData
  obstetric: Header & ObstetricData
  pregnancy: Header
  birth: Header
  birthAnomalies: Header
  afterbirth: Header
  newborn: Header
  generalBloodTest: Header
  bloodBiochemistry: Header
  urine: Header
  smear: Header
  ultrasound1: Header
  ultrasound2: Header
  ultrasound3: Header
  ultrasound4: Header

  constructor(historySerial: number) {
    this.passport = {
      header: 'Паспортная часть',
      historySerial: { value: historySerial, title: '№ Истории' },
      receiptDate: {
        value: 0,
        preprocess: datePreprocess,
        title: 'Дата поступления',
      },
      dischargeDate: {
        value: 0,
        preprocess: datePreprocess,
        title: 'Дата выписки',
      },
    }

    this.gynecology = {
      header: 'Гинекологический анамнез',
      mensesFrom: { value: 0, title: 'Менструации с' },
      lastMenses: { value: 0, title: 'Дата последней менструации' },
      sexFrom: { value: 0, title: 'Половая жизнь с (лет)' },
    }
    this.obstetric = {
      header: 'Акушерский анамнез',
      numberOfPregnancies: { value: 0, title: 'Количество беременностей' },
    }
    this.pregnancy = { header: 'Настоящая беременность' }
    this.birth = { header: 'Роды' }
    this.birthAnomalies = { header: 'Аномалии родовой деятельности' }
    this.afterbirth = { header: 'Послед' }
    this.newborn = { header: 'Новорожденный' }
    this.generalBloodTest = { header: 'Общий анализ крови (ОАК)' }
    this.bloodBiochemistry = { header: 'Биохимия крови' }
    this.urine = { header: 'Моча' }
    this.smear = { header: 'Мазок' }
    this.ultrasound1 = { header: 'УЗИ-1 (4-15)' }
    this.ultrasound2 = { header: 'УЗИ-2 (16-25)' }
    this.ultrasound3 = { header: 'УЗИ-3 (28-35)' }
    this.ultrasound4 = { header: 'УЗИ-4 (36-40)' }
  }
}

export type AvailableSections = keyof Patient

interface PatientsDataStore {
  [id: string]: Patient
}

export default atomWithStorage<PatientsDataStore>('patientsData', {})
