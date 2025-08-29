// JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initializing...');
    initializePortfolio();
    initializeLoadingScreen();
    initializeProgressRings();
    initializeInteractiveElements();
    initializeAccessibility();
    initializePerformanceMonitoring();
});

// Portfolio Initialization
function initializePortfolio() {
    setupNavigation();
    setupSmoothTransitions();
    setupKeyboardNavigation();
    setupMobileOptimizations();
}

// Loading Screen Management
function initializeLoadingScreen() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Simulate loading time for better UX
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }
        
        // This triggers entrance animations
        triggerEntranceAnimations();
    }, 1500);
}

// Navigation Setup 
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.section');
    const navbar = document.querySelector('.glassmorphism-nav');

    console.log('Found nav links:', navLinks.length);
    console.log('Found sections:', sections.length);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Clicked nav link:', this.getAttribute('data-section'));
            
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link with smooth transition
            updateActiveNavLink(this, navLinks);
            
            // Switch sections with fade effect 
            switchSection(targetSection, sections);
            
            // Update page title and URL
            updatePageContext(targetSection);
            
            // Scroll to top smoothly
            smoothScrollToTop();
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });

    // Add scroll effect to navbar
    setupNavbarScrollEffect(navbar);
}

function updateActiveNavLink(activeLink, allLinks) {
    allLinks.forEach(link => {
        link.classList.remove('active');
        link.style.transform = '';
    });
    
    activeLink.classList.add('active');
    
    //  hover effect
    setTimeout(() => {
        activeLink.style.transform = 'translateY(-2px)';
        setTimeout(() => {
            activeLink.style.transform = '';
        }, 300);
    }, 100);
}

//Section Switching
function switchSection(targetSectionId, sections) {
    console.log('Switching to section:', targetSectionId);
    
    // Hide all sections immediately
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
        console.log('Found target section:', targetSectionId);
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Initialize section-specific features
        setTimeout(() => {
            initializeSectionFeatures(targetSectionId);
            animateProgressRings(targetSection);
        }, 100);
    } else {
        console.error('Target section not found:', targetSectionId);
    }
}

function updatePageContext(sectionId) {
    const titles = {
        'fullstack': 'Full Stack Development Excellence - Jasina K.C.',
        'html': 'HTML5 Semantic Excellence - Jasina K.C.',
        'css': 'CSS3 Advanced Styling - Jasina K.C.',
        'bootstrap': 'Bootstrap Framework Mastery - Jasina K.C.',
        'javascript': 'JavaScript Interactive Excellence - Jasina K.C.'
    };
    
    document.title = titles[sectionId] || 'Jasina K.C. - Full Stack Developer Portfolio';
    
    // Update meta description dynamically
    updateMetaDescription(sectionId);
}

function updateMetaDescription(sectionId) {
    const descriptions = {
        'fullstack': 'Comprehensive full-stack development skills with modern technologies and frameworks.',
        'html': 'Semantic HTML5 mastery with accessibility and modern web standards.',
        'css': 'Advanced CSS3 techniques including animations, responsive design, and modern layouts.',
        'bootstrap': 'Bootstrap framework expertise with responsive components and custom themes.',
        'javascript': 'Modern JavaScript development with ES6+, DOM manipulation, and API integration.'
    };
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = descriptions[sectionId] || 'Professional full-stack developer portfolio showcasing modern web development skills.';
}

function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function closeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
}

function setupNavbarScrollEffect(navbar) {
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 188, 212, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.25)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 188, 212, 0.15)';
        }
        
        //  This code below Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Progress Ring Animations
function initializeProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring');
    
    progressRings.forEach(ring => {
        const progress = parseInt(ring.getAttribute('data-progress'));
        const circle = ring.querySelector('circle:last-child');
        if (circle) {
            const radius = 54;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progress / 100) * circumference;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference; // Start hidden
            
            // This is for Storing the target offset for animation
            ring.setAttribute('data-target-offset', offset);
        }
    });
}

function animateProgressRings(container) {
    const progressRings = container.querySelectorAll('.progress-ring');
    
    progressRings.forEach((ring, index) => {
        const circle = ring.querySelector('circle:last-child');
        const targetOffset = ring.getAttribute('data-target-offset');
        
        if (circle && targetOffset) {
            setTimeout(() => {
                circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
                circle.style.strokeDashoffset = targetOffset;
            }, index * 200);
        }
    });
}

