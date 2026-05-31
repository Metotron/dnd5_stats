/** @description Предыстории */

import type { TBaseSpeciesDescription } from './species'
import { ESkill } from './skills'
import { ETool } from './tools'
import { EFeat } from './feats'
import { EWeapon } from './weapons'


/** Предыстория */
export enum EOrigin {
	entertainer,  // Артист
	noble,        // Благородный
	sailor,       // Моряк
	sage,         // Мудрец
	hermit,       // Отшельник
	scribe,       // Писарь
	acolyte,      // Прислужник
	criminal,     // Преступник
	guide,        // Путешественник
	artisan,      // Ремесленник
	soldier,      // Солдат
	guard,        // Стражник
	wayfarer,     // Странник
	merchant,     // Торговец
	farmer,       // Фермер
	charlatan,    // Шарлатан
'sailor.badreputation',  // Моряк с дурной репутацией
}

export type TOrigin = {
	id: EOrigin
	name: string
	diff: Partial<TBaseSpeciesDescription>
}

export const fullOriginsList: TOrigin[] = [{
	id: EOrigin.entertainer,
	name: 'Артист',
	diff: {
		charsForGrow: ['str', 'int', 'cha'],
		feat: EFeat.musician,
		skills: [ESkill.acrobatics, ESkill.performance],
		features: ['Владеете одним видом музыкального инструмента'],
		goods: [
			'Музыкальный инструмент (на выбор)',
			'2 костюма',
			'Стальное зеркало',
			'Духи',
			'Одежда путешественника',
			'{11 зм}',
		],
	}
}, {
	id: EOrigin.noble,
	name: 'Благородный',
	diff: {
		charsForGrow: ['str', 'int', 'cha'],
		feat: EFeat.skilled,
		skills: [ESkill.history, ESkill.persuasion],
		features: ['Владеете игровым набором на выбор'],
		goods: [
			'Парадная одежда',
			'Игровой набор',
			'Духи',
			'{29 зм}',
		],
	}
}, {
	id: EOrigin.sailor,
	name: 'Моряк',
	diff: {
		charsForGrow: ['str', 'dex', 'wis'],
		feat: EFeat.tavernbrawler,
		skills: [ESkill.acrobatics, ESkill.perception],
		toolProficiencies: [ETool.navigators],
		goods: [
			EWeapon.dagger,
			ETool.navigators,
			'Верёвка',
			'Одежда путешественника',
			'{20 зм}',
		],
	}
}, {
	id: EOrigin.sage,
	name: 'Мудрец',
	diff: {
		charsForGrow: ['con', 'int', 'wis'],
		feat: EFeat.magicinitiate,
		skills: [ESkill.arcana, ESkill.history],
		toolProficiencies: [ETool.calligraphers],
		features: ['Для черты {Посвящённый в магию} выбирайте заклинания {Волшебника}'],
		goods: [
			EWeapon.quaterstaff,
			'Книга (история)',
			ETool.calligraphers,
			'Роба',
			'Пергамент (8 листов)',
			'{8 зм}',
		],
	}
}, {
	id: EOrigin.hermit,
	name: 'Отшельник',
	diff: {
		charsForGrow: ['con', 'wis', 'cha'],
		feat: EFeat.healer,
		skills: [ESkill.medicine, ESkill.religion],
		toolProficiencies: [ETool.herbalism],
		goods: [
			EWeapon.quaterstaff,
			'Спальник',
			'Лампа',
			'Масло (3 фляги)',
			'Книга (философия)',
			'Одежда путешественника',
			'Набор травника',
			'{16 зм}'
		],
	}
}, {
	id: EOrigin.scribe,
	name: 'Писарь',
	diff: {
		charsForGrow: ['dex', 'int', 'wis'],
		feat: EFeat.skilled,
		skills: [ESkill.investigation, ESkill.perception],
		toolProficiencies: [ETool.calligraphers],
		goods: [
			ETool.calligraphers,
			'Парадная одежда',
			'Лампа',
			'Масло (3 фляги)',
			'Пергамент (12 листов)',
			'{23 зм}',
		],
	}
}, {
	id: EOrigin.acolyte,
	name: 'Послушник',
	diff: {
		charsForGrow: ['int', 'wis', 'cha'],
		feat: EFeat.magicinitiate,
		skills: [ESkill.insight, ESkill.religion],
		toolProficiencies: [ETool.calligraphers],
		features: ['Для черты {Посвящённый в магию} выбирайте заклинания {Жреца}'],
		goods: [
			ETool.calligraphers,
			'Книга (молитвенник)',
			'Священный символ',
			'Пергамент (10 листов)',
			'Роба',
			'{8 зм}',
		],
	}
}, {
	id: EOrigin.criminal,
	name: 'Преступник',
	diff: {
		charsForGrow: ['dex', 'con', 'int'],
		feat: EFeat.alert,
		skills: [ESkill.sleightOfHand, ESkill.stealth],
		toolProficiencies: [ETool.thieves],
		goods: [
			EWeapon.dagger,
			EWeapon.dagger,
			ETool.thieves,
			'Лом',
			'2 сумки',
			'Одежда путешественника',
			'{16 зм}',
		],
	}
}, {
	id: EOrigin.guide,
	name: 'Путешественник',
	diff: {
		charsForGrow: ['dex', 'con', 'wis'],
		feat: EFeat.magicinitiate,
		skills: [ESkill.stealth, ESkill.survival],
		toolProficiencies: [ETool.cartographers],
		features: ['Для черты {Посвящённый в магию} выбирайте заклинания {Друида}'],
		goods: [
			EWeapon.shortbow,
			ETool.cartographers,
			'Колчан',
			'20 стрел',
			'Палатка',
			'Спальник',
			'Одежда путешественника',
			'{3 зм}',
		],
	}
}, {
	id: EOrigin.artisan,
	name: 'Ремесленник',
	diff: {
		charsForGrow: ['str', 'dex', 'int'],
		feat: EFeat.crafter,
		skills: [ESkill.investigation, ESkill.persuasion],
		features: ['Владеете инструментом ремесленника на выбор'],
		goods: [
			'Инструменты ремесленника',
			'2 сумки',
			'Одежда путешественника',
			'{32 зм}',
		],
	}
}, {
	id: EOrigin.soldier,
	name: 'Солдат',
	diff: {
		charsForGrow: ['str', 'dex', 'con'],
		feat: EFeat.savageattacker,
		skills: [ESkill.athletics, ESkill.intimidation],
		features: ['Владеете игровым набором на выбор'],
		goods: [
			EWeapon.spear,
			EWeapon.shortbow,
			'Колчан',
			'20 стрел',
			'Игровой набор',
			'Комплект целителя',
			'Одежда путешественника',
			'{14 зм}',
		],
	}
}, {
	id: EOrigin.guard,
	name: 'Стражник',
	diff: {
		charsForGrow: ['str', 'int', 'wis'],
		feat: EFeat.alert,
		skills: [ESkill.athletics, ESkill.perception],
		features: ['Владеете игровым набором на выбор'],
		goods: [
			EWeapon.spear,
			EWeapon.lightcrossbow,
			'Колчан',
			'20 болтов',
			'Игровой набор',
			'Закрытый фонарь',
			'Кандалы',
			'Одежда путешественника',
			'{12 зм}',
		],
	}
}, {
	id: EOrigin.wayfarer,
	name: 'Странник',
	diff: {
		charsForGrow: ['dex', 'wis', 'cha'],
		feat: EFeat.lucky,
		skills: [ESkill.insight, ESkill.stealth],
		toolProficiencies: [ETool.thieves],
		goods: [
			EWeapon.dagger,
			EWeapon.dagger,
			ETool.thieves,
			'Игровой набор (любой)',
			'Спальник',
			'2 сумки',
			'Одежда путешественника',
			'{16 зм}',
		],
	}
}, {
	id: EOrigin.merchant,
	name: 'Торговец',
	diff: {
		charsForGrow: ['con', 'int', 'cha'],
		feat: EFeat.lucky,
		skills: [ESkill.persuasion, ESkill.animalHandling],
		toolProficiencies: [ETool.navigators],
		goods: [
			ETool.navigators,
			'2 сумки',
			'Одежда путешественника',
			'{22 зм}',
		],
	}
}, {
	id: EOrigin.farmer,
	name: 'Фермер',
	diff: {
		charsForGrow: ['str', 'con', 'wis'],
		feat: EFeat.tough,
		skills: [ESkill.nature, ESkill.animalHandling],
		toolProficiencies: [ETool.carpenters],
		goods: [
			EWeapon.sickle,
			ETool.carpenters,
			'Комплект целителя',
			'Железный горшок',
			'Лопата',
			'Одежда путешественника',
			'{30 зм}',
		],
	}
}, {
	id: EOrigin.charlatan,
	name: 'Шарлатан',
	diff: {
		charsForGrow: ['dex', 'con', 'cha'],
		feat: EFeat.skilled,
		skills: [ESkill.deception, ESkill.sleightOfHand],
		toolProficiencies: [ETool.forgery],
		goods: [
			ETool.forgery,
			'Костюм',
			'Парадная одежда',
			'{15 зм}',
		],
	}
}]