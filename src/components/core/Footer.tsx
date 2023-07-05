import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation('translation');

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container_item">
          <p>{t('footer.operated_by')}:</p>
          <Image width={100} height={40} src="/assets/logos/Insitu.png" alt="Insitu Logo" />
        </div>
        <div className="footer__container_item">
          <p>{t('footer.funded_by')}:</p>
          <Image width={270} height={60} src="/assets/logos/GIZ.png" alt="GIZ Logo" />
        </div>
        <div className="footer__container_item">
          <p>{t('footer.powered_by')}:</p>
          <Image width={100} height={30} src="/assets/logos/Choco4Peace.png" alt="Choco4Peace" />
          <Image width={100} height={30} src="/assets/logos/GrassrootsEconimics.png" alt="Grassroots Economics" />
          <Link target="_blank" href="https://astralitech.com"> <Image width={100} height={40} src="/assets/logos/Astrali.png" alt="Astrali" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;