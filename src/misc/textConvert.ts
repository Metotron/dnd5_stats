import { getStatModifier, type TStat } from '@/handbook-data/stats'

/** Стилизация текста в соответствии со спец. разметкой */
export function textMarkToHTML(str: string, stats?: Record<TStat, number>, proficiencyBonus?: number): string {
	str = str.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
	str = str.replace(/\[(?<bold>.+?)\]/g, '<b>$<bold></b>')
	str = str.replace(/\{(?<italic>.+?)\}/g, '<em>$<italic></em>')

	
	// Есть особая разметка для модификаторов характеристик

	if (proficiencyBonus !== undefined)
		str = str.replace(/\/\*бонус мастерства\*\//g, `<span class="modifierValue" title="Бонус мастерства">${proficiencyBonus}<i>(бм)</i></span>`)
	else
		str = str.replace(/\/\*бонус мастерства\*\//g, 'бонус мастерства')

	const modifiers = str.matchAll(/\/\*(?<mod>.+?)\*\//g)
	if (stats !== undefined && modifiers)
		for (const mod of modifiers) {
			const group = mod.groups?.mod
			if (!group) continue

			const splitted = group.split(':')
			const char = splitted[0].replace(/^мод\. /, '')  // Характеристика в родительном падеже
			const minValue = splitted.length > 0 && /^min\d+$/.test(splitted[1]) ? Number(splitted[1].replace(/^min/, '')) : Number.MIN_SAFE_INTEGER

			let replaceTo = makeReplaceTxt(char, stats, minValue)
			str = str.replace(`/*${group}*/`, `<span class="modifierValue" title="${splitted[0].replace('мод.', 'Модификатор')}">${replaceTo}<i>(${makeShortName(char)})</i></span>`)
		}

	return str
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