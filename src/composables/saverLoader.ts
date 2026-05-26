/** Функции для сохраненияперсонажа и загрузки сохранения */

import { S_STORAGE_KEY } from '@/settings'
import type { Character } from './useCharacter'

/** Формат хранения, преобразуется в JSON как есть, желательно минимизировать, вдуруг будем передавать через QR-код */
type TSaveFormat = {
	r: number                      // race, индекс расы в fullRacesList
	s: number                      // char class, индекс класса в charClassesList
	n: string                      // name, имя персонажа
	c: `\d\d\d\d\d\d\d\d\d\d\d\d`  // chars, характеристики персонажа, по две цифры на каждую в том порядке, в каком они иписаны в композабле персонажа
	l: 1                           // level, просто на всякий случай
	i: 0 | 1                       // inspiration, вдохновение, может быть, объединить его с level?
	p: number                      // profencies, владение навыками в виде битов в заранее заданном порядке. 18 штук => 3 байта
}

type TSaveTo = 'storage'  // Вдруг в будущем ещё куда-то будем сохранять

export const useSaverLoader = () => {
	return {
		save(charStore: Character[], to: TSaveTo = 'storage') {
			//TODO Написать сохранение с учётом формата

			//xxx Дурацкая реализация. Классы так не сохранить
			if (to == 'storage' && window.localStorage) {
				localStorage.setItem(S_STORAGE_KEY, JSON.stringify(charStore))
				return true
			}

			return false
		},

		load(): Character[] {
			if (!window.localStorage)
				return []

			const storedData = localStorage.getItem(S_STORAGE_KEY)
			if (storedData === null)
				return []

			const characters = JSON.parse(storedData) as Character[]
			if (!Array.isArray(characters))
				return []

			return characters
		}
	}
}