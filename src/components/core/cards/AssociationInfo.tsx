import Image from 'next/image';
import Link from 'next/link';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Association } from '@/util/models/BasicAssociation';
import { getAssociations } from '@/services/association';
import { calculateYearsUntilPresent } from '@/util/format/date';
import { useRouter } from 'next/router';

interface AssocProps {
    id: number;
}

const AssociationInfo = (props: AssocProps) => {
    const [association, setAssociation] = useState<Association>();
    const router = useRouter();

    useEffect(() => {
        getAssociations().then(assocs => {
            setAssociation(assocs.find(a => a.id == props.id))
        })
    }, []) 

    return ( 
    <> 
        {
            association ?
                <div
                className="info__container"
                >
                    <div className="info__logo-container">
                        <Image
                            width={128}
                            height={0}
                            style={{ height: 'auto' }}
                            className="info__logo"
                            src={`/assets/logos/${association.name}.png`}
                            alt={"Association"}
                        />
                    </div>
                    <div className="info__card-container">
                        <div className="info__card">
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div className="info__card-label">Years of existence</div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="info__card-number">{calculateYearsUntilPresent(new Date(association.creationDate))}</div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="info__card">
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div className="info__card-label">No ASSOCIATES</div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="info__card-number">{association.nrOfAssociates}</div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="info__description">
                        <p>{association.description}</p>
                    </div>
                    <div className="info__footer">
                        <button className="info__button" onClick={() => router.push("/batches/sample")}>Ask for your sample</button>
                        <div className="info__social">
                            <Link target="_blank" href={association.fbSocialLink ?? `/`}>
                                <Image 
                                    src={'/assets/social/facebook.png'} 
                                    width={40} 
                                    height={40}
                                    alt="Facebook"/>
                            </Link>
                            <Link target="_blank" href={association.instSocialLink ?? `/`}>
                                <Image 
                                    src={'/assets/social/instagram.png'} 
                                    width={40}
                                    height={40} 
                                    alt="Instagram"/>
                            </Link>
                        </div>
                    </div>
                </div> : <div></div> 
        }
    </>
  );
};

export default AssociationInfo;
