/** Инструменты */
export enum ETool {
    brewer,          // Инструменты пивовара
    smith,           // Инструменты кузнеца
    masons,          // Инструменты каменщика
    tinkers,         // Инструменты жестянщика
    alchemists,      // Инструменты алхимика
    calligraphers,   // Инструменты каллиграфа
    carpenters,      // Инструменты плотника
    cartographers,   // Инструменты картографа
    cobblers,        // Инструменты сапожника
    cooks,           // Инструменты повара
    glassblowers,    // Инструменты стеклодува
    jewelers,        // Инструменты ювелира
    leatherworkers,  // Инструменты кожевника
    painters,        // Инструменты художника
    weavers,         // Инструменты ткача
    woodcarvers,     // Инструменты резчика по дереву
    disguise,        // Набор для грима
    forgery,         // Набор для фальсификации
    dice,            // Кости
    dragonchess,     // Драконьи шахматы
    playingcard,     // Карты
    threedragonante, // Ставка трёх драконов
    herbalism,       // Набор травника
    drum,            // Барабан
    viol,            // Виола
    bagpipes,        // Волынка
    lyre,            // Лира
    lute,            // Лютня
    horn,            // Рожок
    panflute,        // Свирель
    flute,           // Флейта
    dulcimer,        // Цимбалы
    shawm,           // Шалмей
    navigators,      // Инструменты навигатора
    poisoners,       // Инструменты отравителя
    thieves,         // Воровские инструменты
    vehicles,        // Транспорт
}

/** Скакуны и другие животные */
export enum EMount {
    warhorse,    // Боевой конь
    camel,       // Верблюд
    ridinghorse, // Ездовая лошадь
    drafthorse,  // Тягловая лошадь
    mastiff,     // Мастифф
    donkeymul,   // Осёл или мул
    pony,        // Пони
    elephant,    // Слон
}

/** Сёдла, упряжь и транспорт */
export enum ETackHarness {
    //note Доспех для лошади пропускаю, ему нужно одтельную таблицу, созданную из человеческих
    chariot,           // Карета
    carriage,          // Коляска
    stabling,          // Конюшня, в день
    feed,              // Корм, в день
    sled,              // Сани
    saddlebags,        // Седельные сумки
    'saddle.military', // Военное седло
    'saddle.pack',     // Грузовое седло
    'saddle.riding',   // Ездовое седло
    'saddle.exotic',   // Экзотическое седло
    cart,              // Телега
    bitbridle,         // Упряжь и уздечка
    wagon,             // Фургон
}

/** Водный транспорт */
export enum EWaterborneVehicle {
    warship,     // Военный корабль
    gallery,     // Галера
    keelboat,    // Килевая лодка
    longship,    // Ладья
    sailingship, // Парусный корабль
    rowboat,     // Шлюпка
}

/** Товары */
export enum EGood {
    wheat,               // Пшеница
    flourchiken,         // Мука или курица
    salt,                // Соль
    ironcanvas,          // Железо или холст
    coppercloth,         // Медь или ткань
    gingergoat,          // Имбирь или коза
    cinnamonpeppersheep, // Корица, перец или овца
    clovespig,           // Гвоздика или свинья
    silverlinen,         // Серебро или льняная ткань
    silkcow,             // Шёлк или корова
    saffronox,           // Шафран или вол
    gold,                // Золото
    platinum,            // Платина
}

/** Еда, напитки */
export enum EFood {
    'wine.common',        // Обычное вино (кружка)
    'wine.fine',          // Отличное вино (бутылка)
    meat,                 // Мясо
    'ale.gallon',         // Галлон пива
    'ale.mug',            // Кружка пива
    'inn.squalid',        // Нищенское проживание
    'inn.poor',           // Бедное проживание
    'inn.modest',         // Скромное проживание
    'inn.comfortable',    // Комфортное проживание
    'inn.wealthy',        // Богатое проживание
    'inn.aristocratic',   // Аристократическое проживание
    'meals.squalid',      // Нищенское пропитание
    'meals.poor',         // Бедное пропитание
    'meals.modest',       // Скромное пропитание
    'meals.comfortable',  // Комфортное пропитание
    'meals.wealthy',      // Богатое пропитание
    'meals.aristocratic', // Аристократическое пропитание
    cheese,               // Сыр
    banquet,              // Торжественный обед
    bread,                // Ломоть хлеба
}

