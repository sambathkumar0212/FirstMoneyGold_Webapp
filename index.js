/**
 * FIRST MONEY GOLD (FMG) - Comprehensive Web App Logic
 */

let currentLang = 'en';
let calcMode = 'loan';
let currentPurity = 22;
let currentRate = 13675;

function init() {
    setupNavigation();
    setupLanguageToggle();
    setupLeadCaptureForm();
    setupFAQAccordion();
    setupGoldCalculator();
}

/**
 * Setup navigation effects and mobile drawer
 */
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 20) {
            navbar.classList.add('glass', 'shadow-xl');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('glass', 'shadow-xl');
            navbar.classList.add('bg-transparent');
        }
    });

    // Mobile Menu Toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (menuIcon) menuIcon.classList.toggle('hidden');
            if (closeIcon) closeIcon.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        });
    });

    // FAQ Search Logic
    const faqSearch = document.getElementById('faq-search');
    const faqEmpty = document.getElementById('faq-empty');
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const items = document.querySelectorAll('.faq-item');
            let found = 0;

            items.forEach(item => {
                const question = (item.getAttribute('data-question') || '').toLowerCase();
                const answer = (item.querySelector('.faq-content p')?.innerText || '').toLowerCase();
                
                if (question.includes(term) || answer.includes(term)) {
                    item.style.display = 'block';
                    found++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (faqEmpty) {
                faqEmpty.style.display = (found === 0) ? 'block' : 'none';
            }
        });
    }
}

/**
 * Setup English / Tamil Bilingual Language Switcher
 */
function setupLanguageToggle() {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const currentLangText = document.getElementById('current-lang-text');

    function setLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = (lang === 'ta') ? el.getAttribute('data-ta') : el.getAttribute('data-en');
            if (text) el.innerHTML = text;
        });
        if (currentLangText) {
            currentLangText.textContent = (lang === 'ta') ? 'English' : 'தமிழ்';
        }
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'ta' : 'en');
        });
    }
}

/**
 * Universal Phone Sanitizer: extracts clean 10-digit number even if +91, 91, 0, or spaces are provided
 */
export function cleanPhoneNumber(raw) {
    if (!raw) return '';
    let digits = String(raw).replace(/\D/g, '');
    if (digits.length === 14 && digits.startsWith('0091')) {
        digits = digits.slice(4);
    } else if (digits.length === 12 && digits.startsWith('91')) {
        digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
        digits = digits.slice(1);
    } else if (digits.length > 10) {
        if (digits.startsWith('91')) {
            digits = digits.slice(2);
        } else if (digits.startsWith('0')) {
            digits = digits.slice(1);
        }
        if (digits.length > 10) {
            digits = digits.slice(-10);
        }
    }
    return digits;
}

/**
 * Setup Lead Capture & Callback Form Handlers
 */
