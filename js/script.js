// ========================================
// TRENDPACK - SCRIPT OTIMIZADO
// ========================================

// Toggle FAQ
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fecha todos os outros FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abre o FAQ clicado se não estava ativo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Fechar FAQ ao clicar fora
document.addEventListener('click', function(event) {
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer && !faqContainer.contains(event.target)) {
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#comprar') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.plan-card, .gallery-img, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Rastrear cliques em CTAs (Analytics)
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Aqui você pode adicionar código de analytics
        console.log('CTA clicado:', this.textContent);
        
        // Simular redirecionamento para checkout
        // Em produção, isso seria um link real para o gateway de pagamento
        const planName = this.closest('.plan-card').querySelector('h3').textContent;
        console.log('Plano selecionado:', planName);
    });
});

// Detectar suporte a WebP
function supportsWebP() {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Adicionar classe ao body se suporta WebP
if (supportsWebP()) {
    document.body.classList.add('webp-support');
}

// Função para validar se está em mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamento em mobile
if (isMobile()) {
    document.body.classList.add('mobile');
}

// Monitorar mudanças de tamanho
window.addEventListener('resize', () => {
    if (isMobile()) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});

// Precarregar imagens críticas
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Precarregar imagens importantes
preloadImages([
    'images/PACK-LILAS-FEED1.png',
    'images/PACK-CAPAS.png',
    'images/garantia-de-7diastrendpack.png'
]);

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('TrendPack carregado com sucesso');
});
