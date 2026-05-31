<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { armorClassList, EArmor, EShield, getArmorsOfClass } from '@/handbook-data/armors'

import { useCharacter } from '@/composables/useCharacter'

const charId = sessionStorage.getItem('charId') ?? 1
const character = useCharacter(Number(charId))

const selectedArmor = ref<EArmor>()
const armor = computed({
	get() { return selectedArmor.value ?? '-' },
	set(armor) { selectedArmor.value = armor == '-' ? undefined : armor }
})
watch(selectedArmor, armor => character.armor.value = armor)

// Какой щит используется
const shieldInUse = computed(() => character.shield.value?.name)

/** Взять/убрать щит */
function switchShield() {
	// Пока что щит один, как в правилах
	const shield = character.shield.value === undefined ? EShield.standard : undefined
	character.shield.value = shield
}

// Атрибут title для <select>
const titleForSelectTag = computed<string>(() => {
	if (!character.armor.value)
		return ''

	let result = character.armor.value.AC.toString()
	if (!character.armor.value.useDexModifier)
		return result

	result += ' + ловкость'

	if (character.armor.value.maximumDexModifier !== undefined)
		result += ` (макс. ${character.armor.value.maximumDexModifier})`

	return result
})
</script>


<template lang="pug">
.pageBlock.armor
	.blockTitle 🧥 Защита
	.blockBody
		select(v-model="armor" :title="titleForSelectTag")
			option -
			optgroup(v-for="armorClass in armorClassList" :label="armorClass.name")
				option(
					v-for="armorDetails in getArmorsOfClass(armorClass.armorClass)"
					:key="armorDetails.id"
					:value="armorDetails.id"
				) {{ armorDetails.name }}

		span(@click="switchShield()" class="shield" :class="{ inUse: shieldInUse !== undefined }" :title="shieldInUse ? 'Убрать щит' : 'Экипировать щит'") 🛡️

		.alert(v-if="character.needMoreStrength.value" :title="`Требуется ${character.armor.value?.minimumStr} силы`") Скорость уменьшена на 10 футов/сек
</template>


<style lang="scss" scoped>
select {
	flex-grow: 1;
}

.alert {
	width: 100%;
	border-radius: 3px;
	margin-top: var(--blockPadding);
	padding: calc(var(--blockPadding) / 2) var(--blockPadding);
	border: 1px solid var(--accentColor);
	color: var(--accentColor);
	font-size: .8rem;
}

.blockBody {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: var(--blockPadding);
}

.shield {
	flex-shrink: 0;
	opacity: .5;
	filter: grayscale(1);
	transition: opacity .2s, filter .2s;
	cursor: pointer;

	&.inUse {
		opacity: 1;
		filter: none;
	}
}
</style>
