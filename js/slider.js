let currentSlide = 0;
let slideInterval; // Для хранения идентификатора интервала

const fetchImages = async () => {
  const accessKey = 'BV3X5hNtoWyEBbaB41-aAyHm6SMb8j9g90wqB5WV-Fk';
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=10`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const images = await response.json();
    const container = document.getElementById('image-container');
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.urls.small;
      imgElement.alt = image.description || 'Unsplash image';
      container.appendChild(imgElement);
    });
    container.style.width = `${100 * images.length}%`; // Устанавливаем ширину контейнера
    startSlideShow();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

const moveSlides = (n) => {
  const slides = document.querySelectorAll('.image-container img');
  if (n > 0 && currentSlide >= slides.length - 1) {
    currentSlide = 0;
  } else if (n < 0 && currentSlide <= 0) {
    currentSlide = slides.length - 1; 
  } else {
    currentSlide += n;
  }
  const newTransform = `translateX(-${currentSlide * 100 / slides.length}%)`;
  document.querySelector('.image-container').style.transform = newTransform;
};

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    moveSlides(1);
  }, 3000); 
};

const stopSlideShow = () => {
  clearInterval(slideInterval);
};

document.addEventListener('DOMContentLoaded', () => {
  fetchImages();
});

document.querySelector('.slider').addEventListener('mouseenter', stopSlideShow);
document.querySelector('.slider').addEventListener('mouseleave', startSlideShow);
