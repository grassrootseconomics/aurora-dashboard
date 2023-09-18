import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import React, { FC } from 'react';

const Footer: FC = () => {
  const { t } = useTranslation('translation');

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container_item">
          <p>{t('footer.funded_by')}:</p>
          <img
            style={{
              maxWidth: '80%',
            }}
            src="/assets/logos/GIZ.jpg"
            alt="GIZ Logo"
            className="footer__container_item_logo footer__container_item_GIZ_logo"
          />
        </div>
        <div className="footer__container_item">
          <p>{t('footer.operated_by')}:</p>
          <Image
            width={100}
            height={50}
            src="/assets/logos/insitu.png"
            alt="Insitu Logo"
            className="footer__container_item_logo"
          />
        </div>
        <div className="footer__container_item">
          <p>Blockchain Powered by:</p>
          <Link target="_blank" href="https://www.choco4peace.com/">
            <Image
              width={100}
              height={30}
              src="/assets/logos/choco4Peace.png"
              alt="Choco4Peace"
              className="footer__container_item_logo"
            />
          </Link>
          <Link target="_blank" href="https://www.grassrootseconomics.org">
            <Image
              width={100}
              height={30}
              src="/assets/logos/grassroots-economics.png"
              alt="Grassroots Economics"
              className="footer__container_item_logo"
            />
          </Link>
          <Link target="_blank" href="https://astralitech.com">
            <Image
              width={90}
              height={40}
              src="/assets/logos/astrali.png"
              alt="Astrali"
              className="footer__container_item_logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
