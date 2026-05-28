/** @description Игровые классы персонажей */

import { EArmorClass, EShieldClass } from './armors'
import type { TBaseRaceDescription } from './races'
import { EWeapon, EWeaponClass } from './weapons'

export enum ECharClass {
	bard,
	barbarian,
	fighter,
	wizard,
	druid,
	cleric,
	warlock,
	monk,
	paladin,
	rogue,
	ranger,
	sorcerer,
}

export type TCharClass = {
	id: ECharClass
	name: string
	hitDice: 6 | 8 | 10 | 12
	diff?: Partial<TBaseRaceDescription>
}

export const fullCharClassesList: TCharClass[] = [{
	id: ECharClass.bard,
	name: 'Бард',
	hitDice: 8,
	diff: {
		armorProficiencies: [EArmorClass.light],
		weaponProficiencies: [
			EWeaponClass['simpe.melee'],
			EWeaponClass['simple.ranged'],
			EWeapon.shortsword,
			EWeapon.longsword,
			EWeapon.rapier,
			EWeapon.handcrossbow
		],
		features: [
			'Владеете тремя музыкальными инструментами на выбор',
			'Выберите три любых навыка',
			'Знаете на выбор два заговора и 4 заклинания',
			'При наложении заклинаний используете Харизму',
			'Сложность спасброска от заклинания: 8 + /*бонус мастерства*/ + /*мод. Харизмы*/',
			'[Вдохновение барда.] Бонусным действием можно на 10 минут вдохновить (+d6) существо, которое может вас слышать, в пределах 60 футов. Используется /*мод. Харизмы:min1*/ раз за день'
		],
		savingThrows: ['dex', 'cha'],
	}
}, {
	id: ECharClass.barbarian,
	name: 'Варвар',
	hitDice: 12,
	diff: {
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
		weaponProficiencies: [EWeaponClass['simpe.melee'], EWeaponClass['martial.melee'], EWeaponClass['simple.ranged'], EWeaponClass['martial.ranged']],
		savingThrows: ['str', 'con'],
		features: [
			'Выберите два навыка из следующих: {Атлетика}, {Внимательность}, {Выживание}, {Запугивание}, {Природа}, {Уход за животными}',
			'[Защита без доспехов.] Без доспухов ваш КД равен 10 + мод. Ловкости + мод. Телосложения. Можно использовать щит',
			'[Ярость.] Бонусном действием можно войти в состояние ярости',
		]
	}
}, {
	id: ECharClass.fighter,
	name: 'Воин',
	hitDice: 10,
	diff: {
		//TODO Продолжить заполнять характеристики классов
	}
}, {
	id: ECharClass.wizard,
	name: 'Волшебник',
	hitDice: 6,
}, {
	id: ECharClass.druid,
	name: 'Друид',
	hitDice: 8,
}, {
	id: ECharClass.cleric,
	name: 'Жрец',
	hitDice: 8,
}, {
	id: ECharClass.warlock,
	name: 'Колдун',
	hitDice: 8,
}, {
	id: ECharClass.monk,
	name: 'Монах',
	hitDice: 8,
}, {
	id: ECharClass.paladin,
	name: 'Паладин',
	hitDice: 10,
}, {
	id: ECharClass.rogue,
	name: 'Плут',
	hitDice: 8,
}, {
	id: ECharClass.ranger,
	name: 'Следопыт',
	hitDice: 10,
}, {
	id: ECharClass.sorcerer,
	name: 'Чародей',
	hitDice: 6,
}] as const

export function getClassValue(charClass: ECharClass): TCharClass {
	return fullCharClassesList.find(ccl => ccl.id == charClass)!
}