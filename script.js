// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}

function closeMobileMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMobileMenu);
}

if (overlay) {
  overlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on menu links
const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on window resize if it's open
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
    closeMobileMenu();
  }
});

// Header Scroll Effect with Enhanced Animation
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Hide header on scroll down, show on scroll up
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollY = currentScrollY;
});

// Enhanced Image Gallery with Touch Support
let currentImageIndex = 0;
const images = [
  'assets/perfumeImg1.svg',
  'assets/perfumeImg2.svg',
  'assets/perfumeImg3.svg',
  'assets/perfumeImg4.svg',
  'assets/perfumeImg5.svg',
  'assets/perfumeImg6.svg',
  'assets/perfumeImg7.svg',
  'assets/perfumeImg8.svg'
];

let touchStartX = 0;
let touchEndX = 0;

function changeImage(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  } else if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  
  updateImage();
}

function setImage(index) {
  currentImageIndex = index;
  updateImage();
}

function updateImage() {
  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    // Add fade effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = images[currentImageIndex];
      mainImage.style.opacity = '1';
    }, 150);
  }
  
  // Update active thumbnail with animation
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb, index) => {
    thumb.classList.remove('active');
    if (index === currentImageIndex) {
      setTimeout(() => thumb.classList.add('active'), 100);
    }
  });
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index < 4) {
      dot.classList.toggle('active', index === currentImageIndex % 4);
    }
  });
}

// Touch support for image gallery
const mainImageContainer = document.querySelector('.main-image-container');
if (mainImageContainer) {
  mainImageContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  mainImageContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      changeImage(1); // Swipe left - next image
    } else {
      changeImage(-1); // Swipe right - previous image
    }
  }
}

// Enhanced Subscription Selection and Cart Update
let selectedSubscription = 'single';
let selectedFragrance = 'rose';
let selectedDoubleFragrances = ['', ''];

const subscriptionPrices = {
  single: {
    original: 99.99,
    lily: 99.99,
    rose: 99.99
  },
  double: {
    any: 169.99
  }
};

function selectSubscription(index) {
  const cards = document.querySelectorAll('.subscription-card');
  const radios = document.querySelectorAll('.subscription-radio input[type="radio"]');
  
  // Animate card selection
  cards.forEach((card, i) => {
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.classList.toggle('active', i === index);
      card.style.transform = 'scale(1)';
      radios[i].checked = (i === index);
    }, 100);
  });
  
  selectedSubscription = index === 0 ? 'single' : 'double';
  updateCartButton();
  
  // Reset double subscription selections when switching
  if (selectedSubscription === 'double') {
    selectedDoubleFragrances = ['', ''];
    updateCartButton();
  }
}

function selectFragrance(event, index) {
  event.stopPropagation();
  const buttons = document.querySelectorAll('.subscription-card.active .fragrance-btn');
  
  // Animate button selection
  buttons.forEach((btn, i) => {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.classList.toggle('active', i === index);
      btn.style.transform = 'scale(1)';
    }, 100);
  });
  
  const fragrances = ['original', 'lily', 'rose'];
  selectedFragrance = fragrances[index];
  updateCartButton();
}

function selectDoubleFragrance(event, selectorIndex, fragranceIndex) {
  event.stopPropagation();
  
  // Get the specific fragrance selector (0 for first, 1 for second)
  const fragranceSelectors = document.querySelectorAll('.subscription-card:nth-child(2) .fragrance-selector');
  const currentSelector = fragranceSelectors[selectorIndex];
  const buttons = currentSelector.querySelectorAll('.fragrance-btn');
  
  // Animate button selection
  buttons.forEach((btn, i) => {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.classList.toggle('active', i === fragranceIndex);
      btn.style.transform = 'scale(1)';
    }, 100);
  });
  
  const fragrances = ['original', 'lily', 'rose'];
  selectedDoubleFragrances[selectorIndex] = fragrances[fragranceIndex];
  updateCartButton();
}

// Handle double subscription radio buttons - REMOVED (now using button-based selection like single subscription)

function updateCartButton() {
  const cartBtn = document.getElementById('addToCartBtn');
  if (!cartBtn) return;
  
  let buttonText = 'Add to Cart - ';
  
  if (selectedSubscription === 'single') {
    const price = subscriptionPrices.single[selectedFragrance];
    buttonText += `Single ${selectedFragrance.charAt(0).toUpperCase() + selectedFragrance.slice(1)} $${price}`;
  } else {
    const price = subscriptionPrices.double.any;
    const fragrance1 = document.querySelector('input[name="double-fragrance-1"]:checked');
    const fragrance2 = document.querySelector('input[name="double-fragrance-2"]:checked');
    
    if (fragrance1 && fragrance2) {
      const frag1Name = fragrance1.value.charAt(0).toUpperCase() + fragrance1.value.slice(1);
      const frag2Name = fragrance2.value.charAt(0).toUpperCase() + fragrance2.value.slice(1);
      buttonText += `Double ${frag1Name} + ${frag2Name} $${price}`;
    } else if (fragrance1) {
      const frag1Name = fragrance1.value.charAt(0).toUpperCase() + fragrance1.value.slice(1);
      buttonText += `Double ${frag1Name} + ? $${price} (Select 2nd fragrance)`;
    } else {
      buttonText += `Double Subscription $${price} (Select 2 fragrances)`;
    }
  }
  
  // Animate button text change
  cartBtn.style.opacity = '0.7';
  setTimeout(() => {
    cartBtn.textContent = buttonText;
    cartBtn.style.opacity = '1';
  }, 150);
}

