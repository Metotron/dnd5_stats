<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { armorList } from '@/misc/armorList'
import { useStatsStore } from '@/stores/stats'
import { useArmorStore } from '@/stores/armor'
import type { TArmor, TArmorType, TArmorDescription } from '@/misc/armorList'

type TOptionValue = TArmor | '-'
type TDetails = TArmorDescription | null

const statsStore = useStatsStore()
const armorStore = useArmorStore()

const selectedArmor = ref<TOptionValue>('-')
const armorDetails = computed<TDetails>(() => {
	if (selectedArmor.value == '-') {
		return null
	}

	for (const armorGroup in armorList) {
		const foundDetails = armorList[armorGroup as TArmorType].find(details => details.type == selectedArmor.value)
		if (foundDetails) {
			return foundDetails
		}
	}

	return null
})

const armorClass = computed<number | null>(() => {
	if (!armorDetails.value) {
		return null
	}

	const baseAC = armorDetails.value.AC
	let ACModifier = 0
	if (armorDetails.value.useDexModifier) {
		ACModifier = Math.ceil((statsStore.stats.dex - 11) / 2)
		if (armorDetails.value.maximumDexModifier) {
			ACModifier = Math.max(ACModifier, armorDetails.value.maximumDexModifier)
		}
	}

	return baseAC + ACModifier
})

watch(armorClass, newValue => {
	armorStore.setArmorClass(newValue)
})

watch(armorDetails, newValue => {
	if (newValue === null) {
		return 0
	}

	armorStore.setDisadvantage(!!newValue.stealthDisadvantage)
})

const showStrengthAlert = computed<boolean>(() => {
	return statsStore.stats.str > 0
	       && armorDetails.value !== null
	       && armorDetails.value !== undefined
		   && armorDetails.value.minimumStr !== undefined
		   && statsStore.stats.str < armorDetails.value.minimumStr
})

watch(showStrengthAlert, newValue => {
	armorStore.setNeedMoreStrength(newValue)
})

const selectTitle = computed<string>(() => {
	if (!armorDetails.value) {
		return ''
	}

	let result = armorDetails.value.AC.toString()
	if (armorDetails.value.useDexModifier) {
		result += ' + ловкость'

		if (armorDetails.value.maximumDexModifier !== undefined) {
			result += ` (макс. ${armorDetails.value.maximumDexModifier})`
		}
	}

	return result
	//FIXME Показывает только AC, не показывает модификатор
})
</script>


<template lang="pug">
.pageBlock.armor
	.blockTitle
		slot
	.blockBody
		select(v-model="selectedArmor" :title="selectTitle")
			option -
			optgroup(v-for="(groupArmors, groupName) in armorList" :label="groupName")
				option(
					v-for="armorDetails in groupArmors"
					:key="armorDetails.type"
					:value="armorDetails.type"
				) {{ armorDetails.name }}
		.alert(v-if="showStrengthAlert && armorDetails") ❗Нужно {{ armorDetails.minimumStr }} силы
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
