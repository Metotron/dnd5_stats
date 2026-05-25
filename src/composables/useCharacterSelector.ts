import type { Character } from './useCharacter'

/** Хранилище всех созданных персонажей */
const characters: Character[] = []

export const useCharacterSelector = () => {
	return {
		charactersStore: characters,

		/** Сохранить персонажа в хранилище */
		storeCharacter: (char: Character): number => {
			characters.push(char)
			return characters.length - 1
		}
	}
}