<template>
    <span
        v-if="name"
        :title="title"
        class="w-fit block"
        :class="spin && 'animate-spin'"
    >
        <component
            :is="iconComponent"
            v-bind="$attrs"
        />
    </span>
</template>

<script setup>
    import { shallowRef, watch } from 'vue'
    defineOptions({
        name: 'Icon',
        inheritAttrs: false,
    })
    const iconComponent = shallowRef(null)
    const props = defineProps({
        name: String,
        source: {
            type: String,
            default: () => 'phosphor',
            validator: value => ['phosphor', 'custom'].includes(value),
        },
        title: String,
        spin: Boolean
    })
    
    
    const getIconName = (iconName, source) => 
    {
        
        if(source == 'custom') return iconName
        
        let arrayOfIconNameWord = iconName.split('-')
        let modifiedIconName = arrayOfIconNameWord.map((str) => {
            let iconName = str.charAt(0).toUpperCase() + str.slice(1, str.length)
            return iconName
        }).join('')
        
        if(modifiedIconName){
            let iconName = modifiedIconName.search('Ph') == 0 
                            ? modifiedIconName 
                            : `Ph${modifiedIconName}`
            return iconName
        }
    }

    watch(
        () => props.name,
        async () => {
            let response
            if (props.source == 'phosphor' || !props.source) {
                response = await import('@phosphor-icons/vue')
            }
            if (props.source == 'custom') {
                response = await import('@/icons')
            }

            iconComponent.value = response ? response[getIconName(props.name, props.source)] : ''
        },
        { immediate: true }
    )
</script>