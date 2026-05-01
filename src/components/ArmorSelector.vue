<script setup lang="ts">
import { armorClasses, EShield, fullArmorsList, getArmorsOfClass, type EArmor, type TArmorDescription } from '../misc/armorList'
import { computed, ref, watch } from 'vue'

import { useArmorStore } from '../stores/armorStore'

const armorStore = useArmorStore()

const selectedArmor = ref<EArmor | '-'>('-')  //TODO Сделать привязку к стору через computed
watch(selectedArmor, armor => {
	armorStore.setArmor(armor == '-' ? undefined : armor)
})
const selectedArmorDetails = computed<TArmorDescription | undefined>(() => {
	if (selectedArmor.value == '-')
		return undefined

	return fullArmorsList.find(({ id }) => id == selectedArmor.value)
})

// Переключение использования щита
const isShieldInUse = computed<boolean>({
	get() { return armorStore.shield !== undefined },
	set(value) { armorStore.setShieldState(value ? EShield.standard : undefined ) }
})

/** Взять/убрать щит */
function switchShield() {
	isShieldInUse.value = !isShieldInUse.value
}

// Атрибут title для <select>
const titleForSelectTag = computed<string>(() => {
	if (!selectedArmorDetails.value) {
		return ''
	}

	let result = selectedArmorDetails.value.AC.toString()
	if (!selectedArmorDetails.value.useDexModifier)
		return result

	result += ' + ловкость'

	if (selectedArmorDetails.value.maximumDexModifier !== undefined)
		result += ` (макс. ${selectedArmorDetails.value.maximumDexModifier})`

	return result
})
</script>


<template lang="pug">
.pageBlock.armor
	.blockTitle 👚 Защита
	.blockBody
		select(v-model="selectedArmor" :title="titleForSelectTag")
			option -
			optgroup(v-for="armorClass in armorClasses" :label="armorClass.name")
				option(
					v-for="armorDetails in getArmorsOfClass(armorClass.classType)"
					:key="armorDetails.id"
					:value="armorDetails.id"
				) {{ armorDetails.name }}

		span(@click="switchShield") 🛡️ {{ isShieldInUse }}

		.alert(v-if="armorStore.needMoreStrength && selectedArmorDetails" :title="`Требуется ${selectedArmorDetails.minimumStr} силы`") ❗Скорость уменьшена на 10 футов
</template>


<style lang="scss" scoped>
select { width: 170px; }

.alert {
	border-radius: 3px;
	margin-top: var(--blockPadding);
	padding: calc(var(--blockPadding) / 2) var(--blockPadding);
	border: 1px solid var(--accentColor);
	color: var(--accentColor);
	font-size: 0.8rem;
}
</style>
