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
type NumStrOptions = { options: number[] | string[] }

export type CommonContent = InputObject & Partial<NumStrOptions>

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
  bloodType: InputObject & NumStrOptions
  Rh: InputObject & NumStrOptions
  height: InputObject
  weight: InputObject
  worksAt: InputObject
  livingConditions: InputObject & NumStrOptions
  badHabits: InputObject & NumStrOptions
  drugs: InputObject & NumStrOptions
  address: InputObject
  complicatedSomaticHistory: InputObject
  complicatedGynecologyHistory: InputObject
  complicatedObstetricsHistory: InputObject
  allergy: InputObject
  genetics: InputObject
}
type GynecologyData = {
  mensesFrom: InputObject
  mensesTo: InputObject
  mensesThrough: InputObject
  mensesRegularity: InputObject & NumStrOptions
  mensesHurt: InputObject & NumStrOptions
  mensesCharacteristics: InputObject
  mensesLast: InputObject

  sexFrom: InputObject
  aborts: InputObject
  miscarriage: InputObject
  gynecologicalDiseases: InputObject
  sexTransmittedDiseases: InputObject
}
type ObstetricData = {
  numberOfPregnancies: InputObject
  pregnanciesCharacteristics: InputObject
}
type PregnancyData = {
  preterm: InputObject
  totalGain: InputObject
  abdominalCircumference: InputObject
  uterinFundusHeight: InputObject
  estimatedFetalWeight: InputObject
  Dsp: InputObject
  Dcr: InputObject
  Dtr: InputObject
  Conext: InputObject
  firstHalf: InputObject
  secondHalf: InputObject
}

export type AvailableInputKeys = keyof PassportData &
  keyof GynecologyData &
  keyof ObstetricData &
  keyof PregnancyData

