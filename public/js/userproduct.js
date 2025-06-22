

    const slides = document.getElementById("slides");
    const totalSlides = slides.children.length;
    let index = 0;

    function showNextSlide() {
      index = (index + 1) % totalSlides;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    document.getElementById("nextBtn").addEventListener("click", showNextSlide);
    setInterval(() => {
      showNextSlide();
      const imgs = slides.querySelectorAll("img");
      imgs.forEach((img) => {
        img.style.transform = "scale(1.05)";
        setTimeout(() => (img.style.transform = "scale(1)"), 1000);
      });
    }, 4000);



