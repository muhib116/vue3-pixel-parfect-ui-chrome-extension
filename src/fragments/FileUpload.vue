<template>
    <div 
        class="grid gap-2"
        :class="layoutData.config.length ? 'grid-cols-2' : 'grid-cols-1'"
    >
        <button
            @click="addNewLayout(inputField)"
            class="bg-slate-50 aspect-square border border-dashed  border-black cursor-pointer rounded flex items-center justify-center"
        >
            <Icon name="plus" size="30" />
        </button>

        <div
            v-for="(item, index) in layoutData.config"
            :key="index"
            class="relative bg-white border-2 rounded aspect-square"
            :class="index == layoutData.activeIndex ? 'border-red-500' : 'border-gray-200'"
            @click="() => {
                layoutData.activeIndex = index
            }"
        >
            <button 
                class="absolute top-1 right-1  bg-red-500 text-white p-1 rounded-full shadow z-10"
                @click="deleteLayout(index, layoutData)"
            >
                <Icon
                    name="x"
                    size="20"
                />
            </button>
            
            <div 
                class="border h-full overflow-hidden block cursor-pointer relative"
            >
                <img
                    v-if="item.fileInput"
                    :src="item.fileInput"
                    class="w-full h-full object-cover object-left-top block rounded"
                />
                <label 
                    class="cursor-pointer absolute z-10 bg-blue-500 text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 duration-300 w-12 h-12 inset-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    title="Upload design"
                >
                    <Icon
                        name="upload"
                        size="30"
                        class="pointer-events-none"
                    />
                    <input
                        ref="inputField"
                        type="file"
                        accept="image/*"
                        hidden
                        @change="handleImage($event,item)"
                    />
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref } from 'vue'
    import Icon from '@/components/Icon.vue'

    const { layoutData, deleteLayout, addNewLayout, storeInLocalStorage, runChromeScript } = inject('useConfig')

    const inputField = ref(null)
    const handleImage = (e, item) => 
    {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            item.fileInput = reader.result
            storeInLocalStorage(layoutData.value)
            runChromeScript(layoutData.value)
        }
    }
</script>