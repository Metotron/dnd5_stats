/** @description Предыстории */

import type { TBaseRaceDescription } from './races'
import { ESkill } from './skills'

/** Общий тип предыстории */
export enum EBackgroundClass {
	acolyte,      // Прислужник
	charlatan,    // Шарлатан
	criminal,     // Преступник
	entertainer,  // Артист
	folkhero,     // Народный герой
	guildartisan, // Гильдийский ремесленние
	hermit,       // Отшельник
	noble,        // Благородный
	outlander,    // Чужеземец
	sage,         // Мудрец
	sailor,       // Моряк
	soldier,      // Солдат
	urchin,       // Беспризорник
}

/** Конкретный подтип предыстории */
export enum EBackground {
	'acolyte.standard',

}

export type TBackground = {
	id: EBackground
	className: string
	name: string
	diff: Partial<TBaseRaceDescription>
}

export const fullBackgroundsList: TBackground[] = [{
	id: EBackground['acolyte.standard'],
	className: 'Прислужник',
	name: 'Прислужник',
	diff: {
		skills: [ESkill.insight, ESkill.religion],
		languages: ['Два языка на выбор'],
		goods: [
			'Священный символ (подаренный вам в момент принятия священного сана)',
			'молитвенник или молитвенный барабан',
			'5 палочек благовоний',
			'облачение',
			'комплект обычной одежды',
			'поясной кошель с {15 зм}',
		],
		features: [],
	}
}]