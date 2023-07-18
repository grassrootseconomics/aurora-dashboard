import { useRouter } from 'next/router';

import React, { FC, useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { BackButton } from '@/components/core/buttons/BackButton';
import BaseBatchesTable from '@/components/core/tables/BaseBatchesTable';
import PulpHarvestingTable from '@/components/core/tables/PulpHarvestingTable';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { getProducerActivity } from '@/services/producer';
import { UserRole } from '@/util/constants/users';
import { ProducerActivity } from '@/util/models/Producer/ProducerActivity';

const ProducerActivityPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userRole } = useUserAuthContext();
  const [producerActivity, setProducerActivity] = useState<ProducerActivity>();

  useEffect(() => {
    if (userRole && userRole === 'buyer') {
      router.push('/');
    }
  }, [userRole, router]);

  useEffect(() => {
    if (!id) return;
    switch (userRole) {
      case UserRole.project:
        getProducerActivity(id as string).then((activity) => {
          setProducerActivity(activity);
        });
        return;
      case UserRole.association:
        getProducerActivity(id as string).then((activity) => {
          setProducerActivity(activity);
        });
        return;
    }
  }, [userRole, id]);

  return (
    <>
      <div className="fermentation-model">
        <BackButton />
        <div className="fermentation-model__body">
          <Grid className="fermentation-model__container" container spacing={0}>
            <Grid item xs={6}>
              <PulpHarvestingTable
                codeProducer={id as string}
                pulps={producerActivity?.pulps}
              />
            </Grid>
            <Grid item xs={6}>
              <BaseBatchesTable batches={producerActivity?.batches} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ProducerActivityPage;
