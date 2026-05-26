<script setup lang="ts">
import { computed } from 'vue'

import { getArmorClassNameByEnum } from '@/handbook-data/armors'
import { ESkill } from '@/handbook-data/skills'
import { getStatModifier, statsList, type TStat } from '@/handbook-data/stats'

import { useCharacter } from '@/composables/useCharacter'

const character = useCharacter(1)  //TODO Вместо 1 подставить выбранный пользователем ID

const stats: TStat[] = Object.keys(character.stats) as TStat[]


// Класс брони с учётом модификаторов ловкости и щита
const totalAC = computed<number | undefined>(() => {
	if (!character.armor.value)
		return undefined

	if (!character.armor.value.useDexModifier)
		return character.armor.value.AC + (character.shield.value?.AC ?? 0)

	let ACModifier = getStatModifier(character.stats.dex)
	if (character.armor.value.maximumDexModifier)
		ACModifier = Math.min(ACModifier, character.armor.value.maximumDexModifier)

	return character.armor.value.AC + ACModifier + (character.shield.value?.AC ?? 0)
})
const
	hitCount = computed(() => character.hitDice.value + character.statModifier('con')),
	armorClass = computed(() => getArmorClassNameByEnum(character.armor.value?.group))

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
			span Инициатива:
			span.value {{ 10 +character.statModifier('dex') }}

		.valueBlock
			span(title="Если выбран соответствующий навык, добавляется бонус мастерства") Пассивная внимательность:
			span.value {{ character.getProficiencyValue(ESkill.perception) }}

		.valueBlock
			span(:title="`Для каждого последующего уровня нужно бросать d${character.hitDice} и к значению прибавлять ${getStatModifier(character.stats.con)}`") Количество хитов:
			span.value {{ hitCount }}

		.valueBlock
			span(title="Зависит от выбранного класса") Кость хитов:
			span.value d{{ character.hitDice }}

		.valueBlock(:title="character.armor ? '' : 'Рассчитывается из ловкости'")
			span Класс доспеха:
			span.value(v-if="character.armor.value") {{ armorClass }} (КД: {{ totalAC }})
			span.value(v-else) Без доспеха (КД: {{ 10 + getStatModifier(character.stats.dex) }})
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