<script setup lang="ts">
import { computed, ref } from 'vue'
import { armorClassList, EShield, getArmorsOfClass, type TArmorDescription } from '@/baseLists/armors'

import { useCharacter } from '@/composables/useCharacter'
//FIXME Правильно достать персонажа
const { newCharacter } = useCharacter()

const character = newCharacter()

const selectedArmor = ref<TArmorDescription>()
const armor = computed({
	get() { return selectedArmor.value ?? '-' },
	set(armor) { selectedArmor.value = armor == '-' ? undefined : armor }
})

// Какой щит используется
const shieldInUse = computed<string | undefined>(() => character.shield.value?.name)

/** Взять/убрать щит */
function switchShield() {
	// Пока что щит один, как в правилах
	const shield = character.shield === undefined ? EShield.standard : undefined
	character.shield.value = shield
}

// Атрибут title для <select>
const titleForSelectTag = computed<string>(() => {
	if (!selectedArmor.value)
		return ''

	let result = selectedArmor.value.AC.toString()
	if (!selectedArmor.value.useDexModifier)
		return result

	result += ' + ловкость'

	if (selectedArmor.value.maximumDexModifier !== undefined)
		result += ` (макс. ${selectedArmor.value.maximumDexModifier})`

	return result
})
</script>


<template lang="pug">
.pageBlock.armor
	.blockTitle 👚 Защита
	.blockBody
		select(v-model="armor" :title="titleForSelectTag")
			option -
			optgroup(v-for="armorClass in armorClassList" :label="armorClass.name")
				option(
					v-for="armorDetails in getArmorsOfClass(armorClass.armorClass)"
					:key="armorDetails.id"
					:value="armorDetails.id"
				) {{ armorDetails.name }}

		span(@click="switchShield") 🛡️ {{ shieldInUse ?? '' }}

		.alert(v-if="character.needMoreStrength" :title="`Требуется ${character.armor.value?.minimumStr} силы`") ❗Скорость уменьшена на 10 футов
</template>


<style lang="scss" scoped>
select { width: 170px; }

.alert {
	border-radius: 3px;
	margin-top: var(--blockPadding);
	padding: calc(var(--blockPadding) / 2) var(--blockPadding);
	border: 1px solid var(--accentColor);
	color: var(--accentColor);
	font-size: .8rem;
}
</style>
