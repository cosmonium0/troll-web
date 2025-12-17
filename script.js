function getIPandCoordinates() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            fetch(`https://ipapi.co/${ip}/json/`)
                .then(response => response.json())
                .then(data => {
                    const coordinates = `${data.latitude}, ${data.longitude}`;
                    const fullText = `Your IP: ${ip}\nCoordinates: ${coordinates}`;
                    displayText(fullText);
                })
                .catch(error => {
                    // Fallback if ipapi fails
                    
                displayText(`BOOM! ${ip}\nCoordinates: [Unavailable]`);
                });
        })
        .catch(error => {
            // Fallback if ipify fails
            displayText("Could not retrieve IP address.");
        });
}

function displayText(text) {
    const typewriterElement = document.querySelector('.typewriter h1');
    
    // Set the full text content immediately so we can measure its width
    typewriterElement.innerHTML = text.replace(/\n/g, '<br>'); // Replace newlines with <br>
    
    // Calculate the duration needed to type the text
    const typingSpeed = 50; // milliseconds per character
    const duration = text.length * typingSpeed;
    
    // Animate the width from 0 to 100% over the calculated duration
    typewriterElement.style.transition = `width ${duration}ms steps(${text.length}, end)`;
    
    // Force a reflow before starting the animation
    void typewriterElement.offsetWidth;
    
    // Start the animation by setting the width to 100%
    typewriterElement.style.width = '100%';
}

// Start the process when the page loads
getIPandCoordinates();