export type TToolCategory = typeof fullToollsCats[number]

type TTool<T> = {
    id: T,
    category: TToolCategory
    name: string
    cost: number   // Цена в золотых монетах
    weight: number // Вес в фунтах
}

type TMount<T> = Omit<TTool<T>, 'weight'> & {
    speed: number  // Скорость в футах в секунду
    carruingCapacity: number  // Грузоподъёмность в футах
}

type TWaterborne<T> = Omit<TTool<T>, 'weight'> & {
    speed: number  // Миль в час
}

type TCostedItem<T> = {
    id: T
    name: string
    cost: number   // Цена в золотых монетах
}

const fullToollsCats = [
    'Воровские инструменты',
    'Игровой набор',
    'Инструменты навигатора',
    'Инструменты отравителя',
    'Инструменты ремесленника',
    'Музыкальные инструменты',
    'Набор для грима',
    'Набор для фальсификации',
    'Набор травника',
    'Транспорт',
] as const

/** Наборы инструментов */
export const fullToolsList: TTool<ETool>[] = [{
    id: ETool.brewer,
    category: 'Инструменты ремесленника',
    name: 'Инструменты пивовара',
    cost: 20,
    weight: 9,
}, {
    id: ETool.smith,
    category: 'Инструменты ремесленника',
    name: 'Инструменты кузнеца',
    cost: 20,
    weight: 8,
}, {
    id: ETool.masons,
    category: 'Инструменты ремесленника',
    name: 'Инструменты каменщика',
    cost: 10,
    weight: 8,
}, {
    id: ETool.tinkers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты жестянщика',
    cost: 50,
    weight: 10,
}, {
    id: ETool.alchemists,
    category: 'Инструменты ремесленника',
    name: 'Инструменты алхимика',
    cost: 50,
    weight: 8,
}, {
    id: ETool.calligraphers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты каллиграфа',
    cost: 10,
    weight: 5,
}, {
    id: ETool.carpenters,
    category: 'Инструменты ремесленника',
    name: 'Инструменты плотника',
    cost: 8,
    weight: 6,
}, {
    id: ETool.cartographers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты картографа',
    cost: 15,
    weight: 6,
}, {
    id: ETool.cobblers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты сапожника',
    cost: 5,
    weight: 5,
}, {
    id: ETool.cooks,
    category: 'Инструменты ремесленника',
    name: 'Инструменты повара',
    cost: 1,
    weight: 8,
}, {
    id: ETool.glassblowers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты стеклодува',
    cost: 30,
    weight: 5,
}, {
    id: ETool.jewelers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты ювелира',
    cost: 25,
    weight: 2,
}, {
    id: ETool.leatherworkers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты кожевника',
    cost: 5,
    weight: 5,
}, {
    id: ETool.painters,
    category: 'Инструменты ремесленника',
    name: 'Инструменты художника',
    cost: 10,
    weight: 5,
}, {
    id: ETool.weavers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты ткача',
    cost: 1,
    weight: 5,
}, {
    id: ETool.woodcarvers,
    category: 'Инструменты ремесленника',
    name: 'Инструменты резчика по дереву',
    cost: 1,
    weight: 5,
}, {
    id: ETool.disguise,
    category: 'Набор для грима',
    name: 'Набор для грима',
    cost: 25,
    weight: 3,
}, {
    id: ETool.forgery,
    category: 'Набор для фальсификации',
    name: 'Набор для фальсификации',
    cost: 15,
    weight: 5,
}, {
    id: ETool.dice,
    category: 'Игровой набор',
    name: 'Кости',
    cost: .1,
    weight: 0,
}, {
    id: ETool.dragonchess,
    category: 'Игровой набор',
    name: 'Драконьи шахматы',
    cost: 1,
    weight: .5,
}, {
    id: ETool.playingcard,
    category: 'Игровой набор',
    name: 'Карты',
    cost: .5,
    weight: 0,
}, {
    id: ETool.threedragonante,
    category: 'Игровой набор',
    name: 'Ставка трёх драконов',
    cost: 1,
    weight: 0,
}, {
    id: ETool.herbalism,
    category: 'Набор травника',
    name: 'Набор травника',
    cost: 5,
    weight: 3,
}, {
    id: ETool.drum,
    category: 'Музыкальные инструменты',
    name: 'Барабан',
    cost: 6,
    weight: 3,
}, {
    id: ETool.viol,
    category: 'Музыкальные инструменты',
    name: 'Виола',
    cost: 30,
    weight: 1,
}, {
    id: ETool.bagpipes,
    category: 'Музыкальные инструменты',
    name: 'Волынка',
    cost: 30,
    weight: 6,
}, {
    id: ETool.lyre,
    category: 'Музыкальные инструменты',
    name: 'Лира',
    cost: 30,
    weight: 2,
}, {
    id: ETool.lute,
    category: 'Музыкальные инструменты',
    name: 'Лютня',
    cost: 35,
    weight: 2,
}, {
    id: ETool.horn,
    category: 'Музыкальные инструменты',
    name: 'Рожок',
    cost: 3,
    weight: 2,
}, {
    id: ETool.panflute,
    category: 'Музыкальные инструменты',
    name: 'Свирель',
    cost: 12,
    weight: 2,
}, {
    id: ETool.flute,
    category: 'Музыкальные инструменты',
    name: 'Флейта',
    cost: 2,
    weight: 1,
}, {
    id: ETool.dulcimer,
    category: 'Музыкальные инструменты',
    name: 'Цимбалы',
    cost: 25,
    weight: 10,
}, {
    id: ETool.shawm,
    category: 'Музыкальные инструменты',
    name: 'Шалмей',
    cost: 2,
    weight: 1,
}, {
    id: ETool.navigators,
    category: 'Инструменты навигатора',
    name: 'Инструменты навигатора',
    cost: 25,
    weight: 2,
}, {
    id: ETool.poisoners,
    category: 'Инструменты отравителя',
    name: 'Инструменты отравителя',
    cost: 50,
    weight: 2,
}, {
    id: ETool.thieves,
    category: 'Воровские инструменты',
    name: 'Воровские инструменты',
    cost: 25,
    weight: 1,
}, {
    id: ETool.vehicles,
    category: 'Транспорт',
    name: 'Транспорт',
    cost: 0,
    weight: 0,
}] as const

