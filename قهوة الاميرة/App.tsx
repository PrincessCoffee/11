import React, { useState, useEffect } from 'react';
import SocialLinkButton from './components/SocialLinkButton';
import MenuModal from './components/MenuModal';
import { translations } from './constants';
import { CoffeeIcon } from './components/icons';
import type { SocialLink } from './types';

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ar'>('ar');
    const [isFading, setIsFading] = useState(false);

    const t = translations[language];

    useEffect(() => {
        const body = document.body;
        if (language === 'ar') {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            body.classList.add('font-ar');
            body.classList.remove('font-en');
        } else {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            body.classList.add('font-en');
            body.classList.remove('font-ar');
        }
    }, [language]);

    const handleLanguageToggle = () => {
        setIsFading(true);
        setTimeout(() => {
            setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
            setIsFading(false);
        }, 300);
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-4 overflow-hidden relative font-lato">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511920183353-3c7c95a57422?q=80&w=3387&auto=format&fit=crop')", filter: 'blur(8px) brightness(0.6)'}}></div>
            
            <button
                onClick={handleLanguageToggle}
                className="fixed top-4 right-4 z-20 bg-brand-gold text-brand-green w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-transform transform hover:scale-110 shadow-lg font-cinzel"
                aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
            >
                {t.languageToggle}
            </button>

            <div style={{ perspective: '1000px' }} className={`w-full max-w-md mx-auto transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-brand-green/70 backdrop-blur-lg border-2 border-brand-gold rounded-2xl shadow-2xl p-8 text-center relative z-10 animate-card-entry transition-transform duration-300 hover:[transform:rotateY(var(--rotate-y,0))rotateX(var(--rotate-x,0))scale(1.05)]">
                    <header className="mb-8">
                        <div className="animate-float">
                            <img 
                                src="https://i.imgur.com/k2gY1rC.png" 
                                alt="Princess Coffee Logo" 
                                className="w-40 h-40 mx-auto rounded-full object-cover shadow-2xl border-4 border-brand-gold"
                            />
                        </div>
                        <h1 className="text-5xl font-bold mt-6 font-cinzel text-shadow text-white">
                            {t.title}
                        </h1>
                        <p className="text-brand-gold text-lg mt-2 font-cinzel">
                            {t.subtitle}
                        </p>
                    </header>

                    <main className="space-y-4">
                        {t.socialLinks.map((link: SocialLink) => (
                            <SocialLinkButton 
                                key={link.name} 
                                href={link.href} 
                                icon={link.icon} 
                                text={link.name}
                            />
                        ))}
                        
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="group w-full bg-brand-gold text-brand-green font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 ease-in-out hover:bg-yellow-500 transform hover:scale-105 animate-pulse-glow"
                        >
                            <CoffeeIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                            <span className="font-semibold">{t.viewMenu}</span>
                        </button>
                    </main>
                    
                    <footer className="mt-12 text-center text-gray-400 text-sm">
                        <p>{t.footer}</p>
                    </footer>
                </div>
            </div>
            
            <MenuModal 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                menuCategories={t.menuCategories}
                title={t.menuTitle}
            />
        </div>
    );
};

export default App;