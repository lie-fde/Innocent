// Ensure that only one audio plays at a time
let currentAudio = null;

// Handle button click, keypress, and touchstart events
function handleEvent(event) {
    let letters;

    // Determine the key or letter based on the event
    if (event.type === "click" || event.type === "touchstart") {
        letters = this.innerHTML.trim(); // Use .trim() to remove any extra whitespace
        event.preventDefault(); // Prevent default touch behavior
    } else if (event.type === "keydown") {
        letters = event.key.toLowerCase(); // Ensure lowercase to match button classes
    }

    if (letters) {
        if (currentAudio && !currentAudio.paused) {
            // Stop the currently playing audio if the same button is clicked again
            if (currentAudio.letters === letters) {
                currentAudio.pause();
                currentAudio.currentTime = 0; // Reset audio to the beginning
                currentAudio = null;
            } else {
                // Otherwise, do nothing until the current audio finishes
                return;
            }
        } else {
            playSound(letters);
            buttonAnimation(letters);
        }
    }
}

// Play the sound based on the letter
function playSound(letters) {
    let audio;

    switch (letters) {
        case "w":
            audio = new Audio('sounds/1.mp3');
            break;
        case "a":
            audio = new Audio('sounds/2.mp3');
            break;
        case "s":
            audio = new Audio('sounds/3.mp3');
            break;
        case "d":
            audio = new Audio('sounds/4.mp3');
            break;
        case "j":
            audio = new Audio('sounds/5.mp3');
            break;
        case "k":
            audio = new Audio('sounds/6.mp3');
            break;
        case "l":
            audio = new Audio('sounds/7.mp3');
            break;
        default:
            return;
    }

    // Save the current audio object and the associated letter
    currentAudio = audio;
    currentAudio.letters = letters;

    audio.play();
    audio.onended = function() {
        currentAudio = null; // Reset the audio when it finishes playing
    };
}

// Handle the button animation
function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
        activeButton.classList.add("pressed");

        // Add audio playing animation inside the button
        var playAnimation = document.createElement("div");
        playAnimation.className = "play-animation";
        activeButton.appendChild(playAnimation);

        setTimeout(function() {
            activeButton.classList.remove("pressed");
            if (activeButton.contains(playAnimation)) {
                activeButton.removeChild(playAnimation);
            }
        }, 100); // Animation duration matches the "pressed" state
    }
}

// Add event listeners for click, touch, and keypress
document.querySelectorAll(".buttons").forEach(button => {
    button.addEventListener("click", handleEvent);
    button.addEventListener("touchstart", handleEvent);
});

document.addEventListener("keydown", handleEvent);
