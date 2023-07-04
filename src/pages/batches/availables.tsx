import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

import { Tab, Tabs } from '@mui/material';

import { BackButton } from '@/components/core/buttons/BackButton';
import CardTwo from '@/components/core/cards/CardTwo';
import BarChart from '@/components/core/charts/BarChart';
import LineChart from '@/components/core/charts/LineChart';
import AvailableBatchesTable from '@/components/core/tables/AvailableBatchesTable';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { getAssociations } from '@/services/association';
import { downloadBatchesInExcel, getAvailableBatches } from '@/services/batch';
import {
  getProductionOfDryCocoa,
  getTotalPulpGraph,
} from '@/services/graphics';
import { UserRole } from '@/util/constants/users';
import { Association } from '@/util/models/BasicAssociation';
import { BasicAvailableBatch } from '@/util/models/Batch/BasicAvailableBatch';
import { Dataset } from '@/util/models/Dataset';

export default function AvailableBatches() {
  const { t } = useTranslation('translation');
  const [associations, setAssociations] = useState<Association[]>();
  const [selectedAssociation, setSelectedAssociation] = useState<number>(0);
  const [availableWeight, setAvailableWeight] = useState<any>();
  const [availableBatches, setAvailableBatches] = useState<
    BasicAvailableBatch[]
  >([]);
  const [initialAvailableBatches, setInitialAvailableBatches] = useState<
    BasicAvailableBatch[]
  >([]);
  const [totalPulpCollected, setTotalPulpCollected] = useState<Dataset[]>([]);
  const [dryCocoaProduction, setDryCocoaProduction] = useState<Dataset[]>();
  const [batchCodeSearch, setBatchCodeSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { userRole } = useUserAuthContext();

  const router = useRouter();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedAssociation(newValue);
  };

  const setSearchValue = (event: any) => {
    setBatchCodeSearch(event.target.value)
  }

  const downloadAvailableBatches = async () => {
    try {
      const response = await downloadBatchesInExcel(false);

      // Save the Blob response as a file using FileSaver.js
      saveAs(response.data, "Available Batches");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userRole && userRole === 'buyer') {
      router.push('/');
    }
  }, [userRole, router]);

  useEffect(() => {
    if (userRole)
      switch (userRole) {
        case UserRole.project:
          getAssociations().then((assocs) => setAssociations(assocs));
          if (associations && selectedAssociation >= 1) {
            getAvailableBatches(
              associations[selectedAssociation - 1].name
            ).then((data) => {
              setAvailableBatches(data.basicBatches);
              setAvailableWeight(data.kgDryCocoaAvailable);
              setDryCocoaProduction(
                getProductionOfDryCocoa(data.productionOfDryCocoa)
              );
              setTotalPulpCollected(getTotalPulpGraph(data.monthlyCocoaPulp));
              setLoading(false);
            });
          } else if (associations && selectedAssociation == 0) {
            getAvailableBatches().then((data) => {
              setAvailableBatches(data.basicBatches);
              setAvailableWeight(data.kgDryCocoaAvailable);
              setDryCocoaProduction(
                getProductionOfDryCocoa(data.productionOfDryCocoa)
              );
              setTotalPulpCollected(getTotalPulpGraph(data.monthlyCocoaPulp));
              setLoading(false);
            });
          }
          return;
        case UserRole.association:
          getAvailableBatches().then((data) => {
            setAvailableBatches(data.basicBatches);
            setInitialAvailableBatches(data.basicBatches);
            setAvailableWeight(data.kgDryCocoaAvailable);
            setDryCocoaProduction(
              getProductionOfDryCocoa(data.productionOfDryCocoa)
            );
            setTotalPulpCollected(getTotalPulpGraph(data.monthlyCocoaPulp));
            setLoading(false);
          });
          return;
      }
  }, [userRole, associations, selectedAssociation]);


  useEffect(() => {
    setAvailableBatches(initialAvailableBatches.filter(b => b.batch.includes(batchCodeSearch)))
  }, [batchCodeSearch])

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
            <CardTwo
              backgroundColor="#f1852d"
              number={availableWeight}
              text={t('dry_cocoa_available')}
              icon={'/assets/kilogram.png'}
              loading={loading}
              alt={'Kilogram'}
            />
            <button className={"dashboard__download-button"} onClick={downloadAvailableBatches}>{t("buttons.download_available_batches")}</button>
          </div>
        </div>
        <div className="dashboard__container-info">
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <input className="dashboard__search" type="text" placeholder={t("search") ?? ""} onChange={setSearchValue}/>
          </div>
          {associations && userRole == UserRole.project ? (
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
            <div className="dashboard__charts-production">
              {availableBatches ? (
                <AvailableBatchesTable batches={availableBatches} />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="dashboard__charts">
            {totalPulpCollected ? (
              <div className="dashboard__charts-sales">
                <BarChart
                  title={t('cocoa_pulp_collected')}
                  datasets={totalPulpCollected}
                  backgroundColor="#f39a1a98"
                />
              </div>
            ) : (
              ''
            )}
            {dryCocoaProduction ? (
              <div className="dashboard__charts-sales">
                <LineChart
                  title={t('dry_cocoa_production')}
                  datasets={dryCocoaProduction}
                  backgroundColor="#c9732190"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}
