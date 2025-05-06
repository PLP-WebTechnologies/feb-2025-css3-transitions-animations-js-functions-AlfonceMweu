document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const animationToggle = document.getElementById('animationToggle');
    const themeToggle = document.getElementById('themeToggle');
    const actionButton = document.getElementById('actionButton');
    const animatedBox = document.getElementById('animatedBox');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    // Load preferences from localStorage
    function loadPreferences() {
        const animationsEnabled = localStorage.getItem('animationsEnabled') === 'true';
        const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
        
        animationToggle.checked = animationsEnabled;
        themeToggle.checked = darkModeEnabled;
        
        // Apply preferences
        toggleAnimations(animationsEnabled);
        toggleDarkMode(darkModeEnabled);
    }
    
    // Toggle animations
    function toggleAnimations(enabled) {
        if (enabled) {
            document.body.classList.add('animations-enabled');
        } else {
            document.body.classList.remove('animations-enabled');
        }
    }
    
    // Toggle dark mode
    function toggleDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Save preferences to localStorage
    function savePreferences() {
        localStorage.setItem('animationsEnabled', animationToggle.checked);
        localStorage.setItem('darkModeEnabled', themeToggle.checked);
    }
    
    // Animate box with random animation
    function animateBox() {
        if (!animationToggle.checked) return;
        
        // Remove any existing animation classes
        animatedBox.classList.remove('animate', 'bounce', 'pulse');
        
        // Trigger reflow
        void animatedBox.offsetWidth;
        
        // Add base animation class
        animatedBox.classList.add('animate');
        
        // After the fadeInUp animation completes, add a random secondary animation
        setTimeout(() => {
            const animations = ['bounce', 'pulse'];
            const randomAnim = animations[Math.floor(Math.random() * animations.length)];
            animatedBox.classList.add(randomAnim);
        }, 800);
    }
    
    // Add image click animation
    function setupImageAnimations() {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                if (!animationToggle.checked) return;
                
                this.classList.add('pulse');
                
                // Remove the class after animation completes
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 1500);
            });
        });
    }
    
    // Event listeners
    animationToggle.addEventListener('change', function() {
        toggleAnimations(this.checked);
        savePreferences();
    });
    
    themeToggle.addEventListener('change', function() {
        toggleDarkMode(this.checked);
        savePreferences();
    });
    
    actionButton.addEventListener('click', function() {
        animateBox();
        
        // Add ripple effect
        this.classList.add('active');
        setTimeout(() => {
            this.classList.remove('active');
        }, 600);
    });
    
    // Initialize
    loadPreferences();
    setupImageAnimations();
    
    // Animate box on page load if animations are enabled
    if (animationToggle.checked) {
        setTimeout(animateBox, 500);
    }
});