/** @description Функции общего назначения  */

/** Объединение данных двух массивов или двух объектов
 * @param target Целевой массив или объект, который будет изменён
 * @param diff Массив или объект с дополнительными данными
 * @returns Объединенный массив или объект
 */
export function merge<T>(target: T[] | undefined, diff: T[]): T[]
export function merge<T>(target: T, diff: Partial<T>): T
export function merge<T>(target: T[] | T | undefined, diff: T[] | Partial<T>): T[] | T {
	if (Array.isArray(diff) && (target === undefined || Array.isArray(target))) {
		target = (target ?? []) as T[]
		return [...target].concat(diff)
	}

	else if (!Array.isArray(diff) && !Array.isArray(target)) {
		target = (target ?? {}) as T
		return { ...target, ...diff }
	}

	else {
		console.info(diff, target)
		throw new Error('Оба аргумента должны быть массивами или объектами')
	}
}