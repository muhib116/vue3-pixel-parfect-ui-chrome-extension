<template>
    <div class="grid grid-cols-2">
        <Input
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="config.left"
          placeholder="Left Position"
          label="Left Position"
          @input="runChromeScript"
        />
        <Input
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="config.top"
          placeholder="Top Position"
          label="Top Position"
          @input="runChromeScript"
        />
    </div>
</template>

<script setup>
    import Input from '@/components/Input.vue'

    defineProps({
      config: Object,
      runChromeScript: Function
    })
</script>