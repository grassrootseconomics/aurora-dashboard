import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSelector = () => {
  const router = useRouter();
  const { i18n } = useTranslation('translation');

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className="selector_block">
      <button
        className={i18n.language === 'en' ? 'selected' : ''}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>
      <button
        className={i18n.language === 'es' ? 'selected' : ''}
        onClick={() => handleLanguageChange('es')}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSelector;
