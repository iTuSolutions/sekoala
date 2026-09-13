document.addEventListener('DOMContentLoaded', function() {

  // --- 1. Navigation Menu Toggle (Staggered Bars <-> X Close) ---
  const hamburger = document.getElementById('hamburger');
  const mobileNavMenu = document.getElementById('mobileNavMenu');

  if (hamburger && mobileNavMenu) {
    hamburger.addEventListener('click', function() {
      // Toggle menu visibility
      const isHidden = mobileNavMenu.classList.toggle('hidden');
      const icon = hamburger.querySelector('i');

      // Swap icon: show 'fa-xmark' when menu is open, 'fa-bars-staggered' when closed
      if (icon) {
        if (isHidden) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars-staggered');
        } else {
          icon.classList.remove('fa-bars-staggered');
          icon.classList.add('fa-xmark');
        }
      }
    });
  }

  // --- 2. Theme Switcher & Logo Swap ---
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const headerLogoImg = document.getElementById('header-logo-img');

  const logoDark = "https://res.cloudinary.com/dulmfdigk/image/upload/v1765936763/Black_White_Minimalist_Signature_Personal_Brand_Logo_20251001_145831_0001_jn93le.png";
  const logoLight = "https://res.cloudinary.com/dulmfdigk/image/upload/v1765936762/Black_White_Minimalist_Signature_Personal_Brand_Logo_20251001_145830_0000_jvtg1p.png";

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
      if (themeText) themeText.textContent = 'Light';
      if (headerLogoImg) headerLogoImg.src = logoDark;
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
      if (themeText) themeText.textContent = 'Dark';
      if (headerLogoImg) headerLogoImg.src = logoLight;
    }
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isInitialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  
  applyTheme(isInitialDark);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentlyDark = document.documentElement.classList.contains('dark');
      const nextDarkState = !currentlyDark;
      
      applyTheme(nextDarkState);
      localStorage.setItem('theme', nextDarkState ? 'dark' : 'light');
      
      // Update FAQs parallax overlay if rendered
      if (typeof updateThemeGradient === 'function') {
        updateThemeGradient();
      }
    });
  }

  // --- 3. Dynamic FAQs Content Injection ---
  const faqsWrapper = document.getElementById('faqs-section-wrapper');
  if (faqsWrapper) {
    const widgetContent = faqsWrapper.querySelector('.widget-content') || faqsWrapper;
    
    const bgSources = [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80',
      'https://picsum.photos/1920/1080?blur=1'
    ];
    const randomImg = bgSources[Math.floor(Math.random() * bgSources.length)];

    widgetContent.innerHTML = `
      <div id="parallax-faqs-bg" class="relative w-full bg-fixed bg-cover bg-center bg-no-repeat transition-all duration-700 flex flex-col items-center justify-center p-4 md:p-12 my-12" style="background-image: linear-gradient(to right, rgba(248, 250, 252, 0.93), rgba(241, 245, 249, 0.88)), url('${randomImg}');">
        
        <div class="faqs-card relative z-10 w-full max-w-4xl mx-auto backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl transition-colors duration-300 space-y-8">
          
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl shadow-sm">
                <i class="fa-solid fa-circle-question"></i>
              </div>
              <div>
                <div class="flex items-center gap-3">
                  <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-sm">
                    <i class="fa-solid fa-info-circle text-indigo-500"></i> Help Center
                  </span>
                </div>
                <p class="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Find answers to common questions regarding qualifications, technical expertise, work experience, and availability.
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4" id="js-faqs-accordion">
            
            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  1. What primary roles is Sekoala actively seeking?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                Sekoala is targeting roles in <strong>IT Support, Desktop Support, Junior Network Engineering, Systems Administration, Technical Support, and Control Room / Surveillance Operations</strong>.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  2. What formal IT certifications does Sekoala hold?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                He holds 5 industry certifications issued via IT Academy: <strong>CompTIA A+, CompTIA Network+, CompTIA Security+, CompTIA Server+</strong>, and <strong>Cisco CCNA (Routing &amp; Switching)</strong>.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  3. Where is Sekoala located, and is he willing to relocate?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                He is based in <strong>Polokwane / Ga-Mothiba, Limpopo</strong>. He is open to opportunities within Limpopo, Gauteng, hybrid/remote roles, or nationwide positions with relocation assistance.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  4. What is Sekoala's employment history with Bidvest Protea Coin?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                Sekoala has served in multiple roles with Bidvest Protea Coin: March 2006 – 2012 (contract completed), May 2014 – April 2017 (resigned), and currently serving as a Security Gaming Officer at Sun Meropa Casino since 22 July 2021.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  5. How does his physical security &amp; surveillance background add value to IT roles?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                His extensive surveillance experience instills rigorous protocol compliance, high-pressure crisis management, active incident monitoring, and physical security alignment for server rooms and critical IT infrastructure.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  6. Does Sekoala have web development experience?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                Yes. He builds responsive front-end layouts, custom Blogger XML themes, integrates APIs (e.g., EmailJS), and works proficiently with HTML5, CSS3, and JavaScript logic.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  7. Where can I view Sekoala's full official resume?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                You can view his complete interactive resume directly by clicking "My Resume" in the navigation bar or visiting <a href="https://www.sekoala.co.za/p/my-resume.html" target="_blank" class="text-indigo-600 dark:text-indigo-400 underline font-medium">www.sekoala.co.za</a>.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  8. What languages does Sekoala speak?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                He is fluent in both <strong>English</strong> and <strong>Sepedi</strong>, enabling clear technical communication across diverse multicultural teams.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  9. How quickly can Sekoala respond to job offers or interview invites?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                Recruiters submitting inquiries via the embedded job application form receive immediate email notifications, and Sekoala typically responds within 24 hours.
              </div>
            </div>

            <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/80 dark:bg-slate-800/50 transition-all duration-200">
              <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" type="button">
                <span class="title-group flex items-center gap-3">
                  <i class="fa-solid fa-question text-indigo-500 text-sm"></i>
                  10. How can recruiters contact Sekoala directly?
                </span>
                <i class="fa-solid fa-chevron-down icon-chevron text-xs transition-transform duration-300 text-slate-400"></i>
              </button>
              <div class="accordion-content hidden px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                Employers can call <strong>071 140-5870</strong>, email <strong>sekoalabopape@gmail.com</strong>, connect via <a href="https://za.linkedin.com/in/sekoalabopape" target="_blank" class="text-indigo-600 dark:text-indigo-400 underline font-medium">LinkedIn</a>, or click the floating WhatsApp action button.
              </div>
            </div>

          </div>

          <div class="pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <p class="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
              Found all answers useful? Feel free to reach out directly using the contact form or quick action links above!
            </p>
          </div>

        </div>
      </div>
    `;

    // Dynamic Theme Overlay Update Function
    window.updateThemeGradient = function() {
      const bgContainer = document.getElementById('parallax-faqs-bg');
      if (!bgContainer) return;
      const isDark = document.documentElement.classList.contains('dark');
      const lightGradient = 'linear-gradient(to right, rgba(248, 250, 252, 0.93), rgba(241, 245, 249, 0.88))';
      const darkGradient = 'linear-gradient(to right, rgba(15, 23, 42, 0.94), rgba(15, 23, 42, 0.85))';
      bgContainer.style.backgroundImage = `${isDark ? darkGradient : lightGradient}, url("${randomImg}")`;
    };

    updateThemeGradient();

    // Accordion Toggle Event Listener (Unified Single-Open Behavior for FAQs)
    const accordionItems = widgetContent.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      const chevron = item.querySelector('.icon-chevron');

      if (header && content) {
        header.addEventListener('click', () => {
          const isOpen = !content.classList.contains('hidden');

          // Close all accordion items inside this section
          accordionItems.forEach(otherItem => {
            const otherContent = otherItem.querySelector('.accordion-content');
            const otherChevron = otherItem.querySelector('.icon-chevron');
            if (otherContent) otherContent.classList.add('hidden');
            if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
          });

          // Toggle current item
          if (!isOpen) {
            content.classList.remove('hidden');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
          }
        });
      }
    });
  }

  // --- 4. Typed.js Initialization ---
  setTimeout(() => {
    const typedTarget = document.getElementById('typed-output');
    if (typedTarget) {
      if (typeof Typed !== 'undefined') {
        new Typed('#typed-output', {
          strings: [
            "CompTIA A+ Certified PC Technician.",
            "CCNA-trained Network Specialist.",
            "CompTIA Security+ focused Cybersecurity consultant.",
            "reliable IT partner in Polokwane, Limpopo.",
            "an expert in Windows OS troubleshooting.",
            "proficient in OSPF and EIGRP routing.",
            "specializing in SOHO network setup and security.",
            "committed to continuous professional development.",
            "your solution for hardware and software maintenance.",
            "the key to your network stability and security."
          ],
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 2000,
          loop: true
        });
      } else {
        console.error('Typed.js library is NOT defined. Check CDN link order.');
      }
    }
  }, 100);

  // Initialize remaining modules
  generateCoreValues();
  initAccordion();
  initEmailJS();
  initHeroCanvas();
  initScrollAnimations();
});


