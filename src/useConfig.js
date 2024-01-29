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
        if(element[0]){
            element[0].click()
        }
    }
    const deleteLayout = (index, layoutData) => {
        if(!confirm('Are you sure you want to delete this layout?')) return
        layoutData.config.splice(index, 1)
    }
    const runWebPageScript = (layoutData) => {
        layoutData.img = document.getElementById('_overlayImage_pixelPerfect')
        if(!layoutData.img){
            layoutData.img = document.createElement('img')
        }

        if(!layoutData.fileInput) {
            layoutData.img.remove()
            return
        }

        layoutData.img.src = layoutData.fileInput
        layoutData.img.setAttribute('id', '_overlayImage_pixelPerfect')
        document.body.appendChild(layoutData.img)

        layoutData.img.style.cssText = `
            width: ${layoutData.width}px;
            height: ${layoutData.height}px;
            left: ${layoutData.left}px;
            top: ${layoutData.top}px;
            opacity: ${layoutData.opacity};
            z-index: ${layoutData.zIndex};
            position: fixed;
            pointer-events: ${layoutData.isLock ? 'none' : 'move'};
            display: ${layoutData.isShow? '' : 'none'};
        `
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
        layoutData.value.config = placeholderConfig
    }
    
    const runChromeScript = (layoutData) => 
    {
        if(!chrome.tabs) return
        chrome.tabs.query({active: true}, function(tabs) {
            var tab = tabs[0];
            if (tab && layoutData.config[layoutData.activeIndex]) {
                chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func: runWebPageScript,
                    args: [layoutData.config[layoutData.activeIndex]]
                },
                // onResult
              )
            }
        })
    }

    
    return {
        layoutData,
        deleteLayout,
        addNewLayout,
        loadFromLocalStorage,
        resetConfiguration,
        runChromeScript,
        runWebPageScript,
        storeInLocalStorage,
        deleteInLocalStorage
    }
}