// Enhanced Collection Toggle with Animation
function toggleCollection(index) {
  const items = document.querySelectorAll('.collection-item');
  const item = items[index];
  const icon = item.querySelector('.toggle-icon');
  const description = item.querySelector('.collection-description');
  
  // Close all other items with animation
  items.forEach((otherItem, i) => {
    if (i !== index && otherItem.classList.contains('active')) {
      const otherDescription = otherItem.querySelector('.collection-description');
      const otherIcon = otherItem.querySelector('.toggle-icon');
      
      otherDescription.style.maxHeight = '0';
      otherIcon.textContent = '+';
      otherItem.classList.remove('active');
    }
  });
  
  // Toggle current item with animation
  if (item.classList.contains('active')) {
    description.style.maxHeight = '0';
    icon.textContent = '+';
    item.classList.remove('active');
  } else {
    description.style.maxHeight = description.scrollHeight + 'px';
    icon.textContent = '−';
    item.classList.add('active');
  }
}

// Enhanced Statistics Counter Animation with Intersection Observer
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
    
    // Add pulse effect during counting
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }, 16);
}

// Enhanced Intersection Observer for Multiple Elements
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      
      // Handle statistics animation
      if (entry.target.id === 'statisticsSection') {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach((statNumber, index) => {
          const target = parseInt(statNumber.getAttribute('data-target'));
          setTimeout(() => {
            animateCounter(statNumber, target);
          }, index * 200);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Parallax Effect for Hero Section
function updateParallax() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero');
  const heroPerfume = document.querySelector('.hero-perfume');
  
  if (heroSection && heroPerfume) {
    const rate = scrolled * -0.5;
    heroPerfume.style.transform = `translateY(${rate}px) translateY(-50%)`;
  }
}

// Smooth Scroll for Navigation Links
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Enhanced Form Interactions
function enhanceFormInputs() {
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      this.style.transform = 'scale(1)';
    });
    
    input.addEventListener('input', function() {
      if (this.value) {
        this.parentElement.classList.add('has-value');
      } else {
        this.parentElement.classList.remove('has-value');
      }
    });
  });
}

// Loading Animation
function showLoadingAnimation() {
  const elements = document.querySelectorAll('.animate-on-load');
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('loaded');
    }, index * 100);
  });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  updateImage();
  updateCartButton();
  enhanceFormInputs();
  showLoadingAnimation();
  
  // Initialize double subscription radio handlers - REMOVED (now using button-based selection)
  
  // Observe elements for animations
  const elementsToObserve = [
    document.getElementById('statisticsSection'),
    document.querySelector('.comparison-section'),
    document.querySelector('.collection-section'),
    document.querySelector('.product-section')
  ].filter(Boolean);
  
  elementsToObserve.forEach(element => {
    observer.observe(element);
  });
  
  // Add parallax effect
  window.addEventListener('scroll', updateParallax);
  
  // Add cart button click handler
  const cartBtn = document.getElementById('addToCartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Animate button click
      cartBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
      }, 150);
      
      // Generate cart URL
      let cartUrl = 'https://example.com/cart?';
      
      if (selectedSubscription === 'single') {
        cartUrl += `type=single&fragrance=${selectedFragrance}&price=${subscriptionPrices.single[selectedFragrance]}`;
      } else {
        const fragrance1 = document.querySelector('input[name="double-fragrance-1"]:checked');
        const fragrance2 = document.querySelector('input[name="double-fragrance-2"]:checked');
        
        if (fragrance1 && fragrance2) {
          cartUrl += `type=double&fragrance1=${fragrance1.value}&fragrance2=${fragrance2.value}&price=${subscriptionPrices.double.any}`;
        }
      }
      
      console.log('Cart URL:', cartUrl);
      
      // Show success animation
      const originalText = cartBtn.textContent;
      cartBtn.textContent = 'Added to Cart! ✓';
      cartBtn.style.background = 'var(--primary-green)';
      
      setTimeout(() => {
        cartBtn.textContent = originalText;
        cartBtn.style.background = '';
      }, 2000);
    });
  }
});