// Section-Specific Features
function initializeSectionFeatures(sectionId) {
    console.log('Initializing features for section:', sectionId);
    
    switch(sectionId) {
        case 'fullstack':
            initializeTechOrbit();
            break;
        case 'html':
            initializeHTMLDemos();
            break;
        case 'css':
            initializeCSSAnimations();
            break;
        case 'bootstrap':
            initializeBootstrapComponents();
            break;
        case 'javascript':
            initializeJavaScriptDemos();
            break;
    }
}

// Tech Orbit Animation
function initializeTechOrbit() {
    const techPlanets = document.querySelectorAll('.tech-planet');
    
    techPlanets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform += ' scale(1.2)';
            
            // Show tooltip
            showTechTooltip(this);
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            
            // Hide tooltip
            hideTechTooltip();
        });
    });
}

function showTechTooltip(element) {
    const techType = element.getAttribute('data-tech');
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = techType;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

function hideTechTooltip() {
    const tooltip = document.querySelector('.tech-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
}

// HTML Section Demos
function initializeHTMLDemos() {
    console.log('Initializing HTML demos');
    const htmlForm = document.getElementById('html-demo-form');
    if (htmlForm) {
        setupFormValidation(htmlForm);
        setupFormSubmission(htmlForm);
    }
}

function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
        input.addEventListener('focus', focusField);
    });
}

function validateField() {
    const feedback = this.nextElementSibling;
    
    if (!this.value.trim()) {
        this.classList.add('error');
        this.classList.remove('success');
        if (feedback && feedback.classList.contains('form-feedback')) {
            feedback.textContent = 'This field is required';
            feedback.style.color = '#dc2626';
        }
        return false;
    } else if (this.type === 'email' && !isValidEmail(this.value)) {
        this.classList.add('error');
        this.classList.remove('success');
        if (feedback && feedback.classList.contains('form-feedback')) {
            feedback.textContent = 'Please enter a valid email address';
            feedback.style.color = '#dc2626';
        }
        return false;
    } else {
        this.classList.remove('error');
        this.classList.add('success');
        if (feedback && feedback.classList.contains('form-feedback')) {
            feedback.textContent = 'Looks good!';
            feedback.style.color = '#0097A7';
        }
        return true;
    }
}

function clearFieldError() {
    if (this.classList.contains('error') && this.value.trim()) {
        this.classList.remove('error');
        const feedback = this.nextElementSibling;
        if (feedback && feedback.classList.contains('form-feedback')) {
            feedback.textContent = '';
        }
    }
}

function focusField() {
    this.style.transform = 'scale(1.02)';
    setTimeout(() => {
        this.style.transform = '';
    }, 300);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setupFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        const submitBtn = this.querySelector('.btn-premium');
        const resultDiv = document.getElementById('form-result');
        
        // Validate all fields
        const inputs = this.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField.call(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showFormResult(resultDiv, 'error', 'Please fix the errors above before submitting.');
            return;
        }
        
        // Show loading state
        showButtonLoading(submitBtn);
        
        // Simulate form submission
        setTimeout(() => {
            hideButtonLoading(submitBtn);
            showFormResult(resultDiv, 'success', `Thank you, ${name}! Your message has been submitted successfully.`);
            
            // Reset form after success
            setTimeout(() => {
                this.reset();
                clearAllFieldStates(this);
                hideFormResult(resultDiv);
            }, 3000);
        }, 2000);
    });
}

