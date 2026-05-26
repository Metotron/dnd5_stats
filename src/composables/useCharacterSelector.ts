import type { Character } from './useCharacter'

/** Хранилище всех созданных персонажей */
const charactersStore: Character[] = []

export const useCharacterSelector = () => {
	return {
		charactersStore,

		/** Сохранить персонажа в хранилище */
		storeCharacter: (char: Character): number => {
			charactersStore.push(char)
			return charactersStore.length - 1
		},

		/** Поиск персонажа по ID */
		findCharacterById: (id: number): Character | undefined => {
			return charactersStore.find(char => char.id === id)
		}
	}
}