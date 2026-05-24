import { readonly, ref } from 'vue'
import { ECharClass, getClassValue, type TCharClass } from '../baseLists/classes'
import { ERace, fullRacesList, type TRace } from '../baseLists/races'
import type { TStat } from '../baseLists/stats'

/** Хранилище всех созданных персонажей */
const characters = ref<Character[]>([])


export const useCharacter = () => {
	return {
		characters: readonly(characters),
		
		newCharacter: () => new Character(),

		storeCharacter: (character: Character): number => {
			characters.value.push(character)
			return characters.value.length - 1
		}
	}
}


const defaultHuman = fullRacesList.find(({ race }) => race == ERace['human.standard'])!
const defaultFighter = getClassValue(ECharClass.fighter)

class Character {
	name: string = 'Персонаж'               // Имя
	race: TRace = defaultHuman              // Раса
	charClass: TCharClass = defaultFighter  // Класс
	level: number = 1                       // Уровень
	chars: Record<TStat, number> = {        // Значения характеристик
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10
	}
	inspiration = false  // Вдохновение мастера

	/** Смена расы */
	setRace(race: ERace) {
		const newRace = fullRacesList.find(rl => rl.race == race)!
		this.race = newRace
		return this
	}

	/** Смена класса */
	setClass(charClass: ECharClass) {
		this.charClass = getClassValue(charClass)
		return this
	}

	/** Смена уровня персонажа */
	setLevel(level: number) {
		if (level < 1 || level > 20)
			throw new Error('Уровень должен быть в диапазоне 1-20')

		this.level = level
	}

	/** Получение бонуса мастерства */
	get profiencyBonus() { return Math.floor((this.level - 1) / 4) + 2 }
}