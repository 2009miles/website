let images = document.querySelectorAll(".CVSegment");
let backBtn = document.querySelector("#leftArrow");
backBtn.addEventListener('click', ()=>{
    let activeRemoved = false;
    for(i=0;i<images.length && activeRemoved == false;i++){
        if(images[i].className.includes('active')){
            images[i].classList.remove('active');
            activeRemoved = true;
            if(i > 0){
                images[i-1].classList.add('active');
            }else{
                images[images.length-1].classList.add('active');
            }
        }
    }
});

let forwardBtn = document.querySelector("#rightArrow");
forwardBtn.addEventListener('click', ()=>{
    let activeRemoved = false;
    for(i=0;i<images.length && activeRemoved == false;i++){
        if(images[i].className.includes('active')){
            images[i].classList.remove('active');
            activeRemoved = true;
            if(i+1 < images.length){
                images[i+1].classList.add('active');
            }else{
                images[0].classList.add('active');
            }
        }
    }
});