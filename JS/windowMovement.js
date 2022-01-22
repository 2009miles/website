//CONTAINS ALL MOVEMENT RELATED SCRIPTS, IN THE x, y AND z AXIS

//WINDOW MOVEMENT
let openArea = document.querySelector('.openArea');
let windows = document.querySelectorAll('.window');

let activeWindow = null;
let active = null;

let movementSwitch = false;

openArea.addEventListener('mousedown', dragStart);
openArea.addEventListener('touchstart', dragStart);

function dragStart(event){
    toTop(event.target);
    if(event.target.classList.contains("windowTitleBar") && !event.target.parentElement.classList.contains("maximized")){
        active = true;
        activeWindow = event.target.parentElement;

        if (activeWindow.xOffset == null || activeWindow.yOffset == null || movementSwitch == true) {
            activeWindow.xOffset = 0;
            activeWindow.yOffset = 0;
            movementSwitch = false;
        }

        if (event.type === "touchstart"){
            activeWindow.initialX = event.touches[0].clientX - activeWindow.xOffset;
            activeWindow.initialY = event.touches[0].clientY - activeWindow.yOffset;
        }else{
            activeWindow.initialX = event.clientX - activeWindow.xOffset;
            activeWindow.initialY = event.clientY - activeWindow.yOffset;
        }
    }
}


openArea.addEventListener('mouseup', dragEnd);
openArea.addEventListener('touchend', dragEnd);

function dragEnd(){
    if (activeWindow !== null) {
        activeWindow.initialX = activeWindow.currentX;
        activeWindow.initialY = activeWindow.currentY;
    }
    active = false;
    activeWindow = null;
}


openArea.addEventListener('mousemove', drag);
openArea.addEventListener('touchmove', drag);

function drag(event){
    if (active) {
        if (event.type === "touchmove"){
            event.preventDefault();

            activeWindow.currentX = event.touches[0].clientX - activeWindow.initialX;
            activeWindow.currentY = event.touches[0].clientY - activeWindow.initialY;
        }else{
            activeWindow.currentX = event.clientX - activeWindow.initialX;
            activeWindow.currentY = event.clientY - activeWindow.initialY;
        }
        
        activeWindow.xOffset = activeWindow.currentX;
        activeWindow.yOffset = activeWindow.currentY;
        
        setTranslate(activeWindow.currentX, activeWindow.currentY, activeWindow);
        
    }
}

function setTranslate(xPosition, yPosition, window) {
    window.style.transform = "translate3d(" + xPosition + "px, " + yPosition + "px, 0)";
}

//BRING SELECTED WINDOW TO TOP
function toTop(selectedWindow){
    if(!selectedWindow.classList.contains('minimize') && !selectedWindow.classList.contains('close') && !selectedWindow.classList.contains('openingLinks')){
        let currentZIndexes = [];
        selectedWindow.style.zIndex++;
        for(i=0;i<windows.length;i++){
            if(windows[i].style.zIndex !== 1){
                currentZIndexes.push(windows[i].style.zIndex);
            }
        }
        let currentMaxIndex = Math.max(...currentZIndexes);
        selectedWindow.parentElement.style.zIndex = currentMaxIndex + 1;
    } 
}


let minimizedArea = document.querySelector('.minimizedArea');
let inactiveArea = document.querySelector('.inactiveArea');

let titleBar = document.querySelectorAll('.windowTitleBar');
let minimizeButtons = document.querySelectorAll('.minimize');
let maximizeButtons = document.querySelectorAll('.maximize');
let closeButtons = document.querySelectorAll('.close');

//MAXIMIZE WINDOW
for(i=0;i<maximizeButtons.length;i++){
    maximizeButtons[i].addEventListener('click', (event)=>{
        let clickedWindow = event.target.parentElement;
        if(!clickedWindow.classList.contains('maximized')){
            clickedWindow.remove();
            clickedWindow.classList.add('maximized');
            event.target.querySelector('img').src = "./ICONS/maximize0.svg";
            event.target.parentElement.style.transform = "";
            openArea.append(clickedWindow);
        }else{
            clickedWindow.remove();
            clickedWindow.classList.remove('maximized');
            event.target.querySelector('img').src = "./ICONS/maximize1.svg";
            openArea.append(clickedWindow);
            movementSwitch = true;
        }
    });
}

//MINIMIZE WINDOW
for(i=0;i<minimizeButtons.length;i++){
    minimizeButtons[i].addEventListener('click', (event)=>{
        let minimizingWindow = event.target.parentElement;
        minimizingWindow.remove();
        minimizingWindow.style.transform = "";
        minimizedArea.append(minimizingWindow);
        movementSwitch = true;
    });
}

//REOPEN MINIMIZED
for(i=0;i<titleBar.length;i++){
    titleBar[i].addEventListener('click', (event)=>{
        let reopeningWindow = event.target.parentElement;
        reopeningWindow.remove();
        openArea.append(reopeningWindow);
    });
}

//CLOSE WINDOW
for(i=0;i<closeButtons.length;i++){
    closeButtons[i].addEventListener('click', (event)=>{
        let closingWindow = event.target.parentElement;
        closingWindow.remove();
        inactiveArea.append(closingWindow);
    });
}