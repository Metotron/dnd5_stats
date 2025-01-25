<script setup lang="ts">
import { TSkillEnum, skillsList } from '../misc/skills'
import { statsShorts } from '../misc/statsList'

import { useSkillsStore } from '../stores/skillsStore'
import { useStatsStore } from '../stores/statsStore'

const skillsStore = useSkillsStore()
const statsStore = useStatsStore()

// Наличие владения навыком
function getProficiencyState(skill: TSkillEnum): boolean {
	return skillsStore.proficiencies[skill]
}

// Сохранение в сторе состояния владения характеристикой
function setProficiencyState(skill: TSkillEnum, event: Event) {
	skillsStore.setProficiency(skill, (event.target as HTMLInputElement).checked)
}

// Модификатор характеристики, на которой основан навык
function getStatModifier(skillName: TSkillEnum): number {
	const statName = skillsList[skillName].statType
	const statValue = statsStore.stats[statName]
	const modifier = statValue > 0 ? Math.ceil((statValue - 11) / 2) : 0
	return modifier + (skillsStore.proficiencies[skillName] ? 2 : 0)
}

// Количество отмеченных характеристик
function proficienciedSkillsCount(): number {
	return Object.values(skillsStore.proficiencies).reduce((count, prof) => count += Number(prof), 0)
}
</script>


<template lang="pug">
.pageBlock.skills
	.blockTitle 🧠 Навыки
		span.selectedCount(v-if="proficienciedSkillsCount()") (Выбрано: {{ proficienciedSkillsCount() }})
	.blockBody
		.skill(v-for="(skillDescription, skill) in skillsList")
			label
				input(type="checkbox" :checked="getProficiencyState(skill)" @change="setProficiencyState(skill, $event)")
				span.name {{ skillDescription.name }}
				span.stat ({{ statsShorts[skillDescription.statType] }})
			span.value {{ 10 + getStatModifier(skill) }}
</template>


<style lang="scss" scoped>
.blockBody {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(9, auto);
	grid-auto-flow: column;
	column-gap: calc(var(--blockPadding) * 2);

	@media (max-width: 1280px) and (min-width: 995px), (max-width: 560px) {
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
		font-size: 0.8rem;
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
		font-size: 0.75em;
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