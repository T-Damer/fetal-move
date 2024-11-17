const options = [0, 1]
const value = 0
const calcinosisOptions = ['нет', 'да', 'выраженный кальциноз']
const yesNoOptions = ['нет', 'да']
const ctgObject = {
  date: { title: 'Дата', type: 'date' as InputType },
  ctgType: {
    title: 'Тип КТГ',
    options: ['нормальный', 'сомнительный', 'патологический'],
    value: 'нормальный',
  },
  ctgReport: { title: 'Заключение КТГ' },
}

// we can't store Date in localstore, it will convert into string
// so we use string types from <input type="" />
// string is default, so we don define it using type="string" in most key-value pairs
export type InputType = 'number' | 'date' | 'time' | 'string'
export type PlainValue = number | string | undefined
type InputObject = {
  value?: PlainValue
  step?: number
  title?: string
  placeholder?: string
  type?: InputType
}
type Options = { options: number[] | string[] }

export type CommonContent = InputObject & Partial<Options>

type Header = { header: { value: string } }
type PassportData = Header & {
  historySerial: { value: number; type: InputType; title: string }
  [key: string]: CommonContent
}
type CommonData = Header & { [key: string]: CommonContent }

export default class Patient {
  passport: Header & PassportData
  gynecology: CommonData
  obstetric: CommonData
  pregnancy: CommonData
  birth: CommonData
  cardiotocography1: CommonData
  cardiotocography2: CommonData
  cardiotocography3: CommonData
  birthAnomalies: CommonData
  afterbirth: CommonData
  newborn: CommonData
  generalBloodTest: CommonData
  bloodBiochemistry: CommonData
  urine: CommonData
  smear: CommonData
  ultrasound1: CommonData
  ultrasound2: CommonData
  ultrasound3: CommonData
  ultrasound4: CommonData

  constructor(historySerial: number) {
    this.passport = {
      header: { value: 'Паспортная часть' },
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
          'Р1, преждевременные ,31 нед, пат, путем кес.сеч., гес. ХВГП. Дифф.токс.зоб',
      },
      age: {
        type: 'number',
        title: 'Возраст',
      },
      bloodType: {
        type: 'number',
        options: ['O (I)', 'A (II)', 'B (III)', 'AB (IV)'],
        title: 'Группа крови',
        value: 'O (I)',
      },
      Rh: {
        options: ['(+)', '(-)'],
        title: 'Резус фактор',
        value: '(+)',
      },
      height: {
        type: 'number',
        title: 'Рост матери',
        step: 0.1,
      },
      weight: {
        type: 'number',
        title: 'Вес матери',
        step: 0.1,
      },
      worksAt: {
        title: 'Работа',
        placeholder: 'Преподаватель',
      },
      livingConditions: {
        title: 'Социально-бытовые условия',
        options,
        value,
      },
      badHabits: {
        title: 'Вредные привычки',
        options,
        value,
      },
      drugs: {
        title: 'Лекарства',
      },
      complicatedSomaticHistory: {
        title: 'Отягощенный Соматический Анамнез (ОСА)',
        placeholder:
          'ОРВИ, грипп, ангины, 1977-операция на баталловом протоке, хр.гастрит',
      },
      complicatedGynecologyHistory: {
        title: 'Отягощенный Гинекологический Анамнез (ОГА)',
        placeholder: 'Эрозия шейки матки',
      },
      complicatedObstetricsHistory: {
        title: 'Отягощенный Акушерский Анамнез (ОАА)',
        type: 'number',
      },
      allergy: {
        title: 'Аллергологический анамнез',
        type: 'number',
      },
      genetics: {
        title: 'Генетические заболевания в семье',
        type: 'number',
      },
    }

