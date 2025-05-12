//why this
//my app.js is server-side — it cannot run browser-side animations like typing text.
// public/script.js
window.addEventListener('DOMContentLoaded', () => {
    const typingTextElement = document.getElementById("typing-text");
  
    if (!typingTextElement) {
      console.error("❌ Cannot find #typing-text element!");
      return;
    }
  
    const text = "Cultural/Modest/Religious elegance that meets modern convenience";
    let index = 0;
  
    function typeWriter() {
      if (index < text.length) {
        typingTextElement.textContent += text.charAt(index); // textContent is safer than innerHTML
        index++;
        setTimeout(typeWriter, 150);
      }
    }
  
    typeWriter();
  });
  

  // block below for creating a POST route that listens for form 
// submissions and sends an email using Nodemailer.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const messageDiv = document.getElementById("formMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop default form submission

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      messageDiv.textContent = result.message;
      messageDiv.style.color = "green";
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      messageDiv.textContent = "Something went wrong. Please try again.";
      messageDiv.style.color = "red";
    }
  });
});


// After navbar loads, initialize smooth scroll
document.addEventListener('DOMContentLoaded', function() {
  // Handle all navigation links
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Handle internal page anchors
      if (href.startsWith('/#')) {
        e.preventDefault();
        const sectionId = href.split('#')[1];
        window.location.href = `/#${sectionId}`;
      }
      
      // Handle same-page anchors
      else if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Handle page load with anchor
  if(window.location.hash) {
    document.querySelector(window.location.hash).scrollIntoView({ behavior: 'smooth' });
  }
});




// Show the scroll-up button when scrolled down
document.addEventListener('DOMContentLoaded', function() {
  const scrollUpButton = document.getElementById("scroll-up");
  
  // Show/hide scroll button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      scrollUpButton.classList.add('show');
    } else {
      scrollUpButton.classList.remove('show');
    }
  });

  // Scroll to top
  scrollUpButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});