<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useStatsStore } from '@/stores/stats'
import { useCharClassStore } from '@/stores/charClass'
import { globalEvents } from '@/misc/globalEvents'
import { getReadableStatName, maxStatValue } from '@/misc/statsList'

const statsStore = useStatsStore()
const charClassStore = useCharClassStore()

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
function getStatModificator(statValue: number): string | null {
	// Проверка на выход за допустимый диапазон
	if (statValue < 1 || statValue > maxStatValue) {
		return null
	}

	const modificator = Math.ceil((statValue - 11) / 2)

	if (modificator == 0) {
		return '0'
	}

	return (Math.sign(modificator) > 0 ? '+' : '-') + Math.abs(modificator)
}

//TODO Вывести поле для отметки владения навыком внимательности
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
						span.value(v-if="getStatModificator(stat) !== null") ({{ getStatModificator(stat) }})

		.valueBlock(v-if="getStatModificator(statsStore.stats.dex) !== null")
			span Инициатива:
			span.value {{ 10 + Number(getStatModificator(statsStore.stats.dex)) }}

		.valueBlock(v-if="getStatModificator(statsStore.stats.wis) !== null")
			span(title="Если выбран соответствующий навык, добавляется бонус мастерства") Пассивная внимательность:
			span.value {{ 10 + Number(getStatModificator(statsStore.stats.wis)) }}

		.valueBlock(v-if="getStatModificator(statsStore.stats.con) !== null")
			span(:title="`Для каждого последующего уровня нужно бросать d${charClassStore.charHitDice} и к значению прибавлять ${Number(getStatModificator(statsStore.stats.con))}`") Количество хитов:
			span.value {{ 10 + Number(getStatModificator(statsStore.stats.con)) }}

		.valueBlock
			span(title="Зависит от выбранного класса") Кость хитов:
			span.value d{{ charClassStore.charHitDice }}
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
	}
}
</style>
