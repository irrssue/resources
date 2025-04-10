// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add active class to CSS
    const style = document.createElement('style');
    style.textContent = `
        nav ul li a.active {
            color: var(--primary-color);
            position: relative;
        }
        
        nav ul li a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 20px;
            right: 20px;
            height: 2px;
            background-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Add animations as elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Add fade-in animation to various elements
    const animateElements = document.querySelectorAll('.component-card, .timeline-item, .resource-card, .content-box');
    
    // Add animation class and initial styling
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .component-card, .timeline-item, .resource-card, .content-box {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .component-card.show, .timeline-item.show, .resource-card.show, .content-box.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd) {
            transform: translateX(-20px);
        }
        
        .timeline-item:nth-child(even) {
            transform: translateX(20px);
        }
        
        .timeline-item.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});
