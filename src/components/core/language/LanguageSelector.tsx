import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const LanguageSelector = () => {
  const router = useRouter();

  const { i18n } = useTranslation('translation');

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div>
      <button
        style={{
          background: 'transparent',
          border: '0',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 600,
          textDecoration: i18n.language === 'en' ? 'underline' : 'none',
        }}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>
      {'/'}
      <button
        style={{
          background: 'transparent',
          border: '0',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 600,
          textDecoration: i18n.language === 'es' ? 'underline' : 'none',
        }}
        onClick={() => handleLanguageChange('es')}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSelector;
