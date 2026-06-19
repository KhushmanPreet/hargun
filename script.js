

const hamburger = document.getElementById('hamburger');
const header = document.querySelector('header');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        header.classList.toggle('nav-active');
    });
}







    
    document.addEventListener('DOMContentLoaded', () => {
      const slides = document.querySelectorAll('.slide');
      const leak = document.getElementById('leak');   
      const leak2 = document.getElementById('leak2'); 
      const screen = document.querySelector('.projector-screen');
      let currentIndex = 0;
      let isAnimating = false;
      let autoTimer; 
  
      function triggerSlideChange(newIndex) {
          if (isAnimating) return; 
          isAnimating = true;
  
          
          const diceRoll = Math.random(); 
          let showOrange = false;
          let showRed = false;
  
          if (diceRoll < 0.33) {
              showOrange = true; 
          } else if (diceRoll < 0.66) {
              showRed = true;    
          } else {
              showOrange = true;
              showRed = true;    
          }
  
          
          if (showOrange) {
              leak.classList.remove('flash-anim');
              void leak.offsetWidth; 
              leak.classList.add('flash-anim');
          }
  
          
          if (showRed) {
              leak2.classList.remove('flash-anim-2');
              void leak2.offsetWidth; 
              leak2.classList.add('flash-anim-2');
          }
  
          
          setTimeout(() => {
              slides[currentIndex].classList.remove('active');
              currentIndex = newIndex;
              slides[currentIndex].classList.add('active');
          }, 100); 
  
          
          setTimeout(() => {
              isAnimating = false;
          }, 300); 
      }
  
      
      function nextSlide() {
          let nextIndex = (currentIndex + 1) % slides.length; 
          triggerSlideChange(nextIndex);
      }
  
      function prevSlide() {
          let prevIndex = (currentIndex - 1 + slides.length) % slides.length; 
          triggerSlideChange(prevIndex);
      }
  
      function startTimer() {
          clearInterval(autoTimer); 
          autoTimer = setInterval(nextSlide, 2500); 
      }
  
      
      document.getElementById('btn-next').addEventListener('click', () => {
          nextSlide();
          startTimer(); 
      });
  
      document.getElementById('btn-prev').addEventListener('click', () => {
          prevSlide();
          startTimer();
      });
  
      screen.addEventListener('click', () => {
          nextSlide();
          startTimer();
      });
  
      document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') {
              nextSlide();
              startTimer();
          } else if (e.key === 'ArrowLeft') {
              prevSlide();
              startTimer();
          }
      });
  
      preloadNearbySlides(0);
      startTimer();
  });


  



document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.sortbuttons button');
  const posts = document.querySelectorAll('.projects .post');
  
  if (posts.length === 0) return; 

  
  posts.forEach((post, index) => {
    post.style.viewTransitionName = `photo-${index}`;
  });

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');
      
      const applyFilter = () => {
        posts.forEach(function (post) {
          if (filter === 'all' || post.classList.contains(filter)) {
            post.style.display = "flex";
          } else {
            post.style.display = 'none';
          }
        });

        
        buttons.forEach(function (btn) {
          if (btn === button) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      };

      
      if (document.startViewTransition) {
        document.startViewTransition(applyFilter);
      } else {
        
        applyFilter(); 
      }
      
    });
  });
});






document.addEventListener('DOMContentLoaded', function () {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  const thumbTrack = document.querySelector('.thumbnail-track');
  const thumbWindow = document.querySelector('.thumbnail-window');
  
  if (galleryItems.length === 0) return; 

  let currentImageIndex = 0;
  let isGalleryAnimating = false; 

  function showImage(index) {
    
    // --- 1. MAIN IMAGE LAZY LOAD ---
    galleryItems.forEach((item, i) => {
      const img = item.querySelector('img');
      
      // Load current and next main photo
      if (i === index || i === (index + 1) % galleryItems.length) {
        if (img && img.hasAttribute('data-src')) {
          img.setAttribute('src', img.getAttribute('data-src'));
          img.removeAttribute('data-src'); 
        }
      }

      if (i === index) item.classList.add('active');
      else item.classList.remove('active');
    });

    // --- 2. THUMBNAIL TRACK LAZY LOAD ---
    const totalThumbs = thumbnails.length;
    thumbnails.forEach((item, i) => {
      
      // Calculate a "visible window" of thumbnails (2 behind, 3 ahead)
      const isVisibleThumb = (
        i === index ||
        i === (index + 1) % totalThumbs ||
        i === (index + 2) % totalThumbs ||
        i === (index + 3) % totalThumbs ||
        i === (index - 1 + totalThumbs) % totalThumbs ||
        i === (index - 2 + totalThumbs) % totalThumbs
      );

      // Plug in the real image source if it is inside the visible window
      if (isVisibleThumb && item.hasAttribute('data-src')) {
        item.setAttribute('src', item.getAttribute('data-src'));
        item.removeAttribute('data-src');
      }

      // Handle the active border/styling
      if (i === index) item.classList.add('active');
      else item.classList.remove('active');
    });

    // --- 3. GLIDE THE TRACK ---
    if (thumbTrack && thumbWindow && thumbnails.length) {
      const activeThumb = thumbnails[index];
      if (activeThumb) {
        setTimeout(() => {
            const thumbCenter = activeThumb.offsetLeft + (activeThumb.offsetWidth / 2);
            const windowCenter = thumbWindow.offsetWidth / 2;
            
            let slideAmount = thumbCenter - windowCenter;
            const maxSlide = thumbTrack.scrollWidth - thumbWindow.offsetWidth;
            
            if (slideAmount < 0) slideAmount = 0;
            if (slideAmount > maxSlide) slideAmount = maxSlide;

            thumbTrack.style.transform = `translateX(-${slideAmount}px)`;
        }, 10);
      }
    }
  }

  function navigate(direction) {
    if (isGalleryAnimating) return; 
    isGalleryAnimating = true;

    currentImageIndex += direction;
    
    // Looping logic
    if (currentImageIndex < 0) {
      currentImageIndex = galleryItems.length - 1;
    } else if (currentImageIndex >= galleryItems.length) {
      currentImageIndex = 0;
    }
    
    showImage(currentImageIndex);

    setTimeout(() => {
        isGalleryAnimating = false;
    }, 400); 
  }

  const prevButton = document.querySelector('.nav-prev');
  const nextButton = document.querySelector('.nav-next');

  if (prevButton) prevButton.addEventListener('click', () => navigate(-1));
  if (nextButton) nextButton.addEventListener('click', () => navigate(1));

  thumbnails.forEach(function (item, index) {
    item.addEventListener('click', function () {
      if (isGalleryAnimating) return; 
      isGalleryAnimating = true;
      
      currentImageIndex = index;
      showImage(currentImageIndex);

      setTimeout(() => {
          isGalleryAnimating = false;
      }, 400);
    });
  });

  showImage(0);
});


