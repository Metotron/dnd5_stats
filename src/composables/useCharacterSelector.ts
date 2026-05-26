import { watch } from 'vue'
import { useSaverLoader } from './saverLoader'
import type { Character } from './useCharacter'
import { S_AUTOSAVE } from '@/settings'

/** Хранилище всех созданных персонажей */
const charactersStore: Character[] = []

// Автосохранение в стораж
if (S_AUTOSAVE)
	watch(() => charactersStore, saveStoreToStorage, { deep: true, immediate: true })

/** Сохранение хранилища в стораже браузера */
function saveStoreToStorage() {
	const saverLoader = useSaverLoader()
	saverLoader.save(charactersStore)
}

export const useCharacterSelector = () => {
	return {
		charactersStore,

		/** Сохранить персонажа в хранилище */
		storeCharacter: (char: Character): boolean => {
			charactersStore.push(char)
			return true
		},

		/** Удаление персонажа из хранилища */
		deleteCharacter: (id: number): boolean => {
			const charId = charactersStore.findIndex(char => char.id === id)
			if (charId != -1)
				charactersStore.splice(charId, 1)
			return true
		},

		/** Очистка хранилища */
		clearStorage() {
			charactersStore.splice(0)
		},

		/** Поиск персонажа по ID */
		findCharacterById: (id: number): Character | undefined => {
			return charactersStore.find(char => char.id === id)
		}
	}
}