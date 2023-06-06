import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import CardTwo from '@/components/core/cards/CardTwo';
import BarChart from '@/components/core/charts/BarChart';
import LineChart from '@/components/core/charts/LineChart';
import SoldBatchesTable from '@/components/core/tables.tsx/SoldBatchesTable';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { Dataset } from '@/util/models/Dataset';

export default function SoldAvailables() {
  const { t } = useTranslation('translation');
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [value, setValue] = React.useState(0);
  const { isAuthenticated } = useUserAuthContext();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
    setDatasets([
      new Dataset(
        'CocoaAralambis',
        [1221, 1321, 543, 443, 543, 45, 0, 0, 10, 30],
        '#d43564'
      ),
      new Dataset(
        'Comboa',
        [221, 2321, 673, 223, 243, 75, 20, 0, 0, 0],
        '#a03564'
      ),
    ]);
  }, [isAuthenticated, router]);

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
          <div className={`dashboard__cards`}>
            <CardTwo
              backgroundColor="#d0741a"
              number={200}
              text={t('sold_international_market')}
              icon={`/assets/kilogram.png`}
              alt={'Kilogram'}
            />
          </div>
        </div>
        <div className="dashboard__container-info">
          <Tabs
            value={value}
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
            <Tab label="Consolidado" style={{ marginBottom: 10 }} />
            <Tab label="Comcap" style={{ marginBottom: 10 }} />
            <Tab label="Asoacasan" style={{ marginBottom: 10 }} />
            <Tab label="Aprocalg" style={{ marginBottom: 10 }} />
            <Tab label="Asocagigante" style={{ marginBottom: 10 }} />
            <Tab label="Asopeca" style={{ marginBottom: 10 }} />
          </Tabs>
          <div className="dashboard__cards">
            <div className="dashboard__charts-production">
              <SoldBatchesTable />
            </div>
          </div>
          <div className="dashboard__charts">
            <div className="dashboard__charts-sales">
              <BarChart
                title={t('production_by_association')}
                datasets={datasets}
                backgroundColor="#f39a1a98"
              />
            </div>
            <div className="dashboard__charts-sales">
              <LineChart
                title={t('total_sales_usd')}
                datasets={datasets}
                backgroundColor="#c9732190"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
