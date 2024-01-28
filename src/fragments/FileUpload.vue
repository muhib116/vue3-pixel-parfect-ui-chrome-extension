<template>
    <div class="relative bg-white border border-dashed border-black rounded h-[150px]">
        <Icon
            name="image"
            size="50"
            class="absolute z-10 bg-white/80 p-2 rounded shadow inset-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <label 
            class="border h-full overflow-auto block cursor-pointer relative"
        >
            <img
                :src="imageData.fileInput"
                class="w-full object-cover object-top block"
            />
            <input
              type="file"
              hidden
              @change="handleImage"
            />
        </label>
    </div>
</template>

<script setup>
    import { inject } from 'vue'
    import Icon from '@/components/Icon.vue'

    const { imageData, storeInLocalStorage, runChromeScript } = inject('useConfig')
    const handleImage = (e) => 
    {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            imageData.value.fileInput = reader.result
            storeInLocalStorage(imageData.value)
            runChromeScript(imageData.value)
        }
    }
</script>