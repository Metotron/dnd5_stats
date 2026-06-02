/** @description Игровые классы персонажей */

import { EArmorClass, EShieldClass } from './armors';
import { adjustDescription, makeEmptyDescription, type TBaseSpeciesDescription } from './species';
import { ETool } from './tools';
import { EWeapon, EWeaponClass, EWeaponProp, fullWeaponsList } from './weapons';

export enum ECharClass {
	bard,
	barbarian,
	fighter,
	wizard,
	'druid.magician',
	'druid.warden',
	'cleric.protector',
	'cleric.thaumaturge',
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
	hitDie: 6 | 8 | 10 | 12
	levelDie: 4 | 5 | 6 | 7   // Хиты на уровнях выше 1-го, если выбирать фиксированные, а не бросать hit die. Math.ceil(.5 + hidDie / 2)
	diff?: Partial<TBaseSpeciesDescription>
}


const simpleWeapons: EWeaponClass[] = [EWeaponClass['simple.melee'], EWeaponClass['simple.ranged']]
const martialWeapons: EWeaponClass[] = [EWeaponClass['martial.melee'], EWeaponClass['martial.ranged']]
const allWeapons: EWeaponClass[] = [...simpleWeapons, ...martialWeapons]

function lightMartialWeapon(): EWeapon[] {
	return fullWeaponsList
		.filter(w => [EWeaponClass['martial.melee'], EWeaponClass['martial.ranged']].includes(w.group) && w.props.find(({ prop }) => prop == EWeaponProp.light))
		.map(w => w.id)
}

function finesseMartialWeapon(): EWeapon[] {
	return fullWeaponsList
		.filter(w => [EWeaponClass['martial.melee'], EWeaponClass['martial.ranged']].includes(w.group) && w.props.find(({ prop }) => prop == EWeaponProp.finesse))
		.map(w => w.id)
}

// Общие характеристики для разных видов друидов
const baseDruidDiff: Partial<TBaseSpeciesDescription> = {
	savingThrows: ['int', 'wis'],
	armorProficiencies: [EArmorClass.light, EShieldClass.standard],
	weaponProficiencies: simpleWeapons,
	toolProficiencies: [ETool.herbalism],
	features: [
		'Выберите 2 навыка из следующих: {Аркана}, {Внимательность}, {Выживание}, {Медицина}, {Природа}, {Проницательность}, {Религия}, {Уход за животными}',
		'Знаете друидический язык. Можете оставлять на нём тайные послания для тех, кто знает этот язык (другие заметят наличие при проверке навыка {Анализ} со сл. 15)',
		'У вас всегда подготовлено заклинание {spell:Разговор с животными}',
		'Подготавливаете {class:druid/preparedSpells} заклинаний после продолжительного отдыха',
		'Заклинательная характеристика - {Мудрость}',
		'Сложность спасброска от заклинания: 8 + {mod:Мудрости} + {profBonus:}',
		'Бонус к атаке заклинанием: {mod:Мудрости} + {profBonus:}',
	],
}

// Общие характеристики для разных видов жрецов
const baseClericDiff: Partial<TBaseSpeciesDescription> = {
	savingThrows: ['wis', 'cha'],
	armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
	weaponProficiencies: simpleWeapons,
	features: [
		'Выберите 2 навыка из следующих: {История}, {Медицина}, {Проницательность}, {Религия}, {Убеждение}',
		'Подготавливаете {class:cleric/preparedSpells} заклинаний после продолжительного отдыха',
		'Заклинательная характеристика - {Мудрость}',
		'Сложность спасброска от заклинания: 8 + {mod:Мудрости} + {profBonus:}',
		'Бонус к атаке заклинанием: {mod:Мудрости} + {profBonus:}',
	],
}


