document.addEventListener('DOMContentLoaded', function() {
    // Lógica para la traducción de la página
    const languageSelector = document.getElementById('language-switcher');
    
    // Mapa de traducciones (ahora accede a las variables globales)
    const translations = {
        'en': translationsEN,
        'es': translationsES
    };
    
    // Establece el idioma inicial desde el almacenamiento local o predeterminado a 'en'
    let currentLang = localStorage.getItem('lang') || 'en';
    
    // Traduce el contenido al cargar la página
    setLanguage(currentLang);

    // Event listener para los botones de idioma
    if (languageSelector) {
        languageSelector.addEventListener('click', (e) => {
            // Asegurarse de que el clic fue en un botón
            const button = e.target.closest('.lang-btn');
            if (button) {
                const selectedLang = button.dataset.lang;
                if (selectedLang && selectedLang !== currentLang) {
                    setLanguage(selectedLang);
                    currentLang = selectedLang;
                    localStorage.setItem('lang', currentLang);
                    updateButtonState(selectedLang);
                }
            }
        });
    }

    function setLanguage(lang) {
        const t = translations[lang];

        // Traduce el contenido de texto
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const keys = key.split('.');
            let translatedText = t;
            keys.forEach(k => {
                if (translatedText) {
                    translatedText = translatedText[k];
                }
            });

            if (translatedText) {
                element.textContent = translatedText;
            }
        });

        // Traduce los placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            const keys = key.split('.');
            let translatedText = t;
            keys.forEach(k => {
                if (translatedText) {
                    translatedText = translatedText[k];
                }
            });

            if (translatedText) {
                element.placeholder = translatedText;
            }
        });
    }

    function updateButtonState(lang) {
        if (languageSelector) {
            languageSelector.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            const selectedButton = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
            if (selectedButton) {
                selectedButton.classList.add('active');
            }
        }
    }

    // Actualiza el estado inicial del botón
    updateButtonState(currentLang);

    // --- Tu código original, ahora integrado ---

    // Código para el menú hamburguesa
    let menuBtn = document.querySelector('#menu-btn');
    let menuWrapper = document.querySelector('.header .menu-wrapper');
    
    if (menuBtn && menuWrapper) {
        menuBtn.onclick = () => {
            menuWrapper.classList.toggle('active');
        };
    }

    window.onscroll = () => {
        if (menuWrapper) {
            menuWrapper.classList.remove('active');
        }
    };

    // Código para la sección de Planes
    const toggleButtons = document.querySelectorAll('.plan-toggle .toggle-btn');
    const monthlyElements = document.querySelectorAll('.monthly-price, .plan-card .price .monthly-price span, .plan-card .features h4');
    const annuallyElements = document.querySelectorAll('.annually-price, .annual-save, .plan-card .price .annually-price span');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedPlan = button.dataset.plan;

            if (selectedPlan === 'monthly') {
                monthlyElements.forEach(el => el.style.display = 'block');
                annuallyElements.forEach(el => el.style.display = 'none');
            } else if (selectedPlan === 'annually') {
                monthlyElements.forEach(el => el.style.display = 'none');
                annuallyElements.forEach(el => el.style.display = 'block');
            }
        });
    });

    // Código para el acordeón de Features
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const title = item.querySelector('.accordion-title');

        title.addEventListener('click', () => {
            // Oculta todos los acordeones si no son el que se está abriendo
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Alterna la clase 'active' para el acordeón actual
            item.classList.toggle('active');
        });
    });
});