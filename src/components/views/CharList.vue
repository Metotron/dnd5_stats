<script setup lang="ts">
import { computed } from 'vue'

import { ESkill } from '@/handbook-data/skills'
import { getStatModifier, statsList, type TStat } from '@/handbook-data/stats'

import { useCharacter } from '@/composables/useCharacter'
import { adjustBaseRace, baseRaces } from '@/handbook-data/races'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const stats: TStat[] = Object.keys(character.stats) as TStat[]


const
	hitCount = computed(() => character.hitDice.value + character.statModifier('con')),
	armorValues = computed(() => character.armorValues),
	speed = computed(() => {
		//TODO Добавить background, если там есть влияние на скорость
		const speed = adjustBaseRace(baseRaces[character.race.value.baseRace], character.race.value.diff).speed
		return character.needMoreStrength.value ? speed - 10 : speed
	}),
	hitpointsTitle = computed(() => {
		const conModifier = getStatModifier(character.stats.con)
		return `Для каждого последующего уровня нужно бросать d${character.hitDice.value}` + (conModifier != 0 ? ` и к значению прибавлять ${conModifier}` : '')
	})

/** Модификатор текстом (с отображением плюса спереди, если модификатор больше нуля) */
function textModifier(statName: TStat): string | undefined {
	const modifier = character.statModifier(<TStat>statName)
	return modifier < 0 ? modifier.toString() : '+' + modifier
}

//TODO Отобразить наличие помехи для скрытности со стороны доспехов
</script>


<template lang="pug">
.pageBlock.charList
	.blockTitle 📑 Характеристики персонажа
	.blockBody
		.valueBlock
			.stats
				div(v-for="statName in stats" :key="statName")
					span {{ statsList[statName].name }}:
					span.statValue
					| {{ character.stats[statName] }}
					span.value (#[span(title="Применяемый модификатор") {{ textModifier(statName) }}])

		.valueBlock
			span Скорость:
			span.value(title="Футов в секунду") {{ speed }}

		.valueBlock
			span Инициатива:
			span.value {{ 10 + character.statModifier('dex') }}

		.valueBlock
			span(title="Если выбран соответствующий навык, добавляется бонус мастерства") Пассивная внимательность:
			span.value {{ character.proficiencies.getValue(ESkill.perception) }}

		.valueBlock
			span(:title="hitpointsTitle") Количество хитов:
			span.value {{ hitCount }}

		.valueBlock
			span(title="Зависит от выбранного класса") Кость хитов:
			span.value d{{ character.hitDice }}

		.valueBlock(:title="character.armor ? '' : 'Рассчитывается из ловкости'")
			span Класс доспеха:
			span.value {{ armorValues.armorClass }} (КД: {{ armorValues.AC }}) #[span(v-if="character.shield.value !== undefined") 🛡️]
</template>


<style lang="scss" scoped>
.pageBlock.charList {
	align-self: start;
}

.blockBody {
	padding-inline: 0;
}

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

	.statValue { color: #999; }
}
</style>