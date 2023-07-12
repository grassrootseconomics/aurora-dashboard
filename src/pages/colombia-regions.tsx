import { useTranslation } from 'react-i18next';

import React, { FC } from 'react';

import ColombiaMap from '@/components/core/Map';
import { BackButton } from '@/components/core/buttons/BackButton';

const ColombiaRegions: FC = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <div className="map-title__container">
        <BackButton />
        <h1 className="map-title">{t('regions_colombia.title')}</h1>
      </div>
      <ColombiaMap />
    </>
  );
};

export default ColombiaRegions;
