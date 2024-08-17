




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
// video

let activePopup = null;

function openPopup(videoSrc) {
    const popupContainer = document.querySelector('.popup-container');
    const popupVideo = document.querySelector('.popup-video-element');

    popupVideo.src = videoSrc;
    popupContainer.style.display = 'flex';
    activePopup = popupVideo;
}

function closePopup() {
    const popupContainer = document.querySelector('.popup-container');

    if (activePopup) {
        activePopup.pause();
        activePopup.src = '';
        activePopup = null;
    }
    
    popupContainer.style.display = 'none';
}
