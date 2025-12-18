// Main JavaScript for CV Web App
// Abdullah Almousa - Machine Learning Practitioner Portfolio

// Global variables
let neuralNetwork;
let skillsChart;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Neural Background: Only init if container exists AND p5 is loaded
    if (document.getElementById('neural-bg') && typeof p5 !== 'undefined') {
        initializeNeuralBackground();
    }

    // 2. Typewriter for INDEX page (Home + Menu)
    initializeTypewriter();

    // 3. Typewriter for PORTFOLIO page (Menu only)
    initializePortfolioName();

    // 4. Charts: Only init if their containers exist
    if (document.getElementById('skills-chart')) initializePythonChart();
    if (document.getElementById('skills-chart-kotlin')) initializeKotlinChart();
    
    // 5. Shared Utilities
    initializeScrollReveal();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeSkillBars();
});

// --- NEW FUNCTION FOR PORTFOLIO.HTML ---
function initializePortfolioName() {
    const portfolioName = document.querySelector('#portfolio-name-animate');
    
    if (portfolioName) {
        portfolioName.innerHTML = ''; 
        new Typed('#portfolio-name-animate', {
            strings: ['Abdullah Almousa'],
            typeSpeed: 70,      // Speed of typing
            backSpeed: 50,      // SPEED OF DELETING (Increase this to make it slower)
            backDelay: 2000,    // How long to wait before starting to delete (2 seconds)
            showCursor: true,   // Shows the cursor
            cursorChar: '|',    // The cursor symbol
            loop: true
        });
    }
}