// --- 5. Canvas Background Effect ---
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const heroSection = document.getElementById('top');
  if (!heroSection) return;

  let width = (canvas.width = heroSection.offsetWidth);
  let height = (canvas.height = heroSection.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  });

  const codeItems = [
    '</>', '{ }', '01010', 'SELECT *', 'ping', 'ipconfig', 'sudo', 'CompTIA',
    'Cisco', 'HTML5', 'CSS3', 'IPv4', 'Subnet', 'ACK/SYN', '192.168.1.1',
    'git push', 'SSH', 'DNS', 'PORT 8080', 'VPN'
  ];

  const particleCount = 28;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      text: codeItems[Math.floor(Math.random() * codeItems.length)],
      fontSize: Math.floor(Math.random() * 8) + 12,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6 - 0.2,
      opacity: Math.random() * 0.4 + 0.2,
      parallaxFactor: Math.random() * 0.4 + 0.2
    });
  }

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  let mouseX = -1000;
  let mouseY = -1000;
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      let py = p.y - scrollY * p.parallaxFactor;

      if (py < -30) p.y += height + 50;
      if (py > height + 50) p.y -= height + 50;

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < -40) p.x = width + 40;
      if (p.x > width + 40) p.x = -40;

      const dx = mouseX - p.x;
      const dy = mouseY - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * 1.5;
        p.y -= Math.sin(angle) * 1.5;
      }

      ctx.font = `600 ${p.fontSize}px monospace`;
      ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
      ctx.fillText(p.text, p.x, py);
    });

    requestAnimationFrame(animate);
  }

  animate();
}


