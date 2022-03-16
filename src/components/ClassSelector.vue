<script setup lang="ts">
import { ref, watch } from 'vue'
import { charClasses } from '@/misc/charClasses'
import type { CharClassID } from '@/misc/charClasses'
import { useCharClassStore } from '@/stores/charClass'

const classStore = useCharClassStore()
const selectedCharClass = ref<CharClassID>('fighter')
watch(selectedCharClass, newValue => {
	classStore.setCharClass(newValue)
})
</script>


<template lang="pug">
.pageBlock.charClass
	.blockTitle
		slot
	.blockBody
		select(v-model="selectedCharClass")
			option(v-for="(dataValue, className) in charClasses" :key="className" :value="className") {{ dataValue.name }}
</template>


<style lang="scss" scoped>
select {
	width: 100%;
}
</style>
