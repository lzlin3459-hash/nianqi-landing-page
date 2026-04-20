document.addEventListener('DOMContentLoaded', () => {
  // Waitlist Form Handler
  const form = document.getElementById('waitlist-form');
  const successMessage = document.getElementById('success-message');
  const emailInput = document.getElementById('email');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      if (email) {
        const btn = form.querySelector('button');
        const originalBtnHTML = btn.innerHTML;
        
        // UI Feedback: Loading state
        btn.disabled = true;
        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> <span>发送中...</span>';
        
        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            // Success State
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
          } else {
            // Error handling
            const data = await response.json();
            alert(data.errors ? data.errors.map(error => error.message).join(", ") : "发送失败，请稍后重试。");
            btn.disabled = false;
            btn.innerHTML = originalBtnHTML;
          }
        } catch (error) {
          console.error('Submission error:', error);
          alert("网络错误，请检查您的连接。");
          btn.disabled = false;
          btn.innerHTML = originalBtnHTML;
        }
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
