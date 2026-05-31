/** @description Игровые классы персонажей */

import { EArmorClass, EShieldClass } from './armors'
import type { TBaseSpeciesDescription } from './species'
import { ETool } from './tools'
import { EWeapon, EWeaponClass } from './weapons'

export enum ECharClass {
	bard,
	barbarian,
	'barbarian.new',
	fighter,
	wizard,
	druid,
	cleric,
	warlock,
	'monk',
	'monk.new',
	paladin,
	'paladin.new',
	rogue,
	ranger,
	'ranger.new',
	sorcerer,
}

export type TCharClass = {
	id: ECharClass
	name: string
	hitDice: 6 | 8 | 10 | 12
	diff?: Partial<TBaseSpeciesDescription>
}


//TODO При выборе класса заполнить выбор дополнительных умений, таких как домен у жреца
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
			'Владеете 3 музыкальными инструментами на выбор',
			'Выберите 3 любых навыка',
			'Знаете на выбор 2 заговора и 4 заклинания',
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
			'Выберите 2 навыка из следующих: {Атлетика}, {Внимательность}, {Выживание}, {Запугивание}, {Природа}, {Уход за животными}',
			'[Защита без доспехов.] Без доспехов ваш КД равен 10 + /*мод. Ловкости*/ + /*мод. Телосложения*/. Можно использовать щит',
			'[Ярость.] Бонусным действием можно войти в состояние ярости',
		],
	}
}, {
	id: ECharClass.fighter,
	name: 'Воин',
	hitDice: 10,
	diff: {
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EArmorClass.heavy, EShieldClass.standard],
		weaponProficiencies: [
			EWeaponClass['simpe.melee'],
			EWeaponClass['martial.melee'],
			EWeaponClass['simple.ranged'],
			EWeaponClass['martial.ranged']],
		savingThrows: ['str', 'con'],
		features: [
			'Выберите 2 навыка из следующих: {Акробатика}, {Атлетика}, {Внимательность}, {Выживание}, {Запугивание}, {История}, {Проницательность}, {Уход за животными}',
			'[Второе дыхание.] Бонусным действием 1 раз после любого отдыха можете восстановить d10 + /*уровень*/ хитов.'
		],
	}
}, {
	id: ECharClass.wizard,
	name: 'Волшебник',
	hitDice: 6,
}, {
	id: ECharClass.druid,
	name: 'Друид',
	hitDice: 8,
	diff: {
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
		weaponProficiencies: [
			EWeapon.club,
			EWeapon.dagger,
			EWeapon.dart,
			EWeapon.javelin,
			EWeapon.mace,
			EWeapon.quaterstaff,
			EWeapon.scimitar,
			EWeapon.sickle,
			EWeapon.sling,
			EWeapon.spear
		],
		toolProficiencies: [ETool.herbalism],
		savingThrows: ['int', 'wis'],
		features: [
			'Друиды не носят доспехи и щиты из металла',
			'Выберите 2 навыка из следующих: {Внимательность}, {Выживание}, {Магия}, {Медицина}, {Обращение с животными}, {Природа}, {Проницательность}, {Религия}',
			'Знаете друидический язык. Можете оставлять на нём тайные послания для тех, кто знает этот язык (другие заметят наличие при проверке {Внимательности} со сл. 15)',
			'Знаете на выбор 2 заговора',
			'На день вы подготавливаете /*уровень*/ + /*мод. Мудрости*/ заклинений (минимум одно). Их уровень должен быть не выше наивысшей имеющейся ячейки заклинаний',
			'При наложении заклинаний используете Мудрость',
			'Сложность спасброска от заклинания: 8 + /*бонус мастерства*/ + /*мод. Мудрости*/',
		],
	}
}, {
	id: ECharClass.cleric,
	name: 'Жрец',
	hitDice: 8,
	diff: {
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
		weaponProficiencies: [EWeaponClass['simpe.melee'], EWeaponClass['simple.ranged']],
		savingThrows: ['wis', 'cha'],
		features: [
			'Выберите 2 навыка из следующих: {История}, {Медицина}, {Проницательность}, {Религия}, {Убеждение}',
			'Знаете на выбор 3 заговора',
			'На день вы подготавливаете /*уровень*/ + /*мод. Мудрости*/ заклинений (минимум одно). Их уровень должен быть не выше наивысшей имеющейся ячейки заклинаний',
			'При наложении заклинаний используете Мудрость',
			'Сложность спасброска от заклинания: 8 + /*бонус мастерства*/ + /*мод. Мудрости*/',
		],
	}
}, {
	id: ECharClass.warlock,
	name: 'Колдун',
	hitDice: 8,
}, {
	id: ECharClass.monk,
	name: 'Монах',
	hitDice: 8,
	diff: {
		weaponProficiencies: [EWeaponClass['simpe.melee'], EWeaponClass['simple.ranged'], EWeapon.shortsword],
		savingThrows: ['str', 'dex'],
		features: [
			'Владеете 1 видом ремесленных или музыкальных инструментов на выбор',
			'Выберите 2 навыка из следующих: {Акробатика}, {Атлетика}, {История}, {Проницательность}, {Религия}, {Скрытность}',
			'[Защита без доспехов.] Если вы не носите ни доспех, ни щит, ваш КД: 10 + /*мод. Ловкости*/ + /*мод. Мудрости*/',
			'[Боевые искусства.] Если вы безоружны или с монашеским оружием, не носите доспехов и щита: 1) Можете использовать лов. вместо сил. при атаке; 2) Для урона можете использовать d4; 3) Бонусным действием можете атаковать ещё раз, но без оружия',
		],
	}
}, {
	id: ECharClass.paladin,
	name: 'Паладин',
	hitDice: 10,
	diff: {
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EArmorClass.heavy, EShieldClass.standard],
		weaponProficiencies: [
			EWeaponClass['simpe.melee'],
			EWeaponClass['martial.melee'],
			EWeaponClass['simple.ranged'],
			EWeaponClass['martial.ranged'],
		],
		savingThrows: ['wis', 'cha'],
		features: [
			'Выберите 2 навыка из следующих: {Атлетика}, {Запугивание}, {Медицина}, {Проницательность}, {Религия}, {Убеждение}',
			'[Божественное чувство.] Присутствие сильного зла воспринимается вашими чувствами как неприятный запах, а могущественное добро звучит как небесная музыка в ваших ушах. Можете действием открыть своё сознание для обнаружения таких сил, тогда до конца следующего хода в пределах 60 фт. вы знаете местоположение всех исчадий, небожителей и нежити, не имеющих полного укрытия. В этом же радиусе вы чувствуете места и предметы, которые были освящены или осквернены. Использований в день — 1 + /*мод. Харизмы*/',
			'[Наложение рук.] Вы можете действием коснуться существа и восстановить ему хиты из своего запаса. Запас на день — 5 * /*уровень*/. Или можно потратить 5 хитов из запаса для излечения от болезни или яда'
		],
	}
}, {
	id: ECharClass.rogue,
	name: 'Плут',
	hitDice: 8,
}, {
	id: ECharClass.ranger,
	name: 'Следопыт',
	hitDice: 10,
	diff: {
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
		weaponProficiencies: [
			EWeaponClass['simpe.melee'],
			EWeaponClass['martial.melee'],
			EWeaponClass['simple.ranged'],
			EWeaponClass['martial.ranged'],
		],
		savingThrows: ['str', 'dex'],
		features: [
			'Выберите 3 навыка из следующих: {Анализ}, {Атлетика}, {Внимательность}, {Выживание}, {Природа}, {Проницательность}, {Скрытность}, {Уход за животными}',
			'[Избранный враг.] Выберите вид избранного врага. При их выслеживании у вас есть преимущество при проверке навыка {Выживание} для выслежиания или при проверке Инт. при вспоминании информации о них. Если враг умеет говорить, вы обучаетесь одному из его языков',
			'[Исследователь природы.] Выберите один вид известной местности. При проверке Инт. или Мдр., связанной с этой местностью, ваш бонус мастерства удваивается, если владеете навыком. Путешествуя по такой местности дольше часа получаете: 1) Труднопроходимая местность не замедляет путешествие; 2) Ваша группа не может заблудиться, кроме как по вине магии; 3) Вы готовы к опасности даже если отвлечены какой-то деятельностью; 4) В одиночку можете перемещаться скрытно не теряя скорости; 5) Находите в 2 раза больше пиши, чем обычно; 6) Выслеживая кого-то, вы узнаёте их размеры, количество, и как давно они прошли'
		],
	}
}, {
	id: ECharClass['ranger.new'],
	name: 'Следопыт (альт.)',
	hitDice: 10,
	diff: {
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
		weaponProficiencies: [
			EWeaponClass['simpe.melee'],
			EWeaponClass['martial.melee'],
			EWeaponClass['simple.ranged'],
			EWeaponClass['martial.ranged'],
		],
		savingThrows: ['str', 'dex'],
		languages: ['Язык на выбор'],
		features: [
			'Выберите 3 навыка из следующих: {Анализ}, {Атлетика}, {Внимательность}, {Выживание}, {Природа}, {Проницательность}, {Скрытность}, {Уход за животными}',
			'[Избранный враг.] Выберите вид избранного врага. Вы получаете +2 к урону оружием по выбранным врагам и преимущество при проверке навыка {Выживание} для выслежиания или при проверке Инт. при вспоминании информации о них. Если враг умеет говорить, вы обучаетесь одному из его языков, но можете выбрать и другой язык',
			'[Исследователь природы.] Выберите один вид известной местности. 1) Вы игнорируете такую труднопроходимую местность; 2) Получаете преимущество при проверке инициативы; 3) В свой первый ход в бою с преимуществом атакуете тех, кто ещё не ходил. Путешествуя по такой местности дольше часа получаете: 1) Труднопроходимая местность не замедляет путешествие; 2) Ваша группа не может заблудиться, кроме как по вине магии; 3) Вы готовы к опасности даже если отвлечены какой-то деятельностью; 4) В одиночку можете перемещаться скрытно не теряя скорости; 5) Находите в 2 раза больше пиши, чем обычно; 6) Выслеживая кого-то, вы узнаёте их размеры, количество, и как давно они прошли'
		],
	}
},{
	id: ECharClass.sorcerer,
	name: 'Чародей',
	hitDice: 6,
}] as const

export function getClassValue(charClass: ECharClass): TCharClass {
	return fullCharClassesList.find(ccl => ccl.id == charClass)!
}