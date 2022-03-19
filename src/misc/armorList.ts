enum TArmor {
	'padded',
	'leather',
	'studdedLeather',
	'hide',
	'chainShirt',
	'scaleMail',
	'breastplate',
	'halfPlate',
	'ringMail',
	'chainMail',
	'splint',
	'plate'
}

type TArmorType = 'Лёгкий доспех' | 'Средний доспех' | 'Тяжёлый доспех'

type TArmorDescription = {
	type: TArmor,
	name: string,
	AC: number,
	useDexModifier?: true,
	maximumDexModifier?: number,
	minimumStr?: number,
	stealthDisadvantage?: true
}

const armorList: Record<TArmorType, TArmorDescription[]> = {
	'Лёгкий доспех': [
		{
			type: TArmor.padded,
			name: 'Стёганый доспех',
			AC: 11,
			useDexModifier: true,
			stealthDisadvantage: true
		},
		{
			type: TArmor.leather,
			name: 'Кожаный доспех',
			AC: 11
		},
		{
			type: TArmor.studdedLeather,
			name: 'Проклёпанная кожа',
			AC: 12
		}
	],
	'Средний доспех': [
		{
			type: TArmor.hide,
			name: 'Шкурный доспех',
			AC: 12,
			useDexModifier: true,
			maximumDexModifier: 2
		},
		{
			type: TArmor.chainShirt,
			name: 'Кольчужная рубаха',
			AC: 13,
			useDexModifier: true,
			maximumDexModifier: 2
		},
		{
			type: TArmor.scaleMail,
			name: 'Чешуйчатый доспех',
			AC: 14,
			useDexModifier: true,
			maximumDexModifier: 2,
			stealthDisadvantage: true
		},
		{
			type: TArmor.breastplate,
			name: 'Кираса',
			AC: 14,
			useDexModifier: true,
			maximumDexModifier: 2
		},
		{
			type: TArmor.halfPlate,
			name: 'Полулаты',
			AC: 15,
			useDexModifier: true,
			stealthDisadvantage: true,
			maximumDexModifier: 2
		},
	],
	'Тяжёлый доспех': [
		{
			type: TArmor.ringMail,
			name: 'Колечный доспех',
			AC: 14,
			stealthDisadvantage: true
		},
		{
			type: TArmor.chainMail,
			name: 'Кольчуга',
			AC: 16,
			minimumStr: 13,
			stealthDisadvantage: true
		},
		{
			type: TArmor.splint,
			name: 'Наборный доспех',
			AC: 17,
			minimumStr: 15,
			stealthDisadvantage: true
		},
		{
			type: TArmor.plate,
			name: 'Латы',
			AC: 18,
			minimumStr: 15,
			stealthDisadvantage: true
		}
	]
}

export type { TArmor, TArmorType, TArmorDescription }
export { armorList }