function showFormResult(resultDiv, type, message) {
    if (!resultDiv) return;
    
    resultDiv.className = `form-result ${type}`;
    resultDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
    `;
    resultDiv.style.display = 'block';
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.opacity = '1';
    }, 10);
}

function hideFormResult(resultDiv) {
    if (!resultDiv) return;
    
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 300);
}

function clearAllFieldStates(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('success', 'error');
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('form-feedback')) {
            feedback.textContent = '';
        }
    });
}

// CSS Section Animations
function initializeCSSAnimations() {
    console.log('Initializing CSS animations');
    setupGridItemHovers();
    setupAnimationShowcase();
    setupFeatureDemos();
}

function setupGridItemHovers() {
    const gridItems = document.querySelectorAll('.css-grid-demo .grid-item');
    const colors = ['#00BCD4', '#26C6DA', '#0097A7', '#00ACC1'];
    
    gridItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.background = colors[index % colors.length];
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = '';
        });
        
        item.addEventListener('click', function() {
            this.style.background = colors[(index + 1) % colors.length];
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            }, 200);
        });
    });
}

function setupAnimationShowcase() {
    const animatedElements = document.querySelectorAll('.animated-element');
    
    animatedElements.forEach(element => {
        element.addEventListener('click', function() {
            const animation = this.getAttribute('data-animation');
            this.style.animationName = 'none';
            
            setTimeout(() => {
                this.style.animationName = animation;
            }, 10);
            
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function setupFeatureDemos() {
    const featureDemos = document.querySelectorAll('.css-features .feature-demo');
    
    featureDemos.forEach(demo => {
        demo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        demo.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Bootstrap Components
function initializeBootstrapComponents() {
    console.log('Initializing Bootstrap components');
    setupBootstrapDemos();
    setupUtilityDemos();
}

function setupBootstrapDemos() {
    const gridCols = document.querySelectorAll('.bootstrap-grid-demo .grid-col');
    
    gridCols.forEach((col, index) => {
        col.addEventListener('click', function() {
            this.style.background = index % 2 === 0 ? '#0097A7' : '#26C6DA';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
            }, 1000);
        });
    });
}

function setupUtilityDemos() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// This section us for JavaScript Demos
function initializeJavaScriptDemos() {
    console.log('Initializing JavaScript demos');
    setupDOMManipulation();
    setupEventHandling();
    setupCalculator();
    setupAdvancedFeatures();
}

function setupDOMManipulation() {
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                updateText();
            }
        });
        
        textInput.addEventListener('input', function() {
            const output = document.getElementById('dynamicText');
            if (output) {
                if (this.value.trim()) {
                    output.style.borderColor = '#00BCD4';
                    output.style.background = 'rgba(0, 188, 212, 0.05)';
                } else {
                    output.style.borderColor = '#e5e5e5';
                    output.style.background = 'white';
                }
            }
        });
    }
}

function setupEventHandling() {
    let clickCount = 0;
    const counterBtn = document.getElementById('counterBtn');
    const clickCounter = document.getElementById('clickCounter');
    
    if (counterBtn && clickCounter) {
        counterBtn.addEventListener('click', function() {
            clickCount++;
            
            // This Updates counter display
            const counterNumber = clickCounter.querySelector('.counter-number');
            if (counterNumber) {
                counterNumber.textContent = clickCount;
                
                //Following code adds animation 
                counterNumber.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    counterNumber.style.transform = '';
                }, 200);
            }
            
            // Button feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            //It Changes button style based on clicks
            const colors = ['btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-primary'];
            const messages = ['Great!', 'Awesome!', 'Keep going!', 'Amazing!', 'Fantastic!'];
            
            const colorClass = colors[clickCount % colors.length];
            const message = messages[clickCount % messages.length];
            
            this.className = `btn ${colorClass} btn-lg mt-3`;
            
            const originalText = this.innerHTML;
            this.innerHTML = `<i class="fas fa-star me-2"></i>${message}`;
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    }
}

function setupCalculator() {
    const calcInputs = document.querySelectorAll('#num1, #num2');
    
    calcInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                this.style.borderColor = this.value ? '#00BCD4' : '';
            });
            
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculate('+'); // Default operation
                }
            });
        }
    });
}

function setupAdvancedFeatures() {
    // These will be called directly from HTML onclick handlers
}

// Global Functions (called from HTML)
function updateText() {
    const input = document.getElementById('textInput');
    const output = document.getElementById('dynamicText');
    
    if (input && output) {
        const text = input.value.trim();
        
        if (text) {
            output.classList.add('updated');
            output.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fas fa-magic me-2 text-primary"></i>
                    <strong>Dynamic Content:</strong> ${text}
                </div>
            `;
            
            //This adds animation
            output.style.transform = 'scale(1.02)';
            setTimeout(() => {
                output.style.transform = '';
            }, 300);
            
            input.value = '';
            input.focus();
            
        } else {
            showTemporaryMessage(output, 'warning', 'Please enter some text first!');
        }
    }
}

