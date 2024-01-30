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
        layoutData.img.setAttribute('draggable', 'false')
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
        
        let isMouseDown = false
        let mouseDownPosition = { x: 0, y: 0}
        let distance = { left: 0, top: 0 }
        layoutData.img.onmousedown = function(e) {
            mouseDownPosition.x = e.clientX
            mouseDownPosition.y = e.clientY
            isMouseDown = true
        }
        
        layoutData.img.onmousemove = function(e) {
            if(!isMouseDown) return
            distance.left = e.clientX - mouseDownPosition.x
            distance.top = e.clientY - mouseDownPosition.y
            
            if(layoutData){
                layoutData.img.style.left = layoutData.left + distance.left + 'px'
                layoutData.img.style.top = layoutData.top + distance.top + 'px'
            }
        }
        
        window.onmouseup = function() {
            isMouseDown = false
        }
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
        chrome.runtime.sendMessage({
            type: 'layoutData',
            data: layoutData
        })
        storeInLocalStorage(layoutData)
    }


    chrome.runtime.onMessage.addListener((request) => {
        if(request.type == "updatedActiveLayoutData")
        {
            const activeLayout = layoutData.value[layoutData.value.activeIndex]
            activeLayout.left = request.data.left
            activeLayout.top = request.data.top
        }
    })

    
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