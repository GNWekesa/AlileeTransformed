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
  