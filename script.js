
    
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // FAQ Accordion functionality
        document.querySelectorAll('.faq-item').forEach(item => {
            const header = item.querySelector('.flex');
            const content = item.querySelector('p');
            const icon = item.querySelector('.fa-chevron-down');
            
            if (header && content && icon) {
                header.addEventListener('click', () => {
                    const isOpen = content.style.display === 'block';
                    
                    // Close all other FAQs
                    document.querySelectorAll('.faq-item').forEach(otherItem => {
                        const otherContent = otherItem.querySelector('p');
                        const otherIcon = otherItem.querySelector('.fa-chevron-down');
                        if (otherContent && otherIcon && otherItem !== item) {
                            otherContent.style.display = 'none';
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle current FAQ
                    content.style.display = isOpen ? 'none' : 'block';
                    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                });
                
                // Initially hide content
                content.style.display = 'none';
                content.style.transition = 'all 0.3s ease';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        // Add FAQ class to items
        document.querySelectorAll('.space-y-4 > div').forEach(item => {
            if (item.querySelector('.fa-chevron-down')) {
                item.classList.add('faq-item');
            }
        });

        // Mobile menu toggle
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'md:hidden text-brand-purple focus:outline-none';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        
        const header = document.querySelector('header .container .flex');
        const nav = document.querySelector('header nav');
        
        if (header && nav) {
            header.insertBefore(mobileMenuButton, nav);
            
            mobileMenuButton.addEventListener('click', () => {
                nav.classList.toggle('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
        }

        // Add loading animation for counter statistics
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (element.textContent.includes('+')) {
                    element.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (element.textContent.includes('%')) {
                    element.textContent = Math.floor(current) + '%';
                } else if (element.textContent.includes('/')) {
                    element.textContent = (current / 10).toFixed(1) + '/5';
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }

        // Observe statistics for counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const statElement = entry.target.querySelector('.text-4xl');
                    if (statElement) {
                        const text = statElement.textContent;
                        let target = parseInt(text.replace(/\D/g, ''));
                        
                        if (text.includes('4.9')) {
                            target = 49;
                        }
                        
                        animateCounter(statElement, target);
                        entry.target.classList.add('animated');
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observe statistics cards
        document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 > div').forEach(card => {
            if (card.querySelector('.text-4xl')) {
                statsObserver.observe(card);
            }
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroIllustration = document.querySelector('.float-animation');
            
            if (heroIllustration && scrolled < 800) {
                heroIllustration.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Add hover effect for partner logos
        document.querySelectorAll('.grid.grid-cols-2.md\\:grid-cols-4.lg\\:grid-cols-6 > div').forEach(partner => {
            partner.addEventListener('mouseenter', () => {
                partner.style.transform = 'scale(1.1)';
                partner.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
            
            partner.addEventListener('mouseleave', () => {
                partner.style.transform = 'scale(1)';
                partner.style.boxShadow = 'none';
            });
        });

        // Add button click feedback
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple effect styles
        const style = document.createElement('style');
        style.textContent = `
            button {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // WhatsApp Floating Button - Show/Hide based on scroll position
        const whatsappButton = document.createElement('a');
        whatsappButton.href = 'https://wa.me/201505607621?text=اريد%20الالتحاق%20بالمسار';
        whatsappButton.target = '_blank';
        whatsappButton.className = 'whatsapp-float';
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsappButton);

        // Find sections by their heading text
        const allSections = document.querySelectorAll('section');
        let learnSection = null;
        let ctaSection = null;
        
        allSections.forEach(section => {
            const heading = section.querySelector('h2');
            if (heading) {
                const text = heading.textContent.trim();
                if (text.includes('ماذا ستتعلم في هذه الدفعة')) {
                    learnSection = section;
                }
                if (text.includes('هل تريد ان تكمل مسارك')) {
                    ctaSection = section;
                }
            }
        });

        function updateWhatsAppButton() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            let showButton = false;
            
            if (learnSection && ctaSection) {
                const learnRect = learnSection.getBoundingClientRect();
                const ctaRect = ctaSection.getBoundingClientRect();
                
                // Show when "ماذا ستتعلم" section is visible or above
                const learnVisible = learnRect.top <= windowHeight * 0.8;
                
                // Hide when "هل تريد ان تكمل مسارك" section starts appearing
                const ctaNotYetVisible = ctaRect.top > windowHeight * 0.8;
                
                showButton = learnVisible && ctaNotYetVisible;
            }
            
            if (showButton) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.pointerEvents = 'auto';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.pointerEvents = 'none';
            }
        }

        window.addEventListener('scroll', updateWhatsAppButton, { passive: true });
        updateWhatsAppButton();

        // Form submission handling (for contact forms)
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMessage.textContent = 'Thank you for your submission! We\'ll get back to you soon.';
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
                
                form.reset();
            });
        });

        // Add smooth reveal for testimonial cards
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div').forEach((card, index) => {
            if (card.querySelector('.fa-star')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                testimonialObserver.observe(card);
            }
        });

            const data = [
            { title: "إتقان أساسيات Bootstrap من الصفر", desc: "كيف تبني واجهات بشكل أسرع وأكثر تنظيمًا مع مراجعة الأساسيات المهمة." },
            { title: "التطبيق على مشروع عملي حقيقي", desc: "إنشاء Landing Page أو Company Profile احترافي من اختيارك." },
            { title: "تنظيم وهيكلة الكود البرمجي", desc: "ترتيب العمل بصورة أوضح وأسهل لفهم الربط بين ما تعلمته والنتيجة العملية." },
            { title: "العرض الاحترافي للمشاريع", desc: "تعلم كيفية عرض عملك بصورة تجذب العملاء وتبرز مهاراتك كالمحترفين." }
        ];

        const listContainer = document.getElementById('features-list');

        data.forEach(item => {
            const li = document.createElement('li');
            li.className = "flex items-start gap-5 group";
            li.innerHTML = `
                <div class="flex-shrink-0 mt-1 transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-slate-900  transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-slate-900 tracking-tight  transition-colors">${item.title}</h3>
                    <p class="text-slate-600 text-sm md:text-base mt-2 leading-relaxed font-light">${item.desc}</p>
                </div>
            `;
            listContainer.appendChild(li);
        });

        console.log('Ludan webpage loaded successfully with all interactive features!');

