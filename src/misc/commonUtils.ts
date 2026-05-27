/** @description Функции общего назначения  */

/** Объединение данных двух массивов или двух объектов
 * @param target Целевой массив или объект, который будет изменён
 * @param diff Массив или объект с дополнительными данными
 * @returns Объединенный массив или объект
 */
export function merge<T>(target: T[], diff: T[]): T[]
export function merge<T>(target: T, diff: Partial<T>): T
export function merge<T>(target: T[] | T, diff: T[] | Partial<T>): T[] | T {
	if (Array.isArray(target) && Array.isArray(diff))
		return [...target].concat(diff)

	else if (!Array.isArray(target) && !Array.isArray(diff))
		return { ...target, ...diff }
	
	else
		throw new Error('Оба аргумента должны быть массивами или объектами')
}