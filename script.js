// Smooth scroll for links (progressive enhancement)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.startsWith('#') && href.length>1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile menu
      document.getElementById('mobile-menu')?.classList.remove('open');
    }
  });
});

// Theme toggle with localStorage
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const stored = localStorage.getItem('theme');
if(stored === 'dark' || (!stored && prefersDark)) document.body.classList.add('dark');
updateThemeButton();

function updateThemeButton(){
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeButton();
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle?.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));

// Simple contact form handler (demo only) - prevents real submit
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  if(!name || !email || !message){
    alert('Please fill in all fields.');
    return;
  }
  alert('Thanks, ' + name + '! This demo form does not send messages yet.');
  contactForm.reset();
});

// Small enhancement: if profile image missing, use initials as fallback
const img = document.getElementById('profile-pic');
img.addEventListener('error', ()=>{
  img.src = '';
  img.style.display = 'none';
});
// Animate sections, cards, and skills when scrolled into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .card, .skill, .hero-left, .hero-right').forEach(el => {
  el.classList.add('animate');  // start hidden
  observer.observe(el);
});
const dayNightBtn = document.getElementById('day-night');

dayNightBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Change button icon
  if(document.body.classList.contains('dark')){
    dayNightBtn.textContent = '☀️';
  } else {
    dayNightBtn.textContent = '🌙';
  }
});


/*
How to use:
1. Create a folder called "portfolio" and paste each section into its corresponding file: index.html, style.css, script.js
2. Add your profile.jpg and resume.pdf into the same folder.
3. Open index.html in a browser to preview.
4. To make the contact form actually send messages, connect it to an email service or backend.
*/
