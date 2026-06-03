<script setup lang="ts">
import { computed } from 'vue'
import { type ESkill, fullSkillsList } from '@/handbook-data/skills'

import { getSkillModifier, useCharacter } from '@/composables/useCharacter'
import { statsList } from '@/handbook-data/stats'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const checkedSkillsCount = computed(() => character.skills.count)

function changeSkillState(skill: ESkill, ev: Event) {
	character.skills.set(skill, (<HTMLInputElement>ev.target).checked)
}

function reset() {
	if (!character.locked)
		character.skills.resetAll()
}

//TODO Добавить возможность выставить не просто владение, а компетентность
</script>


<template lang="pug">
.pageBlock.skills(:class="{ locked: character.locked }")
	.blockTitle 🧠 Навыки
		span.selectedCount(v-if="checkedSkillsCount" title="Сбросить" @click="reset") (Выбрано: {{ checkedSkillsCount }})
	.blockBody
		.skill(v-for="skillDescr in fullSkillsList" :key="skillDescr.name" :data-skillstat="skillDescr.statType" :data-skill="skillDescr.skill")
			label
				input(type="checkbox" :checked="character.skills.enabled(skillDescr.skill)" :disabled="character.locked" @change="changeSkillState(skillDescr.skill, $event)")
				span.name(:class="{ selected: character.skills.enabled(skillDescr.skill) }") {{ skillDescr.name }}
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

		&:not(:is(.locked .selectedCount)) {
			cursor: pointer;
		}
	}
}

.skill {
	min-height: 32px;
	display: flex;
	align-items: center;
	padding-inline: calc(var(--blockPadding) / 2) var(--blockPadding);
	transition: all .2s;

	[type=checkbox] {
		margin-right: calc(var(--blockPadding) / 2);

		&:is(.locked input) { display: none; }
	}

	[type=checkbox], .name, .stat {
		user-select: none;

		&:not(:is(.locked *)) { cursor: pointer; }
	}
	.stat {
		font-size: .75em;
		color: var(--greyColor);
		margin-left: calc(var(--blockPadding) / 2);
	}

	label {
		display: flex;
		align-items: center;
		margin-right: var(--blockPadding);
	}


	.name:is(.locked *) { color: rgb(0 0 0 / .8); }
	.name.selected { color: var(--accentColor); }

	.value {
		margin-left: auto;
		color: var(--accentColor);
	}


	&:where([data-skillstat="dex"], [data-skillstat="wis"])  {
		background-color: #f2f2f2;
	}

	&:where(body.dimSkills .skill) {
		filter: grayscale(1);
		opacity: .4;
	}


	/* Костыльно, но по-другому не придумалось */
	&:is(body[data-hlskill="athletics"] .skill[data-skill="athletics"]),
	&:is(body[data-hlskill="acrobatics"] .skill[data-skill="acrobatics"]),
	&:is(body[data-hlskill="sleightOfHand"] .skill[data-skill="sleightOfHand"]),
	&:is(body[data-hlskill="stealth"] .skill[data-skill="stealth"]),
	&:is(body[data-hlskill="arcana"] .skill[data-skill="arcana"]),
	&:is(body[data-hlskill="history"] .skill[data-skill="history"]),
	&:is(body[data-hlskill="investigation"] .skill[data-skill="investigation"]),
	&:is(body[data-hlskill="nature"] .skill[data-skill="nature"]),
	&:is(body[data-hlskill="religion"] .skill[data-skill="religion"]),
	&:is(body[data-hlskill="animalHandling"] .skill[data-skill="animalHandling"]),
	&:is(body[data-hlskill="insight"] .skill[data-skill="insight"]),
	&:is(body[data-hlskill="medicine"] .skill[data-skill="medicine"]),
	&:is(body[data-hlskill="perception"] .skill[data-skill="perception"]),
	&:is(body[data-hlskill="survival"] .skill[data-skill="survival"]),
	&:is(body[data-hlskill="deception"] .skill[data-skill="deception"]),
	&:is(body[data-hlskill="intimidation"] .skill[data-skill="intimidation"]),
	&:is(body[data-hlskill="performance"] .skill[data-skill="performance"]),
	&:is(body[data-hlskill="persuasion"] .skill[data-skill="persuasion"]) {
		filter: none;
		opacity: 1;

		.name { font-weight: bold; }
	}
}
</style>