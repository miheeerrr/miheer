// Loading Animation
    window.addEventListener('load', () => {
      const loader = document.querySelector('.loader');
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 1000); // Ensure loader shows for at least 1s
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Navigation Scroll Effect
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });

    // Navigation Toggle - Improved
    function toggleNav() {
      const nav = document.getElementById('navLinks');
      const hamburger = document.querySelector('.hamburger');
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Toggle body scroll when mobile nav is open
      if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    function closeNav() {
      const nav = document.getElementById('navLinks');
      const hamburger = document.querySelector('.hamburger');
      nav.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const nav = document.getElementById('navLinks');
      const hamburger = document.querySelector('.hamburger');
      if (!e.target.closest('#navLinks') && !e.target.closest('.hamburger') && nav.classList.contains('active')) {
        closeNav();
      }
    });

    // Theme Toggle - Enhanced
    function toggleTheme() {
      const body = document.body;
      const themeToggle = document.querySelector('.theme-toggle i');
      body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
      
      if (body.dataset.theme === 'dark') {
        themeToggle.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      }
      
      // Show theme change notification
      showToast(`Switched to ${body.dataset.theme} mode`);
    }

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
      document.body.dataset.theme = 'dark';
      document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }

    // Typing Effect for Hero Section
    const typingTexts = ["Premium Design", "Visual Identity", "Brand Assets", "Creative Solutions"];
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
      const typingElement = document.querySelector('.typing-effect');
      const currentText = typingTexts[currentTextIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing next
      }
      
      setTimeout(typeText, typingSpeed);
    }

    // Start typing effect after page loads
    window.addEventListener('load', () => {
      setTimeout(typeText, 1000);
    });

    // GSAP Animations - More refined
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('.animate-in').forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });

    // Animate stats with counting effect
    const statCards = document.querySelectorAll('.stat-card h3');
    statCards.forEach(card => {
      const targetVal = parseFloat(card.innerText) || 0;
      const suffix = card.innerText.replace(/[0-9.]/g, ''); // Extracts '+' or other non-numeric parts
      const isDecimal = card.innerText.includes('.');
      
      let obj = { val: 0 };
      
      gsap.to(obj, {
        val: targetVal,
        duration: 2,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        ease: 'power1.out',
        onUpdate: () => {
          card.innerText = (isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val)) + suffix;
        }
      });
    });

    // Animate service cards with stagger
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'back.out(1.2)'
      });
    });

    // Animate portfolio items with stagger
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out'
      });
    });

    // Particle Background - More optimized
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('canvas-bg'), 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create particles with better distribution
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spherical distribution for more interesting pattern
      const radius = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      colorArray[i] = Math.random() * 0.5 + 0.5; // R
      colorArray[i + 1] = Math.random() * 0.3 + 0.2; // G
      colorArray[i + 2] = Math.random() * 0.5 + 0.5; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // Animation loop with optimized performance
    let lastTime = 0;
    const animationSpeed = 0.0002;
    function animateParticles(time) {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      particleMesh.rotation.x += deltaTime * animationSpeed * 0.5;
      particleMesh.rotation.y += deltaTime * animationSpeed;
      renderer.render(scene, camera);
      requestAnimationFrame(animateParticles);
    }
    animateParticles(0);

    // Handle resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 200);
    });

    // Custom Cursor - Enhanced interaction
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    // Cursor effects with more elements
    const hoverElements = document.querySelectorAll(
      'a, button, .portfolio-item, .service-card, .tools-list li, .contact-method, .stat-card'
    );
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
      });
      
      // Add click effect
      el.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
      });
      el.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
      });
    });

    // Contact Form - Enhanced with validation and toast notification
    const contactForm = document.getElementById('contactForm');
    
    function showToast(message) {
      const toast = document.getElementById('notificationToast');
      const toastMessage = document.getElementById('toastMessage');
      
      toastMessage.textContent = message;
      toast.classList.add('visible');
      
      setTimeout(() => {
        toast.classList.remove('visible');
      }, 3000);
    }

    async function handleSubmit(event) {
      event.preventDefault();
      
      const form = event.target;
      const formData = new FormData(form);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const message = formData.get('message').trim();
      
      // Basic validation
      if (!name || !email || !message) {
        showToast('Please fill in all fields');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address');
        return;
      }
      
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      try {
        // Simulate API call (replace with actual fetch in production)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showToast(`Thanks for your message, ${name}! I'll get back to you soon.`);
        form.reset();
        
        // In production, you would use:
        /*
        const response = await fetch('/send', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        showToast('Message sent successfully!');
        form.reset();
        */
      } catch (error) {
        console.error('Error:', error);
        showToast('There was an error sending your message. Please try again.');
      } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }
    }

    // Back to Top Button - Smooth scroll
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading is supported
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback for browsers without native lazy loading
      const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            lazyLoadObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px'
      });
      
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        lazyLoadObserver.observe(img);
      });
    }

    // Service worker registration for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('ServiceWorker registration successful');
        }).catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

    // Offline detection
    window.addEventListener('offline', () => {
      showToast('You are currently offline. Some features may not be available.');
    });

    window.addEventListener('online', () => {
      showToast('Your connection has been restored.');
    });

    // Print styles enhancement
    window.addEventListener('beforeprint', () => {
      // Hide elements that shouldn't print
      document.querySelectorAll('.btn, .hamburger, .back-to-top, #custom-cursor').forEach(el => {
        el.style.display = 'none';
      });
    });