export const fullCharClassesList: TCharClass[] = [{
	id: ECharClass.bard,
	name: 'Бард',
	hitDie: 8,
	levelDie: 5,
	diff: {
		savingThrows: ['dex', 'cha'],
		armorProficiencies: [EArmorClass.light],
		weaponProficiencies: simpleWeapons,
		features: [
			'Выберите 3 любых навыка',
			'Владеете 3 музыкальными инструментами на выбор',
			'[Бардовское вдохновение.] Бонусным действием можно на 1 час вдохновить (+d{class:bard/bardicDie}) существо, которое может вас слышать, в пределах 60 футов. При провале теста d20 это существо может добавить кость вдохновения. Применений:&nbsp;{mod:Харизмы:min1} до продолжительного отдыха',
			'Заклинательная характеристика - {Харизма}',
			'Знаете {class:bard/cantrips} заговоров и {class:bard/preparedSpells} заклинаний',
			'Сложность спасброска от заклинания: 8 + {mod:Харизмы} + {profBonus:}',
			'Бонус к атаке заклинанием: {mod:Харизмы} + {profBonus:}',
		],
	}
}, {
	id: ECharClass.barbarian,
	name: 'Варвар',
	hitDie: 12,
	levelDie: 7,
	diff: {
		savingThrows: ['str', 'con'],
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
		weaponProficiencies: allWeapons,
		features: [
			'Выберите 2 навыка из следующих: {Атлетика}, {Внимательность}, {Выживание}, {Запугивание}, {Природа}, {Уход за животными}',
			'[Защита без доспехов.] Без доспехов ваш КД равен 10 + {mod:Ловкости*/ + /*мод. Телосложения}. Можно использовать щит',
			'[Ярость.] Если не носите тяжёлый доспех, бонусным действием можете войти в состояние ярости (применений:&nbsp;{class:barbarian/rages}, не дольше 10 минут). Короткий отдых восстанавливает 1 применение, продолжительный — все применения',
			'Выберите {class:barbarian/weaponMastery} типа оружия (простого или воинского), с которым вы можете совершать [оружейные приёмы]. После продолжительного отдыха, попрактиковавшись, можно сменить один тип оружия',
		],
	}
}, {
	id: ECharClass.fighter,
	name: 'Воин',
	hitDie: 10,
	levelDie: 6,
	diff: {
		savingThrows: ['str', 'con'],
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EArmorClass.heavy, EShieldClass.standard],
		weaponProficiencies: allWeapons,
		features: [
			'Выберите 2 навыка из следующих: {Акробатика}, {Атлетика}, {Внимательность}, {Выживание}, {Запугивание}, {История}, {Проницательность}, {Уход за животными}',
			'Выберите черту боевого стиля',
			'[Второе дыхание.] Бонусным действием можете восстановить d10 + {level:} хитов (Применений:&nbsp;{class:fighter/secondWind}). Короткий отдых восстанавливает 1 применение, продолжительный — все применения',
			'Выберите {class:fighter/weaponMastery} типа оружия (простого или воинского), с которым вы можете совершать [оружейные приёмы]. После продолжительного отдыха, попрактиковавшись, можно сменить один тип оружия',
		],
	}
}, {
	id: ECharClass.wizard,
	name: 'Волшебник',
	hitDie: 6,
	levelDie: 4,
	diff: {
		savingThrows: ['int', 'wis'],
		weaponProficiencies: simpleWeapons,
		goods: [
			'Книга волшебника с {level:2:4} заклинаниями уровня, соответствующего имеющимся ячейкам заклинаний'
		],
		features: [
			'Выберите 2 навыка из следующих: {Анализ}, {Аркана}, {История}, {Медицина}, {Природа}, {Проницательность}, {Религия}',
			'Подготавливаете {class:wizard/preparedSpells} заклинаний после продолжительного отдыха',
			'Можете накладывать любое заклинание как ритуал, если у него есть такая возможность. Оно не обязано быть подготовленным',
			'[Магическое восстановление.] Заканчивая короткий отдых, можете восстановить ячейки заклинаний уровнем вплоть до {level:.5:0}, но не выше 6. Сделать это можно один раз до продолжительного отдыха',
			'Заклинательная характеристика - {Интеллект}',
			'Сложность спасброска от заклинания: 8 + {mod:Интеллекта} + {profBonus:}',
			'Бонус к атаке заклинанием: {mod:Интеллекта} + {profBonus:}',
		],
	}
}, {
	id: ECharClass['druid.magician'],
	name: 'Друид (Маг)',
	hitDie: 8,
	levelDie: 5,
	diff: adjustDescription(makeEmptyDescription(), baseDruidDiff, {
		features: [
			'Знаете {class:druid/cantrips}+1 заговоров',
			'Получаете бонус {mod:Мудрости:min1} при проверке навыков {Аркана} и {Природа}',
		],
	})
}, {
	id: ECharClass['druid.warden'],
	name: 'Друид (Хранитель)',
	hitDie: 8,
	levelDie: 5,
	diff: adjustDescription(makeEmptyDescription(), baseDruidDiff, {
		armorProficiencies: [EArmorClass.medium],
		weaponProficiencies: martialWeapons,
		features: ['Знаете {class:druid/cantrips} заговоров'],
	})
}, {
	id: ECharClass['cleric.protector'],
	name: 'Жрец (Защитник)',
	hitDie: 8,
	levelDie: 5,
	diff: adjustDescription(makeEmptyDescription(), baseClericDiff, {
		armorProficiencies: [EArmorClass.heavy],
		weaponProficiencies: martialWeapons,
		features: ['Знаете {class:cleric/cantrips} заговоров'],
	}),
}, {
	id: ECharClass['cleric.thaumaturge'],
	name: 'Жрец (Чудотворец)',
	hitDie: 8,
	levelDie: 5,
	diff: adjustDescription(makeEmptyDescription(), baseClericDiff, {
		features: [
			'Знаете {class:cleric/cantrips}+1 заговоров',
			'Получаете бонус {mod:Мудрости:min1} при проверке навыков {Аркана} и {Религия}',
		],
	}),
}, {
	id: ECharClass.warlock,
	name: 'Колдун',
	hitDie: 8,
	levelDie: 5,
	diff: {
		savingThrows: ['wis', 'cha'],
		armorProficiencies: [EArmorClass.light],
		weaponProficiencies: simpleWeapons,
		features: [
			'Выберите 2 навыка из следующих: {Анализ}, {Аркана}, {Запугивание}, {История}, {Обман}, {Природа}, {Религия}',
			'Заклинательная характеристика - {Харизма}',
			'Знаете {class:warlock/cantrips} заговоров и имеете {class:warlock/spellSlots} ячеек заклинаний уровня {class:warlock/slotLevel}. Ячейки восстанавливаются при любом отдыхе',
			'Сложность спасброска от заклинания: 8 + {mod:Харизмы} + {profBonus:}',
			'Имеете {class:warlock/eldrichInvocations} таинственных воззваний. Получая уровень, можете заменить одно из своих воззваний на другое',
		],
	}
}, {
	id: ECharClass.monk,
	name: 'Монах',
	hitDie: 8,
	levelDie: 5,
	diff: {
		savingThrows: ['str', 'dex'],
		weaponProficiencies: [...simpleWeapons, ...lightMartialWeapon()],
		features: [
			'Выберите 2 навыка из следующих: {Акробатика}, {Атлетика}, {История}, {Проницательность}, {Религия}, {Скрытность}',
			'Владеете 1 видом ремесленных или музыкальных инструментов на выбор',
			'Бонусным действием можете совершать безоружный удар',
			'Вместо урона от монашеского оружия или безоружного удара можете бросить d{class:monk/martialArts}',
			'Можете добавлять {mod:Ловкости*/ вместо /*мод. Силы} при атаке монашеским оружием или безоружным ударом, также и для сложности спасброска, если делаете {Захват} или толчок при нанесении безоружного удара',
			'[Защита без доспехов.] Если вы не носите ни доспех, ни щит, ваш КД: 10 + {mod:Ловкости*/ + /*мод. Мудрости}',
		],
	}
}, {
	id: ECharClass.paladin,
	name: 'Паладин',
	hitDie: 10,
	levelDie: 6,
	diff: {
		savingThrows: ['wis', 'cha'],
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EArmorClass.heavy, EShieldClass.standard],
		weaponProficiencies: allWeapons,
		features: [
			'Выберите 2 навыка из следующих: {Атлетика}, {Запугивание}, {Медицина}, {Проницательность}, {Религия}, {Убеждение}',
			'[Возложение рук.] Вы можете действием коснуться существа и восстановить ему хиты из своего запаса. Запас на день — {level:5:0}. Или можно потратить 5 хитов из запаса, чтобы снять состояние {Отравленный}',
			'Подготавливаете {class:paladin/preparedSpells} заклинаний после продолжительного отдыха. Тогда же можете заменить 1 заклинание',
			'Заклинательная характеристика - {Харизма}',
			'Сложность спасброска от заклинания: 8 + {mod:Харизмы} + {profBonus:}',
			'Бонус к атаке заклинанием: {mod:Харизмы} + {profBonus:}',
			'Выберите 2 типа оружия, с которым вы можете совершать [оружейные приёмы]. После продолжительного отдыха можно сменить эти типы',
		],
	}
}, {
	id: ECharClass.rogue,
	name: 'Плут',
	hitDie: 8,
	levelDie: 5,
	diff: {
		savingThrows: ['dex', 'int'],
		weaponProficiencies: [EWeaponClass['simple.melee'], EWeaponClass['simple.ranged'], ...lightMartialWeapon(), ...finesseMartialWeapon()],
		toolProficiencies: [ETool.thieves],
		languages: ['Воровской жаргон', 'Язык на выбор'],
		features: [
			'Выберите 4 навыка из следующих: {Анализ}, {Акробатика}, {Атлетика}, {Внимательность}, {Запугивание}, {Ловкость рук}, {Обман}, {Проницательность}, {Скрытность}, {Убеждение}',
			'Для двух навыков, которыми владеете, выберите {Компетентность}',
			'Раз в ход можете нанести дополнительно {class:rogue/sneakAttack}d6 урона существу, по которому попали атакой с преимуществом, если атаковали фехтовальным или дальнобойным оружием',
			'Выберите 2 типа оружия, с которым вы можете совершать [оружейные приёмы]. После продолжительного отдыха можно сменить эти типы',
		],
	}
}, {
	id: ECharClass.ranger,
	name: 'Следопыт',
	hitDie: 10,
	levelDie: 6,
	diff: {
		savingThrows: ['str', 'dex'],
		armorProficiencies: [EArmorClass.light, EArmorClass.medium, EShieldClass.standard],
		weaponProficiencies: allWeapons,
		features: [
			'Выберите 3 навыка из следующих: {Анализ}, {Атлетика}, {Внимательность}, {Выживание}, {Природа}, {Проницательность}, {Скрытность}, {Уход за животными}',
			'[Избранный враг.] У вас всегда подготовлено заклинание {spell:Метка охотника}. Можете наложить его {class:ranger/favoredEnemy} раз не тратя ячейку. Количество применений восстанавливается после продолжительного отдыха',
			'Подготавливаете {class:ranger/preparedSpells} заклинаний после продолжительного отдыха',
			'Заклинательная характеристика - {Мудрость}',
			'Сложность спасброска от заклинания: 8 + {mod:Мудрости} + {profBonus:}',
			'Бонус к атаке заклинанием: {mod:Мудрости} + {profBonus:}',
			'Выберите 2 типа оружия, с которым вы можете совершать [оружейные приёмы]. После продолжительного отдыха можно сменить эти типы',
		],
	}
}, {
	id: ECharClass.sorcerer,
	name: 'Чародей',
	hitDie: 6,
	levelDie: 4,
	diff: {
		savingThrows: ['con', 'cha'],
		weaponProficiencies: simpleWeapons,
		features: [
			'Выберите 2уровень навыка из следующих: {Аркана}, {Запугивание}, {Обман}, {Проницательность}, {Религия}, {Убеждение}',
			'[Врождённое чародейство.] 2 раза после продолжительного отдыха бонусном действием можете на минуту получить следующие эффекты: 1) Сл. спасброска против ваших заклинаний увеличивается на 1; 2) Преимущество на броски атаки заклинаний'
		]
	}
}] as const