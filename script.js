const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');

requestAnimationFrame(() => {
  document.querySelector('.hero').classList.add('hero-ready');
});

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.accordion details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('.accordion details').forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

document.querySelector('#assessment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name');
  const contact = form.get('contact');
  const message = form.get('message') || 'I would like to learn more about an assessment.';
  const text = `Hello Graceful Pillar City,\n\nMy name is ${name}. ${message}\n\nMy preferred contact is ${contact}.`;
  const whatsappUrl = `https://wa.me/2348065482776?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
