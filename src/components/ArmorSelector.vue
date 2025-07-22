<script setup lang="ts">
import { armorClassName, armorList, shield } from '../misc/armorList'
import type { EArmor, TArmorDescription, EArmorClass } from '../misc/armorList'

import { ref, computed } from 'vue'

import { useStatsStore } from '../stores/statsStore'
import { useArmorStore } from '../stores/armorStore'

const statsStore = useStatsStore()
const armorStore = useArmorStore()

const selectedArmor = ref<EArmor | '-'>('-')
const armorDetails = computed<TArmorDescription | null>(() => {
	if (selectedArmor.value == '-')
		return null

	return armorList.find(({ id }) => id == selectedArmor.value) ?? null
})

//FIXME щит не задействован
const isShieldInUse = ref(false)
// Класс брони с учётом модификаторов ловкости и щита
const totalAC = computed<number | null>(() => {
	if (!armorDetails.value)
		return null

	if (!armorDetails.value.useDexModifier)
		return armorDetails.value.AC + (isShieldInUse.value ? shield.AC : 0)

	let ACModifier = Math.ceil((statsStore.stats.dex - 11) / 2)
	if (armorDetails.value.maximumDexModifier)
		ACModifier = Math.min(ACModifier, armorDetails.value.maximumDexModifier)

	return armorDetails.value.AC + ACModifier + (isShieldInUse.value ? shield.AC : 0)
})

// Атрибут title для <select>
const selectTitle = computed<string>(() => {
	if (!armorDetails.value) {
		return ''
	}

	let result = armorDetails.value.AC.toString()
	if (!armorDetails.value.useDexModifier)
		return result

	result += ' + ловкость'

	if (armorDetails.value.maximumDexModifier !== undefined)
		result += ` (макс. ${armorDetails.value.maximumDexModifier})`

	return result
})

/** @param armorClassId - Строковое представление EArmorClass */
function getArmorWithClass(armorClassId: EArmorClass): TArmorDescription[] {
	return armorList.filter(({ group }) => group === +armorClassId)
}
</script>


<template lang="pug">
.pageBlock.armor
	.blockTitle 🛡️ Надетая броня
	.blockBody
		select(v-model="selectedArmor" :title="selectTitle")
			option -
			optgroup(v-for="(groupName, armorClassId) in armorClassName" :label="groupName")
				option(
					v-for="armorDetails in getArmorWithClass(armorClassId)"
					:key="armorDetails.id"
					:value="armorDetails.id"
				) {{ armorDetails.name }}

		.alert(v-if="armorStore.isNeedMoreStrength && armorDetails") ❗Нужно {{ armorDetails.minimumStr }} силы
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
