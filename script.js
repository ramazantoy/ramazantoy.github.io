document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const navLinks = [...document.querySelectorAll('.nav__link')];

    // Tema butonu: seçim localStorage'da tutulur, ilk uygulama head'deki script'te
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const syncThemeLabel = () => {
        const next = root.dataset.theme === 'light' ? 'dark' : 'light';
        themeToggle.setAttribute('aria-label', `Switch to ${next} mode`);
    };
    syncThemeLabel();
    themeToggle.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
        try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { }
        syncThemeLabel();
    });

    // Butonla seçim yapılmadıysa sistem teması değiştikçe izle
    const storedTheme = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (storedTheme()) return;
        root.dataset.theme = e.matches ? 'dark' : 'light';
        syncThemeLabel();
    });

    // Mobil menü
    const setMenuOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('is-open')));
    document.querySelectorAll('#nav-links a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

    // Scroll edilince nav arka planı
    const updateNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    // Ekranın ortasındaki bölümün nav linkini işaretle
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = `#${entry.target.id}`;
            navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));

    // Görünür oldukça belirme
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Mobil oyunlar: "Show all" geri kalanları açar/kapatır
    const videos = document.getElementById('videos');
    const videosMore = document.getElementById('videos-more');
    const gameCount = videos.querySelectorAll('.video:not(.video--wide)').length;
    videosMore.addEventListener('click', () => {
        const expanded = videos.classList.toggle('is-expanded');
        videosMore.setAttribute('aria-expanded', String(expanded));
        videosMore.textContent = expanded ? 'Show fewer' : `Show all ${gameCount} games`;
        if (!expanded) document.getElementById('games').scrollIntoView({ block: 'start' });
    });

    // YouTube oynatıcısı yalnız tıklanınca yüklenir (açılışta 21 iframe yüklenmesin)
    document.querySelectorAll('[data-yt]').forEach(button => {
        button.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.yt}?autoplay=1&rel=0`;
            iframe.title = button.getAttribute('aria-label');
            iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            button.replaceWith(iframe);
        });
    });
});
