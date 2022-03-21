<script setup lang="ts">
import { TSkill, skillsList } from '@/misc/skills'
import { statsShorts } from '@/misc/statsList'

import { useSkillsStore } from '@/stores/skillsStore'
import { useStatsStore } from '@/stores/statsStore'

const skillsStore = useSkillsStore()
const statsStore = useStatsStore()

// Наличие владения навыком
function getProficiencyState(skill: TSkill): boolean {
	return skillsStore.skillsProficiencies[skill]
}

// Сохранение в сторе состояния владения характеристикой
function setProficiencyState(skill: TSkill, event: Event) {
	skillsStore.setSkillProficiency(skill, (event.target as HTMLInputElement).checked)
}

// Модификатор характеристики, на коротой основан навык
function getStatModifier(skillName: TSkill): number {
	const statName = skillsList[skillName].statType
	const statValue = statsStore.stats[statName]
	const modifier = statValue > 0 ? Math.ceil((statValue - 11) / 2) : 0
	return modifier + (skillsStore.skillsProficiencies[skillName] ? 2 : 0)
}
</script>


<template lang="pug">
.pageBlock.skills
	.blockTitle
		slot
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
	gap: calc(var(--blockPadding) / 2) var(--blockPadding);
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
//TODO Сделать адаптив
</style>