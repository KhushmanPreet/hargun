




    // JavaScript code for the image carousel
    document.addEventListener("DOMContentLoaded", function() {
        const images = document.querySelectorAll(".carousel-image");
        const links = document.querySelectorAll(".carousel-links a");
  
        let currentImageIndex = 0;
  
        function showImage(index) {
          images.forEach(function(image) {
            image.classList.remove("active");
          });
  
          links.forEach(function(link) {
            link.classList.remove("active");
          });
  
          images[index].classList.add("active");
          links[index].classList.add("active");
        }
  
        function nextImage() {
          currentImageIndex++;
          if (currentImageIndex === images.length) {
            currentImageIndex = 0;
          }
          showImage(currentImageIndex);
        }
  
        // Change image every 5 seconds
        setInterval(nextImage, 2000);
      });

const webname = document.getElementById('name');
webname.addEventListener('click', function onClick(event) {
  
  window.location.href = 'index.html';

});




  
// work.html


document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.sortbuttons button');
  const posts = document.querySelectorAll('.projects .post');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');
      filterPosts(filter);
    });
  });

  function filterPosts(filter) {
    posts.forEach(function (post) {
      if (filter === 'all' || post.classList.contains(filter)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });

    buttons.forEach(function (button) {
      if (button.getAttribute('data-filter') === filter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
});

// gallery.css

document.addEventListener('DOMContentLoaded', function () {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const thumbnails = document.querySelectorAll('.thumbnail-item');

  let currentImageIndex = 0;

  function showImage(index) {
    galleryItems.forEach(function (item, i) {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    thumbnails.forEach(function (item, i) {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function navigate(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
      currentImageIndex = galleryItems.length - 1;
    } else if (currentImageIndex >= galleryItems.length) {
      currentImageIndex = 0;
    }
    showImage(currentImageIndex);
  }

  const prevButtons = document.querySelectorAll('.nav-prev');
  const nextButtons = document.querySelectorAll('.nav-next');

  prevButtons.forEach(function (prevButton) {
    prevButton.addEventListener('click', function () {
      navigate(-1);
    });
  });

  nextButtons.forEach(function (nextButton) {
    nextButton.addEventListener('click', function () {
      navigate(1);
    });
  });

  thumbnails.forEach(function (item, index) {
    item.addEventListener('click', function () {
      currentImageIndex = index;
      showImage(currentImageIndex);
    });
  });
});

// kjournal
const gallery = document.getElementById("gallery");

// SORT BUTTON
const sortWrapper = document.querySelector(".sort-wrapper");
const sortToggle = document.getElementById("sortToggle");
const sortLabel = document.getElementById("sortLabel");

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

let isSorted = false;
let currentIndex = 0;

// Store original order ONCE
const originalOrder = Array.from(gallery.children);

// --------------------
// SORT TOGGLE
// --------------------
sortToggle.addEventListener("click", () => {
  gallery.classList.add("fade-out");

  setTimeout(() => {
    isSorted = !isSorted;

    let images;

    if (isSorted) {
      images = [...originalOrder].sort(
        (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date)
      );
      sortLabel.innerText = "Sorted";
      sortWrapper.classList.add("sorted");
    } else {
      images = [...originalOrder];
      sortLabel.innerText = "Unsorted";
      sortWrapper.classList.remove("sorted");
    }

    gallery.innerHTML = "";
    images.forEach(img => gallery.appendChild(img));

    gallery.classList.remove("fade-out");
  }, 200);
});

// --------------------
// OPEN LIGHTBOX
// --------------------
gallery.addEventListener("click", e => {
  if (e.target.tagName !== "IMG") return;

  const images = Array.from(gallery.querySelectorAll("img"));
  currentIndex = images.indexOf(e.target);

  if (currentIndex === -1) return;

  openLightbox(images);
});

function openLightbox(images) {
  lightboxImg.src = images[currentIndex].src;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// --------------------
// NAVIGATE LIGHTBOX
// --------------------
lightbox.addEventListener("click", e => {
  if (e.target === closeBtn) return;

  const images = Array.from(gallery.querySelectorAll("img"));
  const mid = window.innerWidth / 2;

  if (e.clientX < mid) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } else {
    currentIndex = (currentIndex + 1) % images.length;
  }

  lightboxImg.src = images[currentIndex].src;
});

// --------------------
// CLOSE LIGHTBOX
// --------------------
closeBtn.addEventListener("click", () => {
  closeLightbox();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}
// Update cursor direction based on mouse position
lightbox.addEventListener("mousemove", e => {
  const mid = window.innerWidth / 2;

  lightbox.classList.toggle("left", e.clientX < mid);
  lightbox.classList.toggle("right", e.clientX >= mid);
});


// christman method bowlright 5
const slides = document.querySelectorAll('.slides img'); 
let slideIndex = 0;
let intervalID = null;

initializeSlider();

function initializeSlider() {
    
  slides[slideIndex].classList.add("displaySlide");
}

function showSlide() {

}

function prevSlide() {

}

function nextSlide() {

}