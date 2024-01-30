<template>
  <div class="p-6 text-sm bg-slate-100 grid gap-2 w-[300px]">

    <div class="max-h-[252px] overflow-auto">
        <FileUpload />
    </div>

    <template
      v-if="layoutData.config.length && layoutData.config[layoutData.activeIndex]"
    >
      <WidthAndHeight
        class="gap-2"
        :runChromeScript="() => runChromeScript(layoutData)"
        :config="layoutData.config[layoutData.activeIndex]"
      />
      <Position
        class="gap-2"
        :runChromeScript="() => runChromeScript(layoutData)"
        :config="layoutData.config[layoutData.activeIndex]"
      />
      <OpacityAndZIndex
        class="gap-2"
        :runChromeScript="() => runChromeScript(layoutData)"
        :config="layoutData.config[layoutData.activeIndex]"
      />
      <Toggle
        class="gap-2 mt-2"
        :runChromeScript="() => runChromeScript(layoutData)"
        :config="layoutData.config[layoutData.activeIndex]"
      />
    </template>
    <Footer
      class="mt-3"
    />
  </div>
</template>

<script setup>
  import { useConfig } from './useConfig'
  import { provide, onMounted } from 'vue'
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
    layoutData,
    loadFromLocalStorage
  } = localUseConfig

  onMounted(() => {
    loadFromLocalStorage()
    runChromeScript(layoutData.value)
  })
</script>