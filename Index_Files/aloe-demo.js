/**
 * ALOE Demo Mode
 * This script makes the page behave like a standalone demo by:
 * - Removing cookie/GDPR banners
 * - Preventing navigation away from the page
 * - Adding a demo mode indicator
 */

document.addEventListener('DOMContentLoaded', function() {
    // Remove cookie bar
    const cookieBar = document.getElementById('cookie-bar');
    if (cookieBar) {
        cookieBar.style.display = 'none';
    }

    // Create demo mode indicator
    const demoIndicator = document.createElement('div');
    demoIndicator.style.position = 'fixed';
    demoIndicator.style.bottom = '20px';
    demoIndicator.style.right = '20px';
    demoIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    demoIndicator.style.color = 'white';
    demoIndicator.style.padding = '10px 15px';
    demoIndicator.style.borderRadius = '5px';
    demoIndicator.style.zIndex = '9999';
    demoIndicator.style.fontSize = '14px';
    demoIndicator.style.fontWeight = 'bold';
    demoIndicator.textContent = 'ALOE DEMO MODE';
    document.body.appendChild(demoIndicator);

    // Intercept all link clicks
    document.addEventListener('click', function(e) {
        // Find closest anchor tag
        let target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }

        // If it's a link, prevent navigation
        if (target && target.tagName === 'A') {
            // Check if it's an external link or has target="_blank"
            if (target.getAttribute('target') === '_blank' || 
                (target.getAttribute('href') && 
                 (target.getAttribute('href').startsWith('http') || 
                  target.getAttribute('href').startsWith('//')))) {
                
                e.preventDefault();
                e.stopPropagation();
                
                // Show notification
                showNotification('Navigation disabled in demo mode');
                
                return false;
            }
            
            // Check if it's an anchor link
            if (target.classList.contains('js-anchor-link') || 
                (target.getAttribute('href') && target.getAttribute('href').startsWith('#'))) {
                
                e.preventDefault();
                e.stopPropagation();
                
                // Show notification
                showNotification('Navigation disabled in demo mode');
                
                return false;
            }
        }
    }, true);

    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '10000';
        notification.style.fontSize = '16px';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            
            // Remove from DOM after fade out
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
});
