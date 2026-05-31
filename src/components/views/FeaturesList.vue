<script setup lang="ts">
import { useCharacter } from '@/composables/useCharacter'
import { fullBackgroundsList } from '@/handbook-data/backgrounds'
import { fullCharClassesList } from '@/handbook-data/classes'
import { adjustDescription, baseSpecies } from '@/handbook-data/species'
import { fullSkillsList } from '@/handbook-data/skills'
import { textMarkToHTML } from '@/misc/textConvert'
import { computed } from 'vue'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const combinedFeatures = computed<string[]>(() => {
	const speciesDiff = character.species.value?.diff ?? {}
	const classDiff = fullCharClassesList.find(cl => cl.id == character.charClass.value.id)!.diff ?? {}
	const bgDiff = fullBackgroundsList.find(bg => bg.id === character.background.value?.id)?.diff ?? {}

	const descr = adjustDescription(baseSpecies[character.species.value.baseSpecies], speciesDiff, classDiff, bgDiff)
	return descr.features ?? []
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
//TODO Нужна возможность вписывать свои строки
</script>


<template lang="pug">
.pageBlock.features
	.blockTitle 🪶 Особенности
	.blockBody
		ul.features
			li.feature(v-for="feature in combinedFeatures" v-html="textMarkToHTML(feature, character)" @mouseover="highlightSkill" @mouseout="unhighlight")
</template>


<style lang="scss" scoped>
.features:has(li:hover) {
	li:not(:hover) {
		filter: grayscale(1);
		opacity: .6;
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