




    // JavaScript code for the image carousel
    document.addEventListener('DOMContentLoaded', () => {
      const slides = document.querySelectorAll('.slide');
      const leak = document.getElementById('leak');   // The Orange Flash
      const leak2 = document.getElementById('leak2'); // The Red Flash
      const screen = document.querySelector('.projector-screen');
      let currentIndex = 0;
      let isAnimating = false;
      let autoTimer; 
  
      function triggerSlideChange(newIndex) {
          if (isAnimating) return; 
          isAnimating = true;
  
          // --- THE RANDOMIZER ---
          const diceRoll = Math.random(); // Generates a number between 0.0 and 1.0
          let showOrange = false;
          let showRed = false;
  
          if (diceRoll < 0.33) {
              showOrange = true; // 33% chance: Only Orange
          } else if (diceRoll < 0.66) {
              showRed = true;    // 33% chance: Only Red
          } else {
              showOrange = true;
              showRed = true;    // 34% chance: Both together!
          }
  
          // 1. Trigger Orange Flash (if chosen)
          if (showOrange) {
              leak.classList.remove('flash-anim');
              void leak.offsetWidth; 
              leak.classList.add('flash-anim');
          }
  
          // 2. Trigger Red Flash (if chosen)
          if (showRed) {
              leak2.classList.remove('flash-anim-2');
              void leak2.offsetWidth; 
              leak2.classList.add('flash-anim-2');
          }
  
          // 3. Snap slides halfway through the flash window
          setTimeout(() => {
              slides[currentIndex].classList.remove('active');
              currentIndex = newIndex;
              slides[currentIndex].classList.add('active');
          }, 100); 
  
          // 4. Unlock interaction
          setTimeout(() => {
              isAnimating = false;
          }, 300); 
      }
  
      // --- Navigation Logic ---
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
  
      // --- Click & Keyboard Events ---
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
  
      // Start the auto-play timer on load
      startTimer();
  });


  
// work.html


document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.sortbuttons button');
  const posts = document.querySelectorAll('.projects .post');
  
  if (posts.length === 0) return; 

  // --- THE MAGIC: Give each photo a unique tracking name ---
  posts.forEach((post, index) => {
    post.style.viewTransitionName = `photo-${index}`;
  });

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');
      
      const applyFilter = () => {
        posts.forEach(function (post) {
          if (filter === 'all' || post.classList.contains(filter)) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });

        // Update active button color
        buttons.forEach(function (btn) {
          if (btn === button) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      };

      // --- Trigger the Seamless Glide ---
      if (document.startViewTransition) {
        document.startViewTransition(applyFilter);
      } else {
        // Fallback for older browsers
        applyFilter(); 
      }
      
    });
  });
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

const projects = {
  project1: {
    title: "Urban Silence",
    // CHECK THESE PATHS! Make sure these files actually exist in your folder
    images: ["/allProject/jewjournal/downscale1.jpg", "/allProject/jewjournal/downscale2.jpg", "/allProject/jewjournal/refine1.jpg", "/allProject/jewjournal/downscale1.jpg", "/allProject/jewjournal/downscale2.jpg", "/allProject/jewjournal/downscale3.jpg"] 
  },
  project2: {
    title: "Neon Nights",
    images: ["/allProject/jewjournal/downscale1.jpg", "/allProject/jewjournal/downscale2.jpg", "/allProject/jewjournal/refine1.jpg", "/allProject/jewjournal/downscale1.jpg", "/allProject/jewjournal/downscale2.jpg", "/allProject/jewjournal/downscale3.jpg"]
  }, project3: {
    title: "Urban Silence",
    // CHECK THESE PATHS! Make sure these files actually exist in your folder
    images: ["/allProject/jewjournal/downscale1.jpg", "/allProject/jewjournal/downscale2.jpg", "/allProject/jewjournal/refine1.jpg", "/allProject/jewjournal/downscale1.jpg", "/allProject/jewjournal/downscale2.jpg", "/allProject/jewjournal/downscale3.jpg"] 
  }
}
let currentProjectKey = "project1";
let pageIndex = 0;
let isJournalStarted = false;

/* --- INITIALIZATION --- */
window.onload = () => {
  // 1. Generate the Menu Items
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = "";
  
  Object.keys(projects).forEach((key, index) => {
    const li = document.createElement('li');
    li.className = 'menu-item';
    li.innerText = projects[key].title; 
    li.onclick = () => loadProject(key);
    menuList.appendChild(li);
  });

  // 2. Setup Interactions
  document.getElementById('bookmark-container').onclick = toggleMenu;
  document.getElementById('nav-forward').onclick = nextPage;
};

/* --- CORE FUNCTIONS --- */

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
    
    // Page 0 = Single Cover. Others = Pairs.
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
    // Loop back to start of THIS project
    pageIndex = 0;
    renderPage();
  }
}