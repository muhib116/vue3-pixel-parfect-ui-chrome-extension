<template>
    <label>
        <span class="mb-1 block">
            {{ label }}
        </span>
        <input
            :id="uid"
            v-bind="$attrs"
            v-model="modelValue"
            class="w-full outline-none"
        />
    </label>
</template>

<script setup>
import { computed, useAttrs, getCurrentInstance } from 'vue'

defineProps({
    label: {
        type: String,
        required: true,
    }
})

/*global defineModel */
const modelValue = defineModel()
const uid = computed(() => {
    const attrs = useAttrs()
    const instance = getCurrentInstance()
    return attrs?.id ? attrs.id : "uid-" + instance.uid
})
</script>