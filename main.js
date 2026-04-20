document.addEventListener('DOMContentLoaded', () => {
  // Waitlist Form Handler
  const form = document.getElementById('waitlist-form');
  const successMessage = document.getElementById('success-message');
  const emailInput = document.getElementById('email');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      if (email) {
        // Here you would typically send the data to a backend via fetch/axios
        // For now, we just simulate a successful UI state
        
        // Disable form to prevent multiple submissions
        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> <span>处理中...</span>';
        
        // Simulate network request
        setTimeout(() => {
          form.classList.add('hidden');
          successMessage.classList.remove('hidden');
          
          // Confetti or visual success feedback can be added here
        }, 1000);
      }
    });
  }

  // Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Run animation once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.observe-slide').forEach(element => {
    observer.observe(element);
  });
});
