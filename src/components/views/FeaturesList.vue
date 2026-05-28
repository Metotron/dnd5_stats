<script setup lang="ts">
import { useCharacter } from '@/composables/useCharacter'
import { adjustBaseRace, baseRaces } from '@/handbook-data/races'
import { fullSkillsList } from '@/handbook-data/skills'
import { textMarkToHTML } from '@/misc/textConvert'
import { computed } from 'vue'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const combinedFeatures = computed<string[]>(() => {
	//TODO Добавить background
	return adjustBaseRace(baseRaces[character.race.value.baseRace], character.race.value.diff).features ?? []
})


function highlightSkill(ev: MouseEvent) {
	if ((<HTMLElement>ev.target).tagName != 'EM')
		return

	const emText = (<HTMLElement>ev.target).textContent.toLocaleLowerCase()
	const skillToSelect = fullSkillsList.find(skill => skill.name.toLocaleLowerCase() == emText)
	if (skillToSelect) {
		document.body.classList.add('dimSkills')
		document.body.setAttribute('data-hlskill', skillToSelect.skill)
	}
}

function unhighlight() {
	document.body.classList.remove('dimSkills')
	document.body.removeAttribute('data-hlskill')
}

//TODO Нужны предыстории
//TODO Внести фичи в классы и тоже взять сюда
</script>


<template lang="pug">
.pageBlock.features
	.blockTitle 🪶 Особенности
	.blockBody
		ul.features
			li.feature(v-for="feature in combinedFeatures" v-html="textMarkToHTML(feature)" @mouseover="highlightSkill" @mouseout="unhighlight")
</template>

<style lang="scss" scoped>
.features:has(li:hover) {
	li:not(:hover) {
		filter: grayscale(1);
		opacity: .4;
	}
}

.feature {
	font-size: .875rem;
	line-height: 1.2;
	transition: all .2s;

	:deep(b) {
		color: var(--accentColor);
	}

	:deep(em) {
		color: var(--accentColor);
		cursor: default;
	}
}
</style>