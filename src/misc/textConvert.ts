/** Стилизация текста в соответствии со спец. разметкой */
export function textMarkToHTML(str: string): string {
	str = str.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
	str = str.replace(/\[(?<bold>.+?)\]/g, '<b>$<bold></b>')
	str = str.replace(/\{(?<italic>.+?)\}/g, '<em>$<italic></em>')
	return str
}