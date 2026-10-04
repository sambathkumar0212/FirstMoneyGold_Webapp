import { GoogleGenAI } from "@google/genai";

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
}

function setupEventListeners() {
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('glass', 'shadow-xl');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('glass', 'shadow-xl');
            navbar.classList.add('bg-transparent');
        }
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // FAQ Search Logic
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const items = document.querySelectorAll('.faq-item');
            let found = 0;

            items.forEach(item => {
                const question = item.getAttribute('data-question').toLowerCase();
                const answer = item.querySelector('.faq-content p').innerText.toLowerCase();
                
                if (question.includes(term) || answer.includes(term)) {
                    item.classList.remove('hidden');
                    found++;
                } else {
                    item.classList.add('hidden');
                }
            });

            if (found === 0) {
                faqEmpty.classList.remove('hidden');
            } else {
                faqEmpty.classList.add('hidden');
            }
        });
    }
}

/**
 * Setup Accordion Logic for FAQ items in HTML
 */
function setupFAQAccordion() {
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const content = btn.nextElementSibling;
            const isOpen = !content.classList.contains('max-h-0');
            
            // Close all other open FAQ contents
            document.querySelectorAll('.faq-content').forEach(c => {
                c.classList.add('max-h-0', 'opacity-0');
                const prevBtn = c.previousElementSibling;
                const icon = prevBtn.querySelector('.faq-icon');
                const text = prevBtn.querySelector('span:first-child');
                if (icon) icon.classList.remove('rotate-180', 'text-fmg-red');
                if (text) text.classList.remove('text-fmg-red');
            });

            // Toggle current content
            if (!isOpen) {
                content.classList.remove('max-h-0', 'opacity-0');
                content.classList.add('max-h-96', 'opacity-100');
                btn.querySelector('.faq-icon').classList.add('rotate-180', 'text-fmg-red');
                btn.querySelector('span:first-child').classList.add('text-fmg-red');
            }
        });
    });
}

// Startup
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}