function fetchData() {
    const resultDiv = document.getElementById('apiResult');
    const btn = event.target;
    
    if (resultDiv) {
        // Show loading state
        showButtonLoading(btn);
        resultDiv.innerHTML = `
            <div class="d-flex align-items-center justify-content-center">
                <div class="spinner-border spinner-border-sm me-2 text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span>Fetching data...</span>
            </div>
        `;
        
        // Simulate API call
        setTimeout(() => {
            hideButtonLoading(btn);
            
            const mockData = {
                id: Math.floor(Math.random() * 1000),
                name: 'Sample User',
                email: 'user@example.com',
                phone: '+1 (555) 123-4567',
                timestamp: new Date().toLocaleString(),
                status: 'active',
                data: {
                    skills: ['JavaScript', 'React', 'Node.js'],
                    experience: '5+ years'
                }
            };
            
            resultDiv.innerHTML = `
                <div class="alert alert-success border-0 shadow-sm">
                    <div class="d-flex align-items-center mb-2">
                        <i class="fas fa-check-circle text-success me-2"></i>
                        <strong>API Response Received</strong>
                    </div>
                    <pre class="mb-0 small text-dark"><code>${JSON.stringify(mockData, null, 2)}</code></pre>
                </div>
            `;
            
            // This adds animations on entrance 
            resultDiv.style.opacity = '0';
            resultDiv.style.transform = 'translateY(10px)';
            setTimeout(() => {
                resultDiv.style.transition = 'all 0.3s ease';
                resultDiv.style.opacity = '1';
                resultDiv.style.transform = 'translateY(0)';
            }, 10);
            
        }, 1500);
    }
}

function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1')?.value);
    const num2 = parseFloat(document.getElementById('num2')?.value);
    const resultDiv = document.getElementById('calcResult');
    
    if (!resultDiv) return;
    
    if (isNaN(num1) || isNaN(num2)) {
        showCalculatorResult(resultDiv, 'warning', 'Please enter valid numbers in both fields');
        return;
    }
    
    let result;
    let operatorSymbol;
    let operatorClass = 'success';
    
    try {
        switch(operation) {
            case '+':
                result = num1 + num2;
                operatorSymbol = '+';
                break;
            case '-':
                result = num1 - num2;
                operatorSymbol = '-';
                break;
            case '*':
                result = num1 * num2;
                operatorSymbol = '×';
                break;
            case '/':
                if (num2 === 0) {
                    showCalculatorResult(resultDiv, 'error', 'Cannot divide by zero!');
                    return;
                }
                result = num1 / num2;
                operatorSymbol = '÷';
                break;
            default:
                showCalculatorResult(resultDiv, 'error', 'Invalid operation');
                return;
        }
        
        // Format result
        const formattedResult = Number.isInteger(result) ? result : result.toFixed(4);
        
        showCalculatorResult(resultDiv, operatorClass, 
            `${num1} ${operatorSymbol} ${num2} = <strong>${formattedResult}</strong>`
        );
        
    } catch (error) {
        showCalculatorResult(resultDiv, 'error', 'Calculation error occurred');
    }
}

function showCalculatorResult(resultDiv, type, message) {
    const alertClass = type === 'success' ? 'alert-success' : 
                     type === 'warning' ? 'alert-warning' : 'alert-danger';
    const iconClass = type === 'success' ? 'fa-check-circle' : 
                     type === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle';
    
    resultDiv.innerHTML = `
        <div class="alert ${alertClass} border-0 shadow-sm">
            <i class="fas ${iconClass} me-2"></i>
            ${message}
        </div>
    `;
    
    // Animation
    resultDiv.style.opacity = '0';
    resultDiv.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resultDiv.style.transition = 'all 0.3s ease';
        resultDiv.style.opacity = '1';
        resultDiv.style.transform = 'scale(1)';
    }, 10);
}