const projects = {
  project1: {
    title: "Urban Silence",
    
    images: ["/allProject/jewjournal/downscale1.webp", "/allProject/jewjournal/downscale2.webp", "/allProject/jewjournal/refine1.webp", "/allProject/jewjournal/downscale1.webp", "/allProject/jewjournal/downscale2.webp", "/allProject/jewjournal/downscale3.webp"] 
  },
  project2: {
    title: "Neon Nights",
    images: ["/allProject/jewjournal/downscale1.webp", "/allProject/jewjournal/downscale2.webp", "/allProject/jewjournal/refine1.webp", "/allProject/jewjournal/downscale1.webp", "/allProject/jewjournal/downscale2.webp", "/allProject/jewjournal/downscale3.webp"]
  }, project3: {
    title: "Urban Silence",
    
    images: ["/allProject/jewjournal/downscale1.webp", "/allProject/jewjournal/downscale2.webp", "/allProject/jewjournal/refine1.webp", "/allProject/jewjournal/downscale1.webp", "/allProject/jewjournal/downscale2.webp", "/allProject/jewjournal/downscale3.webp"] 
  }
}
let currentProjectKey = "project1";
let pageIndex = 0;
let isJournalStarted = false;


window.onload = () => {
  
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = "";
  
  Object.keys(projects).forEach((key, index) => {
    const li = document.createElement('li');
    li.className = 'menu-item';
    li.innerText = projects[key].title; 
    li.onclick = () => loadProject(key);
    menuList.appendChild(li);
  });

  
  document.getElementById('bookmark-container').onclick = toggleMenu;
  document.getElementById('nav-forward').onclick = nextPage;
};



function startJournal() {
  const startScreen = document.getElementById('start-screen');
  const stage = document.getElementById('album-stage');
  
  startScreen.style.opacity = 0;
  setTimeout(() => {
    startScreen.style.display = 'none';
  }, 800);

  isJournalStarted = true;
  loadProject(currentProjectKey); 
  
  setTimeout(() => {
    stage.style.opacity = 1;
  }, 500);
}

function toggleMenu() {
  const menu = document.getElementById('fullscreen-menu');
  menu.classList.toggle('active');
}

function loadProject(key) {
  currentProjectKey = key;
  pageIndex = 0;
  
  document.getElementById('active-bookmark-text').innerText = projects[key].title;
  document.getElementById('fullscreen-menu').classList.remove('active');
  
  renderPage();
}

function renderPage() {
  if(!isJournalStarted) return; 

  const stage = document.getElementById('album-stage');
  const project = projects[currentProjectKey];
  const images = project.images;

  stage.style.opacity = 0;

  setTimeout(() => {
    stage.innerHTML = "";
    
    
    if (pageIndex === 0) {
      stage.className = "photo-background single";
      stage.innerHTML = `<img src="${images[0]}" class="album-img">`;
    } else {
      stage.className = "photo-background pair";
      const startIdx = 1 + (pageIndex - 1) * 2;
      
      let html = "";
      if (images[startIdx]) html += `<img src="${images[startIdx]}" class="album-img">`;
      if (images[startIdx+1]) html += `<img src="${images[startIdx+1]}" class="album-img">`;
      
      stage.innerHTML = html;
    }

    stage.style.opacity = 1;
  }, 300);
}

function nextPage() {
  if(!isJournalStarted) return;

  const project = projects[currentProjectKey];
  const totalPages = Math.ceil((project.images.length - 1) / 2) + 1;

  if (pageIndex < totalPages - 1) {
    pageIndex++;
    renderPage();
  } else {
    
    pageIndex = 0;
    renderPage();
  }
}