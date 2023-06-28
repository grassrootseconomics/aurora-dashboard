import Image from 'next/image';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation('translation');

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container_item">
          <p>{t('footer.operated_by')}:</p>
          <Image width={100} height={80} src="/assets/logos/Insitu.png" alt="Insitu Logo" />
        </div>
        <div className="footer__container_item">
          <p>{t('footer.funded_by')}:</p>
          <Image width={100} height={80} src="/assets/logos/GIZ.png" alt="GIZ Logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;