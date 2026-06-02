import type { Character } from '@/composables/useCharacter'
import { charClassValues } from '@/handbook-data/charClassesLevelValues'
import { getStatModifier, type TStat } from '@/handbook-data/stats'
import type { ETool } from '@/handbook-data/tools'
import type { EWeapon } from '@/handbook-data/weapons'

/** Стилизация текста в соответствии со спец. разметкой */
export function textMarkToHTML<T extends string | EWeapon | ETool>(str: T, character?: Character): string {
	if (str.startsWith('weapon.') || str.startsWith('tool.'))
		return str

	let out: string = str.replace(/[<>]/g, brace => (({ '<': '&lt;', '>': '&gt;' })[brace as '<' | '>']))

	// Простые числовые значения: уровень персонажа, бонус мастерства
	out = simpleNumbersReplacer(out, character)
	// Модификаторы характеристик персонажа
	out = statModifierReplacer(out, character)
	// Заклинания оборачиваются в <em> с классом spell или cantrip
	out = spellReplacer(out)
	// Формулы, основанные на уровне персонажа
	out = mathWithLevelReplacer(out, character)
	// Количественные характеристики классов из файла charClassesLevelValues
	out = classValueByLevelReplacer(out, character)
	// Замена простых фигурных скобок на курсив <em>
	out = italicTextReplacer(out)
	// Текст в квадратных скобках помещается в <b>
	out = boldTextReplacer(out)

	return out
}

/** Замена простых числовых значений */
function simpleNumbersReplacer(str: string, character?: Character): string {
	const levelMark = '{level:}'
	const proficiencyBonusMark = '{profBonus:}'

	if (character !== undefined) {
		str = str.replaceAll(levelMark, `<span class="modifierValue" title="Уровень">${character.level.value}<i>(ур)</i></span>`)
		str = str.replaceAll(proficiencyBonusMark, `<span class="modifierValue" title="Бонус мастерства">${character.proficiencyBonus.value}<i>(бм)</i></span>`)
		return str
	}

	str = str.replaceAll(levelMark, 'уровень')
	str = str.replaceAll(proficiencyBonusMark, 'бонус мастерства')
	return str
}

// Обработка меток {mod:Характеристики} или {mod:Характеристики:minN}, где N - число
function statModifierReplacer(str: string, character?: Character): string {
	const modifiers = str.matchAll(/\{mod:(?<mod>.+?)\}/g)
	if (!modifiers) return str

	for (const mod of modifiers) {
		const group = mod.groups?.mod // Строка, соответствующая regexp Характеристики(:min\d+)?
		if (!group) continue

		const splitted = group.split(':')
		const minValue = splitted.length > 1 && /^min\d+$/.test(splitted[1])
			? Number(splitted[1].slice(3))
			: Number.MIN_SAFE_INTEGER

		let replaceTo: string
		if (character !== undefined)
			replaceTo = modificatorValue(splitted[0], character, minValue)
		else
			replaceTo = `модификатор {${splitted[0]}}` + (splitted.length > 1 ? ` (мин. ${splitted[1].slice(3)})` : '')

		str = str.replace(mod[0], `<span class="modifierValue" title="Модификатор ${splitted[0]}">${replaceTo}<i>(${shortStatName(splitted[0])})</i></span>`)
	}

	return str
}

/** Замена [текста] на текст в теге <b> */
function boldTextReplacer(str: string): string {
	return str.replace(/\[(.+?)\]/g, '<b>$1</b>')
}

/** Замена {текста} на текст в теге <em> */
function italicTextReplacer(str: string): string {
	return str.replace(/\{(.+?)\}/g, '<em>$1</em>')
}

/** Замена заклинаний вида {spell:Заклинание} и {cantrip:Заклинание} */
function spellReplacer(str: string): string {
	if (!/\{(spell:|cantrip:).+\}/.test(str))
		return str

	const tokens = str.matchAll(/\{(?<type>.+?):(?<name>.+?)\}/g)
	if (!tokens) return str

	for (const token of tokens)
		str = str.replace(token[0], `<em class="${token.groups?.type ?? ''}">${token.groups?.name ?? ''}</em>`)

	return str
}

/** Получение значения модификатора характеристики персонажа с учётом минимального значения */
function modificatorValue(stat: string, character: Character, minValue: number): string {
	const textToStat: Record<string, TStat> = {
		Силы: 'str',
		Ловкости: 'dex',
		Телосложения: 'con',
		Интеллекта: 'int',
		Мудрости: 'wis',
		Харизмы: 'cha'
	}

	if (!(stat in textToStat))
		return ''

	return String(Math.max(minValue, getStatModifier(character.stats[textToStat[stat]])))
}

/** Сокращённое наименование характеристики */
function shortStatName(stat: string): string {
	const shortNames: Record<string, string> = {
		'Силы': 'сил',
		'Ловкости': 'лов',
		'Телосложения': 'тел',
		'Интеллекта': 'инт',
		'Мудрости': 'мдр',
		'Харизмы': 'хар'
	}

	return stat in shortNames ? shortNames[stat] : ''
}

/** Замена значений вида {class:barbarian/rages} значениями из charClassesLevelValues */
function classValueByLevelReplacer(str: string, character?: Character): string {
	if (character === undefined)
		return str

	const tokens = str.match(/\{class:.+?\/.+?\}/g)
	if (!tokens) return str

	for (const token of tokens) {
		if (!token.includes('/'))
			continue

		const [className, valueName] = token.slice(7, -1).split('/')
		const replaceWith = charClassValues[className as keyof typeof charClassValues]?.[valueName]?.[character.level.value - 1] ?? ''
		str = str.replaceAll(token, `<em class="byLevelValue">${replaceWith}</em>`)
	}

	return str
}

/** Математические замены с уровнем: {level:M:N} = [уровень] * M + N */
function mathWithLevelReplacer(str: string, character?: Character): string {
	if (character === undefined)
		return str

	const tokens = str.match(/\{level:(0?\.)?\d+:\d+\}/g)
	if (!tokens) return str

	for (const token of tokens) {
		const [mult, base] = token.slice(7, -1).split(':')
		const replaceWith = String(parseInt(base) + Math.ceil(parseFloat(mult) * character.level.value))
		str = str.replaceAll(token, `<em class="byLevelValue">${replaceWith}</em>`)
	}

	return str
}

//TODO Сделать спец. метку для состояний, пририсовав к ним 🔖?