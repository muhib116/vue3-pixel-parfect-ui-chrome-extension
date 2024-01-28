<template>
  <div class="p-6 text-sm bg-slate-100 grid gap-2 w-[400px]">
    <FileUpload
      class="gap-2"
    />
    <template 
      v-if="imageData.fileInput"
    >
      <WidthAndHeight
        class="gap-2"
      />
      <Position
        class="gap-2"
      />
      <OpacityAndZIndex
        class="gap-2"
      />
      <Toggle
        class="gap-2 mt-2"
      />
    </template>
    <Footer
      class="mt-3"
    />
  </div>
</template>

<script setup>
  import { useConfig } from './useConfig'
  import { provide, watch, onMounted } from 'vue'
  import FileUpload from './fragments/FileUpload.vue'
  import WidthAndHeight from './fragments/WidthAndHeight.vue'
  import Position from './fragments/Position.vue'
  import OpacityAndZIndex from './fragments/OpacityAndZIndex.vue'
  import Toggle from './fragments/Toggle.vue'
  import Footer from './fragments/Footer.vue'

  const localUseConfig = useConfig()
  provide('useConfig', localUseConfig)

  const { 
    runChromeScript,
    imageData,
    storeInLocalStorage,
    loadFromLocalStorage
  } = localUseConfig

 

  watch(imageData, () => 
  {
    runChromeScript(imageData.value)
    if(!imageData.value.fileInput) return
    storeInLocalStorage(imageData.value)
  }, { deep: true, immediate: true })
  
  onMounted(() => {
    loadFromLocalStorage()
    runChromeScript(imageData.value)
  })
</script>