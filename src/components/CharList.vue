<script setup lang="ts">
import { fullArmorsList, getArmorClassName, type TArmorClassName } from '../misc/armorList'
import { EGlobalEvents, subscribeOnEvent } from '../misc/globalEvents'
import { maxStatValue, statsList } from '../misc/statsList'


import { computed, onBeforeUnmount, onMounted } from 'vue'

import { ESkill } from '../misc/skills'
import { useArmorStore } from '../stores/armorStore'
import { useCharClassStore } from '../stores/charClassStore'
import { useSkillsStore } from '../stores/skillsStore'
import { useStatsStore } from '../stores/statsStore'

const statsStore = useStatsStore()
const charClassStore = useCharClassStore()
const armorStore = useArmorStore()
const skillsStore = useSkillsStore()

const abortController = new AbortController()
onBeforeUnmount(abortController.abort)

onMounted(() => {
	subscribeOnEvent(EGlobalEvents.LoadValuesToCharlist, loadValuesToCharlist, abortController)
})

const selectedArmorClass = computed<TArmorClassName | undefined>(() => {
	if (!armorStore.selectedArmor)
		return undefined

	const armor = fullArmorsList.find(a => a.id == armorStore.selectedArmor)
	return getArmorClassName(armor?.className)
})

// Загрузка имеющихся значений характеристик
function loadValuesToCharlist() {
	const stats = statsStore.generatedValues
	const statsLinks = statsStore.dataToStatsLinks

	for (const idx in statsLinks) {
		if (statsLinks[idx] === null)
			continue

		statsStore.setStatValue(statsLinks[idx], stats[idx])
	}
}

/** Расчёт модификатора характеристики */
function getStatModifier(statValue: number): number | null {
	if (statValue < 1 || statValue > maxStatValue)
		return null

	return Math.ceil((statValue - 11) / 2)
}

/** Модификатор текстом (с отображением плюса спереди, если модификатор больше нуля) */
function textModifier(statValue: number): string | null {
	const modifier = getStatModifier(statValue)
	if (modifier === null)
		return null

	return modifier < 0 ? modifier.toString() : '+' + modifier
}

const perceptionSkillComponent = computed<number>(() => {
	//TODO Двойка — бонус мастерства для первого уровня. Правильнее брать её из характеристик персонажа (аналогично и в skill.ts)
	return skillsStore.proficiencies[ESkill.perception] ? 2 : 0
})
//TODO Отобразить наличие помехи для скрытности со стороны доспехов
</script>

<template lang="pug">
.pageBlock.charList
	.blockTitle 📎 Характеристики персонажа
	.blockBody
		.valueBlock
			.stats
				div(v-for="(stat, statName) in statsStore.stats" :key="statName")
					span {{ statsList[statName] }}:
					span.statValue
						| {{ stat }}
						span.value(v-if="getStatModifier(stat) !== null") (#[span(title="Применяемый модификатор") {{ textModifier(stat) }}])

		.valueBlock(v-if="getStatModifier(statsStore.stats.dex) !== null")
			span Инициатива:
			span.value {{ 10 + getStatModifier(statsStore.stats.dex)! }}

		.valueBlock(v-if="getStatModifier(statsStore.stats.wis) !== null")
			span(title="Если выбран соответствующий навык, добавляется бонус мастерства") Пассивная внимательность:
			span.value {{ 10 + getStatModifier(statsStore.stats.wis)! + perceptionSkillComponent }}

		.valueBlock(v-if="getStatModifier(statsStore.stats.con) !== null")
			span(:title="`Для каждого последующего уровня нужно бросать d${charClassStore.charHitDice} и к значению прибавлять ${getStatModifier(statsStore.stats.con)}`") Количество хитов:
			span.value {{ charClassStore.charHitDice + getStatModifier(statsStore.stats.con)! }}

		.valueBlock
			span(title="Зависит от выбранного класса") Кость хитов:
			span.value d{{ charClassStore.charHitDice }}

		.valueBlock(v-if="selectedArmorClass !== undefined && !armorStore.isNeedMoreStrength")
			span Класс доспеха:
			span.value {{ selectedArmorClass }}
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

		.statValue { color: #999; }
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
	}
}
</style>