/** Скакуны и другие животные */
export const fullMountsList: TMount<EMount>[] = [{
    id: EMount.warhorse,
    category: 'Транспорт',
    name: 'Боевой конь',
    cost: 400,
    speed: 60,
    carruingCapacity: 540,
}, {
    id: EMount.camel,
    category: 'Транспорт',
    name: 'Верблюд',
    cost: 50,
    speed: 50,
    carruingCapacity: 480,
}, {
    id: EMount.ridinghorse,
    category: 'Транспорт',
    name: 'Ездовая лошадь',
    cost: 75,
    speed: 60,
    carruingCapacity: 480,
}, {
    id: EMount.drafthorse,
    category: 'Транспорт',
    name: 'Тягловая лошадь',
    cost: 50,
    speed: 40,
    carruingCapacity: 540,
}, {
    id: EMount.mastiff,
    category: 'Транспорт',
    name: 'Мастифф',
    cost: 25,
    speed: 40,
    carruingCapacity: 195,
}, {
    id: EMount.donkeymul,
    category: 'Транспорт',
    name: 'Осёл или мул',
    cost: 8,
    speed: 40,
    carruingCapacity: 420,
}, {
    id: EMount.pony,
    category: 'Транспорт',
    name: 'Пони',
    cost: 30,
    speed: 40,
    carruingCapacity: 225,
}, {
    id: EMount.elephant,
    category: 'Транспорт',
    name: 'Слон',
    cost: 200,
    speed: 40,
    carruingCapacity: 1320,
}] as const