export class Patient {
  passport: Header & PassportData
  gynecology: Header & GynecologyData
  obstetric: Header & ObstetricData
  pregnancy: Header & PregnancyData
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
        options: ['O (I)', 'A (II)', 'B (III)', 'AB (IV)'],
        title: 'Группа крови',
      },
      Rh: {
        type: 'string',
        options: ['(+)', '(-)'],
        title: 'Резус фактор',
      },
      height: {
        type: 'number',
        title: 'Рост',
      },
      weight: {
        type: 'number',
        title: 'Вес',
      },
      worksAt: {
        title: 'Работа',
        placeholder: 'Преподаватель',
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
        title: 'Отягощенный Акушерский Анамнез (ОАА)',
      },
      allergy: {
        type: 'number',
        title: 'Аллергологический анамнез',
      },
      genetics: {
        type: 'number',
        title: 'Генетические заболевания в семье',
      },
    }

    this.gynecology = {
      header: 'Гинекологический анамнез',
      mensesFrom: { type: 'number', title: 'Менструации с (лет)' },
      mensesTo: { type: 'number', title: 'По дней' },
      mensesThrough: {
        type: 'number',
        title: 'Через',
      },
      mensesRegularity: {
        type: 'string',
        title: 'Регулярность',
        options: ['Регулярные', 'Нерегулярные'],
      },
      mensesHurt: {
        type: 'string',
        title: 'Болезненность',
        options: ['Безболезненные', 'Болезненные'],
      },
      mensesCharacteristics: {
        type: 'string',
        title: 'Особенности',
      },
      mensesLast: {
        type: 'date',
        title: 'Дата последней менструации',
      },

      sexFrom: { type: 'number', title: 'Половая жизнь с (лет)' },
      aborts: { type: 'string', title: 'Аборты' },
      miscarriage: { type: 'string', title: 'Выкидыши' },
      gynecologicalDiseases: {
        type: 'string',
        title: 'Гинекологические заболевания',
      },
      sexTransmittedDiseases: { type: 'string', title: 'ЗППП' },
    }
    this.obstetric = {
      header: 'Акушерский анамнез',
      numberOfPregnancies: {
        type: 'number',
        title: 'Количество беременностей',
      },
      pregnanciesCharacteristics: { type: 'string', title: 'Характеристика' },
    }
    this.pregnancy = {
      header: 'Настоящая беременность',
      preterm: { type: 'number', title: 'Срок перед родами' },
      totalGain: { type: 'number', title: 'Общая прибавка (кг)' },
      abdominalCircumference: {
        type: 'number',
        title: 'Окружность живота (ОЖ) (см)',
      },
      uterinFundusHeight: {
        type: 'number',
        title: 'Высота дна матки (ВДМ) (см)',
      },
      estimatedFetalWeight: {
        type: 'number',
        title: 'Предположительный вес плода (ПВП) (г)',
      },
      Dsp: { type: 'number', title: 'D.sp' },
      Dcr: { type: 'number', title: 'D.cr' },
      Dtr: { type: 'number', title: 'D.tr' },
      Conext: { type: 'number', title: 'Con.ext' },
      firstHalf: {
        type: 'string',
        title: 'I половина',
        placeholder:
          'В 6 нед. Угроза- стац. Леч. В ГБ №8 (дюфастон 2 нед., затем  утрожестан до 18 нед.). В 13 нед. Угроза- стац. Леч. В БСМП (утрожестан)',
      },
      secondHalf: {
        type: 'string',
        title: 'II половина',
        placeholder: ' В 30 нед. Анемия l. В 32 нед. Протеинурия',
      },
    }
    this.birth = {
      header: 'Роды',
      birthNumber: {
        type: 'number',
        title: 'Роды по счету',
      },
      gestationalAge: {
        type: 'number',
        title: 'Срок гестации',
      },
      birthDate: {
        type: 'date',
        title: 'Дата родов',
      },
      birthTime: {
        type: 'time',
        title: 'Время родов',
      },
      doctor: {
        type: 'string',
        title: 'Врач',
      },
      normalOrPathological: {
        type: 'string',
        title: 'Норм/пат',
        options: ['норм.', 'пат'],
      },
      wasInduced: {
        type: 'string',
        title: 'Индуцированные',
        options: ['нет', 'да'],
      },
    }
    this.birthAnomalies = { header: 'Аномалии родовой деятельности' }
    this.afterbirth = { header: 'Послед' }
    this.newborn = { header: 'Новорожденный' }
    this.generalBloodTest = { header: 'Общий анализ крови (ОАК)' }
    this.bloodBiochemistry = { header: 'Биохимия крови' }
    this.urine = { header: 'Моча' }
    this.smear = { header: 'Мазок' }
    this.ultrasound1 = {
      header: 'УЗИ-1 (4-17)',
      ultrasoundDate: {
        type: 'date',
        title: 'Дата УЗИ1',
      },
      gestationalAge: {
        type: 'number',
        title: 'Срок гестации УЗИ1 (нед)',
      },
      uterineLength: {
        type: 'number',
        title: 'Длина матки',
      },
      uterineWidth: {
        type: 'number',
        title: 'Ширина матки',
      },
      fetalEgg: {
        type: 'number',
        title: 'Плодное яйцо',
        options: [0, 1],
      },
      coccygealPerietalFetalSize: {
        type: 'number',
        title: 'Копчико-теменной размер эмбриона (КТР)',
      },
      chorion: {
        type: 'string',
        title: 'Хорион',
        options: ['задняя'], // TODO!
      },
      cervix: {
        type: 'number',
        title: 'Шейка (мм)',
      },
      pathology: {
        type: 'string',
        title: 'Патология',
        placeholder: 'нет',
      },
    }
    this.ultrasound2 = {
      header: 'УЗИ-2 (18-20+6)',
      ultrasoundDate: {
        type: 'date',
        title: 'Дата УЗИ2',
      },
      gestationalAge: {
        type: 'number',
        title: 'Срок гестации УЗИ2 (нед)',
      },
      prematurity: {
        type: 'string',
        title: 'Предлежание',
        options: ['Головное', 'Тазовое'],
      },
      hypothrophy: {
        type: 'string',
        title: 'Гипотрофия',
        placeholder: 'нет',
      },
      water: {
        type: 'string',
        title: 'Много/маловодие',
        placeholder: 'нет',
      },
      biparietalSize: {
        type: 'number',
        title: 'Бипариетальный размер (БПР)',
      },
      dgk: {
        type: 'number',
        title: '(ДГК)', // TODO???
      },
      abdominalDoppler: {
        type: 'number',
        title: 'Доплерография живота (ДЖ)',
      },
      approximateFetalWeight: {
        type: 'number',
        title: 'Приблизительный вес плода (ПВП) - г', // TODO???
      },
      placenta: {
        type: 'number',
        title: 'Плацента/мм2',
      },
      attachment: {
        type: 'string',
        title: 'Прикрепление',
        options: ['передняя', 'задняя'],
      },
      poorPlacentation: {
        type: 'string',
        options: ['да', 'нет'],
      },
      placentAnomalies: {
        type: 'string',
        title: 'Изменения плаценты',
        placholder: 'нет',
      },
      maturityDegree: {
        type: 'number',
        title: 'Степень зрелости',
        options: [0, 1],
      },
      calcinosis: {
        type: 'string',
        title: 'Кальциноз',
        options: ['нет', 'да'],
      },
      cysts: {
        type: 'string',
        titel: 'кисты',
        options: ['нет', 'да'],
      },
      fetalHearthRate: {
        type: 'number',
        title: 'ЧСС плода',
      },
      resistanceIndexLeftUterineArteria: {
        type: 'number',
        step: 0.01,
        title: 'Индекс резистентности (ИР) маточной левой артерии',
      },
      resistanceIndexRightUterineArteria: {
        type: 'number',
        step: 0.01,
        title: 'Индекс резистентности (ИР) маточной правой артерии',
      },
      normalUterineResistanceIndex: {
        type: 'number',
        step: 0.01,
        title: 'Норма ИР маточной артерии',
        placholder: '0.34 - 0.61',
      },
      ubmilicalAteriaResistanceIndex: {
        type: 'number',
        step: 0.01,
        title: 'ИР артерии пуповины',
      },
      normalUmbilicalRestanceIndex: {
        type: 'number',
        step: 0.01,
        title: 'Норма ИР артерии пуповины',
        placholder: '0.52 - 0.75',
      },
      fetalCordEntanglement: {
        type: 'string',
        title: 'Обвитие пуповиной плода',
        options: ['да', 'нет'],
      },
      fetalPathology: {
        type: 'string',
        title: 'Патология плода',
        placeholder: 'нет',
      },
    }
    this.ultrasound3 = { header: 'УЗИ-3 (28-35)' }
    this.ultrasound4 = { header: 'УЗИ-4 (36-40)' }
  }
}

export type AvailableSections = keyof Patient

interface PatientsDataStore {
  [id: string]: Patient
}

export default atomWithStorage<PatientsDataStore>('patientsData', {})
