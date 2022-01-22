//OPEN NAVIGATION LINKS
let openingLinks = document.querySelectorAll('.openingLinks');
for(i=0;i<openingLinks.length;i++){
    openingLinks[i].addEventListener('click', (event)=>{
        let selectedWindow = event.target.className.slice(17, event.target.className.length);
        openingWindow = document.querySelector(`.${selectedWindow}`);
        openingWindow.remove();
        openArea.append(openingWindow);
    });
}