/** Сёдла, упряжь и транспорт */
export const fullTackHarnessList: TTool<ETackHarness>[] = [{
    id: ETackHarness.chariot,
    category: 'Транспорт',
    name: 'Карета',
    cost: 250,
    weight: 100,
}, {
    id: ETackHarness.carriage,
    category: 'Транспорт',
    name: 'Коляска',
    cost: 100,
    weight: 600,
}, {
    id: ETackHarness.stabling,
    category: 'Транспорт',
    name: 'Конюшня (в день)',
    cost: .5,
    weight: 0,
}, {
    id: ETackHarness.feed,
    category: 'Транспорт',
    name: 'Корм (в день)',
    cost: .05,
    weight: 10,
}, {
    id: ETackHarness.sled,
    category: 'Транспорт',
    name: 'Сани',
    cost: 20,
    weight: 300,
}, {
    id: ETackHarness.saddlebags,
    category: 'Транспорт',
    name: 'Седельные сумки',
    cost: 4,
    weight: 8,
}, {
    id: ETackHarness['saddle.military'],
    category: 'Транспорт',
    name: 'Военное седло',
    cost: 20,
    weight: 30,
}, {
    id: ETackHarness['saddle.pack'],
    category: 'Транспорт',
    name: 'Грузовое седло',
    cost: 5,
    weight: 15,
}, {
    id: ETackHarness['saddle.riding'],
    category: 'Транспорт',
    name: 'Ездовое седло',
    cost: 10,
    weight: 35,
}, {
    id: ETackHarness['saddle.exotic'],
    category: 'Транспорт',
    name: 'Экзотическое седло',
    cost: 60,
    weight: 40,
}, {
    id: ETackHarness.cart,
    category: 'Транспорт',
    name: 'Телега',
    cost: 15,
    weight: 200,
}, {
    id: ETackHarness.bitbridle,
    category: 'Транспорт',
    name: 'Упряжь и уздечка',
    cost: 2,
    weight: 1,
}, {
    id: ETackHarness.wagon,
    category: 'Транспорт',
    name: 'Фургон',
    cost: 35,
    weight: 400,
}] as const

/** Водный транспорт */
export const fullWaterborneVehiclesList: TWaterborne<EWaterborneVehicle>[] = [{
    id: EWaterborneVehicle.warship,
    category: 'Транспорт',
    name: 'Военный корабль',
    cost: 25_000,
    speed: 2.5,
}, {
    id: EWaterborneVehicle.gallery,
    category: 'Транспорт',
    name: 'Галера',
    cost: 30_000,
    speed: 4,
}, {
    id: EWaterborneVehicle.keelboat,
    category: 'Транспорт',
    name: 'Килевая лодка',
    cost: 3_000,
    speed: 1,
}, {
    id: EWaterborneVehicle.longship,
    category: 'Транспорт',
    name: 'Ладья',
    cost: 10_000,
    speed: 3,
}, {
    id: EWaterborneVehicle.sailingship,
    category: 'Транспорт',
    name: 'Парусный корабль',
    cost: 10_000,
    speed: 2,
}, {
    id: EWaterborneVehicle.rowboat,
    category: 'Транспорт',
    name: 'Шлюпка',
    cost: 50,
    speed: 1.5,
}] as const

