import { t } from 'i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { useCallback, useEffect, useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import CardFive from '@/components/core/cards/CardFive';
import CardFour from '@/components/core/cards/CardFour';
import CardOne from '@/components/core/cards/CardOne';
import CardThree from '@/components/core/cards/CardThree';
import CardTwo from '@/components/core/cards/CardTwo';
import BarChart from '@/components/core/charts/BarChart';
import LineChart from '@/components/core/charts/LineChart';
import HarvestingModal from '@/components/core/modals/HarvestingModal';
import AvailableBatchesTable from '@/components/core/tables/AvailableBatchesTable';
import { useLoadingStateContext } from '@/providers/LoadingStateContext';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { useYearFilterContext } from '@/providers/YearFilterProvider';
import { getUserAssociation } from '@/services/auth';
import { getBatchesWithAuth, getBatchesWithoutAuth } from '@/services/batch';
import { getDepartments } from '@/services/department';
import {
  getPriceOfOrganicCocoaGraph,
  getProductionByOriginGraph,
  getProductionPerAssociationsGraph,
  getProductionPerRegionsGraph,
  getTotalPulpGraph,
  getTotalSalesGraph,
  getTotalSalesKgGraph,
} from '@/services/graphics';
import { associations } from '@/util/constants/associations';
import { UserRole } from '@/util/constants/users';
import { convertToMonthYearDate } from '@/util/format/date';
import { Association } from '@/util/models/BasicAssociation';
import { Department } from '@/util/models/BasicDepartment';
import { BasicAvailableBatch } from '@/util/models/Batch/BasicAvailableBatch';
import { Batch } from '@/util/models/Batch/Batch';
import { BatchStatistics } from '@/util/models/Batch/BatchStatistics';
import { Dataset } from '@/util/models/Dataset';
import { PaginationOptions } from '@/util/models/Pagination';
import { ProducersStatistics } from '@/util/models/Producer/ProducersStatistics';

