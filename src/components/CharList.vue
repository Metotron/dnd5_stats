<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { useStatsStore } from '@/stores/stats'
import { useCharClassStore } from '@/stores/charClass'
import { useArmorStore } from '@/stores/armor'
import { useSkillsStore } from '@/stores/skills'
import { globalEvents } from '@/misc/globalEvents'
import { getReadableStatName, maxStatValue } from '@/misc/statsList'
import { TSkill } from '@/misc/skills'

const statsStore = useStatsStore()
const charClassStore = useCharClassStore()
const armorStore = useArmorStore()
const skillsStore = useSkillsStore()

onMounted(() => {
	window.addEventListener(globalEvents.LoadValuesToCharlist, loadValuesToCharlist)
})
onBeforeUnmount(() => {
	window.removeEventListener(globalEvents.LoadValuesToCharlist, loadValuesToCharlist)
})

// Загрузка имеющихся значений характеристик
function loadValuesToCharlist() {
	const stats = statsStore.generatedValues
	const statsLinks = statsStore.dataToStatsLinks

	for (const idx in statsLinks) {
		if (statsLinks[idx] === null) {
			continue
		}

		statsStore.setStatValue(statsLinks[idx]!, stats[idx])
	}
}

// Расчёт модификатора характеристики
function getStatModifier(statValue: number): string | null {
	// Проверка на выход за допустимый диапазон
	if (statValue < 1 || statValue > maxStatValue) {
		return null
	}

	const modifier = Math.ceil((statValue - 11) / 2)

	if (modifier == 0) {
		return '0'
	}

	return (Math.sign(modifier) > 0 ? '+' : '-') + Math.abs(modifier)
}

const perceptionSkillComponent = computed<number>(() => {
	return skillsStore.skillsProficiencies[TSkill.perception] ? 2 : 0
})
//TODO Отобразить наличие помехи для скрытность от доспехов
</script>

<template lang="pug">
.pageBlock.charList
	.blockTitle
		slot
	.blockBody
		.valueBlock
			.stats
				div(v-for="(stat, statName) in statsStore.stats" :key="statName")
					span {{ getReadableStatName(statName) }}:
					span.statValue
						| {{ stat }}
						span.value(v-if="getStatModifier(stat) !== null") (#[span(title="Применяемый модификатор") {{ getStatModifier(stat) }}])

		.valueBlock(v-if="getStatModifier(statsStore.stats.dex) !== null")
			span Инициатива:
			span.value {{ 10 + Number(getStatModifier(statsStore.stats.dex)) }}

		.valueBlock(v-if="getStatModifier(statsStore.stats.wis) !== null")
			span(title="Если выбран соответствующий навык, добавляется бонус мастерства") Пассивная внимательность:
			span.value {{ 10 + Number(getStatModifier(statsStore.stats.wis)) + perceptionSkillComponent }}

		.valueBlock(v-if="getStatModifier(statsStore.stats.con) !== null")
			span(:title="`Для каждого последующего уровня нужно бросать d${charClassStore.charHitDice} и к значению прибавлять ${Number(getStatModifier(statsStore.stats.con))}`") Количество хитов:
			span.value {{ charClassStore.charHitDice + Number(getStatModifier(statsStore.stats.con)) }}

		.valueBlock
			span(title="Зависит от выбранного класса") Кость хитов:
			span.value d{{ charClassStore.charHitDice }}

		.valueBlock(v-if="armorStore.armorClass !== null && !armorStore.needMoreStrength && statsStore.stats.str")
			span Класс доспеха:
			span.value {{ armorStore.armorClass }}
</template>

<style lang="scss" scoped>
.pageBlock.charList {
	align-self: start;

	.blockBody {
		padding-left: 0;
		padding-right: 0;
	}

	.valueBlock {
		border-bottom: 1px solid var(--borderColor);
		padding: var(--blockPadding);
		font-size: 16px;

		&:first-child { padding-top: 0; }
		&:last-child {
			padding-bottom: 0;
			border-bottom: none;
		}

		.statValue, .value {
			display: inline-block;
			color: var(--accentColor);
			margin-left: 0.4em;
		}

		.statValue {
			color: #999;
		}
	}

	.stats {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		grid-template-rows: repeat(3, auto);
		grid-auto-flow: column;
		gap: var(--blockPadding) calc(var(--blockPadding) * 2);

		@media (max-width: 700px) {
			grid-template-columns: 100%;
			grid-auto-flow: row;
		}
	}
}
</style>
