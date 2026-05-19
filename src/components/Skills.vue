<script setup lang="ts">
import { ESkill, fullSkillsList, getSkillStatModifier } from '../baseLists/skills'

import { useSkillsStore } from '../stores/skillsStore'
import { useStatsStore } from '../stores/statsStore'

const skillsStore = useSkillsStore()
const statsStore = useStatsStore()

/** Наличие владения навыком */
function getProficiencyState(skill: ESkill): boolean {
	return skillsStore.proficiencies[skill]
}

/** Сохранение в сторе состояния владения характеристикой */
function setProficiencyState(skill: ESkill, event: Event) {
	skillsStore.setProficiency(skill, (event.target as HTMLInputElement).checked)
}

/** Количество отмеченных характеристик */
function proficienciedSkillsCount(): number {
	return Object.values(skillsStore.proficiencies).reduce((count, prof) => count += Number(prof), 0)
}
</script>


<template lang="pug">
.pageBlock.skills
	.blockTitle 🧠 Навыки
		span.selectedCount(v-if="proficienciedSkillsCount()" title="Сбросить" @click="skillsStore.resetProficiencies()") (Выбрано: {{ proficienciedSkillsCount() }})
	.blockBody
		.skill(v-for="skillDescr in fullSkillsList" :key="skillDescr.name" :data-skill="skillDescr.statType")
			label
				input(type="checkbox" :checked="getProficiencyState(skillDescr.skill)" @change="setProficiencyState(skillDescr.skill, $event)")
				span.name(:class="{ selected: skillsStore.proficiencies[skillDescr.skill] }") {{ skillDescr.name }}
				span.stat ({{ skillDescr.statType }})
			span.value {{ 10 + getSkillStatModifier(skillDescr.skill, statsStore, skillsStore) }}
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