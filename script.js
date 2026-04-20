




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