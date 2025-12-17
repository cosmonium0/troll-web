function getIPandCoordinates() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            fetch(`https://ipapi.co/${ip}/json/`)
                .then(response => response.json())
                .then(data => {
                    const coordinates = `${data.latitude}, ${data.longitude}`;
                    displayText(`Crucified!! ${ip}\nCoordinates: ${coordinates}`);
                });
        });
}

function displayText(text) {
    const typewriter = document.querySelector('.typewriter h1');
    let index = 0;
    typewriter.innerHTML = '';

    function type() {
        if (index < text.length) {
            typewriter.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}

getIPandCoordinates();
