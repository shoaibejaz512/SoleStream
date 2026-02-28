window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const para = document.querySelector(".box1 p");
  const heading = document.querySelector(".box2 h1");
  const bigPara = document.querySelector(".box3 p");
  const button = document.querySelector(".box4 button");
  const span = document.querySelector(".text-1");
  const span2 = document.querySelector(".text-2");
  let main = document.querySelector("main");
  let cartCount = document.getElementById("cart-count");
  let sectioncontainer = document.querySelector(".para");
  let centerDiv = document.querySelector(".para-center");
  let cursor = document.querySelector(".cursor");
  let mainPara = document.querySelector(".main-para");
  let imgSection = document.querySelector(".img-section");
  let imgPath = document.querySelector(".img-path");

  sectioncontainer.addEventListener("mousemove", (e) => {
    mainPara.style.opacity = 1;
    cursor.style.opacity = 1;
    let x = `${e.clientX - cursor.offsetWidth/2}px`;
    let y = `${e.clientY - cursor.offsetHeight/2}px`;
    gsap.to(cursor, {
      x: x,
      y: y,
      duration: 0.3,
    });
  });

  sectioncontainer.addEventListener("mouseleave", () => {
    cursor.style.opacity = 0;
  });

  centerDiv.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 10,
      duration: 0.3,
    });
  });
  centerDiv.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.3,
    });
  });

  let prodArr = JSON.parse(localStorage.getItem("shopProducts")) || [];
  if (prodArr.length > 0) {
    cartCount.textContent = prodArr.length;
  } else {
    cartCount.textContent = 0;
  }
  const loadingObj = {
    element: document.querySelector(".overlay"),
    percentage: document.querySelector(".loadingpercentage h1"),
    count: { value: 0 }, // 🔥 animated number
  };

  /* ================= LOADER ================= */
  function initLoader() {
    // gsap.set(loadingObj.element, { width: 0 });

    const loaderTl = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
      },
    });

    // width animation
    loaderTl.to(loadingObj.element, {
      width: "100%",
      duration: 2.4,
    });

    // counter animation (REAL 0 → 1000)
    loaderTl.to(
      loadingObj.count,
      {
        value: 1000,
        duration: 2.4,
        roundProps: "value",
        onUpdate: () => {
          loadingObj.percentage.innerHTML = loadingObj.count.value;
        },
      },
      "<",
    );

    // exit loader AFTER counter completes
    loaderTl.to(loadingObj.percentage, {
      yPercent: -100,
      duration: 1.4,
    });

    loaderTl.to(loadingObj.element, {
      height: 0,
      duration: 2.2,
      onComplete: animateIntro, // ✅ intro starts here
    });
  }

  initLoader();

  /* ================= SPLIT TEXT (CREATE ONCE) ================= */
  const splitPara = new SplitText(para, {
    type: "words,chars,lines",
    mask: "chars",
  });

  const splitHeading = new SplitText(heading, {
    type: "words,chars,lines",
    mask: "chars",
  });

  const splitBigPara = new SplitText(bigPara, {
    type: "words,chars,lines",
    mask: "chars",
  });

  /* ================= INTRO ANIMATION ================= */
  function animateIntro() {
    loadingObj.element.remove();

    main.style.opacity = 1;

    const introTl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "expo.out",
      },
    });

    introTl
      .from(splitPara.chars, {
        yPercent: 200,
        stagger: { amount: 0.08 },
      })
      .from(
        splitHeading.chars,
        {
          yPercent: 100,
          stagger: { amount: 0.08 },
        },
        "-=1.6",
      )
      .from(
        splitBigPara.chars,
        {
          yPercent: 400,
          stagger: { amount: 0.09 },
        },
        "-=1.6",
      );
  }

  /* ================= BUTTON HOVER ================= */
  const splitBtn = new SplitText(span, {
    type: "chars",
    mask: "chars",
  });

  const splitSpan2 = new SplitText(span2, {
    type: "chars",
    mask: "chars",
  });

  const btnTl = gsap.timeline({ paused: true });

  btnTl
    .to(splitBtn.chars, {
      y: "-30px",
      duration: 0.6,
      ease: "power3.out",
      stagger: { amount: 0.05 },
    })
    .to(
      splitSpan2.chars,
      {
        y: "-30px",
        duration: 0.6,
        ease: "power3.out",
        stagger: { amount: 0.08 },
      },
      "<",
    );

  button.addEventListener("mouseenter", () => btnTl.play());
  button.addEventListener("mouseleave", () => btnTl.reverse());

  let feedback_heading = document.querySelector(".title-feedback");
  let main_feedback_container = document.querySelector(
    ".main-feedback-container",
  );
  let split_feedback_heading = new SplitText(feedback_heading, {
    type: "chars",
    mask: "chars",
  });

  // gsap.set(feedback_heading,{
  //   yPercent:100,
  // })

  gsap.from(split_feedback_heading.chars, {
    yPercent: -80,
    duration: 0.2,
    filter: "blur(5px)",
    ease: "power3.inOut",
    stagger: {
      each: 0.02,
      from: "start",
    },
    scrollTrigger: {
      trigger: main_feedback_container,
      start: "top 90%",
      end: "top 60%",
      scrub: true,
    },
  });
});
