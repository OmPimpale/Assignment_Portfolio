// ==== navbar code ====
let hasAnimated = false;
const navbar = document.getElementById("nav");
const stickyOffset = navbar.offsetTop;

window.addEventListener("scroll", debounce(() => {
    if (window.scrollY > stickyOffset) {
        navbar.classList.add("sticky");

        if (!hasAnimated) {
            navbar.classList.add("sticky-animate");
            hasAnimated = true;
        }
    } else {
        navbar.classList.remove("sticky", "sticky-animate");
        hasAnimated = false;
    }
}, 100));

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}


// ==== email integration code with improved validation ====
// Function to send an email using EmailJS
let sendMail = () => {
    // Collect form input values
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        num: document.getElementById("mobno").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("msg").value
    };

    // Email validation pattern
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Number validation pattern (10 digits)
    let numberPattern = /^[0-9]{10}$/;

    // Check if any input field is empty
    if (parms.name === "" || parms.email === "" || parms.num === "" || parms.subject === "" || parms.message === "") {
        alert("Fill in all required fields correctly.");
        return false; // Prevent sending if any field is empty
    }

    // Validate email format
    if (!emailPattern.test(parms.email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate mobile number format
    if (!numberPattern.test(parms.num)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
    }

    // Send email using EmailJS service
    emailjs.send("service_6sojt7z", "template_pjfu4xf", parms)
        .then(() => {
            alert("Email Sent Successfully!!"); // Show success message after email is sent
        })
        .catch((error) => {
            console.error('Email sending failed:', error); // Log any error
            alert("Failed to send email. Please try again.");
        });
}

// Event listener for form submission
window.onload = function () {
    document.getElementById('contactform').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        sendMail(); // Call sendMail function on form submit
    });
}


// ==== date nad time
function displayDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("datetime").textContent = dateTimeString;
}

// Update the date and time every second
setInterval(displayDateTime, 1000);

// Display immediately on page load
displayDateTime();