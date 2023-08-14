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
          <Image
            width={270}
            height={60}
            src="/assets/logos/GIZ2.png"
            alt="GIZ Logo"
          />
        </div>
        <div className="footer__container_item">
          <p>{t('footer.operated_by')}:</p>
          <Image
            width={100}
            height={50}
            src="/assets/logos/insitu.png"
            alt="Insitu Logo"
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
            />
          </Link>
          <Link target="_blank" href="https://www.grassrootseconomics.org">
            <Image
              width={100}
              height={30}
              src="/assets/logos/grassroots-economics.png"
              alt="Grassroots Economics"
            />
          </Link>
          <Link target="_blank" href="https://astralitech.com">
            <Image
              width={90}
              height={40}
              src="/assets/logos/astrali.png"
              alt="Astrali"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
