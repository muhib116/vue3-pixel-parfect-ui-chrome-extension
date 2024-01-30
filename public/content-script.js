const _updateLayoutData = (updatedActiveLayoutData) => {
    chrome.runtime.sendMessage({
        type: 'updatedActiveLayoutData',
        data: updatedActiveLayoutData
    })
}

const runWebPageScript = (layoutData) => 
{
    const activeLayoutData = layoutData.config[layoutData.activeIndex]
    if(!activeLayoutData || !activeLayoutData.fileInput) {
        activeLayoutData?.img?.remove()
        return
    }

    activeLayoutData.img = document.getElementById('_overlayImage_pixelPerfect')


    if(!activeLayoutData.img){
        activeLayoutData.img = document.createElement('img')
    }

    activeLayoutData.img.src = activeLayoutData.fileInput
    activeLayoutData.img.setAttribute('id', '_overlayImage_pixelPerfect')
    activeLayoutData.img.setAttribute('draggable', 'false')
    document.body.appendChild(activeLayoutData.img)

    activeLayoutData.img.style.cssText = `
        width: ${activeLayoutData.width}px;
        height: ${activeLayoutData.height}px;
        left: ${activeLayoutData.left}px;
        top: ${activeLayoutData.top}px;
        opacity: ${activeLayoutData.opacity};
        z-index: ${activeLayoutData.zIndex};
        position: fixed;
        pointer-events: ${activeLayoutData.isLock ? 'none' : 'auto'};
        cursor: ${activeLayoutData.isLock ? 'none' : 'move'};
        display: ${activeLayoutData.isShow ? '' : 'none'};
    `
    
    let isMouseDown = false
    let mouseDownPosition = { x: 0, y: 0}
    let distance = { x: 0, y: 0 }
    activeLayoutData.img.onmousedown = function(e) {
        mouseDownPosition.x = e.clientX
        mouseDownPosition.y = e.clientY
        isMouseDown = true
    }
    
    activeLayoutData.img.onmousemove = function(e) {
        if (!isMouseDown) return
    
        distance.x = e.clientX - mouseDownPosition.x
        distance.y = e.clientY - mouseDownPosition.y
    
        activeLayoutData.left += distance.x
        activeLayoutData.top  += distance.y
    
        activeLayoutData.img.style.left = activeLayoutData.left + 'px'
        activeLayoutData.img.style.top  = activeLayoutData.top + 'px'
    
        // Update the mouseDownPosition for the next move
        mouseDownPosition.x = e.clientX
        mouseDownPosition.y = e.clientY
    }    
    
    window.onmouseup = function() {
        isMouseDown = false
        // send data to background script
        _updateLayoutData(activeLayoutData)
    }
}



// receive data from background
chrome.runtime.onMessage.addListener((request) => {
    const { type, data } = request
    if(type === 'layoutData' && data){
        runWebPageScript(data)
    }
})