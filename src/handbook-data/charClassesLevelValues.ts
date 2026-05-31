/** @description Числовые значения, которые меняются с уровнем для разных классов */

type TLevelValue = number | `${number}${number}${number}${number}${number}${number}${number}${number}${number}` | `${number}${number}${number}${number}${number}`
/** Значения характеристики для каждого из 20 уровней */
type TValueArray = [TLevelValue, TLevelValue, TLevelValue, TLevelValue, TLevelValue,
					TLevelValue, TLevelValue, TLevelValue, TLevelValue, TLevelValue,
					TLevelValue, TLevelValue, TLevelValue, TLevelValue, TLevelValue,
					TLevelValue, TLevelValue, TLevelValue, TLevelValue, TLevelValue]

type TBard = Record<'bardicDie' | 'cantrips' | 'preparedSpells' | 'spellSlots', TValueArray>
type TBarbarian = Record<'rages' | 'rageDamage' | 'weaponMastery', TValueArray>
type TFighter = Record<'secondWind'| 'weaponMastery', TValueArray>
type TWizard = Record<'cantrips' | 'preparedSpells' | 'spellSlots', TValueArray>
type TDruid = Record<'wildShape' | 'cantrips' | 'preparedSpells' | 'spellSlots', TValueArray>
type TCleric = Record<'channelDivinity' | 'cantrips' | 'preparedSpells' | 'spellSlots', TValueArray>
type TWarlock = Record<'eldrichInvocations' | 'cantrips' | 'preparedSpells' | 'spellSlots' | 'slotLevel', TValueArray>
type TMonk = Record<'martialArts' | 'focusPoints' | 'unarmoredMovement', TValueArray>
type TPaladin = Record<'channelDivinity' | 'preparedSpells' | 'spellSlots', TValueArray>
type TRogue = Record<'sneakAttack', TValueArray>
type TRanger = Record<'favoredEnemy' | 'preparedSpells' | 'spellSlots', TValueArray>
type TSorcerer = Record<'sorceryPoints' | 'cantrips' | 'preparedSpells' | 'spellSlots', TValueArray>

type TValues =
	| Record<'bard', TBard>
	| Record<'barbarian', TBarbarian>
	| Record<'fighter', TFighter>
	| Record<'wizard', TWizard>
	| Record<'druid', TDruid>
	| Record<'cleric', TCleric>
	| Record<'warlock', TWarlock>
	| Record<'monk', TMonk>
	| Record<'paladin', TPaladin>
	| Record<'rogue', TRogue>
	| Record<'ranger', TRanger>
	| Record<'sorcerer', TSorcerer>


function cantripGenerator(startValue: number): TValueArray {
	const ret: number[] = []
	let value = startValue
	for (let lvl = 1; lvl <= 20; lvl++) {
		if (lvl == 4 || lvl == 10)
			value++
		ret.push(value)
	}

	return ret as TValueArray
}

const basePreparedSpells: TValueArray = [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22]
const spellSlots: TValueArray = ['200000000', '300000000', '420000000', '430000000', '432000000',
								'433000000', '433100000', '433200000', '433310000', '433320000',
								'433321000', '433321000', '433321100', '433321100', '433321110',
								'433321110', '433321111', '433331111', '433332111', '433332211']

export const charClassValues: TValues = {
	bard: {
		// Кость бардовского вдохновения
		bardicDie: [6, 6, 6, 6, 8, 8, 8, 8, 8, 10, 10, 10, 10, 10, 12, 12, 12, 12, 12, 12],
		// Количество заговоров
		cantrips: cantripGenerator(2),
		// Количество подготовленных заклинаний на день
		preparedSpells: basePreparedSpells,
		// Количество заклинаний каждого из 9 уровней
		spellSlots,
	},

	barbarian: {
		// Количество входов в ярость
		rages: [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6],
		// Бонус к урону
		rageDamage: [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
		// Количество оружейных приёмов
		weaponMastery: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	},

	fighter: {
		// Количество использований «Второго дыхания»
		secondWind: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		// Количество оружейных приёмов
		weaponMastery: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6],
	},

	wizard: {
		// Количество заговоров
		cantrips: cantripGenerator(3),
		// Количество подготовленных заклинаний на день
		preparedSpells: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 18, 19, 21, 22, 23, 24, 25],
		// Количество заклинаний каждого из 9 уровней
		spellSlots,
	},

	druid: {
		// Количество использований Дикой формы
		wildShape: [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
		// Количество заговоров
		cantrips: cantripGenerator(2),
		// Количество подготовленных заклинаний
		preparedSpells: basePreparedSpells,
		// Количество заклинаний каждого из 9 уровней
		spellSlots,
	},

	cleric: {
		// Использований божественного канала
		channelDivinity: [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4],
		// Количество заговоров
		cantrips: cantripGenerator(3),
		// Количество подготовленных заклинаний
		preparedSpells: basePreparedSpells,
		// Количество заклинаний каждого из 9 уровней
		spellSlots,
	},

	warlock: {
		// Количество таинственных воззваний
		eldrichInvocations: [1, 3, 3, 3, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10],
		// Количество заговоров
		cantrips: cantripGenerator(2),
		// Количество подготовленных заклинаний
		preparedSpells: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
		// Количество ячеек заклинаний
		spellSlots: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
		// Уровень ячеек
		slotLevel: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	},

	monk: {
		// Кость боевых искусств
		martialArts: [6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12],
		// Очки духа
		focusPoints: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		// Движение без доспехов: без доспехов и без щита
		unarmoredMovement: [0, 10, 10, 10, 10, 15, 15, 15, 15, 20, 20, 20, 20, 25, 25, 25, 25, 30, 30, 30],
	},

	paladin: {
		// Количество применений божественного канала
		channelDivinity: [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		// Количество подготовленных заклинаний
		preparedSpells: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15],
		// Количество заклинаний каждого из 5 уровней
		spellSlots: ['20000', '20000', '30000', '30000', '42000',
					'42000', '43000', '43000', '43200', '43200',
					'43300', '43300', '43310', '43310', '43320',
					'43320', '43331', '43331', '43332', '43332'],
	},

	rogue: {
		// Количество d6 при скрытой атаке
		sneakAttack: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10],
	},

	ranger: {
		favoredEnemy: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
		// Количество подготовленных заклинаний
		preparedSpells: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15],
		// Количество заклинаний каждого из 5 уровней
		spellSlots: ['20000', '20000', '30000', '30000', '42000',
					'42000', '43000', '43000', '43200', '43200',
					'43300', '43300', '43310', '43310', '43320',
					'43320', '43331', '43331', '43332', '43332']
	},

	sorcerer: {
		// Очки чародейства
		sorceryPoints: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		// Количество заговоров
		cantrips: cantripGenerator(4),
		// Количество подготовленных заклинаний на день
		preparedSpells: [2, 4, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
		// Количество заклинаний каждого из 9 уровней
		spellSlots,
	},
}