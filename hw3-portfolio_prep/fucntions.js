document.getElementById("myImage").addEventListener("mouseover", function() {
    this.src = "scratch.jpg"; // Change the source of the image when hovered over
});

document.getElementById("myImage").addEventListener("mouseout", function() {
    this.src = "myself.jpg"; // Revert back to the original image when mouse moves out
});


// JavaScript for slider(int-fact)
let slideIndex = 0;
showSlides(slideIndex);

function nextSlide() {
    showSlides(slideIndex += 1);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
    //document.querySelector('.prev').classList.add('no-border');
}

function showSlides(index) {
    const slides = document.querySelectorAll('.slides img');
    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
}

