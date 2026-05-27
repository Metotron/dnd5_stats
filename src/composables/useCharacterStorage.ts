import { watch } from 'vue'
import { useSaverLoader } from './saverLoader'
import type { Character } from './useCharacter'
import settings from '@/settings'

/** Хранилище всех созданных персонажей */
const charactersStore: Character[] = []

// Автосохранение в стораж
if (settings.save_load.AUTOSAVE)
	watch(() => charactersStore, saveToStorage, { deep: true, immediate: true })
// Автозагрузка
if (settings.save_load.AUTOLOAD)
	console.info('Автозагрузка')
	loadStoreFromStorage()


/** Сохранение хранилища в стораже браузера */
function saveToStorage() {
	if (!window.localStorage)
		return

	const saverLoader = useSaverLoader(localStorage)
	saverLoader.save(charactersStore)
}

/** Загрузка хранилища из стоража */
function loadStoreFromStorage() {
	if (!window.localStorage)
		return

	const saverLoader = useSaverLoader(localStorage)
	charactersStore.splice(0, charactersStore.length, ...saverLoader.load())
}

export const useCharacterStorage = () => {
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
		clear() {
			charactersStore.splice(0)
		},

		/** Поиск персонажа по ID */
		findCharacterById: (id: number): Character | undefined => {
			return charactersStore.find(char => char.id === id)
		}
	}
}