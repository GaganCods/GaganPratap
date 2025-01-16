// Sample project data - replace with your actual projects
const projects = [
    {
        title: "YouTube Thumbnail Design",
        image: "projects/thumbnail1.jpg",
        category: "Thumbnail"
    },
    {
        title: "Social Media Post",
        image: "projects/poster1.jpg",
        category: "Poster"
    },
    {
        title: "Channel Banner",
        image: "projects/banner1.jpg",
        category: "Banner"
    }
];

// Populate projects grid
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-item portfolio-item';
        projectElement.setAttribute('data-category', project.category);
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.category}</p>
            </div>
        `;
        projectGrid.appendChild(projectElement);
    });
}

// Contact Form Handling
function openMail(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Replace this with your email address
    const yourEmail = 'mrgaganok@gmail.com';
    
    // Create email content
    const subject = `Contact Form Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    // Create mailto URL
    const mailtoUrl = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default mail client
    window.location.href = mailtoUrl;
    
    return false;
}

document.getElementById('contact-form').addEventListener('submit', openMail);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentCategory = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            currentCategory = filterValue;

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    let visibleImages = [];

    function updateVisibleImages() {
        visibleImages = Array.from(portfolioItems).filter(item => {
            return !item.classList.contains('hidden');
        });
    }

    function showImage(index) {
        if (visibleImages.length === 0) return;
        currentImageIndex = index;
        const img = visibleImages[currentImageIndex].querySelector('img');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="prev-btn">&lt;</button>
                <button class="next-btn">&gt;</button>
                <button class="close-btn">&times;</button>
            </div>
        `;
        lightbox.style.display = 'flex';
    }

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateVisibleImages();
            const visibleIndex = visibleImages.indexOf(item);
            showImage(visibleIndex);
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('next-btn')) {
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            showImage(currentImageIndex);
        } else if (e.target.classList.contains('prev-btn')) {
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            showImage(currentImageIndex);
        } else if (e.target.classList.contains('close-btn') || e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
                showImage(currentImageIndex);
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
                showImage(currentImageIndex);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });

    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeLength = touchEndX - touchStartX;

        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0) {
                // Swipe right - show previous image
                currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            } else {
                // Swipe left - show next image
                currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            }
            showImage(currentImageIndex);
        }
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
