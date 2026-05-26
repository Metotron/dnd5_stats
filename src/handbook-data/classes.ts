/** Игровые классы персонажей */

export enum ECharClass {
	bard,
	barbarian,
	fighter,
	wizard,
	druid,
	cleric,
	warlock,
	monk,
	paladin,
	rogue,
	ranger,
	sorcerer,
}

//TODO Расширить характеристики до полного описания класса

export type TCharClass = {
	charClass: ECharClass
	name: string
	hitDice: 6 | 8 | 10 | 12
}

export const fullCharClassesList: TCharClass[] = [
	{ charClass: ECharClass.bard,      name: 'Бард',      hitDice: 8 },
	{ charClass: ECharClass.barbarian, name: 'Варвар',    hitDice: 12 },
	{ charClass: ECharClass.fighter,   name: 'Воин',      hitDice: 10 },
	{ charClass: ECharClass.wizard,    name: 'Волшебник', hitDice: 6 },
	{ charClass: ECharClass.druid,     name: 'Друид',     hitDice: 8 },
	{ charClass: ECharClass.cleric,    name: 'Жрец',      hitDice: 8 },
	{ charClass: ECharClass.warlock,   name: 'Колдун',    hitDice: 8 },
	{ charClass: ECharClass.monk,      name: 'Монах',     hitDice: 8 },
	{ charClass: ECharClass.paladin,   name: 'Паладин',   hitDice: 10 },
	{ charClass: ECharClass.rogue,     name: 'Плут',      hitDice: 8 },
	{ charClass: ECharClass.ranger,    name: 'Следопыт',  hitDice: 10 },
	{ charClass: ECharClass.sorcerer,  name: 'Чародей',   hitDice: 6 },
] as const

export function getClassValue(charClass: ECharClass): TCharClass {
	return fullCharClassesList.find(ccl => ccl.charClass == charClass)!
}