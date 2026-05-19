import { ESkill } from './skills'
import type { TStat } from './stats'

export enum EBaseRace {
	dwarf,
	elf,
	halfling,
	human,
	dragonborn,
	gnome,
	halfelf,
	halforc,
	tiefling
}

export enum ERace {
	'Dwarf.Hill',
	'Dwarf.Mountain'
}

type TBaseRaceDescription = {
	name: string
	statsModifiers?: Partial<Record<TStat, number>>[]  // Модификаторы характеристик
	speed: 25 | 30  // Футов в секунду
	darkvision: boolean
	languages: string[]
	features?: string[]
	weaponCatProfiencies?: string[]  //TODO Подставить идентификаторы категорий оружия
	weaponProfiencies?: string[]  //TODO Подставить идентификаторы оружия
	toolProfiencies?: string[]  // Владение инструментами для выбора: 'кузнеца', 'пивовара'  //TODO Подставить инструменты
	skills?: ESkill[]
}

function makeEmptyDescription(): TBaseRaceDescription {
	return {
		name: '',
		statsModifiers: [],
		speed: 25,
		darkvision: false,
		features: [],
		weaponCatProfiencies: [],
		weaponProfiencies: [],
		toolProfiencies: [],
		languages: [],
		skills: []
	}
}

export type TRaceDescription = {
	baseRace: EBaseRace
}

//FIXME Применить makeEmptyDescription и дополнить его
const baseRaces: Partial<Record<EBaseRace, TBaseRaceDescription>> = {
	[EBaseRace.dwarf]: {
		name: 'Дварф',
		statsModifiers: [{ con: 2 }],
		speed: 25,
		languages: ['Общий', 'Дварфский'],
		darkvision: true,
		features: [
			'Сопротивление к урону ядом',
			'Преимущество при спасброске от яда',
			'Если вы совершаете проверку Интеллекта (История), связанную с происхождением работы по камню, вы считаетесь владеющим навыком История и добавляете к проверке удвоенный бонус мастерства вместо обычного.'
		],
		weaponCatProfiencies: ['Боевой топор', 'Ручной топор', 'Лёгкий молот', 'Боевой молот'],
		weaponProfiencies: [],
		toolProfiencies: ['кузнеца', 'пивовара', 'каменщика'],
	},
	[EBaseRace.elf]: {
		name: 'Эльф',
		statsModifiers: [{ dex: 2 }],
		skills: [ESkill.perception],
		speed: 30,
		languages: ['Общий', 'Эльфский'],
		darkvision: true,
		features: [
			'Невозможно магически усыпить',
			'Преимущество при спасброске от очарования',
			'Эльфы не спят, а погружаются в транс'
		],
	},
	[EBaseRace.halfling]: {
		name: 'Полурослик',
	},
	[EBaseRace.human]: {
		name: 'Человек',
	},
	[EBaseRace.dragonborn]: {
		name: 'Драконорожденный',
	},
	[EBaseRace.gnome]: {
		name: 'Гном',
	},
	[EBaseRace.halfelf]: {
		name: 'Полуэльф',
	},
	[EBaseRace.halforc]: {
		name: 'Полуорк',
	},
	[EBaseRace.tiefling]: {
		name: 'Тифлинг',
	},
}


export const fullRacesList: TRaceDescription = {
	baseRace: EBaseRace.dwarf
}
//FIXME Сделать подвиды для каждой расы