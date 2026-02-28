document.addEventListener("DOMContentLoaded",() => {
    let animationContainer = document.querySelector(".animation-section");
    let items =[...document.querySelectorAll(".item")];
    let imagePoint = document.querySelector(".image-point");
    // let x = 0;
    // let y=0;

    let audio = new Audio("../images/click.mp3");
    audio.volume = 1;
    audio.pause()

    animationContainer.addEventListener("mousemove",(e) => {
        let x = `${e.clientX - imagePoint.offsetWidth/2}px`;
       let  y = `${e.clientY - imagePoint.offsetHeight/2}px`;
        imagePoint.style.left = x;
        imagePoint.style.top = y; 
    });
    
    items.forEach((item,i) => {
        // imagePoint.innerHTML = "";
        item.addEventListener("mouseover",() => {
        imagePoint.style.display = "block"
        audio.play()
        imagePoint.innerHTML = ""
        let imageUrl = item.dataset.image;
        let img = new Image();
        img.src = imageUrl;
        img.style.zIndex = i
        imagePoint.append(img);
       })

       item.addEventListener("mouseleave",() => {
        imagePoint.style.display = "none"
       })
    })

    // animationContainer.addEventListener("mouseleave",() => {
    //     imagePoint.style.display = "none"
    // })
})