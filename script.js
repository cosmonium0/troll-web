// Function to handle music playback
function setupMusic() {
    const audio = document.getElementById('bg-music');
    document.body.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        }
    }, { once: true });
}

function getIPandCoordinates() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            fetch(`https://ipapi.co/${ip}/json/`)
                .then(response => response.json())
                .then(data => {
                    const coordinates = `${data.latitude}, ${data.longitude}`;
                    const fullText = `IP: ${ip}\nCoordinates: ${coordinates}`;
                    displayText(fullText);
                })
                .catch(error => {
                    displayText(`Your IP: ${ip}\nCoordinates: [Unavailable]`);
                });
        })
        .catch(error => {
            displayText("Could not retrieve IP address.");
        });
}

function displayText(text) {
    const typewriterElement = document.querySelector('.typewriter h1');
    typewriterElement.innerHTML = text.replace(/\n/g, '<br>');
    const typingSpeed = 50;
    const duration = text.length * typingSpeed;
    typewriterElement.style.transition = `width ${duration}ms steps(${text.length}, end)`;
    void typewriterElement.offsetWidth;
    typewriterElement.style.width = '100%';
}


window.onload = function() {
    getIPandCoordinates();
    setupMusic();

};