// --- 6. Scroll Animations ---
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      const delay = el.getAttribute("data-delay") || 0;

      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.add("is-visible");
        }, delay);
      } else {
        // Removes class on exit to trigger reverse animation up/down scroll
        el.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".scroll-anim").forEach((el) => observer.observe(el));
}


// --- 7. EmailJS Handling ---
function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("7Haz78eFLoz2xY4bh");
  }

  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('form-message');
    if (submitBtn) submitBtn.disabled = true;

    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    let senderLocation = "Location Unavailable";
    try {
      const geoController = new AbortController();
      const timeoutId = setTimeout(() => geoController.abort(), 3000);
      
      const geoResponse = await fetch('https://ipapi.co/json/', { signal: geoController.signal });
      clearTimeout(timeoutId);
      
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        senderLocation = `${geoData.city || 'Unknown City'}, ${geoData.region || 'Unknown Region'}, ${geoData.country_name || 'Unknown Country'}`;
      }
    } catch (err) {
      console.warn('Geolocation lookup timed out or failed:', err);
    }

    const firstName = contactForm.querySelector('[name="name"]')?.value || '';
    const surname = contactForm.querySelector('[name="surname"]')?.value || '';
    const fullName = `${firstName} ${surname}`.trim();

    const templateParams = {
      name: fullName,
      email: contactForm.querySelector('[name="email"]')?.value || '',
      phone: contactForm.querySelector('[name="phone"]')?.value || '',
      subject: contactForm.querySelector('[name="subject"]')?.value || '',
      message: contactForm.querySelector('[name="message"]')?.value || '',
      role: contactForm.querySelector('[name="role"]')?.value || '',
      work_mode: contactForm.querySelector('[name="work_mode"]')?.value || '',
      time: formattedTime,
      location: senderLocation,
      profile_pic: "https://res.cloudinary.com/dulmfdigk/image/upload/v1749239659/1736091045671_qcvgls.jpg"
    };

    emailjs.send("service_j0q0up8", "template_4rqga9k", templateParams)
      .then(function() {
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.style.color = '#10B981';
          formMessage.innerHTML = `Message sent successfully! 📍 location logged: ${senderLocation}`;
        } else {
          alert("Message sent successfully! 📍 " + senderLocation);
        }
        contactForm.reset();
      })
      .catch(function(error) {
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.style.color = '#EF4444';
          formMessage.innerHTML = "Failed to send message. Please try again.";
        } else {
          alert("Failed to send message. Please try again.");
        }
        console.error("EmailJS Error:", error);
      })
      .finally(function() {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}


function refreshParallaxBg() {
  var card = document.getElementById('parallax-card');
  if (card) {
    var randomSeed = Math.floor(Math.random() * 1000);
    card.style.backgroundImage = 'url("https://picsum.photos/1200/800?random=' + randomSeed + '")';
  }
}


// --- 8. Core Values Data & Generator ---
const coreValuesData = [
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Integrity & Professionalism',
    text: 'Upholding the highest standards of technical competence, transparency, and honesty in all repairs and recommendations.'
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Client-Centric Service',
    text: 'Focusing on understanding the client\'s specific needs to deliver personalised, cost-effective, and long-lasting IT solutions.'
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Continuous Learning',
    text: 'Committing to daily professional development to stay ahead of evolving threats and technologies.'
  },
  {
    icon: 'fa-solid fa-lock',
    title: 'Security First',
    text: 'Integrating fundamental cybersecurity practices into every service, from networking to system maintenance.'
  },
  {
    icon: 'fa-solid fa-location-dot',
    title: 'Local Reliability',
    text: 'Providing consistent, trustworthy, and accessible IT support to the Polokwane community, ensuring swift resolution times.'
  }
];

