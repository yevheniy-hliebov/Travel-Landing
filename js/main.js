"use strict"

// Header Nav-Bar
const headerNav = document.querySelector(".header__nav");
const burgerIcon = document.querySelector(".burger-icon");
const body = document.querySelector("body");
document.addEventListener("click", function (e) {
    const targetElement = e.target;
    if (targetElement.closest(".burger-icon") || targetElement.closest(".burger-icon span")){
        headerNav.classList.toggle("header__nav--active");
        burgerIcon.classList.toggle("burger-icon--close");
        body.classList.toggle("lock-scroll");
    }
})
// Header Nav-Bar End



// Header Slider
const slides = document.querySelectorAll(".slider .slide");
const scrollBarSlider = document.querySelector(".slider .slider__scroll-bar-paginate__current");
const numberSlideLength = document.querySelector(".slider .slider__paginate__number-length");
const numberSlideCurrent = document.querySelector(".slider .slider__paginate__number-current");

let slideIndex = 1;

if (slides.length < 10){
    numberSlideLength.textContent = `0${slides.length}`;
}
else numberSlideLength.textContent = `${slides.length}`;

let scrollBarSize = 100 / slides.length;
scrollBarSlider.style.height = scrollBarSize + "%";

let next = true;

Slider();

document.addEventListener("click", function (e) {
    const targetElement = e.target;
    if (targetElement.closest(".slider__paginate-btn")){
        if (targetElement.closest("#prev")){
            if(slideIndex > 1){
                slideIndex--;
                next = false;
                Slider();
            }
        }
        else if (targetElement.closest("#next")){
            if(slideIndex < slides.length){
                slideIndex++;
                next = true;
                Slider();
            }
        }
    }
})

function Slider(){
    let prevIndex = slideIndex - 1;
    let nextIndex = slideIndex + 1;   

    scrollBarSlider.style.top = (slideIndex-1) * scrollBarSize + "%";
    for (let i = 0; i < slides.length; i++) {
        const element = slides[i];
        // element.style.display = "none";

        if (element.classList.contains("slide--current")){
            element.classList.remove("slide--current");
        }
        if (element.classList.contains("slide--prev")){
            element.classList.remove("slide--prev");
        }
        if (element.classList.contains("slide--next")){
            element.classList.remove("slide--next");
        }
    }
    // slides[slideIndex-1].style.display = "flex";
    slides[slideIndex-1].classList.add("slide--current");
    slides[slideIndex-1].style.zIndex = "3";

    
    if (prevIndex > 0){
        if(next){
            slides[prevIndex-1].style.zIndex = "2";
        } else slides[prevIndex-1].style.zIndex = "1";
        slides[prevIndex-1].classList.add("slide--prev");
    }
    if (nextIndex < slides.length + 1){
        if(next){
            slides[nextIndex-1].style.zIndex = "1";
        } else slides[nextIndex-1].style.zIndex = "2";
        slides[nextIndex-1].classList.add("slide--next");
    }
    

    if (slideIndex < 10){
        numberSlideCurrent.textContent = `0${slideIndex}`;
    }
    else numberSlideCurrent.textContent = `${slideIndex}`;
}
// Header Slider End