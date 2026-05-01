<script setup lang="ts">
import { ESkill, eskillAsNumber, fullSkillsList, getSkillStatModifier } from '../misc/skills'
import { statsShorts } from '../misc/statsList'

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
		span.selectedCount(v-if="proficienciedSkillsCount()") (Выбрано: {{ proficienciedSkillsCount() }})
	.blockBody
		.skill(v-for="skill in ESkill" :key="skill")
			label
				input(type="checkbox" :checked="getProficiencyState(skill)" @change="setProficiencyState(skill, $event)")
				span.name {{ fullSkillsList[eskillAsNumber(skill)].name }}
				span.stat ({{ statsShorts[fullSkillsList[eskillAsNumber(skill)].statType] }})
			span.value {{ 10 + getSkillStatModifier(skill, statsStore, skillsStore) }}
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
	}
}

.skill {
	display: flex;
	align-items: center;

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

	.value {
		margin-left: auto;
		color: var(--accentColor);
	}
}
</style>