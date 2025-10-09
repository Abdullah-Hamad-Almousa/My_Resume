// Main JavaScript for CV Web App
// Abdullah Almousa - Machine Learning Practitioner Portfolio

// Global variables
let neuralNetwork;
let skillsChart;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNeuralBackground();
    initializeTypewriter();
    initializeSkillsChart();
    initializeScrollReveal();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeSkillBars();
});

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

// Typewriter effect for hero section
function initializeTypewriter() {
    // Name typewriter
    new Typed('#typed-name', {
        strings: ['Abdullah Almousa'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: false,
        showCursor: true,
        cursorChar: '|',
        onComplete: function() {
            // Start title typewriter after name is complete
            new Typed('#typed-title', {
                strings: ['Machine Learning Practitioner', 'AI Specialist', 'Data Science Expert'],
                typeSpeed: 80,
                backSpeed: 40,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    });
}

// Skills radar chart
function initializeSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    skillsChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'Java', max: 100 },
                { name: 'PyTorch', max: 100 },
                { name: 'TensorFlow', max: 100 },
                { name: 'OpenCV', max: 100 },
                { name: 'ML Models', max: 100 },
                { name: 'Data Visualization', max: 100 },
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
                value: [95, 90, 85, 88, 82, 92, 87, 80],
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
    
    // Resize chart on window resize
    window.addEventListener('resize', function() {
        skillsChart.resize();
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
    
    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
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
            
            // Toggle menu
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
                const offsetTop = target.offsetTop - 100; // Account for fixed header
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
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 200);
            }
        });
    };
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    // Animate on load
    setTimeout(animateSkillBars, 1000);
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.gradient-text');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Add hover effects to cards
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

// Performance optimization - lazy load images
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

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate counters after page load
    setTimeout(animateCounters, 2000);
});

// Handle form submissions (for future contact form)
function handleFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
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

// Export functions for use in other files
window.CVApp = {
    showNotification,
    handleFormSubmission,
    animateCounters
};

function showWorkTime() {
  // Work hours (24-hour format)
  const workStart = 12; // 12 PM
  const workEnd = 18;   // 6 PM
  const now = new Date();

  // Create Date objects for today's work hours
  const start = new Date();
  start.setHours(workStart, 0, 0, 0);

  const end = new Date();
  end.setHours(workEnd, 0, 0, 0);

  // If it's already past 6 PM, set the schedule to tomorrow
  if (now > end) {
    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 1);
  }

  // Format times in the user’s locale
  const options = { hour: '2-digit', minute: '2-digit' };
  const startStr = start.toLocaleTimeString([], options);
  const endStr = end.toLocaleTimeString([], options);

  // Show work hours
  document.getElementById('work-time').textContent =
    `Work time: ${startStr} → ${endStr} (your local time)`;

  // Calculate relative message
  const diffStart = start - now;
  const diffEnd = end - now;
  let message;

  if (diffStart > 0) {
    const hours = Math.floor(diffStart / 3600000);
    const minutes = Math.floor((diffStart % 3600000) / 60000);
    message = `Work starts in ${hours}h ${minutes}m`;
  } else if (diffEnd > 0) {
    const hours = Math.floor(diffEnd / 3600000);
    const minutes = Math.floor((diffEnd % 3600000) / 60000);
    message = `Work ends in ${hours}h ${minutes}m`;
  } else {
    message = 'Work time is over for today';
  }

  document.getElementById('work-status').textContent = message;
}

// Initial call
showWorkTime();

// Optional: update every minute
setInterval(showWorkTime, 60000);

function showWorkSchedule() {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours() + now.getMinutes() / 60;

  const workDays = [0, 1, 2, 3, 4]; // Sunday–Thursday
  const startHour = 12; // 12 PM
  const endHour = 18;   // 6 PM

  // Always show this schedule text
  document.getElementById('work-hours').textContent =
    'Sunday - Thursday: 12:00 PM - 6:00 PM';

  // Check if user is in working hours
  let statusText;
  if (workDays.includes(day) && hour >= startHour && hour < endHour) {
    const hoursLeft = Math.floor(endHour - hour);
    const minutesLeft = Math.floor((endHour - hour - hoursLeft) * 60);
    statusText = `🟢 Open now — closes in ${hoursLeft}h ${minutesLeft}m`;
  } else {
    // Calculate next opening day/time
    let nextDay = day;
    let daysToAdd = 0;

    // If it’s Friday (5) or Saturday (6), next open is Sunday
    if (day >= 5) {
      daysToAdd = (7 - day); // Go to Sunday
    } else if (hour >= endHour) {
      daysToAdd = 1; // Tomorrow
    }

    nextDay += daysToAdd;
    const nextOpen = new Date(now);
    nextOpen.setDate(now.getDate() + daysToAdd);
    nextOpen.setHours(startHour, 0, 0, 0);

    const timeString = nextOpen.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    statusText = `🔴 Closed now — opens ${daysToAdd === 0 ? 'later today' : 'next workday'} at ${timeString}`;
  }

  document.getElementById('work-status').textContent = statusText;
}

// Run once and update every minute
showWorkSchedule();
setInterval(showWorkSchedule, 60000);

document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitText = document.getElementById('submit-text');
  const submitLoading = document.getElementById('submit-loading');
  
  submitText.classList.add('hidden');
  submitLoading.classList.remove('hidden');
  
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

  submitText.classList.remove('hidden');
  submitLoading.classList.add('hidden');
});