import { atomWithStorage } from 'jotai/utils'

const options = [0, 1]

type PlainValue = number | string | undefined
type DatePreprocess = (someDate: PlainValue) => string | undefined
const datePreprocess = (someDate: PlainValue) =>
  someDate ? String(new Date(someDate)) : undefined

type InputObject = {
  value: PlainValue
  title: string
  placeholder?: string
  fullWidth?: boolean
}
type Preprocess = { preprocess: DatePreprocess }
type NumberOptions = { options: number[] }

export type CommonContent = InputObject & Partial<NumberOptions & Preprocess>

type Header = { header: string }
type PassportData = {
  historySerial: { value: number; title: string }
  receiptDate: InputObject & Preprocess
  dischargeDate: InputObject & Preprocess
  admissionDiagnosis: InputObject
  dateClinicalDiagnosis1: InputObject & Preprocess
  clinicalDiagnosis1: InputObject
  dateClinicalDiagnosis2: InputObject & Preprocess
  clinicalDiagnosis2: InputObject
  dateFinalDiagnosis: InputObject & Preprocess
  finalDiagnosis: InputObject
  age: InputObject
  bloodType: InputObject & NumberOptions
  Rh: InputObject & NumberOptions
  height: InputObject
  worksAt: InputObject
  livingConditions: InputObject & NumberOptions
  badHabits: InputObject & NumberOptions
  drugs: InputObject & NumberOptions
  address: InputObject
  complicatedSomaticHistory: InputObject
  complicatedGynecologyHistory: InputObject
  complicatedObstetricsHistory: InputObject & NumberOptions
  allergy: InputObject & NumberOptions
  genetics: InputObject & NumberOptions
}
type GynecologyData = {
  mensesFrom: InputObject
  lastMenses: InputObject & Preprocess
  sexFrom: InputObject
}
type ObstetricData = {
  numberOfPregnancies: InputObject
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
      admissionDiagnosis: {
        value: '',
        title: 'Диагноз при поступлении',
        placeholder: 'Б 30-31 нед, гес. ХВГП. Дифф.токс.зоб',
      },
      dateClinicalDiagnosis1: {
        value: 0,
        preprocess: datePreprocess,
        title: 'Дата первого клинического диагноза',
      },
      clinicalDiagnosis1: {
        value: '',
        title: 'Первый клинический дагноз',
        placeholder:
          'Б 30-31 нед, гес. ХВГП. ОСА (хр.пиелонеф) Дифф.токс.зоб.ОГА (НМЦ,эндометриоз)',
      },
      dateClinicalDiagnosis2: {
        value: 0,
        preprocess: datePreprocess,
        title: 'Дата второго клинического диагноза',
      },
      clinicalDiagnosis2: {
        value: '',
        title: 'Второй клинический диагноз',
        placeholder:
          'Роды 2,срочные,патологические.рубцовая деформация ш/м ХФПН.ХВГП.Гестоз(о),ср.ст.тяж',
      },
      dateFinalDiagnosis: {
        value: 0,
        preprocess: datePreprocess,
        title: 'Дата заключительного диагноза',
      },
      finalDiagnosis: {
        value: '',
        title: 'Заключительный диагноз',
        placeholder:
          'Р1,преждев,31 нед,пат, путем кес.сеч., гес. ХВГП. Дифф.токс.зоб',
      },
      age: {
        value: 0,
        title: 'Возраст',
      },
      bloodType: {
        value: 1,
        options: [1, 2, 3, 4],
        title: 'Группа крови',
      },
      Rh: {
        value: 0,
        options,
        title: 'Резус фактор',
      },
      height: {
        value: 0,
        title: 'Рост',
      },
      worksAt: {
        value: '',
        title: 'Работа',
        placeholder: 'преподаватель',
      },
      livingConditions: {
        value: 0,
        options,
        title: 'Социально-бытовые условия',
      },
      badHabits: {
        value: 0,
        options,
        title: 'Вредные привычки',
      },
      drugs: {
        value: 0,
        options,
        title: 'Лекарства',
      },
      address: {
        value: '',
        title: 'Адрес',
        placeholder: 'Воронеж, Коминтер. р-он. ул. Победы д.0. кв. 0',
      },
      complicatedSomaticHistory: {
        value: '',
        placeholder:
          'ОРВИ, грипп, ангины, 1977-операция на баталловом протоке, хр.гастрит',
        title: 'Отягощенный Соматический Анамнез (ОСА)',
      },
      complicatedGynecologyHistory: {
        value: '',
        placeholder: 'эрозия шейки матки',
        title: 'Отягощенный Гинекологический Анамнез (ОГА)',
      },
      complicatedObstetricsHistory: {
        value: 0,
        options,
        title: 'Отягощенный Акушерский Анамнез (ОАА)',
      },
      allergy: {
        value: 0,
        options,
        title: 'Аллергологический анамнез',
      },
      genetics: {
        value: 0,
        options,
        title: 'Генетические заболевания в семье',
      },
    }

    this.gynecology = {
      header: 'Гинекологический анамнез',
      mensesFrom: { value: 0, title: 'Менструации с (лет)' },
      lastMenses: {
        value: 0,
        preprocess: datePreprocess,
        title: 'Дата последней менструации',
      },
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
