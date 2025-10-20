
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('header');
  

    const clearActive = () => navLinks.forEach(l => l.classList.remove('active'));
  
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -45% 0px', 
      threshold: 0
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          clearActive();
          const link = document.querySelector(`header nav a[href="#${id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, observerOptions);
  
    sections.forEach(section => observer.observe(section));
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          clearActive();
          link.classList.add('active');
        
        }
      
      });
    });
  
    
  });
  
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
  
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: 'application/json' }
        });
  
        if (response.ok) {
          status.textContent = "✅ Thank you! Your message has been sent.";
          status.style.color = "lightgreen";
        } else {
          status.textContent = "❌ Something went wrong. Please try again.";
          status.style.color = "red";
        }
  
        
        status.classList.remove('show');       
        void status.offsetWidth;               
        status.classList.add('show');
  
        form.reset();
  
      } catch (error) {
        status.textContent = "⚠️ Network error. Please try again later.";
        status.style.color = "orange";
        status.classList.remove('show');       
        void status.offsetWidth;               
        status.classList.add('show');
      }
    });
  }

  const workCards = document.querySelectorAll('.work-card');

workCards.forEach(card => {
  const arrow = card.querySelector('.expand-arrow');

  arrow.addEventListener('click', (e) => {
    e.stopPropagation(); // aby sa kliknutie nezachytilo inde
    workCards.forEach(c => {
      if (c !== card) c.classList.remove('expanded');
    });
    card.classList.toggle('expanded');
  });
});

const bubblesContainer = document.querySelector('.bubbles');
const bubbleCount = 30; // počet bubliniek

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('span');

  // náhodná šírka a výška
  const size = Math.random() * 30 + 10; // 10px až 40px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // náhodná horizontálna pozícia
  bubble.style.left = `${Math.random() * 100}%`;

  // náhodná dĺžka animácie
  bubble.style.animationDuration = `${Math.random() * 15 + 5}s`; // 5s až 20s

  // náhodné oneskorenie
  bubble.style.animationDelay = `${Math.random() * 10}s`;

  bubblesContainer.appendChild(bubble);
}
