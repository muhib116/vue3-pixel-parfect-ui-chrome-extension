import { ref } from 'vue'

export const useConfig = () => {
    const placeholderConfig = {
        img: null,
        width: null,
        height: null,
        left: 0,
        top: 0,
        opacity: 0.5,
        showImage: true,
        fileInput: null,
        zIndex: 1000,
        isLock: false,
        isShow: true,
    }
    const layoutData = ref({
        activeIndex: 0,
        config: []
    })
    const addNewLayout = (element) => {
        layoutData.value.config.unshift({...placeholderConfig})
        runChromeScript(layoutData.value)
        if(element[0]){
            element[0].click()
        }
    }
    const deleteLayout = (index, layoutData) => {
        if(!confirm('Are you sure you want to delete this layout?')) return
        layoutData.config.splice(index, 1)
        runChromeScript(layoutData)
    }

    const storeInLocalStorage = (layoutData) => {
        localStorage.setItem('_pixelPerfectlayoutData', JSON.stringify(layoutData))
    }
    const loadFromLocalStorage = () => {
        let localStoragelayoutData = JSON.parse(localStorage.getItem('_pixelPerfectlayoutData'))
        layoutData.value = localStoragelayoutData ? localStoragelayoutData : layoutData.value
    }
    const deleteInLocalStorage = () => {
        localStorage.clear('_pixelPerfectlayoutData')
    }

    const resetConfiguration = () => {
        if(!confirm('Are you sure you want to reset your configuration')) return
        deleteInLocalStorage()
        layoutData.value.activeIndex = 0
        layoutData.value.config = [{...placeholderConfig}]
        runChromeScript(layoutData.value)
    }
    
    const runChromeScript = (layoutData) => 
    {
        chrome.runtime.sendMessage({
            type: 'layoutData',
            data: layoutData
        })
        storeInLocalStorage(layoutData)
    }


    //receive data from background script
    chrome.runtime.onMessage.addListener((request) => {
        if(request.type == "updatedActiveLayoutData")
        {
            const activeLayout = layoutData.value.config[layoutData.value.activeIndex]
            activeLayout.left = request.data.left
            activeLayout.top = request.data.top

            storeInLocalStorage(layoutData.value)
        }
    })

    
    return {
        layoutData,
        deleteLayout,
        addNewLayout,
        loadFromLocalStorage,
        resetConfiguration,
        runChromeScript,
        storeInLocalStorage,
        deleteInLocalStorage
    }
}