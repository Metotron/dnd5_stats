/** Идентификаторы классов персонажа */
type CharClassID = 'bard' | 'barbarian' | 'fighter' | 'wizard' | 'druid' | 'cleric' |
                    'warlock' | 'monk' | 'paladin' | 'rogue' | 'ranger' | 'sorcerer'

/** Соответствие идентификатора класса русскому наименованию и кости хитов */
type CharClassType = {
	[className in CharClassID]: {
		name: string,
		hitDice: 6 | 8 | 10 | 12
	}
}

export type { CharClassID, CharClassType }
export const charClasses: CharClassType = {
	bard: {
		name: 'Бард',
		hitDice: 8
	},
	barbarian: {
		name: 'Варвар',
		hitDice: 12
	},
	fighter: {
		name: 'Воин',
		hitDice: 10
	},
	wizard: {
		name: 'Волшебник',
		hitDice: 6
	},
	druid: {
		name: 'Друид',
		hitDice: 8
	},
	cleric: {
		name: 'Жрец',
		hitDice: 8
	},
	warlock: {
		name: 'Колдун',
		hitDice: 8
	},
	monk: {
		name: 'Монах',
		hitDice: 8
	},
	paladin: {
		name: 'Паладин',
		hitDice: 10
	},
	rogue: {
		name: 'Плут',
		hitDice: 8
	},
	ranger: {
		name: 'Следопыт',
		hitDice: 10
	},
	sorcerer: {
		name: 'Чародей',
		hitDice: 6
	}
}