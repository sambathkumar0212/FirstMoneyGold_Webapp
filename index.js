/**
 * FIRST MONEY GOLD (FMG) - Main JS
 */

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const faqSearch = document.getElementById('faq-search');
const faqEmpty = document.getElementById('faq-empty');

function init() {
    setupEventListeners();
    setupFAQAccordion();
    setupGoldCalculator();
}

function setupEventListeners() {
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
 * Setup Accordion Logic for FAQ items
 */
function setupFAQAccordion() {
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (!content) return;
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            
            // Close all
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

            // Open clicked if it was closed
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
    let calcMode = 'loan';
    let currentPurity = 22;
    let currentRate = 6400;

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
            if (resultTitle) resultTitle.innerText = 'Instant Gold Loan Estimate';
            if (outputLabel) outputLabel.innerText = 'Max Loan Cash In Hand';
            if (calcLtvBadge) {
                calcLtvBadge.innerText = 'Up to 85% - 90% Market LTV';
                calcLtvBadge.className = 'inline-block mt-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full';
            }
            if (calcInterestRow) calcInterestRow.style.display = 'flex';
            if (calcWhatsappBtn) {
                const btnText = calcWhatsappBtn.querySelector('span');
                if (btnText) btnText.innerText = 'GET THIS LOAN ON WHATSAPP';
            }
            calculateValues();
        });

        modeSellBtn.addEventListener('click', () => {
            calcMode = 'sell';
            modeSellBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-fmg-red text-white shadow-md';
            modeLoanBtn.className = 'calc-mode-btn py-3 px-4 rounded-xl text-xs md:text-sm font-black transition-all bg-transparent text-slate-600 hover:text-black';
            if (resultTitle) resultTitle.innerText = 'Instant Old Gold Sell Estimate';
            if (outputLabel) outputLabel.innerText = 'Direct Cash Payout (98% Valuation)';
            if (calcLtvBadge) {
                calcLtvBadge.innerText = 'Top Market Rate Payout';
                calcLtvBadge.className = 'inline-block mt-2 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full';
            }
            if (calcInterestRow) calcInterestRow.style.display = 'none';
            if (calcWhatsappBtn) {
                const btnText = calcWhatsappBtn.querySelector('span');
                if (btnText) btnText.innerText = 'SELL GOLD & GET INSTANT CASH';
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
            currentRate = parseFloat(btn.getAttribute('data-rate')) || 6400;
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