import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import { BackButton } from '@/components/core/buttons/BackButton';
import CardOne from '@/components/core/cards/CardOne';
import CardThree from '@/components/core/cards/CardThree';
import CardTwo from '@/components/core/cards/CardTwo';
import PieChart from '@/components/core/charts/PieChart';
import ProducersTable from '@/components/core/tables/ProducersTable';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { getAssociations } from '@/services/association';
import { getProducersInfoList } from '@/services/producer';
import { UserRole } from '@/util/constants/users';
import { Association } from '@/util/models/BasicAssociation';
import { BasicProducer } from '@/util/models/Producer/BasicProducer';
import { ProducersStatistics } from '@/util/models/Producer/ProducersStatistics';

export default function Producers() {
  const { t } = useTranslation('translation');
  const [associations, setAssociations] = useState<Association[]>();
  const [selectedAssociation, setSelectedAssociation] = useState<number>(0);
  const [producers, setProducers] = useState<BasicProducer[]>([]);
  const [initialProducers, setInitialProducers] = useState<BasicProducer[]>([]);
  const [producersCocoaHa, setProducersCocoaHa] = useState<number>(0);
  const [producersConservationHa, setProducersConservationHa] =
    useState<number>(0);
  const [producersStats, setProducersStats] = useState<ProducersStatistics>();
  const [menNo, setMenNo] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [producerCodeSearch, setProducerCodeSearch] = useState<string>("");
  const { userRole } = useUserAuthContext();
  const router = useRouter();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedAssociation(newValue);
  };

  const setSearchValue = (event: any) => {
    setProducerCodeSearch(event.target.value)
  }

  useEffect(() => {
    switch (userRole) {
      case UserRole.project:
        getAssociations().then((assocs) => setAssociations(assocs));
        return;
    }
  }, [userRole, router]);

  useEffect(() => {
    switch (userRole) {
      case UserRole.project:
        if (associations && selectedAssociation >= 1) {
          getProducersInfoList(associations[selectedAssociation - 1].name).then(
            (data) => {
              setProducers(data.producers);
              setInitialProducers(data.producers);
              setProducersCocoaHa(data.statistics.haCocoa);
              setProducersConservationHa(data.statistics.haForestConservation);
              setProducersStats(data.statistics);
              setMenNo(data.statistics.nrMen);
              setLoading(false);
            }
          );
        } else if (associations && selectedAssociation == 0) {
          getProducersInfoList().then((data) => {
            setProducers(data.producers);
            setInitialProducers(data.producers);
            setProducersCocoaHa(data.statistics.haCocoa);
            setProducersConservationHa(data.statistics.haForestConservation);
            setProducersStats(data.statistics);
            setMenNo(data.statistics.nrMen);
            setLoading(false);
          });
        }
        return;
      case UserRole.association:
        getProducersInfoList().then((data) => {
          setProducers(data.producers);
          setInitialProducers(data.producers);
          setProducersCocoaHa(data.statistics.haCocoa);
          setProducersConservationHa(data.statistics.haForestConservation);
          setProducersStats(data.statistics);
          setMenNo(data.statistics.nrMen);
          setLoading(false);
        });
        return;
    }
  }, [userRole, associations, selectedAssociation]);

  useEffect(() => {
    setProducers(initialProducers.filter(p => p.producerCode.toString().includes(producerCodeSearch)))
  }, [producerCodeSearch])

  return (
    <>
      <Head>
        <title>Aurora - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dashboard__container">
        <div>
          <BackButton />
          <div className={`dashboard__cards  dashboard__cards--main`}>
            <CardOne
              backgroundColor="#d0741a"
              number={producersStats?.nrCocoaProducers}
              text={t('number_producers')}
              icon={'/assets/farmer.png'}
              loading={loading}
              alt={'Producers'}
            />
            <CardTwo
              backgroundColor="#f1852d"
              number={producersStats?.nrYoungMen}
              text={t('number_men_under_30')}
              icon={'/assets/man.png'}
              loading={loading}
              alt={'Men'}
            />
            <CardThree
              backgroundColor="#964514"
              number={producersStats?.nrWomen}
              text={t('number_women')}
              icon={'/assets/woman.png'}
              loading={loading}
              alt={'Women'}
              maxIconWidth="145px"
            />
          </div>
        </div>
        <div className="dashboard__container-info">
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <input className="dashboard__search" type="text" placeholder={t("search") ?? ""} onChange={setSearchValue}/>
          </div>
          {associations ? (
            <Tabs
              value={selectedAssociation}
              onChange={handleChange}
              variant="scrollable"
              TabIndicatorProps={{
                style: { display: 'none' },
              }}
              TabScrollButtonProps={{
                style: { display: 'flex' },
              }}
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab key={-1} label={t("home.all")} style={{ marginBottom: 10 }} />
              {associations.map((item, index) => (
                <Tab
                  key={index}
                  label={item.name}
                  style={{ marginBottom: 10 }}
                />
              ))}
            </Tabs>
          ) : (
            ''
          )}
          <div className="dashboard__cards">
            {producers ? (
              <div className="dashboard__charts-production">
                <ProducersTable producers={producers} />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="dashboard__charts">
            <div className="dashboard__charts-sales">
              {producers && producersStats ? (
                <PieChart
                  title={t('producers.men_vs_women')}
                  labels={[t('producers.men'), t('producers.women')]}
                  datas={[menNo, producersStats?.nrWomen ?? 0]}
                  colors={['#f39a1a', '#cb6324']}
                  backgroundColor="#964514"
                />
              ) : (
                ''
              )}
            </div>
            <div className="dashboard__charts-sales">
              <PieChart
                title={t('producers.cocoa_vs_conservation')}
                labels={[t('producers.cocoa'), t('producers.conservation')]}
                datas={[producersCocoaHa, producersConservationHa]}
                colors={['#f39a1a', '#a3411b']}
                backgroundColor="#d0741a"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