// Advanced JavaScript Demos
async function demonstrateAsync() {
    const resultDiv = document.getElementById('asyncResult');
    const btn = event.target;
    
    if (!resultDiv) return;
    
    showButtonLoading(btn);
    
    try {
        resultDiv.innerHTML = `
            <div class="text-info">
                <i class="fas fa-clock me-2"></i>
                Processing async operation...
            </div>
        `;
        
        // Simulate async operations
        await delay(1000);
        const data1 = await fetchAsyncData('Dataset 1');
        
        await delay(500);
        const data2 = await fetchAsyncData('Dataset 2');
        
        await delay(300);
        const combined = await combineData(data1, data2);
        
        resultDiv.innerHTML = `
            <div class="alert alert-info border-0">
                <h6><i class="fas fa-code me-2"></i>Async/Await Demo Complete</h6>
                <p class="mb-0">Successfully processed: ${combined.description}</p>
                <small class="text-muted">Total processing time: ~1.8 seconds</small>
            </div>
        `;
        
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="alert alert-danger border-0">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error: ${error.message}
            </div>
        `;
    } finally {
        hideButtonLoading(btn);
    }
}

function demonstrateES6() {
    const resultDiv = document.getElementById('es6Result');
    
    if (!resultDiv) return;
    
    try {
        // ES6+ Features Demo
        const technologies = ['JavaScript', 'React', 'Node.js', 'MongoDB'];
        
        // Destructuring
        const [primary, ...others] = technologies;
        
        // Template literals
        const message = `Primary: ${primary}, Others: ${others.join(', ')}`;
        
        // Arrow functions and array methods
        const processedTech = technologies
            .map(tech => ({ name: tech, length: tech.length }))
            .filter(item => item.length > 4)
            .sort((a, b) => b.length - a.length);
        
        // Promises
        const promise = new Promise(resolve => {
            setTimeout(() => resolve('ES6+ features demonstrated!'), 500);
        });
        
        promise.then(result => {
            resultDiv.innerHTML = `
                <div class="alert alert-success border-0">
                    <h6><i class="fab fa-js-square me-2"></i>ES6+ Features Demo</h6>
                    <p><strong>Destructuring:</strong> ${message}</p>
                    <p><strong>Array Methods:</strong> ${processedTech.map(t => t.name).join(', ')}</p>
                    <p><strong>Promise Result:</strong> ${result}</p>
                </div>
            `;
        });
        
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="alert alert-danger border-0">
                <i class="fas fa-bug me-2"></i>
                Error: ${error.message}
            </div>
        `;
    }
}

function saveData() {
    const input = document.getElementById('storageInput');
    const resultDiv = document.getElementById('storageResult');
    
    if (!input || !resultDiv) return;
    
    const data = input.value.trim();
    
    if (!data) {
        showTemporaryMessage(resultDiv, 'warning', 'Please enter some data to save');
        return;
    }
    
    try {
        // Use global variable as fallback since localStorage might not be available
        window.portfolioStorageData = data;
        showTemporaryMessage(resultDiv, 'success', `Data saved: "${data}"`);
        input.value = '';
        
    } catch (error) {
        window.portfolioStorageData = data;
        showTemporaryMessage(resultDiv, 'success', `Data saved to memory: "${data}"`);
        input.value = '';
    }
}

function loadData() {
    const resultDiv = document.getElementById('storageResult');
    
    if (!resultDiv) return;
    
    try {
        const data = window.portfolioStorageData;
        
        if (data) {
            showTemporaryMessage(resultDiv, 'info', `Loaded data: "${data}"`);
        } else {
            showTemporaryMessage(resultDiv, 'warning', 'No data found. Save some data first!');
        }
        
    } catch (error) {
        showTemporaryMessage(resultDiv, 'warning', 'No data found in memory');
    }
}

// PDF Viewing Function
function viewPDF() {
    const pdfUrl = '2025-CET138-Full-Stack-Development-Assignment-1-Student.pdf';
    
    // Create loading indicator
    createToast('info', 'Opening PDF document...', 2000);
    
    try {
        // Open PDF in new tab
        const newWindow = window.open(pdfUrl, '_blank');
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // If popup blocked, show fallback
            createToast('warning', 'Please allow popups to view the PDF, or the PDF file may not be available.', 4000);
        } else {
            // Success
            setTimeout(() => {
                createToast('success', 'PDF opened successfully!', 2000);
            }, 500);
        }
    } catch (error) {
        createToast('error', 'Unable to open PDF. Please try again later.', 3000);
    }
}

// Utility Functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAsyncData(name) {
    await delay(Math.random() * 500 + 200);
    return {
        name,
        timestamp: new Date().toISOString(),
        data: Math.floor(Math.random() * 1000)
    };
}

async function combineData(data1, data2) {
    await delay(100);
    return {
        description: `${data1.name} + ${data2.name}`,
        combined: data1.data + data2.data,
        timestamp: new Date().toISOString()
    };
}

function showButtonLoading(button) {
    if (!button) return;
    
    button.classList.add('loading');
    button.disabled = true;
    
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
}

function hideButtonLoading(button) {
    if (!button) return;
    
    button.classList.remove('loading');
    button.disabled = false;
    
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
        button.innerHTML = originalText;
    }
}