    this.gynecology = {
      header: { value: 'Гинекологический анамнез' },
      mensesFrom: { type: 'number', title: 'Менструации с (лет)' },
      mensesTo: { type: 'number', title: 'По дней' },
      mensesThrough: {
        type: 'number',
        title: 'Через',
      },
      mensesRegularity: {
        title: 'Регулярность',
        options: ['Регулярные', 'Нерегулярные'],
        value: 'Регулярные',
      },
      mensesHurt: {
        title: 'Болезненность',
        options: ['Безболезненные', 'Болезненные'],
        value: 'Безболезненные',
      },
      mensesCharacteristics: {
        title: 'Особенности',
        options: ['нет', 'умеренные', 'обильные', 'задержки'],
        value: 'нет',
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
      header: { value: 'Акушерский анамнез' },
      numberOfPregnancies: {
        title: 'Количество беременностей',
        type: 'number',
        value: 1,
      },
      pregnanciesCharacteristics: { title: 'Характеристика' },
    }
    this.pregnancy = {
      header: { value: 'Настоящая беременность' },
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
        step: 0.1,
      },
      Dsp: { type: 'number', title: 'Distantia spinarum (межостный размер)' },
      Dcr: {
        title: 'Distantia cristarum (межгребенчатый размер)',
        type: 'number',
      },
      Dtr: {
        title: 'Distantia trochanterica (межвертельный размер)',
        type: 'number',
      },
      Conext: {
        title: 'Conjugata externa (наружняя конъюгата)',
        type: 'number',
      },
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
      header: { value: 'Роды' },
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
        title: 'Время родов',
        type: 'time',
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
        options: ['нет', 'да', 'ЭКО', 'амниотомия '],
        value: 'нет',
      },
    }
    this.cardiotocography1 = { header: { value: 'КТГ-1' }, ...ctgObject }
    this.cardiotocography2 = { header: { value: 'КТГ-2' }, ...ctgObject }
    this.cardiotocography3 = { header: { value: 'КТГ-3' }, ...ctgObject }

    this.birthAnomalies = {
      header: { value: 'Аномалии родовой деятельности' },
      obstetricWeakness: {
        title: 'Слабость родовой деятельности',
        options: ['нет', 'первичная', 'вторичная'],
        value: 'нет',
      },
      discoordination: {
        title: 'Дискоординация',
        options,
      },
      caesarean: {
        title: 'Кесарево сечение',
        options,
        value,
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
        options,
        value,
      },
      vigorousLaborActivity: {
        title: 'Бурная родовая деятельность',
        options,
        value,
      },
      anhydrousGap: {
        title: 'Безводный промежуток',
        placeholder: '2ч. 55мин.',
      },
      narrowPelvis: {
        title: 'Узкий таз',
        options: ['нет', 'анатомический узкий таз', 'поперечносуженный таз'],
        value: 'нет',
      },
      complications: {
        title: 'Осложнения',
      },
      operations: {
        title: 'Операции',
      },
      amniotomia: {
        title: 'Амниотомия',
        options,
        value,
      },
      waterColor: {
        title: 'Цвет вод',
        placeholder: 'светлые',
      },
      waterAmount: {
        title: 'Количество вод',
        options: [
          'умеренное',
          'многоводие',
          'выраженное многоводие',
          'маловодие',
        ],
        value: 'умеренное',
      },
      bloodloss: {
        title: 'Кровопотеря (мл)',
        type: 'number',
        value,
      },
    }
    this.afterbirth = {
      header: { value: 'Послед' },
      length: { title: 'Длина', type: 'number' },
      width: { title: 'Ширина', type: 'number' },
      thickness: { title: 'Толщина', type: 'number' },
      calcinossis: {
        title: 'Кальциноз',
        options: calcinosisOptions,
        value,
      },
      fatDegenerations: {
        title: 'Жировые перерождения',
        options,
        value,
      },
      afterbirthDefect: { title: 'Дефект последа' },
    }
    this.newborn = {
      header: { value: 'Новорожденный' },
      warning: {
        value:
          '⚠️ Если плодов несколько, то скопируйте историю и измените эту часть',
      },
      postpartumPeriod: { title: 'Течение послеродового периода' },
      newbornWeight: {
        title: 'Вес новорожденного (г)',
        type: 'number',
        step: 0.1,
      },
      newbornLength: { title: 'Длина тела (см)', type: 'number' },
      gender: { title: 'Пол', options: ['м', 'ж'], value: 'м' },
      headCircumference: { title: 'Окружность головы (см)', type: 'number' },
      chestCircumference1: { title: 'Окружность груди-1 (см)', type: 'number' },
      chestCircumference2: { title: 'Окружность груди-2 (см)', type: 'number' },
      oneMin: { title: '1 мин', type: 'number' },
      fiveMin: { title: '5 мин', type: 'number' },
      neonatalDiagnosis: {
        title: 'Неонатальный диагноз',
        placeholder: 'Период новорожденности. Кесарево сечение',
      },
      prematrue: { title: 'Доношенный', options, value: 1 },
      notPrematrue: { title: 'Недоношенный', options, value },
      aspyrationSymptome: { title: 'Симптом аспирации', options, value },
      SOM: {
        title: 'Задержка роста плода (ЗРП)',
        options,
        value,
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
      },
      postHypoxicCondition: {
        title: 'Постгипоксическое состояние',
        options,
        value,
      },
      morphoFunctionalImmaturity: {
        title: 'Морфо-функциональная незрелость',
        options,
        value,
      },
      hormonalCrisis: { title: 'Гормональный криз', options, value },
      yellowing: {
        title: 'Желтуха',
        options: [...yesNoOptions, 'Тяжелая желтушно-анемическая форма'],
        value: 'нет',
      },
      erythema: {
        title: 'Эритема',
        options: [...yesNoOptions, 'токсическая эритема'],
        value: 'нет',
      },
      respiratoryDistressSyndrome: {
        title: 'Синдром дыхательных расстройств (СДР)',
        options: [
          'нет',
          'I степени-купировано',
          'II степени-купировано',
          'III степени-купировано',
          'I степени',
          'II степени',
          'III степени',
        ],
        value: 'нет',
      },
      dacryocis: { title: 'Дакриоцис', options },
      intrauterineInfections: {
        title: 'Внутриутробные инфекции (ВУИ)',
        options: ['нет', 'угроза', 'высокий риск', 'умеренный риск'],
        value: 'нет',
      },
      cardiopathies: { title: 'Кардиопатии', options, value },
      pneumopathology: { title: 'Пневмопатология', options, value },
      fetalHemolyticDisease: {
        title: 'Гемолитическая болезнь плода (ГБН)',
        options: [
          'нет',
          'угроза по АВ0-системе',
          'угроза по резус-фактору',
          'угроза по резус-фактору и АВ0-системе',
        ],
        value: 'нет',
      },
      сongenitalЬalformations: { title: 'Врожденные пороки развития (ВПР)' },
      congenitalHeartDisease: { title: 'Врожденные пороки сердца (ВПС)' },
      allergoDermathitis: { title: 'Аллергодерматит', options },
      pelvicDysplasia: {
        title: 'Дисплазия тазового сустава',
        options,
        value,
      },
      paresis: { title: 'Парезы', options, value },
      perinatalEncephalopathy: {
        title: 'Перинатальная энцефалопатиея (ПЭП)',
        options,
        value,
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
        options,
        value: 1,
      },
      tuberculosisVaccine: {
        title: 'БЦЖ',
        options: [...yesNoOptions, 'мед.отвод', 'отказ матери'],
        value: 'нет',
      },
      healthGroup: {
        title: 'Группа здоровья',
        options: ['IА', 'IБ', 'IIА', 'IIБ'],
        value: 'IА',
      },
      aro: {
        title: 'ОРИТ',
        options: yesNoOptions,
      },
      home: {
        title: 'Домой',
        options: yesNoOptions,
      },
      hospitalTreatment: {
        title: 'ОДКБ',
        options: yesNoOptions,
      },
      partogram: {
        title: 'Партограмма',
        placeholder: 'Можно вставить ссылку на фото',
      },
    }
    this.generalBloodTest = {
      header: { value: 'Общий анализ крови (ОАК)' },
      dischargeStatus: {
        title: 'Состояние при выписке',
        options: ['Удовлетворительное', 'Неудовлетворительное'],
        value: 'Удовлетворительное',
      },
      gbtDate: { title: 'Дата', type: 'date' },
      gbtHemoglobin: { title: 'Гемоглобин (г/л)', type: 'number' },
      gbtErythrocytes: { title: 'Эритроциты', step: 0.01, type: 'number' },
      gbtColorValue: {
        title: 'Цветовой показатель (ЦП)',
        step: 0.01,
        type: 'number',
      },
      gbtLeukocytes: { title: 'Лейкоциты', step: 0.1, type: 'number' },
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
      header: { value: 'Биохимия крови' },
      bdDate: { title: 'Дата', type: 'date' },
      AsAT: { title: 'АсАТ', type: 'number', step: 0.1 },
      AlAT: { title: 'АлАТ', type: 'number', step: 0.1 },
      bilirubin: { title: 'Билирубин общий', type: 'number', step: 0.1 },
      bilirubinBound: {
        title: 'Билирубин связанный',
        type: 'number',
        step: 0.1,
        value: 0,
      },
      bilirubinFree: {
        title: 'Билирубин свободный',
        type: 'number',
        step: 0.1,
        value: 0,
      },
      totalProtein: {
        title: 'Общий белок',
        type: 'number',
      },
      thymolTest: {
        title: 'Тимоловая проба',
        options: ['нет', '−', '+'],
        value: 'нет',
      },
      urea: { title: 'Мочевина', type: 'number', step: 0.1 },
      сreatinine: { title: 'Креатинин' },
      amylase: { title: 'Амилаза', type: 'number', value: 0 },
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
      header: { value: 'Моча' },
      urineDate: { title: 'Дата', type: 'date' },
      density: { title: 'Плотность', type: 'number' },
      proteins: {
        title: 'Белок',
        type: 'number',
        value,
        step: 0.01,
      },
      urineLeukocytes: { title: 'Лейкоциты', type: 'number' },
      cilinders: { title: 'Цилиндры', type: 'number', value },
      urineErythrocytes: { title: 'Эритроциты', type: 'number', value },
      bacteriuria: { title: 'Бактериурия', type: 'number', value },
      ketonBodies: { title: 'Кетоновые тела', type: 'number', value },
      sediment: { title: 'Осадок', value },
      glocosa: { title: 'Глюкоза', type: 'number', value },
    }
    this.smear = {
      header: { value: 'Мазок' },
      smearDate: { title: 'Дата', type: 'date' },
      smearLeukocytes: {
        title: 'Лейкоциты',
        value: '0-1 во влагалище и 2-3 в ш/м',
      },
      epithelialСells: {
        title: 'Эпителиальные клетки',
        options: ['немного', 'много'],
      },
      flora: {
        title: 'Флора',
        options: ['бациллярная', 'смешанная', 'б/о', 'кокковая'],
        value: 'б/о',
      },
    }
    this.ultrasound1 = {
      header: { value: 'УЗИ-1 (11-13+6)' },
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
        options: [1, 2],
        value: 1,
      },
      coccygealPerietalFetalSize: {
        type: 'number',
        title: 'Копчико-теменной размер эмбриона (КТР)',
      },
      chorion: {
        title: 'Хорион',
        options: ['передняя', 'задняя'],
        value: 'передняя',
      },
      cervix: {
        type: 'number',
        title: 'Шейка (мм)',
      },
      pathology: {
        title: 'Патология',
        value,
      },
    }
    this.ultrasound2 = {
      header: { value: 'УЗИ-2 (18-20+6)' },
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
        value: 'Головное',
      },
      hypothrophy: {
        title: 'Гипотрофия',
        value: 'нет',
      },
      water: {
        title: 'Много/маловодие',
        value: 'нет',
      },
      biparietalSize: {
        type: 'number',
        title: 'Бипариетальный размер (БПР)',
      },
      dgk: {
        title: 'Диаметр кости голени (ДГК)',
        type: 'number',
      },
      abdominalDoppler: {
        type: 'number',
        title: 'Доплерография живота (ДЖ)',
      },
      approximateFetalWeight: {
        title: 'Приблизительный вес плода (ПВП) - г',
        type: 'number',
        step: 0.1,
      },
      placenta: {
        type: 'number',
        title: 'Плацента/мм2',
      },
      attachment: {
        title: 'Прикрепление',
        options: ['передняя', 'задняя'],
        value: 'задняя',
      },
      poorPlacentation: {
        title: 'Низкая плацентация',
        options,
        value,
      },
      placentAnomalies: {
        title: 'Изменения плаценты',
        value: 'нет',
      },
      maturityDegree: {
        title: 'Степень зрелости',
        options: ['0', 'I', 'I-II', 'II', 'II-III', 'III'],
      },
      calcinosis: {
        title: 'Кальциноз',
        options: calcinosisOptions,
        value,
      },
      cysts: {
        title: 'Кисты',
        options,
        value,
      },
      fetalHearthRate: {
        title: 'ЧСС плода',
        type: 'number',
      },
      resistanceIndexLeftUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной левой артерии',
      },
      resistanceIndexRightUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной правой артерии',
      },
      normalUterineResistanceIndex: {
        title: 'Норма ИР маточной артерии',
      },
      ubmilicalAteriaResistanceIndex: {
        title: 'ИР артерии пуповины',
      },
      normalUmbilicalRestanceIndex: {
        title: 'Норма ИР артерии пуповины',
      },
      fetalCordEntanglement: {
        title: 'Обвитие пуповиной плода',
        options,
        value,
      },
      fetalPathology: {
        title: 'Патология плода',
        value,
      },
    }
    this.ultrasound3 = {
      header: { value: 'УЗИ-3 (30-34)' },
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
        value: 'Головное',
      },
      SOM: {
        title: 'Задержка роста плода (ЗРП)',
        value,
      },
      water: {
        title: 'Много/маловодие',
        value,
      },
      biparietalSize: {
        title: 'Бипариетальный размер (БПР)',
        type: 'number',
      },
      dgk: {
        title: 'Диаметр кости голени (ДГК)',
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
        title: 'Приблизительный вес плода (ПВП) - г',
        type: 'number',
        step: 0.1,
      },
      placenta: {
        title: 'Плацента/мм2',
        type: 'number',
      },
      attachment: {
        title: 'Прикрепление',
        options: ['передняя', 'задняя'],
        value: 'задняя',
      },
      poorPlacentation: {
        title: 'Низкая плацентация',
        options,
        value,
      },
      placentAnomalies: {
        title: 'Изменения плаценты',
        value,
      },
      maturityDegree: {
        type: 'number',
        title: 'Степень зрелости',
        options: [0, 1],
        value: 1,
      },
      calcinosis: {
        title: 'Кальциноз',
        options: calcinosisOptions,
        value,
      },
      cysts: {
        title: 'кисты',
        options,
        value,
      },
      fetalHearthRate: {
        title: 'ЧСС плода',
        type: 'number',
      },
      resistanceIndexLeftUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной левой артерии',
      },
      resistanceIndexRightUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной правой артерии',
      },
      normalUterineResistanceIndex: {
        title: 'Норма ИР маточной артерии',
        placeholder: '0.34 - 0.61',
      },
      ubmilicalAteriaResistanceIndex: {
        title: 'ИР артерии пуповины',
      },
      normalUmbilicalRestanceIndex: {
        title: 'Норма ИР артерии пуповины',
        placeholder: '0.52 - 0.75',
      },
      fetalCordEntanglement: {
        title: 'Обвитие пуповиной плода',
        options,
        value,
      },
      fetalPathology: {
        title: 'Патология плода',
        value,
      },
    }
    this.ultrasound4 = {
      header: { value: 'УЗИ-4 (35-40)' },
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
        value: 'Головное',
      },
      SOM: {
        title: 'Задержка роста плода (ЗРП)',
        value,
      },
      water: {
        title: 'Много/маловодие',
        value,
      },
      biparietalSize: {
        title: 'Бипариетальный размер (БПР)',
        type: 'number',
      },
      dgk: {
        title: 'Диаметр кости голени (ДГК)',
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
        title: 'Приблизительный вес плода (ПВП) - г',
        type: 'number',
        step: 0.1,
      },
      placenta: {
        title: 'Плацента/мм2',
        type: 'number',
      },
      attachment: {
        title: 'Прикрепление',
        options: ['передняя', 'задняя'],
        value: 'задняя',
      },
      poorPlacentation: {
        title: 'Низкая плацентация',
        options,
        value,
      },
      placentAnomalies: {
        title: 'Изменения плаценты',
        value,
      },
      maturityDegree: {
        type: 'number',
        title: 'Степень зрелости',
        options: [0, 1],
        value: 1,
      },
      calcinosis: {
        title: 'Кальциноз',
        options: calcinosisOptions,
        value,
      },
      cysts: {
        title: 'Кисты',
        options,
        value,
      },
      fetalHearthRate: {
        title: 'ЧСС плода',
        type: 'number',
      },
      resistanceIndexLeftUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной левой артерии',
      },
      resistanceIndexRightUterineArteria: {
        title: 'Индекс резистентности (ИР) маточной правой артерии',
      },
      normalUterineResistanceIndex: {
        title: 'Норма ИР маточной артерии',
        placeholder: '0.34 - 0.61',
      },
      ubmilicalAteriaResistanceIndex: {
        title: 'ИР артерии пуповины',
      },
      normalUmbilicalRestanceIndex: {
        title: 'Норма ИР артерии пуповины',
        placeholder: '0.52 - 0.75',
      },
      fetalCordEntanglement: {
        title: 'Обвитие пуповиной плода',
        options,
        value,
      },
      fetalPathology: {
        title: 'Патология плода',
        value,
      },
    }
  }
}

export type AvailableSections = keyof Patient