function generateCoreValues() {
  const coreValuesTarget = document.querySelector('.corevalues');
  if (!coreValuesTarget) return;

  coreValuesTarget.innerHTML = `
    <h3 class="text-2xl sm:text-3xl font-bold text-center lg:text-left mb-4" style="color: var(--clr-main-nav-bg);">
      Core Values
    </h3>
    <div class="space-y-4" id="core-values-accordion">
      ${coreValuesData.map((item, index) => `
        <div class="accordion-item rounded-xl border shadow-sm transition-all duration-300 overflow-hidden" style="background-color: var(--bg-card); border-color: var(--border-color);">
          <button 
            type="button" 
            class="accordion-header w-full flex items-center justify-between p-5 text-left font-semibold text-lg transition-colors cursor-pointer" 
            style="color: var(--text-primary);"
            aria-expanded="false"
            aria-controls="core-val-panel-${index}"
          >
            <span class="flex items-center gap-3">
              <i class="${item.icon} text-lg" style="color: var(--clr-solid-line);"></i>
              ${item.title}
            </span>
            <i class="accordion-icon fa-solid fa-chevron-down text-sm transition-transform duration-300" style="color: var(--text-secondary);"></i>
          </button>
          <div id="core-val-panel-${index}" class="accordion-panel grid grid-rows-[0fr] transition-all duration-300 ease-in-out">
            <div class="overflow-hidden">
              <div class="px-5 py-4 border-t text-sm sm:text-base leading-relaxed" style="color: var(--text-secondary); border-color: var(--border-color);">
                ${item.text}
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


// --- 9. Accordion Handler (Grid Rows Transition) ---
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    // Prevent duplicate event bindings
    if (header.hasAttribute('data-accordion-bound')) return;
    header.setAttribute('data-accordion-bound', 'true');

    header.addEventListener('click', () => {
      const panel = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');

      if (!panel) return;

      const isOpen = header.getAttribute('aria-expanded') === 'true';

      // Close all accordion panels in the same section container
      const container = header.closest('#core-values-accordion') || header.parentElement.parentElement;
      if (container) {
        container.querySelectorAll('.accordion-header').forEach(h => {
          h.setAttribute('aria-expanded', 'false');
          const p = h.nextElementSibling;
          const ic = h.querySelector('.accordion-icon');
          if (p && p.classList.contains('accordion-panel')) {
            p.classList.remove('grid-rows-[1fr]');
            p.classList.add('grid-rows-[0fr]');
          }
          if (ic) ic.classList.remove('rotate-180');
        });
      }

      // If clicked header was closed, open it
      if (!isOpen) {
        header.setAttribute('aria-expanded', 'true');
        panel.classList.remove('grid-rows-[0fr]');
        panel.classList.add('grid-rows-[1fr]');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}