function setupLeadCaptureForm() {
    const leadForm = document.getElementById('lead-capture-form');
    const leadFeedback = document.getElementById('form-feedback');
    const leadWhatsappBtn = document.getElementById('lead-whatsapp-btn');
    const phoneInput = document.getElementById('lead-phone');

    if (phoneInput) {
        // Real-time sanitization when user types, pastes, or leaves the input
        phoneInput.addEventListener('input', () => {
            const raw = phoneInput.value;
            if (/[^\d]/.test(raw) || raw.length > 10 || (raw.startsWith('0') && raw.length > 1) || (raw.startsWith('91') && raw.length > 10)) {
                phoneInput.value = cleanPhoneNumber(raw);
            }
        });

        phoneInput.addEventListener('paste', () => {
            setTimeout(() => {
                phoneInput.value = cleanPhoneNumber(phoneInput.value);
            }, 0);
        });

        phoneInput.addEventListener('blur', () => {
            phoneInput.value = cleanPhoneNumber(phoneInput.value);
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('lead-name')?.value.trim() || 'Customer';
            const rawPhone = document.getElementById('lead-phone')?.value || '';
            const phone = cleanPhoneNumber(rawPhone);
            const city = document.getElementById('lead-city')?.value || 'Chennai';
            const weight = document.getElementById('lead-weight')?.value.trim() || 'Not specified';
            const service = document.getElementById('lead-service')?.value || 'Gold Loan';

            if (phone.length < 10) {
                alert(currentLang === 'ta' ? 'தயவுசெய்து சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.' : 'Please enter a valid 10-digit mobile number.');
                document.getElementById('lead-phone')?.focus();
                return;
            }

            if (phoneInput) {
                phoneInput.value = phone;
            }

            if (leadFeedback) {
                leadFeedback.classList.remove('hidden');
            }

            const msg = `Hi First Money Gold, I requested a callback on your website:\n- Name: ${name}\n- Phone: +91 ${phone}\n- City/Branch: ${city}\n- Gold Weight: ${weight}\n- Service: ${service}`;
            const waUrl = `https://wa.me/916380630242?text=${encodeURIComponent(msg)}`;
            
            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 800);
        });
    }

    if (leadWhatsappBtn) {
        leadWhatsappBtn.addEventListener('click', () => {
            const name = document.getElementById('lead-name')?.value.trim() || 'Valued Customer';
            const rawPhone = document.getElementById('lead-phone')?.value || '';
            const phone = cleanPhoneNumber(rawPhone);
            const city = document.getElementById('lead-city')?.value || 'Chennai';
            const weight = document.getElementById('lead-weight')?.value.trim() || 'Not specified';
            const service = document.getElementById('lead-service')?.value || 'Gold Loan';

            if (phone && phoneInput) {
                phoneInput.value = phone;
            }

            const msg = `Hi First Money Gold, I would like to inquire about:\n- Name: ${name}\n- Phone: ${phone ? '+91 ' + phone : 'Direct Inquiry'}\n- City/Branch: ${city}\n- Gold Weight: ${weight}\n- Service: ${service}`;
            window.open(`https://wa.me/916380630242?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }
}

/**
 * Setup Accordion Logic for FAQ items
 */
function setupFAQAccordion() {
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (!content) return;
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            
            document.querySelectorAll('.faq-content').forEach(c => {
                c.style.maxHeight = '0px';
                c.style.opacity = '0';
                const parentBtn = c.previousElementSibling;
                if (parentBtn) {
                    const icon = parentBtn.querySelector('.faq-icon');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                    const text = parentBtn.querySelector('span:first-child');
                    if (text) text.classList.remove('text-fmg-red');
                }
            });

            if (!isOpen) {
                content.style.maxHeight = '500px';
                content.style.opacity = '1';
                const icon = btn.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(180deg)';
                const text = btn.querySelector('span:first-child');
                if (text) text.classList.add('text-fmg-red');
            }
        });
    });
}

/**
 * Gold Loan & Cash Calculator Engine
 */
function setupGoldCalculator() {
    const modeLoanBtn = document.getElementById('calc-mode-loan');
    const modeSellBtn = document.getElementById('calc-mode-sell');
    const purityBtns = document.querySelectorAll('.purity-btn');
    const weightInput = document.getElementById('gold-weight-input');
    const weightSlider = document.getElementById('gold-weight-slider');
    const weightChips = document.querySelectorAll('.weight-chip');
    const rateBadge = document.getElementById('rate-badge');

    const resultTitle = document.getElementById('result-title');
    const outputLabel = document.getElementById('output-label');
    const calcLoanAmount = document.getElementById('calc-loan-amount');
    const calcLtvBadge = document.getElementById('calc-ltv-badge');
    const calcMarketVal = document.getElementById('calc-market-val');
    const calcInterestRow = document.getElementById('calc-interest-row');
    const calcMonthlyInterest = document.getElementById('calc-monthly-interest');
    const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

    function calculateValues() {
        const weight = parseFloat(weightInput?.value) || 0;
        const marketVal = weight * currentRate;
        const loanVal = (calcMode === 'loan') ? Math.round(marketVal * 0.85) : Math.round(marketVal * 0.98);
        const monthlyInterest = Math.round(loanVal * 0.0099);

        if (calcLoanAmount) calcLoanAmount.innerText = loanVal.toLocaleString('en-IN');
        if (calcMarketVal) calcMarketVal.innerText = '₹' + Math.round(marketVal).toLocaleString('en-IN');
        if (calcMonthlyInterest) calcMonthlyInterest.innerText = '₹' + monthlyInterest.toLocaleString('en-IN') + ' / month';

        if (calcWhatsappBtn) {
            const modeText = (calcMode === 'loan') ? 'Gold Loan' : 'Sell Old Gold';
            const msg = `Hi First Money Gold, I checked your online calculator and I want to apply for a ${modeText} for ${weight}g of ${currentPurity} Karat Gold (Estimated Value: ₹${loanVal.toLocaleString('en-IN')}). Please assist me.`;
            calcWhatsappBtn.href = `https://wa.me/916380630242?text=${encodeURIComponent(msg)}`;
        }
    }

    if (modeLoanBtn && modeSellBtn) {
        modeLoanBtn.addEventListener('click', () => {
            calcMode = 'loan';
            modeLoanBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-fmg-red text-white shadow-md';
            modeSellBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-transparent text-slate-600 hover:text-black';
            if (resultTitle) resultTitle.innerText = (currentLang === 'ta') ? 'உடனடி தங்கக் கடன் மதிப்பீடு' : 'Instant Gold Loan Estimate';
            if (outputLabel) outputLabel.innerText = (currentLang === 'ta') ? 'கையில் கிடைக்கும் கடன் தொகை' : 'Max Loan Cash In Hand';
            if (calcLtvBadge) {
                calcLtvBadge.innerText = (currentLang === 'ta') ? 'சந்தை மதிப்பில் 85% - 90% வரை' : 'Up to 85% - 90% Market LTV';
                calcLtvBadge.className = 'inline-block mt-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full';
            }
            if (calcInterestRow) calcInterestRow.style.display = 'flex';
            if (calcWhatsappBtn) {
                const btnText = calcWhatsappBtn.querySelector('span');
                if (btnText) btnText.innerText = (currentLang === 'ta') ? 'இந்தக் கடனை வாட்ஸ்அப்பில் பெற' : 'GET THIS LOAN ON WHATSAPP';
            }
            calculateValues();
        });

        modeSellBtn.addEventListener('click', () => {
            calcMode = 'sell';
            modeSellBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-fmg-red text-white shadow-md';
            modeLoanBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-transparent text-slate-600 hover:text-black';
            if (resultTitle) resultTitle.innerText = (currentLang === 'ta') ? 'பழைய நகை நேரடி விற்பனை மதிப்பீடு' : 'Instant Old Gold Sell Estimate';
            if (outputLabel) outputLabel.innerText = (currentLang === 'ta') ? 'நேரடி ரொக்கப் பட்டுவாடா' : 'Direct Cash Payout (98% Valuation)';
            if (calcLtvBadge) {
                calcLtvBadge.innerText = (currentLang === 'ta') ? 'உயர்ந்த சந்தை விலை' : 'Top Market Rate Payout';
                calcLtvBadge.className = 'inline-block mt-2 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full';
            }
            if (calcInterestRow) calcInterestRow.style.display = 'none';
            if (calcWhatsappBtn) {
                const btnText = calcWhatsappBtn.querySelector('span');
                if (btnText) btnText.innerText = (currentLang === 'ta') ? 'பழைய நகையை விற்று உடனடி பணம் பெற' : 'SELL GOLD & GET INSTANT CASH';
            }
            calculateValues();
        });
    }

    purityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            purityBtns.forEach(b => {
                b.classList.remove('border-fmg-red', 'bg-red-50/50');
                b.classList.add('border-slate-200');
            });
            btn.classList.add('border-fmg-red', 'bg-red-50/50');
            btn.classList.remove('border-slate-200');
            
            currentPurity = parseInt(btn.getAttribute('data-purity')) || 22;
            currentRate = parseFloat(btn.getAttribute('data-rate')) || 13675;
            if (rateBadge) rateBadge.innerText = `Today: ₹${currentRate.toLocaleString('en-IN')} / gram`;
            calculateValues();
        });
    });

    if (weightInput && weightSlider) {
        weightInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value) || 0;
            weightSlider.value = Math.min(val, 100);
            weightChips.forEach(chip => {
                if (parseFloat(chip.getAttribute('data-weight')) === val) {
                    chip.classList.add('bg-fmg-red', 'text-white');
                    chip.classList.remove('bg-slate-100', 'text-slate-700');
                } else {
                    chip.classList.remove('bg-fmg-red', 'text-white');
                    chip.classList.add('bg-slate-100', 'text-slate-700');
                }
            });
            calculateValues();
        });

        weightSlider.addEventListener('input', (e) => {
            weightInput.value = e.target.value;
            weightChips.forEach(chip => {
                if (parseFloat(chip.getAttribute('data-weight')) === parseFloat(e.target.value)) {
                    chip.classList.add('bg-fmg-red', 'text-white');
                    chip.classList.remove('bg-slate-100', 'text-slate-700');
                } else {
                    chip.classList.remove('bg-fmg-red', 'text-white');
                    chip.classList.add('bg-slate-100', 'text-slate-700');
                }
            });
            calculateValues();
        });
    }

    weightChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const val = parseFloat(chip.getAttribute('data-weight')) || 8;
            if (weightInput) weightInput.value = val;
            if (weightSlider) weightSlider.value = Math.min(val, 100);
            weightChips.forEach(c => {
                c.classList.remove('bg-fmg-red', 'text-white');
                c.classList.add('bg-slate-100', 'text-slate-700');
            });
            chip.classList.add('bg-fmg-red', 'text-white');
            chip.classList.remove('bg-slate-100', 'text-slate-700');
            calculateValues();
        });
    });

    calculateValues();
}

// Startup
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}