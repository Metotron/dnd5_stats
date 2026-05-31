import type { Character } from '@/composables/useCharacter'
import { charClassValues } from '@/handbook-data/charClassesLevelValues'
import { getStatModifier, type TStat } from '@/handbook-data/stats'
import type { ETool } from '@/handbook-data/tools'
import type { EWeapon } from '@/handbook-data/weapons'

/** Стилизация текста в соответствии со спец. разметкой */
export function textMarkToHTML<T extends string | EWeapon | ETool>(str: T, character?: Character): string {
	if (str.startsWith('weapon.') || str.startsWith('tool.')) 
		return str
	
	let out: string = str.replaceAll('<', '&lt;').replaceAll('>', '&gt;')

	if (character !== undefined) {
		if (/\[:.+?\/.+?:\]/.test(out))
			out = classValueByLevel(out, character.level.value)

		if (/\[\*\d+:(0\.)?\d+:уровень\*\]/.test(out))
			out = mathWithLevel(out, character.level.value)
	}

	out = out.replace(/\[(?<bold>.+?)\]/g, '<b>$<bold></b>')

	out = out.replace(/\{((?<prefix>.+?):)?(?<text>.+?)\}/g, (_, ...params) => {
		const groups = params.at(-1)
		if (!groups.prefix)
			return `<em>${groups.text}</em>`
		return `<em class="${groups.prefix}">${groups.text}</em>`
	})


	// Есть особая разметка для модификаторов характеристик и других значений
	if (character !== undefined) {
		out = out.replaceAll('/*уровень*/', `<span class="modifierValue" title="Уровень">${character.level.value}<i>(ур)</i></span>`)
		out = out.replaceAll('/*бонус мастерства*/', `<span class="modifierValue" title="Бонус мастерства">${character.proficiencyBonus.value}<i>(бм)</i></span>`)
	}
	else {
		out = out.replaceAll('/*уровень*/', 'уровень')
		out = out.replaceAll('/*бонус мастерства*/', 'бонус мастерства')
	}

	const modifiers = out.matchAll(/\/\*(?<mod>.+?)\*\//g)
	if (character !== undefined && modifiers)
		for (const mod of modifiers) {
			const group = mod.groups?.mod
			if (!group) continue

			const splitted = group.split(':')
			const char = splitted[0].replace(/^мод\. /, '')  // Характеристика в родительном падеже
			const minValue = splitted.length > 0 && /^min\d+$/.test(splitted[1]) ? Number(splitted[1].replace(/^min/, '')) : Number.MIN_SAFE_INTEGER

			let replaceTo = makeReplaceTxt(char, character.stats, minValue)
			out = out.replace(`/*${group}*/`, `<span class="modifierValue" title="${splitted[0].replace('мод.', 'Модификатор')}">${replaceTo}<i>(${makeShortName(char)})</i></span>`)
		}

	return out
}

function makeReplaceTxt(stat: string, stats: Record<TStat, number>, minValue: number): string {
	const textToStat: Record<string, TStat> = {
		'Силы': 'str',
		'Ловкости': 'dex',
		'Телосложения': 'con',
		'Интеллекта': 'int',
		'Мудрости': 'wis',
		'Харизмы': 'cha'
	}

	if (!(stat in textToStat))
		return ''

	return String(Math.max(minValue, getStatModifier(stats[textToStat[stat]])))
}

function makeShortName(stat: string): string {
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

/** Замена значений вида [:barbarian/rages:] */
function classValueByLevel(input: string, level: number): string {
	const tokens = input.match(/\[:.+?:\]/g)
	if (!tokens) return input

	for (const token of tokens) {
		if (!token.includes('/'))
			continue

		const [className, valueName] = token.slice(2, -2).split('/')
		const replaceWith = charClassValues[className as keyof typeof charClassValues]?.[valueName]?.[level - 1] ?? ''
		input = input.replaceAll(token, `<em class="byLevelValue">${replaceWith}</em>`)
	}

	return input
}

/** Математические замены с уровнем: [*6:2уровень*] = 6 + 2 * [уровень] */
function mathWithLevel(input: string, level: number): string {
	const tokens = input.match(/\[\*(\d+):((0\.)?\d+):уровень\*\]/g)
	if (!tokens) return input

	for (const token of tokens) {
		const [base, mult, _] = token.slice(2).split(':')
		const replaceWith = String(parseInt(base) + Math.ceil(parseFloat(mult) * level))
		input = input.replaceAll(token, `<em class="byLevelValue">${replaceWith}</em>`)
	}

	return input
}