<script setup lang="ts">
import { computed, watch } from 'vue'

import { ESkill } from '@/handbook-data/skills'
import { getStatModifier, statsList, type TStat } from '@/handbook-data/stats'

import { useCharacter } from '@/composables/useCharacter'
import { useFullDescription } from '@/composables/useFullDescription'
import { ECharClass } from '@/handbook-data/charClasses'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))
const { fullDescription } = useFullDescription()

const stats: TStat[] = Object.keys(character.stats) as TStat[]


const
	hitCount = computed(() => {
		const level1hits = character.hitDie.value + character.statModifier('con')
		const nextLevelsHits = character.nextLevelHitDie.value + character.statModifier('con')
		return level1hits + nextLevelsHits * (character.level.value - 1)
	}),
	armorValues = computed(() => {
		const armorClass = character.armorValues.armorClass
		let AC = character.armorValues.AC

		// Защита варвара без доспехов
		if (character.charClass.value.id == ECharClass.barbarian && character.armor.value === undefined)
			AC = 10 + character.statModifier('dex') + character.statModifier('con')
		// Защита монаха без доспехов
		else if (character.charClass.value.id == ECharClass.monk && character.armor.value === undefined && character.shield.value === undefined)
			AC = 10 + character.statModifier('dex') + character.statModifier('wis')

		return { armorClass, AC }
	}),
	speed = computed(() => {
		const speed = fullDescription(character).speed
		return character.needMoreStrength.value ? speed - 10 : speed
	}),
	hitpointsTitle = computed(() => {
		const conModifier = getStatModifier(character.stats.con)
		return `Для каждого последующего уровня нужно бросать d${character.hitDie.value}` + (conModifier != 0 ? ` и к значению прибавлять ${conModifier}` : '')
	})

watch(fullDescription, () => {
	const savingThrows = fullDescription(character).savingThrows
	if (!savingThrows) return

	character.savingThrows.resetAll()
	savingThrows.forEach(svt => character.savingThrows.set(svt, true))
}, { immediate: true })

/** Модификатор текстом (с отображением плюса спереди, если модификатор больше нуля) */
function textModifier(statName: TStat): string | undefined {
	const modifier = character.statModifier(<TStat>statName)
	return modifier < 0 ? modifier.toString() : '+' + modifier
}

//TODO Обработать fullDescription.statsModifiers
//TODO Отобразить наличие помехи для скрытности со стороны доспехов
//TODO Отобразить наличие помехи атаке для heavy-оружия, если сила/ловкость меньше 13
//TODO Отобразить наличие вдохновения
//TODO Показать наличие darkvision с описанием его действия
//TODO Вывести размер существа
//TODO Вывести количество денег
//TODO Отобразить владение доспехами и оружием
//TODO Нужно редактирование максимума хитов (черты могут их менять)
//? Отобразить временные хиты?
</script>


<template lang="pug">
.pageBlock.charList
	.blockTitle 📑 Характеристики персонажа
	.blockBody
		.valueBlock
			.stats
				div.statRow(v-for="statName in stats" :key="statName")
					span {{ statsList[statName].name }}:
					span.statValue
						| {{ character.stats[statName] }}
						span.value(:class="{ high: character.statModifier(statName) > 0, low: character.statModifier(statName) < 0 }") [#[span(title="Применяемый модификатор") {{ textModifier(statName) }}]]

		.valueBlock.savingThrows(v-if="character.savingThrows.count.value > 0")
			span Спасброски:
			span.value(v-for="svt in  character.savingThrows.getAll()" :key="svt") {{ statsList[svt].name }}

		.valueBlock
			span Скорость:
			span.value(title="Футов в секунду") {{ speed }}

		.valueBlock
			span Инициатива:
			span.value {{ 10 + character.statModifier('dex') }}

		.valueBlock
			span(title="Если выбран соответствующий навык, добавляется бонус мастерства") Пассивная внимательность:
			span.value {{ character.skills.getValue(ESkill.perception) }}

		.valueBlock
			span(:title="hitpointsTitle") Количество хитов:
			span.value {{ hitCount }}

		.valueBlock
			span(title="Зависит от выбранного класса") Кость хитов:
			span.value d{{ character.hitDie }}

		.valueBlock(:title="character.armor ? '' : 'Рассчитывается из ловкости'")
			span Класс доспеха:
			span.value {{ armorValues.armorClass }} (КД: {{ armorValues.AC }}) #[span(v-if="character.shield.value !== undefined") 🛡️]
</template>


<style lang="scss" scoped>
.pageBlock.charList { align-self: start; }

.blockBody { padding-inline: 0; }

.valueBlock {
	border-bottom: 1px solid var(--borderColor);
	padding-block: var(--blockPadding);
	font-size: 16px;

	&:first-child { padding-top: 0; }
	&:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.statValue, .value {
		display: inline-block;
		color: var(--accentColor);
		margin-left: .4em;
	}

	.statValue .value {
		font-family: monospace;
		color: rgb(from var(--greyColor) r g b / .3);

		span {
			color: var(--greyColor);
			line-height: 1;
			font-weight: bold;
		}

		&.high span { color: var(--highColor); }
		&.low span {	color: var(--lowColor); }
	}

	&.savingThrows {
		display: flex;
		flex-wrap: wrap;
		gap: .4em;

		.value { margin-left: 0; }

		.value:not(:last-child)::after {
			content: ",";
		}
	}
}

.statRow {
	display: inline-grid;
	grid-template-columns: auto 1fr auto;
	gap: .4em;

	.statValue { display: contents; }
	.statValue, .value { margin-inline: 0; }
}

.stats {
	display: grid;
	grid-template: repeat(3, auto) / 1.3fr 1fr;
	grid-auto-flow: column;
	gap: var(--blockPadding) calc(var(--blockPadding) * 2);

	@media (600px < width <= 700px), (width <= 400px) {
		grid-template-columns: 100%;
		grid-auto-flow: row;
	}

	.statValue { color: var(--greyColor); }
}
</style>