/** Товары */
export const fullgoodsList: TCostedItem<EGood>[] = [{
    id: EGood.wheat,
    name: '1 фунт пшеницы',
    cost: .01,
}, {
    id: EGood.flourchiken,
    name: '1 фунт муки или 1 курица',
    cost: .02,
}, {
    id: EGood.salt,
    name: '1 фунт соли',
    cost: .05,
}, {
    id: EGood.ironcanvas,
    name: '1 фунт железа или 1 кв. м. холста',
    cost: .1,
}, {
    id: EGood.coppercloth,
    name: '1 фунт меди или 1 кв. м. хлопчатобумажной ткани',
    cost: .5,
}, {
    id: EGood.gingergoat,
    name: '1 фунт имбиря или 1 коза',
    cost: 1,
}, {
    id: EGood.cinnamonpeppersheep,
    name: '1 фунт корицы или перца или 1 овца',
    cost: 2,
}, {
    id: EGood.clovespig,
    name: '1 фунт гвоздики или 1 свинья',
    cost: 3,
}, {
    id: EGood.silverlinen,
    name: '1 фунт серебра или 1 кв. м. льняной ткани',
    cost: 5,
}, {
    id: EGood.silkcow,
    name: '1 кв. м. шёлка или 1 корова',
    cost: 10,
}, {
    id: EGood.saffronox,
    name: '1 фунт шафрана или 1 вол',
    cost: 15,
}, {
    id: EGood.gold,
    name: '1 фунт золота',
    cost: 50,
}, {
    id: EGood.platinum,
    name: '1 фунт платины',
    cost: 500,
}] as const

/** Еда, напитки */
export const fullFoodList: TCostedItem<EFood>[] = [{
    id: EFood['wine.common'],
    name: 'Обычное вино (кружка)',
    cost: .2,
}, {
    id: EFood['wine.fine'],
    name: 'Отличное вино (бутылка)',
    cost: 10,
}, {
    id: EFood.meat,
    name: 'Мясо (кусок)',
    cost: .3,
}, {
    id: EFood['ale.gallon'],
    name: 'Галлон пива',
    cost: .2,
}, {
    id: EFood['ale.mug'],
    name: 'Кружка пива',
    cost: .04,
}, {
    id: EFood['inn.squalid'],
    name: 'Нищенское проживание (за день)',
    cost: .07,
}, {
    id: EFood['inn.poor'],
    name: 'Бедное проживание (за день)',
    cost: .1,
}, {
    id: EFood['inn.modest'],
    name: 'Скромное проживание (за день)',
    cost: .5,
}, {
    id: EFood['inn.comfortable'],
    name: 'Комфортное проживание (за день)',
    cost: .8,
    }, {
    id: EFood['inn.wealthy'],
    name: 'Богатое проживание (за день)',
    cost: 2,
}, {
    id: EFood['inn.aristocratic'],
    name: 'Аристократическое проживание (за день)',
    cost: 4,
}, {
    id: EFood['meals.squalid'],
    name: 'Нищенское пропитание (за день)',
    cost: .03,
}, {
    id: EFood['meals.poor'],
    name: 'Бедное пропитание (за день)',
    cost: .06,
}, {
    id: EFood['meals.modest'],
    name: 'Скромное пропитание (за день)',
    cost: .3,
}, {
    id: EFood['meals.comfortable'],
    name: 'Комфортное пропитание (за день)',
    cost: .5,
}, {
    id: EFood['meals.wealthy'],
    name: 'Богатое пропитание (за день)',
    cost: .8,
}, {
    id: EFood['meals.aristocratic'],
    name: 'Аристократическое пропитание (за день)',
    cost: 2,
}, {
    id: EFood.cheese,
    name: 'Кусок сыра',
    cost: .1,
}, {
    id: EFood.banquet,
    name: 'Торжественный обед (на 1 едока)',
    cost: 10,
}, {
    id: EFood.bread,
    name: 'Ломоть хлеба',
    cost: .02,
}] as const

/** Фильтр инструментов по категории */
export function getToolsByCategory(category: TToolCategory): TTool<ETool>[] {
    return Object.values(fullToolsList).filter(tool => tool.category === category)
}

//TODO Доспехи для лошадей такие же, как для людей, только в 4 раза дороже и в 2 раза тяжелее. Скопировать из людских?