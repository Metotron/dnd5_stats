<script setup lang="ts">
import { computed } from 'vue'
import { type ESkill, fullSkillsList } from '@/handbook-data/skills'

import { getSkillModifier, useCharacter } from '@/composables/useCharacter'
import { statsList } from '@/handbook-data/stats'

const character = useCharacter(1)  //TODO Вместо 1 подставить выбранный пользователем ID

const checkedSkillsCount = computed(() => character.proficienciesCount)

function changeProficiencyState(skill: ESkill, ev: Event) {
	character.setProficiency(skill, (<HTMLInputElement>ev.target).checked)
}
</script>


<template lang="pug">
.pageBlock.skills
	.blockTitle 🧠 Навыки
		span.selectedCount(v-if="checkedSkillsCount" title="Сбросить" @click="character.resetProficiencies()") (Выбрано: {{ checkedSkillsCount }})
	.blockBody
		.skill(v-for="skillDescr in fullSkillsList" :key="skillDescr.name" :data-skill="skillDescr.statType")
			label
				input(type="checkbox" :checked="character.hasProficiency(skillDescr.skill)" @change="changeProficiencyState(skillDescr.skill, $event)")
				span.name(:class="{ selected: character.hasProficiency(skillDescr.skill) }") {{ skillDescr.name }}
				span.stat ({{ statsList[skillDescr.statType].shortName }})
			span.value {{ 10 + getSkillModifier(skillDescr.skill, character) }}
</template>

<style lang="scss" scoped>
.blockBody {
	display: grid;
	grid-template: repeat(9, auto) / 1fr 1fr;
	grid-auto-flow: column;
	column-gap: calc(var(--blockPadding) * 2);

	@media (995px <= width <= 1280px), (width <= 560px) {
		grid-template-columns: 100%;
		grid-auto-flow: row;
	}
}

.blockTitle {
	display: flex;
	align-items: center;

	.selectedCount {
		display: inline-block;
		margin-left: 4px;
		color: #777;
		font-size: .8rem;
		cursor: pointer;
	}
}

.skill {
	display: flex;
	align-items: center;
	padding-inline: calc(var(--blockPadding) / 2) var(--blockPadding);

	[type=checkbox] { margin-right: calc(var(--blockPadding) / 2); }

	[type=checkbox], .name, .stat {
		cursor: pointer;
		user-select: none;
	}
	.stat {
		font-size: .75em;
		color: #9d9d9d;
		margin-left: calc(var(--blockPadding) / 2);
	}

	label {
		display: flex;
		align-items: center;
		margin-right: var(--blockPadding);
	}

	.name.selected {
		color: var(--accentColor);
	}

	.value {
		margin-left: auto;
		color: var(--accentColor);
	}


	&:where([data-skill="dex"], [data-skill="wis"])  {
		background-color: #f2f2f2;
	}
}
</style>