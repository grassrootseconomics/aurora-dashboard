import { t } from 'i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import CardFive from '@/components/core/cards/CardFive';
import CardFour from '@/components/core/cards/CardFour';
import CardOne from '@/components/core/cards/CardOne';
import CardThree from '@/components/core/cards/CardThree';
import CardTwo from '@/components/core/cards/CardTwo';
import BarChart from '@/components/core/charts/BarChart';
import LineChart from '@/components/core/charts/LineChart';
import AvailableBatchesTable from '@/components/core/tables/AvailableBatchesTable';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { getUserAssociation } from '@/services/auth';
import {
  getAvailableBatches,
  getAvailableBatchesForBuyer,
  getAvailableBatchesStatisticsForBuyer,
  getBatchesWithAuth,
  getBatchesWithoutAuth,
  getSoldBatches,
} from '@/services/batch';
import { getDepartments } from '@/services/department';
import {
  getPriceOfOrganicCocoaGraph,
  getProductionByOriginGraph,
  getProductionPerAssociationsGraph,
  getProductionPerRegionsGraph,
  getTotalPulpGraph,
  getTotalSalesForBuyerGraph,
  getTotalSalesGraph,
  getTotalSalesKgGraph,
} from '@/services/graphics';
import { UserRole } from '@/util/constants/users';
import { Association } from '@/util/models/BasicAssociation';
import { Department } from '@/util/models/BasicDepartment';
import { BatchStatistics } from '@/util/models/Batch/BatchStatistics';
import { Dataset } from '@/util/models/Dataset';
import { ProducersStatistics } from '@/util/models/Producer/ProducersStatistics';

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [departments, setDepartments] = useState<Department[]>([]);
  const { userRole } = useUserAuthContext();
  const [producersStats, setProducersStats] = useState<ProducersStatistics>();
  const [availableBatches, setAvailableBatches] = useState<any>(null);
  const [batchStatistics, setBatchStatistics] = useState<BatchStatistics>();
  const [availableWeight, setAvailableWeight] = useState<any>();
  const [soldBatches, setSoldBatches] = useState<any>(null);
  const [salesInUsd, setSalesInUsd] = useState<Dataset[]>([]);
  const [salesInKg, setSalesInKg] = useState<Dataset[]>([]);
  const [priceCocoa, setPriceCocoa] = useState<Dataset[]>([]);
  const [pulpCocoaCollected, setPulpCocoaCollected] = useState<Dataset[]>([]);
  const [productionPerAssoc, setProductionPerAssoc] = useState<Dataset[]>([]);
  const [productionPerRegion, setProductionPerRegion] = useState<Dataset[]>([]);
  const [currentAssociation, setCurrentAssociation] = useState<Association>();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDepartment(newValue);
  };

  useEffect(() => {
    console.log(userRole);
    switch (userRole) {
      case UserRole.project: {
        getBatchesWithAuth().then((data) => {
          setProductionPerAssoc(getProductionPerAssociationsGraph(data));
          setProductionPerRegion(getProductionPerRegionsGraph(data));
          setSalesInUsd(getTotalSalesGraph(data));
          setPriceCocoa(getPriceOfOrganicCocoaGraph(data));
          setProducersStats(data.statistics);
        });

        getSoldBatches().then((data) => {
          setSoldBatches(data.kgDryCocoaSold);
        });

        getAvailableBatches().then((data) => {
          setAvailableBatches(data.basicBatches);
          setAvailableWeight(data.kgDryCocoaAvailable);
        });
        return;
      }
      case UserRole.buyer: {
        getAvailableBatchesForBuyer(
          selectedDepartment - 1 >= 0
            ? departments[selectedDepartment - 1].name
            : undefined
        ).then((batches) => {
          setAvailableBatches(batches);
        });

        getAvailableBatchesStatisticsForBuyer(
          selectedDepartment - 1 >= 0
            ? departments[selectedDepartment - 1].name
            : undefined
        ).then((stats) => {
          setBatchStatistics(stats);
        });

        getBatchesWithoutAuth().then((data) => {
          setSalesInUsd(
            getTotalSalesForBuyerGraph(
              data,
              selectedDepartment - 1 >= 0
                ? departments[selectedDepartment - 1]
                : undefined
            )
          );
          setProductionPerRegion(
            getProductionByOriginGraph(
              data,
              selectedDepartment - 1 >= 0
                ? departments[selectedDepartment - 1]
                : undefined
            )
          );
        });

        getDepartments().then((data) => {
          setDepartments(data);
        });
        return;
      }
      case UserRole.association: {
        getBatchesWithAuth().then((data) => {
          setProductionPerAssoc(getProductionPerAssociationsGraph(data));
          setSalesInKg(getTotalSalesKgGraph(data.report.salesInKg));
          setSalesInUsd(getTotalSalesGraph(data));
          setPulpCocoaCollected(
            getTotalPulpGraph(data.report.monthlyCocoaPulp)
          );
          getUserAssociation().then((a) => setCurrentAssociation(a));
          setProducersStats(data.statistics);
        });

        getSoldBatches().then((data) => {
          setSoldBatches(data.kgDryCocoaSold);
        });

        getAvailableBatches().then((data) => {
          setAvailableBatches(data.basicBatches);
          setAvailableWeight(data.kgDryCocoaAvailable);
        });
        return;
      }
    }
  }, [userRole, selectedDepartment]);

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
          {userRole == UserRole.association ? (
            <Image
              width={200}
              height={0}
              style={{ height: 'auto' }}
              className="dashboard__logo"
              src={`/assets/logos/${currentAssociation?.name}.png`}
              alt="Aurora"
            />
          ) : (
            <Image
              width={200}
              height={234}
              className="dashboard__logo"
              src={'/assets/logos/aurora.png'}
              alt="Aurora"
            />
          )}
          {userRole != UserRole.buyer || undefined ? (
            <div className="dashboard__cards dashboard__cards--main">
              <button onClick={() => router.push('/batches/availables')}>
                <CardTwo
                  backgroundColor="#f1852d"
                  number={availableWeight}
                  text={t('dry_cocoa_available')}
                  icon={'/assets/kilogram.png'}
                  alt={''}
                />
              </button>
              <button onClick={() => router.push('/batches/sold')}>
                <CardTwo
                  backgroundColor="#f39a1a"
                  number={soldBatches}
                  text={t('sold_international_market')}
                  icon={'/assets/kilogram.png'}
                  alt={''}
                />
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="dashboard__container-info">
          {userRole == UserRole.buyer ? (
            <div className="dashboard__cards">
              <CardOne
                backgroundColor="#d0741a"
                number={batchStatistics?.nrCocoaProducers}
                text={t('number_producers')}
                icon={'/assets/farmer.png'}
                alt={'Producers'}
              />
              <CardTwo
                backgroundColor="#f1852d"
                number={batchStatistics?.kgDryCocoaAvailable}
                text={t('dry_cocoa_available')}
                icon={'/assets/kilogram.png'}
                alt={''}
              />
              <CardFour
                backgroundColor="#f39a1a"
                number={batchStatistics?.haForestConservation}
                text={t('ha_forest_conservation')}
                icon={'/assets/forest.png'}
                alt={'Forest'}
              />
              <CardFive
                backgroundColor="#f1852d"
                number={'Mayo 200'}
                text={
                  selectedDepartment
                    ? `${t('home.next_harvest_in')} ${
                        departments[selectedDepartment - 1]?.name
                      }`
                    : t('home.next_harvest')
                }
                icon={'/assets/cocoa.png'}
                alt={''}
              />
            </div>
          ) : (
            <div className="dashboard__cards">
              <button onClick={() => router.push('/producers')}>
                <CardOne
                  backgroundColor="#d0741a"
                  number={producersStats?.nrCocoaProducers}
                  text={t('number_producers')}
                  icon={'/assets/farmer.png'}
                  alt={'Producers'}
                />
              </button>
              <CardTwo
                backgroundColor="#f1852d"
                number={producersStats?.nrYoungMen}
                text={t('number_men_under_30')}
                icon={'/assets/man.png'}
                alt={'Men'}
              />
              <CardThree
                backgroundColor="#964514"
                number={producersStats?.nrWomen}
                text={t('number_women')}
                icon={'/assets/woman.png'}
                alt={'Women'}
                maxIconWidth="145px"
              />
              <CardFour
                backgroundColor="#f39a1a"
                number={producersStats?.haForestConservation}
                text={t('ha_forest_conservation')}
                icon={'/assets/cocoa.png'}
                alt={'Forest'}
              />
            </div>
          )}
          <div className="dashboard__charts">
            {(() => {
              switch (userRole) {
                case UserRole.buyer:
                  return (
                    <>
                      <div className="dashboard__charts-production">
                        <BarChart
                          title={t('home.production_by_region')}
                          datasets={productionPerRegion}
                          backgroundColor="#f39a1a98"
                        />
                      </div>
                      <div className="dashboard__charts-sales">
                        <LineChart
                          title={t('home.total_sales_usd')}
                          datasets={salesInUsd}
                          backgroundColor="#c9732190"
                        />
                      </div>
                    </>
                  );
                case UserRole.association:
                  return (
                    <>
                      <div className="dashboard__charts-production">
                        <LineChart
                          title={t('home.production_of_dry_cocoa')}
                          datasets={productionPerAssoc}
                          backgroundColor="#c9732190"
                        />
                        <BarChart
                          title={t('home.cocoa_pulp_collected')}
                          datasets={pulpCocoaCollected}
                          backgroundColor="#f39a1a98"
                        />
                      </div>
                      <div className="dashboard__charts-sales">
                        <BarChart
                          title={t('home.sales_kg')}
                          datasets={salesInKg}
                          backgroundColor="#96451495"
                        />
                        <LineChart
                          title={t('home.total_sales_usd')}
                          datasets={salesInUsd}
                          backgroundColor="#c9732190"
                        />
                      </div>
                    </>
                  );
                case UserRole.project:
                  return (
                    <>
                      <div className="dashboard__charts-production">
                        <BarChart
                          title={t('home.production_by_association')}
                          datasets={productionPerAssoc}
                          backgroundColor="#f39a1a98"
                        />
                        <BarChart
                          title={t('home.production_by_region')}
                          datasets={productionPerRegion}
                          backgroundColor="#96451495"
                        />
                      </div>
                      <div className="dashboard__charts-sales">
                        <LineChart
                          title={t('home.usd_price_organic_cocoa')}
                          datasets={priceCocoa}
                          backgroundColor="#c9732190"
                        />
                        <LineChart
                          title={t('home.total_sales_usd')}
                          datasets={salesInUsd}
                          backgroundColor="#c9732190"
                        />
                      </div>
                    </>
                  );
              }
            })()}
          </div>
        </div>
      </div>
      {userRole == UserRole.buyer ? (
        <div className="dashboard__table">
          <Tabs
            value={selectedDepartment}
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
            <Tab key={-1} label={'All'} style={{ marginBottom: 10 }} />
            {departments.map((item, index) => (
              <Tab key={index} label={item.name} style={{ marginBottom: 10 }} />
            ))}
          </Tabs>
          <div className="dashboard__cards">
            <div className="dashboard__charts-production">
              {selectedDepartment >= 0 ? (
                <AvailableBatchesTable batches={availableBatches} />
              ) : (
                <AvailableBatchesTable />
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
