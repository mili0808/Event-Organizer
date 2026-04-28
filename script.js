document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = [
        {
            id: 1,
            category: 'wedding',
            title: 'Elegant Garden Wedding',
            description: 'Beautiful outdoor wedding with floral arrangements',
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 2,
            category: 'corporate',
            title: 'Tech Conference 2023',
            description: 'Annual technology conference with 500+ attendees',
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 3,
            category: 'social',
            title: 'Charity Gala Dinner',
            description: 'Fundraising event for local children hospital',
            image: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
        },
        {
            id: 4,
            category: 'wedding',
            title: 'Rustic Barn Wedding',
            description: 'Charming countryside wedding celebration',
            image: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 5,
            category: 'corporate',
            title: 'Product Launch Event',
            description: 'Exclusive unveiling of new product line',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 6,
            category: 'nonprofit',
            title: 'Annual Charity Auction',
            description: 'Fundraising auction with celebrity guests',
            image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }
    ];
    
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    function loadPortfolioItems(filter = 'all') {
        portfolioGrid.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter);
        
        filteredItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="#portfolio-item-${item.id}" class="btn btn-outline">View Details</a>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Load all portfolio items initially
    loadPortfolioItems();
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            loadPortfolioItems(filter);
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const interest = document.getElementById('interest').value;
        
        // Simple validation
        if (!name || !email || !interest) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, interest });
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. We'll contact you soon.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Pricing Tabs
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            pricingTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // In a real application, you would load different pricing plans here
            // For this demo, we'll just show an alert
            const planType = this.getAttribute('data-pricing');
            console.log('Selected pricing plan:', planType);
        });
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50)) {
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
});