const Home = () => {
  const { i18n } = useTranslation('translation');
  const [selectedDepartment, setSelectedDepartment] = useState(0);

  // Default to current year.
  const { selectedYear } = useYearFilterContext();

  // Loading Context
  const { isLoading, setLoading } = useLoadingStateContext();

  const [departments, setDepartments] = useState<Department[]>([]);
  const { userRole } = useUserAuthContext();
  const [producersStats, setProducersStats] = useState<ProducersStatistics>();
  const [availableBatches, setAvailableBatches] = useState<any>(null);
  const [batchStatistics, setBatchStatistics] = useState<BatchStatistics>();
  const [availableWeight, setAvailableWeight] = useState<number | undefined>();
  const [soldBatches, setSoldBatches] = useState<number | undefined>();
  const [salesInUsd, setSalesInUsd] = useState<Dataset[]>([]);
  const [salesInKg, setSalesInKg] = useState<Dataset[]>([]);
  const [priceCocoa, setPriceCocoa] = useState<Dataset[]>([]);
  const [pulpCocoaCollected, setPulpCocoaCollected] = useState<Dataset[]>([]);
  const [productionPerAssoc, setProductionPerAssoc] = useState<Dataset[]>([]);
  const [productionPerRegion, setProductionPerRegion] = useState<Dataset[]>([]);
  const [currentAssociation, setCurrentAssociation] = useState<Association>();
  const [pagination, setPagination] = useState<PaginationOptions>({
    index: 0,
    limit: 5,
  });
  const [totalEntries, setTotalEntries] = useState(0);
  const [openHarvestingModal, setOpenHarvestingModal] =
    useState<boolean>(false);
  const router = useRouter();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedDepartment(newValue);
  };

  const handleOpenHarvestingModal = () => {
    setOpenHarvestingModal(true);
  };

  const handleCloseHarvestingModal = () => {
    setOpenHarvestingModal(false);
  };

  const routeToAboutPage = useCallback(() => {
    router.push('/about-aurora');
  }, [router]);

  const updatePagination = useCallback(
    (newOptions: PaginationOptions) => {
      setPagination(newOptions);
    },
    [setPagination]
  );

  useEffect(() => {
    if (userRole && userRole === UserRole.buyer) {
      getDepartments().then((data) => {
        setDepartments(data);
      });
    }
  }, [userRole]);

  useEffect(() => {
    switch (userRole) {
      case UserRole.project: {
        setLoading(true);
        getBatchesWithAuth().then((data: any) => {
          setProductionPerAssoc(getProductionPerAssociationsGraph(data));
          setProductionPerRegion(getProductionPerRegionsGraph(data));
          setSalesInUsd(getTotalSalesGraph(data));
          setPriceCocoa(getPriceOfOrganicCocoaGraph(data));
          setProducersStats(data.statistics);
          setSoldBatches(data.statistics.kgDryCocoaInternationallySold);
          setAvailableWeight(data.statistics.kgDryCocoaAvailable);
          setLoading(false);
        });
        return;
      }
      case UserRole.buyer: {
        setLoading(true);
        getBatchesWithoutAuth(
          selectedDepartment - 1 >= 0
            ? departments[selectedDepartment - 1].name
            : '',
          pagination,
          selectedYear
        ).then((data: any) => {
          setSalesInKg(
            getTotalSalesKgGraph(data.report.internationalSalesInKg)
          );
          setProductionPerRegion(getProductionByOriginGraph(data));
          setAvailableBatches(
            data.searchBatchesResult.data.map(
              (b: Batch) =>
                new BasicAvailableBatch(
                  b.code,
                  b.storage.netWeight,
                  b.fermentationPhase.cocoaType,
                  b.fermentationPhase.startDate,
                  b.fermentationPhase.humidity,
                  b.storage.grainIndex,
                  b.storage.sensoryProfile
                )
            )
          );
          setBatchStatistics(data.statistics);
          setTotalEntries(data.searchBatchesResult.totalEntries);
          setLoading(false);
        });
        return;
      }
      case UserRole.association: {
        setLoading(true);
        getBatchesWithAuth().then((data: any) => {
          setProductionPerAssoc(getProductionPerAssociationsGraph(data));
          setSalesInKg(getTotalSalesKgGraph(data.report.salesInKg));
          setSalesInUsd(getTotalSalesGraph(data));
          setPulpCocoaCollected(
            getTotalPulpGraph(data.report.monthlyCocoaPulp)
          );
          getUserAssociation().then((a) => setCurrentAssociation(a));
          setProducersStats(data.statistics);
          setSoldBatches(data.statistics.kgDryCocoaInternationallySold);
          setAvailableWeight(data.statistics.kgDryCocoaAvailable);
          setLoading(false);
        });
        return;
      }
    }
  }, [userRole, selectedDepartment, pagination]);

  useEffect(() => {
    setPagination({
      index: 0,
      limit: 5,
    });
  }, [selectedYear]);

  return (
    <>
      <Head>
        <title>Aurora - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logos/Aurora.png" />
      </Head>
      <div className="dashboard__container">
        <div className="dashboard__container_header">
          {userRole == UserRole.association &&
          associations.includes(
            currentAssociation?.name.toLowerCase() ?? ''
          ) ? (
            <Image
              width={200}
              height={0}
              style={{ height: 'auto', cursor: 'pointer' }}
              className="dashboard__logo"
              onClick={routeToAboutPage}
              src={`/assets/logos/${currentAssociation?.name.toLowerCase()}.png`}
              alt="Aurora"
            />
          ) : (
            <Image
              width={200}
              height={234}
              style={{ cursor: 'pointer' }}
              className="dashboard__logo"
              onClick={routeToAboutPage}
              src={'/assets/logos/Aurora.png'}
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
                  loading={isLoading}
                  alt={''}
                />
              </button>
              <button onClick={() => router.push('/batches/sold')}>
                <CardTwo
                  backgroundColor="#f39a1a"
                  number={soldBatches}
                  text={t('sold_international_market')}
                  icon={'/assets/kilogram.png'}
                  loading={isLoading}
                  alt={''}
                />
              </button>
              {userRole == UserRole.project ? (
                <>
                  <button
                    className={'dashboard__download-button'}
                    onClick={handleOpenHarvestingModal}
                  >
                    {t('buttons.set_next_harvesting')}
                  </button>
                  <HarvestingModal
                    open={openHarvestingModal}
                    onClose={handleCloseHarvestingModal}
                  ></HarvestingModal>
                </>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="dashboard__container-info">
          {userRole == UserRole.buyer ? (
            <div className="dashboard__cards home_cards">
              <CardOne
                backgroundColor="#d0741a"
                number={batchStatistics?.nrCocoaProducers}
                text={t('number_producers')}
                icon={'/assets/farmer.png'}
                loading={isLoading}
                alt={'Producers'}
              />
              <CardTwo
                backgroundColor="#f1852d"
                number={batchStatistics?.kgDryCocoaAvailable}
                text={t('dry_cocoa_available')}
                icon={'/assets/kilogram.png'}
                loading={isLoading}
                alt={''}
              />
              <CardFour
                backgroundColor="#f39a1a"
                number={batchStatistics?.haForestConservation}
                text={t('ha_forest_conservation')}
                icon={'/assets/forest.png'}
                loading={isLoading}
                alt={'Forest'}
              />
              <CardFive
                backgroundColor="#f1852d"
                number={
                  selectedDepartment
                    ? convertToMonthYearDate(
                        departments[selectedDepartment - 1]?.nextHarvest,
                        i18n.language
                      )
                    : new Date(
                        Math.min(
                          ...departments.map((dep) =>
                            new Date(dep.nextHarvest).getTime()
                          )
                        )
                      ).toLocaleString(i18n.language, {
                        month: 'long',
                        year: 'numeric',
                      })
                }
                text={
                  selectedDepartment
                    ? `${t('home.next_harvest_in')} ${
                        departments[selectedDepartment - 1]?.name
                      }`
                    : t('home.next_harvest')
                }
                icon={'/assets/cocoa.png'}
                loading={isLoading}
                alt={''}
              />
            </div>
          ) : (
            <div className="dashboard__cards home_cards">
              <button onClick={() => router.push('/producers')}>
                <CardOne
                  backgroundColor="#d0741a"
                  number={producersStats?.nrCocoaProducers}
                  text={t('number_producers')}
                  icon={'/assets/farmer.png'}
                  loading={isLoading}
                  alt={'Producers'}
                />
              </button>
              <CardTwo
                backgroundColor="#f1852d"
                number={producersStats?.nrYoungMen}
                text={t('number_men_under_30')}
                icon={'/assets/man.png'}
                loading={isLoading}
                alt={'Men'}
              />
              <CardThree
                backgroundColor="#964514"
                number={producersStats?.nrWomen}
                text={t('number_women')}
                icon={'/assets/woman.png'}
                loading={isLoading}
                alt={'Women'}
                maxIconWidth="145px"
              />
              <CardFour
                backgroundColor="#f39a1a"
                number={producersStats?.haForestConservation}
                text={t('ha_forest_conservation')}
                icon={'/assets/cocoa.png'}
                loading={isLoading}
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
                          title={
                            !isNaN(selectedDepartment) &&
                            selectedDepartment > 0 &&
                            departments.length > selectedDepartment - 1
                              ? t('home.international_sales_kg_in') +
                                ` ${departments[selectedDepartment - 1].name}`
                              : t('home.international_sales_kg')
                          }
                          datasets={salesInKg}
                          backgroundColor="#96451495"
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
            <Tab key={-1} label={t('home.all')} style={{ marginBottom: 10 }} />
            {departments.map((item, index) => (
              <Tab key={index} label={item.name} style={{ marginBottom: 10 }} />
            ))}
          </Tabs>
          <div className="dashboard__cards">
            <div className="dashboard__charts-production">
              {selectedDepartment >= 0 ? (
                <AvailableBatchesTable
                  batches={availableBatches}
                  pagination={pagination}
                  updatePagination={updatePagination}
                  loading={isLoading}
                  totalEntries={totalEntries}
                />
              ) : (
                <AvailableBatchesTable
                  batches={undefined}
                  pagination={pagination}
                  updatePagination={updatePagination}
                  loading={isLoading}
                  totalEntries={totalEntries}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Home;