function showTemporaryMessage(container, type, message, duration = 3000) {
    if (!container) return;
    
    const alertClass = type === 'success' ? 'alert-success' : 
                     type === 'warning' ? 'alert-warning' : 
                     type === 'info' ? 'alert-info' : 'alert-danger';
    const iconClass = type === 'success' ? 'fa-check-circle' : 
                     type === 'warning' ? 'fa-exclamation-triangle' : 
                     type === 'info' ? 'fa-info-circle' : 'fa-times-circle';
    
    container.innerHTML = `
        <div class="alert ${alertClass} border-0 shadow-sm">
            <i class="fas ${iconClass} me-2"></i>
            ${message}
        </div>
    `;
    
    // Animation
    container.style.opacity = '0';
    container.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        container.style.transition = 'all 0.3s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-hide
    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => {
            container.innerHTML = '';
            container.style.opacity = '1';
        }, 300);
    }, duration);
}

function createToast(type, message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'warning' ? 'exclamation-triangle' : 
                              type === 'info' ? 'info-circle' : 'times-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : 
                    type === 'warning' ? '#f59e0b' : 
                    type === 'info' ? '#3b82f6' : '#ef4444'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto-remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
    
    return toast;
}

// Accessibility and Keyboard Navigation
function initializeAccessibility() {
    setupKeyboardNavigation();
    setupFocusManagement();
    setupScreenReaderSupport();
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navigate sections with arrow keys (when not in input)
        if (!e.target.matches('input, textarea, select, [contenteditable]')) {
            const sections = ['fullstack', 'html', 'css', 'bootstrap', 'javascript'];
            const currentSection = document.querySelector('.section.active')?.id;
            const currentIndex = sections.indexOf(currentSection);
            
            if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
                e.preventDefault();
                document.querySelector(`[data-section="${sections[currentIndex + 1]}"]`)?.click();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                document.querySelector(`[data-section="${sections[currentIndex - 1]}"]`)?.click();
            }
        }
        
        // Escape key to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const closeBtn = openModal.querySelector('.btn-close');
                if (closeBtn) closeBtn.click();
            }
        }
    });
}

function setupFocusManagement() {
    // Ensure sections are focusable for keyboard navigation
    document.querySelectorAll('.section').forEach(section => {
        section.setAttribute('tabindex', '-1');
    });
    
    // Focus management for modal
    const modal = document.getElementById('bootstrapModal');
    if (modal) {
        modal.addEventListener('shown.bs.modal', function() {
            const title = this.querySelector('.modal-title');
            if (title) title.focus();
        });
    }
}

function setupScreenReaderSupport() {
    // Add ARIA labels for better screen reader support
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        link.setAttribute('aria-label', `Navigate to ${section} section`);
    });
    
    // Add live region for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
}

function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
                    console.log(`Portfolio loaded in ${loadTime}ms`);
                }
            }, 0);
        });
    }
}

// Smooth Transitions and Mobile Optimizations
function setupSmoothTransitions() {
    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('button, .card, .nav-link, .form-control');
    
    interactiveElements.forEach(element => {
        if (element.style) {
            element.style.transition = 'all 0.3s ease';
        }
    });
}

function setupMobileOptimizations() {
    // Touch optimizations for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback
        const touchElements = document.querySelectorAll('.btn, .card, .nav-link');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
}

// Entrance Animations
function triggerEntranceAnimations() {
    const animatedElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .tech-visualization');
    
    animatedElements.forEach((element, index) => {
        if (element.style) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Initialize Interactive Elements
function initializeInteractiveElements() {
    // Add ripple effect to buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-premium, .btn-pdf') || e.target.closest('.btn-premium, .btn-pdf')) {
            const button = e.target.matches('.btn-premium, .btn-pdf') ? e.target : e.target.closest('.btn-premium, .btn-pdf');
            createRipple(e, button);
        }
    });
    
    // Initialize card hover effects
    const cards = document.querySelectorAll('.premium-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function createRipple(event, element) {
    if (!element || !element.style) return;
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation and touch feedback
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .touch-active {
        transform: scale(0.98) !important;
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
`;

document.head.appendChild(additionalStyles);

// This part is for Error Handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    createToast('error', 'An error occurred. Please refresh the page if problems persist.', 5000);
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

console.log('Portfolio JavaScript loaded successfully');

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateText,
        fetchData,
        calculate,
        demonstrateAsync,
        demonstrateES6,
        saveData,
        loadData,
        viewPDF
    };
}