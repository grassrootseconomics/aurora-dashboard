import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useMemo } from 'react';

import { Grid } from '@mui/material';

import { calculateYearsUntilPresent } from '@/util/format/date';
import { Association } from '@/util/models/BasicAssociation';

interface AssocProps {
  association: Association | null;
  batchCode: string;
}

const AssociationInfo = (props: AssocProps) => {
  const { t, i18n } = useTranslation('translation');
  const currentLanguage = useMemo(() => {
    return i18n.language === 'es' || i18n.language === 'en'
      ? i18n.language
      : 'en';
  }, [i18n.language]);
  const router = useRouter();

  return (
    <>
      {props.association ? (
        <div className="info__container">
          <div className="info__logo-container">
            <Image
              width={128}
              height={0}
              style={{ height: 'auto' }}
              className="info__logo"
              src={`/assets/logos/${props.association.name.toLowerCase()}.png`}
              alt={'Association'}
            />
          </div>
          <div className="info__card-container">
            <div className="info__card">
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div className="info__card-label">
                    {t('single_batch.years_existence')}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="info__card-number">
                    {calculateYearsUntilPresent(
                      new Date(props.association.creationDate)
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="info__card">
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div className="info__card-label">
                    {t('single_batch.no_associates')}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="info__card-number">
                    {props.association.nrOfAssociates}
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="info__description">
            <p>{props.association.description[currentLanguage]}</p>
          </div>
          <div className="info__footer">
            <button
              className="info__button"
              onClick={() => router.push(`/batches/sample/${props.batchCode}`)}
            >
              {t('single_batch.ask_sample')}
            </button>
            <div className="info__social">
              <Link
                target="_blank"
                href={props.association.fbSocialLink ?? `/`}
              >
                <Image
                  src={'/assets/social/facebook.png'}
                  width={40}
                  height={40}
                  alt="Facebook"
                />
              </Link>
              <Link
                target="_blank"
                href={props.association.instSocialLink ?? `/`}
              >
                <Image
                  src={'/assets/social/instagram.png'}
                  width={40}
                  height={40}
                  alt="Instagram"
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default AssociationInfo;
