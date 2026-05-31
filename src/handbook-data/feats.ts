/** @description Черты */

export enum EFeat {
	alert,
	crafter,
	healer,
	lucky,
	magicinitiate,
	musician,
	savageattacker,
	skilled,
	tavernbrawler,
	tough,
	abilityscoreimprovement,
	actor,
	athlete



}

export enum EFeatType {
	origin,
	general,
	fightingstyle,
	epicboon
}

type TFeat = {
	id: EFeat,
	group: EFeatType
	name: string
	moreThanOnce?: true
}

//TODO Пока просто набросал
export const fullFeatsList: TFeat[] = [{
	id: EFeat.alert,
	group: EFeatType.origin,
	name: 'Бдительный',
}, {
	id: EFeat.crafter,
	group: EFeatType.origin,
	name: 'Ремесленние',
}, {
	id: EFeat.healer,
	group: EFeatType.origin,
	name: 'Лекарь',
}, {
	id: EFeat.lucky,
	group: EFeatType.origin,
	name: 'Лаки',
}, {
	id: EFeat.magicinitiate,
	group: EFeatType.origin,
	name: 'Посвящённый в магию',
	moreThanOnce: true,
}, {
	id: EFeat.musician,
	group: EFeatType.origin,
	name: 'Музицын',
}, {
	id: EFeat.savageattacker,
	group: EFeatType.origin,
	name: 'Дикий атакующий',
}, {
	id: EFeat.skilled,
	group: EFeatType.origin,
	name: 'Одарённый',
	moreThanOnce: true,
}, {
	id: EFeat.tavernbrawler,
	group: EFeatType.origin,
	name: 'Драчун',
}, {
	id: EFeat.tough,
	group: EFeatType.origin,
	name: 'Тох',
}, {
	id: EFeat.abilityscoreimprovement,
	group: EFeatType.general,
	name: '',
	moreThanOnce: true,
}, {
	id: EFeat.actor,
	group: EFeatType.general,
	name: '',
}, {
	id: EFeat.athlete,
	group: EFeatType.general,
	name: '',
},]