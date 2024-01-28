<template>
    <div class="grid gap-2">
        <p class="px-4 py-1 text-green-500 font-bold text-center"> 
            Configuration Auto Saving
        </p>
        <button @click="resetConfiguration" class="px-4 py-1 rounded bg-red-500 text-white shadow uppercase"> 
            Reset Configuration
        </button>
    </div>
</template>

<script setup>
    import { inject } from 'vue'

    const { resetConfiguration } = inject('useConfig')
</script>