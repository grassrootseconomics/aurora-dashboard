import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { FC, useCallback } from 'react';

import { BackButton } from '@/components/core/buttons/BackButton';

const AboutAurora: FC = () => {
  const { t } = useTranslation('translation');

  const router = useRouter();

  const routeToRegions = useCallback(() => {
    router.push('/colombia-regions');
  }, [router]);

  return (
    <>
      <div className="about-title__container">
        <BackButton />
        <h1 className="about-title">{t('about.title')}</h1>
      </div>
      <div className="about-subtitle__container">
        {t('about.subtitle_main')}{' '}
        <span style={{ cursor: 'pointer' }} onClick={routeToRegions}>
          Caqueta
        </span>{' '}
        {t('about.and')}{' '}
        <span style={{ cursor: 'pointer' }} onClick={routeToRegions}>
          Huila
        </span>{' '}
        {t('about.in_colombia')}
      </div>
      <div className="about-section-title">{t('about.objective_title')}</div>
      <div>
        <ul className="about__list">
          <li>{t('about.sentence_1')}</li>
          <li>{t('about.sentence_2')}</li>
          <li>{t('about.sentence_3')}</li>
        </ul>
      </div>
    </>
  );
};

export default AboutAurora;
