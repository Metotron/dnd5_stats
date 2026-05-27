/** Функции для сохраненияперсонажа и загрузки сохранения */

import settings from '@/settings'
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
	//TODO Добавить все поля класса
}

export const useSaverLoader = (store: Storage) => {
	return {
		save(charStore: Character[]) {
			//TODO Написать сохранение с учётом формата выше

			//xxx Дурацкая реализация. Классы так не сохранить
			store.setItem(settings.save_load.STORAGE_KEY, JSON.stringify(charStore))
			return true
		},

		load(): Character[] {
			const storedData = store.getItem(settings.save_load.STORAGE_KEY)
			if (storedData === null)
				return []

			//TODO Надо по-другому
			const characters = JSON.parse(storedData) as Character[]
			if (!Array.isArray(characters))
				return []

			return characters
		}
	}
}