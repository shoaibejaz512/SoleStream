// Load existing products from localStorage
let cartCount = document.getElementById("cart-count");

let prodArr = JSON.parse(localStorage.getItem("shopProducts")) || [];
if (prodArr.length > 0) {
  cartCount.textContent = prodArr.length;
} else {
  cartCount.textContent = 0;
}

gsap.registerPlugin(ScrollTrigger,SplitText);

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    let imgContainer = gsap.utils.toArray(".img");
    

    // Pin container ONCE
    ScrollTrigger.create({
      trigger: ".right-container",
      start: "top 12%",
      end: "+=250%",
      pin: true,
      // markers: true,
    });

    let tl = gsap.timeline({});


  tl.to("#img-2", {
    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
    zIndex:"20",
    ease: "none",
    duration:1.5,
    scrollTrigger: {
      trigger: "#img-2",
      start: `top 12%`,
     end: `top -50%`,
      scrub: true,
    },
  });

  tl.to("#img-3", {
    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
    zIndex:"30",
    ease: "none",
    duration:1.5,
    scrollTrigger: {
      trigger: "#img-3",
      start: `top -50%`,
     end: `top -150%`,
      scrub: true,
    },
  });

   tl.to("#img-4", {
    clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
    zIndex:"40",
    ease: "none",
    duration:1.5,
    scrollTrigger: {
      trigger: "#img-4",
      start: `top -50%`,
     end: `top -200%`,
      scrub: true,
    },
  });
});



//split text animation
let headingBlur = document.querySelectorAll(".heading-blur");
let paraBur = document.querySelectorAll(".para-blur");

headingBlur.forEach((curr) => {
  let split = new SplitText(curr,{type:"chars",mask:"chars"});
  gsap.from(split.chars,{
    yPercent:60,
    filter:"blur(5px)",
    duration:.3,
    ease:"none",
    stagger:.03,
    scrollTrigger:{
      trigger:".left",
      start:"top 20%",
      end:"top -50%",
      scrub:true
    }
  })
})
paraBur.forEach((curr) => {
  let splitpara = new SplitText(curr,{type:"chars",mask:"chars"});
  gsap.from(splitpara.chars,{
    yPercent:40,
    filter:"blur(5px)",
    duration:.3,
    ease:"none",
    stagger:.03,
    scrollTrigger:{
      trigger:".left",
      start:"top 20%",
      end:"top -50%",
      scrub:true
    }
  })
})

  }); 