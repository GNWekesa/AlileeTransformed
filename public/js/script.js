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
