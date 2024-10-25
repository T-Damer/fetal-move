import { atomWithStorage } from 'jotai/utils'

const options = [0, 1]
const yesNoOptions = ['нет', 'да']

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
type Options = { options: number[] | string[] }

export type CommonContent = InputObject & Partial<Options>

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
  bloodType: InputObject & Options
  Rh: InputObject & Options
  height: InputObject
  weight: InputObject
  worksAt: InputObject
  livingConditions: InputObject & Options
  badHabits: InputObject & Options
  drugs: InputObject & Options
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
  mensesRegularity: InputObject & Options
  mensesHurt: InputObject & Options
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

type BirthAnomaliesData = {
  obstetricWeakness: InputObject & Options
}

export type AvailableInputKeys = keyof PassportData &
  keyof GynecologyData &
  keyof ObstetricData &
  keyof PregnancyData &
  BirthAnomaliesData

export class Patient {
  passport: Header & PassportData
  gynecology: Header & GynecologyData
  obstetric: Header & ObstetricData
  pregnancy: Header & PregnancyData
  birth: Header
  birthAnomalies: Header & BirthAnomaliesData
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
        options: ['(+)', '(-)'],
        title: 'Резус фактор',
      },
      height: {
        type: 'number',
        title: 'Рост матери',
      },
      weight: {
        type: 'number',
        title: 'Вес матери',
      },
      worksAt: {
        title: 'Работа',
        placeholder: 'Преподаватель',
      },
      livingConditions: {
        title: 'Социально-бытовые условия',
        type: 'number',
        options,
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
        title: 'Регулярность',
        options: ['Регулярные', 'Нерегулярные'],
      },
      mensesHurt: {
        title: 'Болезненность',
        options: ['Безболезненные', 'Болезненные'],
      },
      mensesCharacteristics: {
        title: 'Особенности',
      },
      mensesLast: {
        type: 'date',
        title: 'Дата последней менструации',
      },

      sexFrom: { type: 'number', title: 'Половая жизнь с (лет)' },
      aborts: { title: 'Аборты' },
      miscarriage: { title: 'Выкидыши' },
      gynecologicalDiseases: {
        title: 'Гинекологические заболевания',
      },
      sexTransmittedDiseases: { title: 'ЗППП' },
    }
    this.obstetric = {
      header: 'Акушерский анамнез',
      numberOfPregnancies: {
        type: 'number',
        title: 'Количество беременностей',
      },
      pregnanciesCharacteristics: { title: 'Характеристика' },
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
        title: 'I половина',
        placeholder:
          'В 6 нед. Угроза- стац. Леч. В ГБ №8 (дюфастон 2 нед., затем  утрожестан до 18 нед.). В 13 нед. Угроза- стац. Леч. В БСМП (утрожестан)',
      },
      secondHalf: {
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
        title: 'Врач',
      },
      normalOrPathological: {
        title: 'Норм/пат',
        options: ['норм.', 'пат'],
      },
      wasInduced: {
        title: 'Индуцированные',
        options: yesNoOptions,
      },
    }
    this.birthAnomalies = {
      header: 'Аномалии родовой деятельности',
      obstetricWeakness: {
        title: 'Слабость родовой деятельности',
        options: yesNoOptions,
      },
      discoordination: {
        title: 'Дискоординация',
        options: yesNoOptions,
      },
      caesarean: {
        title: 'Кесарево сечение',
        options: yesNoOptions,
      },
      birthDuration: {
        title: 'Продолжительность родов',
        placeholder: '9ч. 45мин.',
      },
      firstPerios: {
        title: 'Первый период',
        placeholder: '6ч',
      },
      secondPerios: {
        title: 'Второй период',
        placeholder: '10мин.',
      },
      thirdPerios: {
        title: 'Третий период',
        placeholder: '5мин.',
      },
      prenatalAmnioticFluidLeakage: {
        title: 'Дородовое излитие околоплодных вод',
        options: yesNoOptions,
      },
      anhydrousGap: {
        title: 'Безводный промежуток',
        placeholder: '2ч. 55мин.',
      },
      narrowPelvis: {
        title: 'Узкий таз',
        options: yesNoOptions,
      },
      complications: {
        title: 'Осложнения',
        options: yesNoOptions,
      },
      operations: {
        title: 'Операции',
      },
      amniotomia: {
        title: 'Амниотомия',
        options: yesNoOptions,
      },
      waterColor: {
        title: 'Цвет вод',
        options: ['светлые', 'темные'],
      },
      waterAmount: {
        title: 'Количество вод',
        options: ['мало', 'умеренно'],
      },
      bloodloss: {
        title: 'Кровопотеря (мл)',
        type: 'number',
      },
    }
    this.afterbirth = {
      header: 'Послед',
      length: { title: 'Длина', type: 'number' },
      width: { title: 'Ширина', type: 'number' },
      thickness: { title: 'Толщина', type: 'number' },
      calcinossis: { title: 'Кальциноз', options: yesNoOptions },
      fatDegenerations: {
        title: 'Жировые перерождения',
        options: yesNoOptions,
      },
      afterbirthDefect: { title: 'Дефект последа' },
    }
    this.newborn = {
      header: 'Новорожденный',
      postpartumPeriod: { title: 'Течение послеродового периода' },
      newbornWeight: { title: 'Вес новорожденного (г)', type: 'number' },
      newbornLength: { title: 'Длина тела (см)', type: 'number' },
      gender: { title: 'Пол', options: ['м', 'ж'] },
      headCircumference: { title: 'Окружность головы (см)', type: 'number' },
      chestCircumference: { title: 'Окружность груди (см)', type: 'number' },
      oneMin: { title: '1 мин', type: 'number' },
      fiveMin: { title: '5 мин', type: 'number' },
      neonatalDiagnosis: {
        title: 'Неонатальный диагноз',
        placeholder: 'Период новорожденности. Кесарево сечение',
      },
      prematrue: { title: 'Доношенный', options: yesNoOptions },
      notPrematrue: { title: 'Недоношенный', options: yesNoOptions },
      aspyrationSymptome: { title: 'Симптом аспирации', options: yesNoOptions },
      SOM: {
        title: 'Задержка внутриутробного развития (ЗВУР)',
        options: yesNoOptions,
      },
      degreeSOM: {
        title: 'Степень',
        type: 'number',
        options: [1, 2, 3],
      },
      typeSOM: {
        title: 'Тип',
        options: [
          'Гипотрофический (ассиметричный)',
          'Гипопластический (симметричный)',
          'Диспластический (симметричный) ',
        ],
      },
      umbilicalCordEntanglement: {
        title: 'Обвитие пуповиной',
        options: yesNoOptions,
      },
      postHypoxicCondition: {
        title: 'Постгипоксическое состояние',
        options: yesNoOptions,
      },
      morphoFunctionalImmaturity: {
        title: 'Морфо-функциональная незрелость',
        options: yesNoOptions,
      },
      hormonalCrisis: { title: 'Гормональный криз', options: yesNoOptions },
      yellowing: { title: 'Желтуха', options: yesNoOptions },
      erythema: { title: 'Эритема', options: yesNoOptions },
      respiratoryDistressSyndrome: {
        title: 'Синдром дыхательных расстройств (СДР)',
        options: yesNoOptions,
      },
      dacryocis: { title: 'Дакриоцис', options: yesNoOptions },
      intrauterineInfections: {
        title: 'Внутриутробные инфекции (ВУИ)',
        options: yesNoOptions,
      },
      cardiopathies: { title: 'Кардиопатии', options: yesNoOptions },
      pneumopathology: { title: 'Пневмопатология', options: yesNoOptions },
      fetalHemolyticDisease: {
        title: 'Гемолитическая болезнь плода (ГБН)',
        options: yesNoOptions,
      },
      сongenitalЬalformations: { title: 'Врожденные пороки развития (ВПР)' },
      congenitalHeartDisease: { title: 'Врожденные пороки сердца (ВПС)' },
      allergoDermathitis: { title: 'Аллергодерматит', options: yesNoOptions },
      pelvicDysplasia: {
        title: 'Дисплазия тазового сустава',
        options: yesNoOptions,
      },
      paresis: { title: 'Парезы', options: yesNoOptions },
      perinatalEncephalopathy: {
        title: 'Перинатальная энцефалопатиея (ПЭП)',
        options: yesNoOptions,
      },
      encephalopathyDegree: {
        title: 'Степень',
        options: ['Легкая', 'Средняя', 'Тяжелая'],
      },
      weightLoss: { title: 'Убыль массы тела' },
      neurologicalStatus: {
        title: 'Неврологический статус',
        placeholder: 'Ррефлексы живые, нормотонус',
      },
      cordFell: {
        title: 'Пуповина отпала',
        options: yesNoOptions,
      },
      tuberculosisVaccine: {
        title: 'БЦЖ',
        options: yesNoOptions,
      },
      healthGroup: {
        title: 'Группа здоровья',
        options: ['I', 'IIA', 'IIB', 'III', 'IV'],
      },
      aro: {
        title: 'АРО, сутки', // TODO: ?
        options: ['нет', '1', '2', '3', '4', '5', '6', '7'],
      },
      home: {
        title: 'Домой, сутки',
        type: 'number',
      },
      hospitalTreatment: {
        title: 'ОДКБ, сутки',
        options: ['нет', '1', '2', '3', '4', '5', '6', '7'],
      },
    }
    this.generalBloodTest = {
      header: 'Общий анализ крови (ОАК)',
      dischargeStatus: {
        title: 'Состояние при выписке',
        options: ['Удовл.', 'Неудовл.'],
      },
      date: { title: 'Дата', type: 'date' },
      hb: { title: 'Гемоглобин (г/л)', type: 'number' },
      er: { title: 'Эритроциты', step: 0.01, type: 'number' },
      cv: { title: 'Цветовой показатель (ЦП)', step: 0.01, type: 'number' },
      leu: { title: 'Лейкоциты', step: 0.1, type: 'number' },
      bacillinuclear: { title: 'Палочкоядерные (п/я) - %', type: 'number' },
      segmentonuclear: { title: 'Сегментоядерные (с/я) - %', type: 'number' },
      monocyti: { title: 'Моноциты (М)', type: 'number' },
      eosinophils: { title: 'Эозинофилы (Э)', type: 'number' },
      lymphocyti: { title: 'Лимфоциты (Л)', type: 'number' },
      erythrocyteSedimentationRate: {
        title: 'Скорость оседания эритроцитов (СОЭ) - мм/час',
        type: 'number',
      },
      other: { title: 'Другие изменеия' },
    }
    this.bloodBiochemistry = {
      header: 'Биохимия крови',
      date: { title: 'Дата', type: 'date' },
      AsAT: { title: 'АсАТ', type: 'number', step: 0.1 },
      AlAT: { title: 'АлАТ', type: 'number', step: 0.1 },
      bilirubin: { title: 'Билирубин общий', type: 'number', step: 0.1 },
      bilirubinBound: {
        title: 'Билирубин связанный',
        type: 'number',
        step: 0.1,
        defaultValue: 0,
      },
      bilirubinFree: {
        title: 'Билирубин свободный',
        type: 'number',
        step: 0.1,
        defaultValue: 0,
      },
      totalProtein: {
        title: 'Общий белок',
        type: 'number',
      },
      thymolTest: { title: 'Тимоловая проба', options: ['нет', '-', '+'] },
      urea: { title: 'Мочевина', type: 'number', step: 0.1 },
      сreatinine: { title: 'Креатинин' },
      amylase: { title: 'Амилаза', type: 'number', defaulValue: 0 },
      prothrombinIndex: {
        title: 'Протромбиновый индекс (ПТИ)',
        type: 'number',
      },
      glucose: { title: 'Глюкоза', type: 'number', step: 0.1 },
      hematocrit: { title: 'Гематокрит', type: 'number', step: 0.1 },
      fibrinogenA: { title: 'Фибриноген А', type: 'number', step: 0.1 },
      fibrinogenB: { title: 'Фибриноген Б', type: 'number', step: 0.1 },
    }
    this.urine = {
      header: 'Моча',
      date: { title: 'Дата', type: 'date' },
      density: { title: 'Плотность', type: 'number' },
      proteins: {
        title: 'Белок',
        type: 'number',
        defaultValue: 0,
        step: 0.01,
      },
      l: { title: 'Лейкоциты', type: 'number' },
      cilinders: { title: 'Цилиндры', type: 'number', defaultValue: 0 },
      er: { title: 'Эритроциты', type: 'number', defaultValue: 0 },
      bacteriuria: { title: 'Бактериурия', type: 'number', defaultValue: 0 },
      ketonBodies: { title: 'Кетоновые тела', type: 'number', defaultValue: 0 },
      sediment: { title: 'Осадок', defaultValue: 'нет' },
      glocosa: { title: 'Глюкоза', type: 'number', defaultValue: 0 },
    }
    this.smear = {
      header: 'Мазок',
      date: { title: 'Дата', type: 'date' },
      l: { title: 'Лейкоциты', defaultValue: '0-1 во влагалище, 2-3 в ш/м' },
      epithelialСells: {
        title: 'Эпителиальные клетки',
        options: ['немного', 'много'],
      },
      flora: { title: 'Флора', defaultValue: 'б/о' },
    }
    this.ultrasound1 = {
      header: 'УЗИ-1 (4-17)',
      ultrasoundDate: {
        type: 'date',
        title: 'Дата УЗИ-1',
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
        title: 'Хорион',
        options: ['задняя'], // TODO!
      },
      cervix: {
        type: 'number',
        title: 'Шейка (мм)',
      },
      pathology: {
        title: 'Патология',
        placeholder: 'нет',
      },
    }
    this.ultrasound2 = {
      header: 'УЗИ-2 (18-20+6)',
      ultrasoundDate: {
        type: 'date',
        title: 'Дата УЗИ-2',
      },
      gestationalAge: {
        type: 'number',
        title: 'Срок гестации УЗИ2 (нед)',
      },
      prematurity: {
        title: 'Предлежание',
        options: ['Головное', 'Тазовое'],
      },
      hypothrophy: {
        title: 'Гипотрофия',
        placeholder: 'нет',
      },
      water: {
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
        title: 'Прикрепление',
        options: ['передняя', 'задняя'],
      },
      poorPlacentation: {
        title: 'Низкая плацентация',
        options: yesNoOptions,
      },
      placentAnomalies: {
        title: 'Изменения плаценты',
        placholder: 'нет',
      },
      maturityDegree: {
        title: 'Степень зрелости',
        options: ['I', 'I-II', 'II', 'II-III', 'III'],
      },
      calcinosis: {
        title: 'Кальциноз',
        options: yesNoOptions,
      },
      cysts: {
        titel: 'Кисты',
        options: yesNoOptions,
      },
      fetalHearthRate: {
        title: 'ЧСС плода',
        type: 'number',
      },
      resistanceIndexLeftUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной левой артерии',
        type: 'number',
        step: 0.01,
      },
      resistanceIndexRightUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной правой артерии',
        type: 'number',
        step: 0.01,
      },
      normalUterineResistanceIndex: {
        title: 'Норма ИР маточной артерии',
        type: 'number',
        step: 0.01,
        defaultValue: 0.59,
      },
      ubmilicalAteriaResistanceIndex: {
        title: 'ИР артерии пуповины',
        type: 'number',
        step: 0.01,
      },
      normalUmbilicalRestanceIndex: {
        title: 'Норма ИР артерии пуповины',
        type: 'number',
        step: 0.01,
        defaultValue: 0.73,
      },
      fetalCordEntanglement: {
        title: 'Обвитие пуповиной плода',
        options: yesNoOptions,
      },
      fetalPathology: {
        title: 'Патология плода',
        defaultValue: 'нет',
      },
    }
    this.ultrasound3 = {
      header: 'УЗИ-3 (36-40)',
      ultrasoundDate: {
        type: 'date',
        title: 'Дата УЗИ-3',
      },
      gestationalAge: {
        title: 'Срок гестации УЗИ3 (нед)',
        type: 'number',
      },
      prematurity: {
        title: 'Предлежание',
        options: ['Головное', 'Тазовое'],
      },
      hypothrophy: {
        title: 'Гипотрофия',
        defaultValue: 'нет',
      },
      water: {
        title: 'Много/маловодие',
        defaultValue: 'нет',
      },
      biparietalSize: {
        title: 'Бипариетальный размер (БПР)',
        type: 'number',
      },
      dgk: {
        title: '(ДГК)', // TODO???
        type: 'number',
      },
      femurLength: {
        title: 'Длина бедренной кости (ДБК) - мм',
        type: 'number',
      },
      abdominalDoppler: {
        title: 'Доплерография живота (ДЖ)',
        type: 'number',
      },
      approximateFetalWeight: {
        title: 'Приблизительный вес плода (ПВП) - г', // TODO???
        type: 'number',
      },
      placenta: {
        title: 'Плацента/мм2',
        type: 'number',
      },
      attachment: {
        title: 'Прикрепление',
        options: ['передняя', 'задняя'],
      },
      poorPlacentation: {
        title: 'Низкая плацентация',
        options: yesNoOptions,
      },
      placentAnomalies: {
        title: 'Изменения плаценты',
        placholder: 'нет',
      },
      maturityDegree: {
        type: 'number',
        title: 'Степень зрелости',
        options: [0, 1],
      },
      calcinosis: {
        title: 'Кальциноз',
        options: yesNoOptions,
      },
      cysts: {
        titel: 'кисты',
        options: yesNoOptions,
      },
      fetalHearthRate: {
        title: 'ЧСС плода',
        type: 'number',
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
        title: 'Обвитие пуповиной плода',
        options: yesNoOptions,
      },
      fetalPathology: {
        title: 'Патология плода',
        placeholder: 'нет',
      },
    }
    this.ultrasound4 = {
      header: 'УЗИ-4 (36-40)',
      ultrasoundDate: {
        type: 'date',
        title: 'Дата УЗИ-4',
      },
      gestationalAge: {
        title: 'Срок гестации УЗИ3 (нед)',
        type: 'number',
      },
      prematurity: {
        title: 'Предлежание',
        options: ['Головное', 'Тазовое'],
      },
      hypothrophy: {
        title: 'Гипотрофия',
        defaultValue: 'нет',
      },
      water: {
        title: 'Много/маловодие',
        defaultValue: 'нет',
      },
      biparietalSize: {
        title: 'Бипариетальный размер (БПР)',
        type: 'number',
      },
      dgk: {
        title: '(ДГК)', // TODO???
        type: 'number',
      },
      femurLength: {
        title: 'Длина бедренной кости (ДБК) - мм',
        type: 'number',
      },
      abdominalDoppler: {
        title: 'Доплерография живота (ДЖ)',
        type: 'number',
      },
      approximateFetalWeight: {
        title: 'Приблизительный вес плода (ПВП) - г', // TODO???
        type: 'number',
      },
      placenta: {
        title: 'Плацента/мм2',
        type: 'number',
      },
      attachment: {
        title: 'Прикрепление',
        options: ['передняя', 'задняя'],
      },
      poorPlacentation: {
        title: 'Низкая плацентация',
        options: yesNoOptions,
      },
      placentAnomalies: {
        title: 'Изменения плаценты',
        placholder: 'нет',
      },
      maturityDegree: {
        type: 'number',
        title: 'Степень зрелости',
        options: [0, 1],
      },
      calcinosis: {
        title: 'Кальциноз',
        options: yesNoOptions,
      },
      cysts: {
        titel: 'кисты',
        options: yesNoOptions,
      },
      fetalHearthRate: {
        title: 'ЧСС плода',
        type: 'number',
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
        title: 'Обвитие пуповиной плода',
        options: yesNoOptions,
      },
      fetalPathology: {
        title: 'Патология плода',
        placeholder: 'нет',
      },
    }
  }
}

export type AvailableSections = keyof Patient

interface PatientsDataStore {
  [id: string]: Patient
}

export default atomWithStorage<PatientsDataStore>('patientsData', {})
