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
        isLock: true,
        isShow: true,
    }
    const imageData = ref({...placeholderConfig})

    const runWebPageScript = (imageData) => {
        imageData.img = document.getElementById('_overlayImage_pixelPerfect')
        if(!imageData.img){
            imageData.img = document.createElement('img')
        }

        if(!imageData.fileInput) {
            imageData.img.remove()
            return
        }

        imageData.img.src = imageData.fileInput
        imageData.img.setAttribute('id', '_overlayImage_pixelPerfect')
        document.body.appendChild(imageData.img)

        imageData.img.style.cssText = `
            width: ${imageData.width}px;
            height: ${imageData.height}px;
            left: ${imageData.left}px;
            top: ${imageData.top}px;
            opacity: ${imageData.opacity};
            z-index: ${imageData.zIndex};
            position: fixed;
            pointer-events: ${imageData.isLock ? 'none' : 'auto'};
            display: ${imageData.isShow? '' : 'none'};
        `
    }

    const storeInLocalStorage = (imageData) => {
        localStorage.setItem('_pixelPerfectImageData', JSON.stringify(imageData))
    }
    const loadFromLocalStorage = () => {
        let localStorageImageData = JSON.parse(localStorage.getItem('_pixelPerfectImageData'))
        imageData.value = localStorageImageData ? localStorageImageData : imageData.value
    }
    const deleteInLocalStorage = () => {
        localStorage.clear('_pixelPerfectImageData')
    }

    const resetConfiguration = () => {
        if(!confirm('Are you sure you want to reset your configuration')) return
        deleteInLocalStorage()
        imageData.value = placeholderConfig
    }
    
    const runChromeScript = (imageData) => 
    {
        if(!chrome.tabs) return
        chrome.tabs.query({active: true}, function(tabs) {
            var tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func: runWebPageScript,
                    args: [imageData]
                },
                // onResult
              )
            }
        })
    }

    
    return {
        imageData,
        loadFromLocalStorage,
        resetConfiguration,
        runChromeScript,
        runWebPageScript,
        storeInLocalStorage,
        deleteInLocalStorage
    }
}