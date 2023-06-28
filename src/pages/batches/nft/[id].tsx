import CardFour from '@/components/core/cards/CardFour';
import CardOne from '@/components/core/cards/CardOne';
import NftBarChart from '@/components/core/charts/NftBarChart';
import { Dataset } from '@/util/models/Dataset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './../../../styles/Nft.module.scss'
import Flag from 'react-world-flags'
import { countryList } from '@/util/constants/countries';
import { useRouter } from 'next/router';
import { fetchNFTModel } from '@/services/nft';
import { BatchNft } from '@/util/models/nft';
import FlipsTableNft from '@/components/core/nft/FlipsTableNft';
import DailyReportsTableNft from '@/components/core/nft/DailyReportsTableNft';
import { convertToSimpleDate } from '@/util/format/date';
import { fetchNFTMetadata } from '@/util/celo';
import Image from 'next/image';

const NFT = () => {
    const { t, i18n } = useTranslation('translation');
    const router = useRouter();
    const { id }  = router.query;
    const [ nftModel, setNftModel] = useState<BatchNft | null>(null);

    const getNFTMetadata = async () => {
         const metadata = await fetchNFTMetadata("0");
         console.log(metadata)
         const nftModel = await fetchNFTModel("metadata.ToString()");
         setNftModel(nftModel);
      };
    
    useEffect(() => {
        if(id) {
            getNFTMetadata();
        }
    }, [id]);
  
    return <>
        {
            nftModel ?
                <div className={styles.container}>
                    <div className={styles.assocLogo}>
                        <Image width={200} height={150} src={`/assets/logos/${nftModel.assocDetails.name}.png`} alt="Association" />
                    </div>

                    <div className={styles.title}>{t("nft.assoc_title")}</div>

                    <div className={styles.table}>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.name")}</div>
                            <div className={styles.tableValue}>{nftModel.assocDetails.name}</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.department")}</div>
                            <div className={styles.tableValue}>{nftModel.assocDetails.department}</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.town")}</div>
                            <div className={styles.tableValue}>{nftModel.assocDetails.town}</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.no_associates")}</div>
                            <div className={styles.tableValue}>{nftModel.assocDetails.nrOfAssociates}</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.women_percentage")}</div>
                            <div className={styles.tableValue}>{+Number(nftModel.assocDetails.nrOfWomen / nftModel.assocDetails.nrOfAssociates).toFixed(4) * 100}%</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.young_percentage")}</div>
                            <div className={styles.tableValue}>{+Number(nftModel.assocDetails.nrOfYoungPeople / nftModel.assocDetails.nrOfAssociates).toFixed(4) * 100}%</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.achivements_text")}</div>
                            <div className={styles.tableValue}>{nftModel.assocDetails.story}</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.years_existence")}</div>
                            <div className={styles.tableValue}>{nftModel.assocDetails.yearsOfExistence}</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableProp}>{t("nft.certifications")}</div>
                            <div className={styles.tableValue}>{nftModel.assocDetails.certifications}</div>
                        </div>
                    </div>

                    <div className={styles.title}>{t("nft.region_information")}</div>

                    <div className={styles.tableRow}>
                        <Image width={200} height={150} className={styles.colombia_map} src="/assets/nft/colombia_map.svg" alt="Colombia Map" />
                        <div className={styles.tableValue}>{nftModel.assocDetails.regionInformationL}</div>
                    </div>

                    <div className={styles.title}>{t("nft.batch_information")}</div>

                    <div className={styles.tableRow}>
                        <div className={styles.infoContainer}>{t("nft.batch_code")}: {nftModel.batchDetails.code}</div>
                        <div className={styles.infoContainersRow}>
                            <div className={styles.infoContainer}>{t("nft.type_cocoa")}: {nftModel.batchDetails.cocoaType}</div>
                            <div className={styles.infoContainer}>{t("nft.total_net_weight")}: {nftModel.batchDetails.totalNetWeight}</div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.batchColumn}>
                            <div className={styles.infoContainer}>{t("nft.processing_date")}: {convertToSimpleDate(nftModel.batchDetails.processingDate)}</div>
                            <div className={styles.infoContainer}>{t("nft.humidity_percentage")}: {nftModel.batchDetails.humidityPercentage}</div>
                            <div className={styles.infoContainer}>{t("nft.grain_index")}: {nftModel.batchDetails.grainIndex}</div>
                            <div className={styles.infoContainer}>{t("nft.fermentation_days")}: {nftModel.batchDetails.fermentationDays}</div>
                            <div className={styles.infoContainer}>{t("nft.fermentation_model")}: {nftModel.batchDetails.fermentationModeL}</div>
                            <div className={styles.infoContainer}>{t("nft.conversion_factor")}: {nftModel.batchDetails.conversionFactor}</div>
                        </div>
                        <Image width={100} height={50} className={styles.batchInfoImage} src="/assets/nft/batch_info_image.png" alt="Batch Info" />
                    </div>

                    <div className={styles.sensoryProfiling}>{t("nft.sensory_profiling")}</div>
                    
                    <div className={styles.batchInfo}>
                        <div className={styles.batchScore}>
                            <div className={styles.batchScoreTitle}>
                                {t("nft.score")}
                            </div>
                            <div className={styles.batchScoreGrade}>
                                {nftModel.batchDetails.score}
                            </div>
                        </div>
                        <div className={styles.batchDescription}>
                        {nftModel.batchDetails.sensoryProfile}

                        </div>
                    </div>

                    <div className={styles.title}>{t("nft.traceability_process")}</div>
                    <Image width={900} height={50} alt={t("nft.traceability_process")} className={styles.image} src={`/assets/nft/traceability-${i18n.language}.png`} />

                    <div className={styles.processTitle}>
                        <span className={styles.processNumber}>1</span> {t("nft.producers")}
                    </div>

                    <div className={styles.processContainer}>
                        <div className={styles.row}>
                            <div>
                                <div className={styles.producersCards}>
                                    <CardOne
                                        backgroundColor="#F1852D"
                                        number={nftModel.traceDetails.producers.haCocoa}
                                        text={t('producers.cocoa_ha')}
                                        icon={'/assets/cocoa.png'}
                                        loading={false}
                                        alt={'Cocoa Ha'}
                                        class="card__container--nft"
                                    />
                                    <CardFour
                                        backgroundColor="#f39a1a"
                                        number={nftModel.traceDetails.producers.haConservationForest}
                                        text={t('ha_forest_conservation')}
                                        icon={'/assets/forest.png'}
                                        loading={false}
                                        alt={'Forest Conservation Ha'}
                                        class="card__container--nft"
                                    />                
                                </div>
                                <div className={styles.infoContainer}>{t("nft.identified_varieties")}: {nftModel.traceDetails.producers.identifiedVarieties.join(', ')}</div>
                            </div>
                            <div>
                                <NftBarChart dataset={new Dataset("", [nftModel.traceDetails.producers.nrMen, nftModel.traceDetails.producers.nrWomen], "")}></NftBarChart>
                            </div>
                        </div>
                        <div className={styles.wildlifeLabel}>{t("nft.wildlife")}: </div>
                        <Image width={500} height={50} alt={t("nft.wildlife")} className={styles.image} src="/assets/nft/animals.png" />
                    </div>

                    <div className={styles.processTitle}>
                        <span className={styles.processNumber}>2</span> {t("nft.pulp_harvesting")}
                    </div>

                    <div className={styles.processContainer}>
                        <div className={styles.row}>
                            <div className={styles.infoContainer}>{t("nft.cocoa_harvest_date")}: {convertToSimpleDate(nftModel.traceDetails.harvesting.date)}</div>
                            <div className={styles.infoContainer}>{t("nft.price_kg_cocoa_pulp")}: {nftModel.traceDetails.harvesting.pricePerKgCocoaPulp}</div>
                        </div>
                    </div>

                    <div className={styles.processTitle}>
                        <span className={styles.processNumber}>3</span> {t("nft.fermentation")}
                    </div>

                    <div className={styles.processContainer}>
                        <div className={styles.rowOf3}>
                            <div className={styles.infoContainer}>{t("nft.fermentation_start_date")}: {convertToSimpleDate(nftModel.traceDetails.fermentation.startDate)}</div>
                            <div className={styles.infoContainer}>{t("nft.batch_genetics")}: {nftModel.traceDetails.fermentation.genetics}</div>
                            <div className={styles.infoContainer}>{t("nft.batch_net_weight")}: {nftModel.traceDetails.fermentation.netWeight}</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.infoContainer}>{t("nft.drained_hours")}: {nftModel.traceDetails.fermentation.hoursDrained}</div>
                            <div className={styles.infoContainer}>{t("nft.bx_grain")}: {nftModel.traceDetails.fermentation.bxDegrees}</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.infoContainer}>{t("nft.total_flips")}: {nftModel.traceDetails.fermentation.nrOfFlips}</div>
                            <div className={styles.infoContainer}>{t("nft.days_fermentation_process")}: {nftModel.traceDetails.fermentation.days}</div>
                        </div>  
                            <DailyReportsTableNft fermentationPhase={nftModel.traceDetails.fermentation} />
                            <FlipsTableNft fermentationPhase={nftModel.traceDetails.fermentation} />
                    </div>

                    <div className={styles.processTitle}>
                        <span className={styles.processNumber}>4</span> {t("nft.drying")}
                    </div>

                    <div className={styles.processContainer}>
                        <div className={styles.rowOf3}>
                            <div className={styles.infoContainer}>{t("nft.start_date_drying_phase")}: {convertToSimpleDate(nftModel.traceDetails.drying.startDate)}</div>
                            <div className={styles.infoContainer}>{t("nft.number_days")}: {nftModel.traceDetails.drying.nrOfDays}</div>
                            <div className={styles.infoContainer}>{t("nft.final_humidity")}: {nftModel.traceDetails.drying.finalHumidity}</div>
                        </div>
                    </div>

                    <div className={styles.processTitle}>
                        <span className={styles.processNumber}>5</span> {t("nft.storage")}
                    </div>

                    <div className={styles.processContainer}>
                        <div className={styles.row}>
                            <div className={styles.infoContainer}>{t("nft.start_date_storage_phase")}: {convertToSimpleDate(nftModel.traceDetails.storage.startDate)}</div>
                            <div className={styles.infoContainer}>{t("nft.batch_net_weight")}: {nftModel.traceDetails.storage.batchNetWeight}</div>
                        </div>
                        <div className={styles.rowOf3}>
                            <div className={styles.infoContainer}>{t("nft.batch_conversion_factor")}: {nftModel.traceDetails.storage.conversionFactor}</div>
                            <div className={styles.infoContainer}>{t("nft.batch_fermentation")}: {nftModel.traceDetails.storage.fermentationPercentage}</div>
                            <div className={styles.infoContainer}>{t("nft.batch_grain_index")}: {nftModel.traceDetails.storage.grainIndex}</div>
                        </div>
                    </div>

                    <div className={styles.processTitle}>

                        <span className={styles.processNumber}>6</span> 
                        <div>
                            {t("nft.sales")}
                            <div className={styles.processSubtitle}>{t("nft.purchase_generated_by")}</div>
                        </div>
                    </div>

                    <div className={styles.processContainer}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <div className={styles.infoContainer}>{t("nft.buyer")}: {nftModel.traceDetails.sales.buyer}</div>
                                <div className={styles.infoContainer}>{t("nft.negotiation_term")}: {nftModel.traceDetails.sales.negotiationTerm}</div>
                                <div className={styles.infoContainer}>{t("nft.price_kg")}: {nftModel.traceDetails.sales.pricePerKg}</div>
                                <div className={styles.infoContainer}>{t("nft.lot")}: {nftModel.traceDetails.sales.lot}</div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.salesRow}>
                                    {
                                        countryList?.find(c => c.name == nftModel.traceDetails.sales.country)?.code ? 
                                            <Flag code={ countryList?.find(c => c.name == nftModel.traceDetails.sales.country)?.code } />
                                            : <div></div>
                                    }
                                    <div className={styles.infoContainer}>{t("nft.country")}: {nftModel.traceDetails.sales.country}</div>
                                </div>
                                <div className={styles.salesRow}>
                                    <Image width={40} height={45} className={styles.salesCalendar} src="/assets/nft/calendar.png" alt="Calendar" />
                                    <div className={styles.infoContainer}>{t("nft.day_negotiation")}: {convertToSimpleDate(nftModel.traceDetails.sales.negotiationDate)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ""
        }
    </>
}

export default NFT;