// Neural Network Background using p5.js
function initializeNeuralBackground() {
    new p5(function(p) {
        let nodes = [];
        let connections = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('neural-bg');
            
            // Create nodes
            for (let i = 0; i < 50; i++) {
                nodes.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw nodes
            for (let node of nodes) {
                node.x += node.vx;
                node.y += node.vy;
                
                // Wrap around edges
                if (node.x < 0) node.x = p.width;
                if (node.x > p.width) node.x = 0;
                if (node.y < 0) node.y = p.height;
                if (node.y > p.height) node.y = 0;
                
                // Draw node
                p.fill(0, 212, 170, 150);
                p.noStroke();
                p.ellipse(node.x, node.y, node.size);
            }
            
            // Draw connections
            p.stroke(0, 212, 170, 50);
            p.strokeWeight(1);
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    let dist = p.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    if (dist < 100) {
                        p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    }
                }
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Typewriter effect handling INDEX PAGE (Menu + Hero)
function initializeTypewriter() {
    const menuNameElement = document.querySelector('#typed-menu-name');
    const heroNameElement = document.querySelector('#typed-name');
    const titleElement = document.querySelector('#typed-title');
    
    // Safety: Clear elements only if they exist
    if (menuNameElement) menuNameElement.innerHTML = '';
    if (heroNameElement) heroNameElement.innerHTML = '';
    if (titleElement) titleElement.innerHTML = '';

    // Initialize Top Menu Name (Index Page Only)


    // Initialize Big Hero Name (Index Page Only)
    if (heroNameElement) {
        new Typed('#typed-name', {
            strings: ['Abdullah Almousa'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: false,
            showCursor: true,
            cursorChar: '|',
            onComplete: function() {
                // Start subtitle ONLY if element exists
                if (titleElement) {
                    setTimeout(() => {
                        new Typed('#typed-title', {
                            strings: ['Machine Learning Practitioner', 'AI Specialist', 'Data Science', 'Android App developer'],
                            typeSpeed: 80,
                            backSpeed: 40,
                            backDelay: 2000,
                            loop: true,
                            showCursor: true,
                            cursorChar: '|'
                        });
                    }, 200);
                }
            }
        });
    }
}

// Skills radar chart (Python)
function initializePythonChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return; // Exit if not found
    
    skillsChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'Scikit-learn', max: 100 },
                { name: 'TensorFlow', max: 100 },
                { name: 'PyTorch', max: 100 },
                { name: 'OpenCV', max: 100 },
                { name: 'ML Models', max: 100 },
                { name: 'Data\n Visualization', max: 100 },
                { name: 'NLP', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#00D4AA',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 170, 0.2)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 170, 0.3)'
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [69, 72, 68, 86, 63, 95, 87, 88],
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(0, 212, 170, 0.2)'
                },
                lineStyle: {
                    color: '#00D4AA',
                    width: 2
                },
                itemStyle: {
                    color: '#FFB800'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    skillsChart.setOption(option);
    
    window.addEventListener('resize', function() {
        if (skillsChart) skillsChart.resize();
    });
}

// Skills radar chart (Kotlin)
function initializeKotlinChart() {
    const chartDom = document.getElementById('skills-chart-kotlin');
    if (!chartDom) return; // Exit if not found

    skillsChart = echarts.init(chartDom);

    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Compose Multiplatform', max: 100 },
                { name: 'Ktor', max: 100 },
                { name: 'Koin', max: 100 },
                { name: 'Kotlinx Serialization', max: 100 },
                { name: 'Coroutines', max: 100 },
                { name: 'SQLDelight', max: 100 },
                { name: 'Gradle &\n Kotlin DSL', max: 100 },
                { name: 'Shared Code', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#00D4AA',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 170, 0.2)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 170, 0.3)'
                }
            }
        },
        series: [{
            name: 'KMP Skills',
            type: 'radar',
            data: [{
                value: [95, 87, 82, 88, 84, 69, 77, 80],
                name: 'Kotlin Multiplatform',
                areaStyle: {
                    color: 'rgba(0, 212, 170, 0.2)'
                },
                lineStyle: {
                    color: '#00D4AA',
                    width: 2
                },
                itemStyle: {
                    color: '#FFB800'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };

    skillsChart.setOption(option);

    window.addEventListener('resize', function() {
        if (skillsChart) skillsChart.resize();
    });
}

// Scroll reveal animations
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            let mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.id = 'mobile-menu';
                mobileMenu.className = 'fixed top-20 left-0 w-full bg-navy/95 backdrop-blur-lg z-40 p-6 transform -translate-y-full transition-transform duration-300';
                mobileMenu.innerHTML = `
                    <div class="space-y-4">
                        <a href="#home" class="block text-white hover:text-teal transition-colors">Home</a>
                        <a href="#skills" class="block text-white hover:text-teal transition-colors">Skills</a>
                        <a href="#projects" class="block text-white hover:text-teal transition-colors">Projects</a>
                        <a href="#achievements" class="block text-white hover:text-teal transition-colors">Achievements</a>
                        <a href="portfolio.html" class="block text-white hover:text-teal transition-colors">Portfolio</a>
                        <a href="contact.html" class="block bg-teal hover:bg-teal/80 px-4 py-2 rounded-lg transition-colors text-center">Contact</a>
                    </div>
                `;
                document.body.appendChild(mobileMenu);
            }
            
            if (mobileMenu.style.transform === 'translateY(0px)') {
                mobileMenu.style.transform = 'translateY(-100%)';
            } else {
                mobileMenu.style.transform = 'translateY(0px)';
            }
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate skill bars on scroll
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.bg-teal, .bg-gold');
    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const targetWidth = bar.dataset.width;
                if (targetWidth) {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-out';
                        bar.style.width = targetWidth;
                    }, 200);
                }
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    setTimeout(animateSkillBars, 1000);
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.gradient-text');
    counters.forEach(counter => {
        const targetText = counter.textContent;
        const target = parseInt(targetText);
        if (isNaN(target)) return;

        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const suffix = targetText.replace(/[0-9]/g, '');
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = targetText;
            }
        };
        updateCounter();
    });
}

// Hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.hover-lift');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Lazy load
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(animateCounters, 2000);
});

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: 300,
            opacity: 0,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Work Time Logic
function showWorkTime() {
  const workStart = 12; // 12 PM
  const workEnd = 18;   // 6 PM
  const now = new Date();
  const start = new Date();
  start.setHours(workStart, 0, 0, 0);
  const end = new Date();
  end.setHours(workEnd, 0, 0, 0);

  if (now > end) {
    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 1);
  }

  const options = { hour: '2-digit', minute: '2-digit' };
  const startStr = start.toLocaleTimeString([], options);
  const endStr = end.toLocaleTimeString([], options);

  const workTimeElement = document.getElementById('work-time');
  if (workTimeElement) {
      workTimeElement.textContent = `Work time: ${startStr} → ${endStr} (your local time)`;
  }
}
showWorkTime();
setInterval(showWorkTime, 60000);

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const form = e.target;
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          alert('✅ Your message has been sent successfully!');
          form.reset();
        } else {
          alert('❌ Something went wrong. Please try again.');
        }
      } catch (error) {
        alert('⚠️ Network error. Please try again.');
      }
    });
}