import { atomWithStorage } from 'jotai/utils'

const options = [0, 1]

// we can't store Date in localstore, it will convert into string
// so we use string types from <input type="" />
// string is default, so we don define it
export type InputType = 'number' | 'date' | 'string'
export type PlainValue = number | string | undefined
type InputObject = {
  value?: PlainValue
  title: string
  placeholder?: string
  type?: InputType
}
type NumberOptions = { options: number[] }

export type CommonContent = InputObject & Partial<NumberOptions>

type Header = { header: string }
type PassportData = {
  historySerial: { value: number; type: InputType; title: string }
  receiptDate: InputObject
  dischargeDate: InputObject
  admissionDiagnosis: InputObject
  dateClinicalDiagnosis1: InputObject
  clinicalDiagnosis1: InputObject
  dateClinicalDiagnosis2: InputObject
  clinicalDiagnosis2: InputObject
  dateFinalDiagnosis: InputObject
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
  lastMenses: InputObject
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
      historySerial: {
        value: historySerial,
        type: 'number',
        title: '№ Истории',
      },
      receiptDate: {
        type: 'date',
        title: 'Дата поступления',
      },
      dischargeDate: {
        type: 'date',
        title: 'Дата выписки',
      },
      admissionDiagnosis: {
        title: 'Диагноз при поступлении',
        placeholder: 'Б 30-31 нед, гес. ХВГП. Дифф.токс.зоб',
      },
      dateClinicalDiagnosis1: {
        type: 'date',
        title: 'Дата первого клинического диагноза',
      },
      clinicalDiagnosis1: {
        title: 'Первый клинический дагноз',
        placeholder:
          'Б 30-31 нед, гес. ХВГП. ОСА (хр.пиелонеф) Дифф.токс.зоб.ОГА (НМЦ,эндометриоз)',
      },
      dateClinicalDiagnosis2: {
        type: 'date',
        title: 'Дата второго клинического диагноза',
      },
      clinicalDiagnosis2: {
        title: 'Второй клинический диагноз',
        placeholder:
          'Роды 2,срочные,патологические.рубцовая деформация ш/м ХФПН.ХВГП.Гестоз(о),ср.ст.тяж',
      },
      dateFinalDiagnosis: {
        type: 'date',
        title: 'Дата заключительного диагноза',
      },
      finalDiagnosis: {
        title: 'Заключительный диагноз',
        placeholder:
          'Р1,преждев,31 нед,пат, путем кес.сеч., гес. ХВГП. Дифф.токс.зоб',
      },
      age: {
        type: 'number',
        title: 'Возраст',
      },
      bloodType: {
        type: 'number',
        options: [1, 2, 3, 4],
        title: 'Группа крови',
      },
      Rh: {
        type: 'number',
        options,
        title: 'Резус фактор',
      },
      height: {
        type: 'number',
        title: 'Рост',
      },
      worksAt: {
        title: 'Работа',
        placeholder: 'преподаватель',
      },
      livingConditions: {
        type: 'number',
        options,
        title: 'Социально-бытовые условия',
      },
      badHabits: {
        type: 'number',
        options,
        title: 'Вредные привычки',
      },
      drugs: {
        type: 'number',
        options,
        title: 'Лекарства',
      },
      address: {
        title: 'Адрес',
        placeholder: 'Воронеж, Коминтер. р-он. ул. Победы д.0. кв. 0',
      },
      complicatedSomaticHistory: {
        placeholder:
          'ОРВИ, грипп, ангины, 1977-операция на баталловом протоке, хр.гастрит',
        title: 'Отягощенный Соматический Анамнез (ОСА)',
      },
      complicatedGynecologyHistory: {
        placeholder: 'Эрозия шейки матки',
        title: 'Отягощенный Гинекологический Анамнез (ОГА)',
      },
      complicatedObstetricsHistory: {
        type: 'number',
        options,
        title: 'Отягощенный Акушерский Анамнез (ОАА)',
      },
      allergy: {
        type: 'number',
        options,
        title: 'Аллергологический анамнез',
      },
      genetics: {
        type: 'number',
        options,
        title: 'Генетические заболевания в семье',
      },
    }

    this.gynecology = {
      header: 'Гинекологический анамнез',
      mensesFrom: { type: 'number', title: 'Менструации с (лет)' },
      lastMenses: {
        type: 'date',
        title: 'Дата последней менструации',
      },
      sexFrom: { type: 'number', title: 'Половая жизнь с (лет)' },
    }
    this.obstetric = {
      header: 'Акушерский анамнез',
      numberOfPregnancies: {
        type: 'number',
        title: 'Количество беременностей',
      },
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
