const slides = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const dotsContainer = document.getElementById("dots");

const ending = document.getElementById("ending");

let currentSlide = 0;


/* MEMBUAT DOT */

slides.forEach((slide, index) => {

  const dot = document.createElement("div");

  dot.classList.add("dot");

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {

    currentSlide = index;

    updateSlide();

  });

  dotsContainer.appendChild(dot);

});


const dots = document.querySelectorAll(".dot");


/* UPDATE SLIDE */

function updateSlide() {

  slides.forEach((slide, index) => {

    slide.classList.remove("active");

    if (index === currentSlide) {

      slide.classList.add("active");

    }

  });


  dots.forEach((dot, index) => {

    dot.classList.remove("active");

    if (index === currentSlide) {

      dot.classList.add("active");

    }

  });


  prevBtn.disabled =
    currentSlide === 0;


  if (currentSlide === slides.length - 1) {

    nextBtn.innerHTML = "✓";

  } else {

    nextBtn.innerHTML = "→";

  }

}


/* TOMBOL KIRI */

prevBtn.addEventListener("click", () => {

  if (currentSlide > 0) {

    currentSlide--;

    updateSlide();

  }

});


/* TOMBOL KANAN */

nextBtn.addEventListener("click", () => {

  if (currentSlide < slides.length - 1) {

    currentSlide++;

    updateSlide();

  } else {

    showEnding();

  }

});


/* TAMPILKAN ESKRIM */

function showEnding() {

  ending.classList.add("show");

  setTimeout(() => {

    ending.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 200);

}


/* SWIPE DI HP */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener("touchstart", (event) => {

  touchStartX =
    event.changedTouches[0].screenX;

});


document.addEventListener("touchend", (event) => {

  touchEndX =
    event.changedTouches[0].screenX;

  handleSwipe();

});


function handleSwipe() {

  const distance =
    touchEndX - touchStartX;


  if (Math.abs(distance) < 50) {
    return;
  }


  if (distance < 0) {

    if (currentSlide < slides.length - 1) {

      currentSlide++;

      updateSlide();

    }

  } else {

    if (currentSlide > 0) {

      currentSlide--;

      updateSlide();

    }

  }

}


updateSlide();