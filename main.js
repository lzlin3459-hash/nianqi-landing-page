// Formspree live integration v2.0.1
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

  // Advanced Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stagger-container')) {
          // Handle staggered children
          const children = entry.target.querySelectorAll('.observe-fade-up');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('is-visible');
            }, index * 150); // 150ms delay between items
          });
        } else {
          entry.target.classList.add('is-visible');
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe containers and single elements
  document.querySelectorAll('.stagger-container, .observe-fade-up, .observe-slide').forEach(element => {
    revealObserver.observe(element);
  });

  // Smooth Navigation with Easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Offset for navbar
          behavior: 'smooth'
        });
      }
    });
  });

  // Micro-Parallax for Neural Core Nodes
  const techCore = document.querySelector('.tech-core-container');
  if (techCore) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      techCore.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Smooth background evolve on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.padding = '0.8rem 5%';
      navbar.style.background = 'rgba(10, 10, 12, 0.9)';
      navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
    } else {
      navbar.style.padding = '1.25rem 5%';
      navbar.style.background = 'rgba(10, 10, 12, 0.7)';
      navbar.style.boxShadow = 'none';
    }
  });
});
