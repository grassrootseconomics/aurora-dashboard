import { BackButton } from "@/components/core/buttons/BackButton";
import DailyReportsTable from "@/components/core/tables/DailyReportsTable";
import FlipsTable from "@/components/core/tables/FlipsTable";
import { useUserAuthContext } from "@/providers/UserAuthProvider";
import { getBatchByCode } from "@/services/batch";
import { UserRole } from "@/util/constants/users";
import { BatchInfo } from "@/util/models/Batch/BatchInfo";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FermentationModel = () => {
    const { t } = useTranslation('translation');
    const router = useRouter();
    const { id }  = router.query;
    const [ batch, setBatch] = useState<BatchInfo>();
    const { userRole } = useUserAuthContext();

    useEffect(() => {
        if(!id) return;
        switch(userRole) {
          case UserRole.project:
            getBatchByCode(id as string).then(b => {
              setBatch(b)
            }) 
            return;
          case UserRole.association:
            getBatchByCode(id as string).then(b => {
              setBatch(b)
            }) 
            return;
        }
      }, [userRole, id])

    return (
        <>
          <div className="fermentation-model">
            <BackButton />
            <h1>{t('fermentation_model.title')}</h1>
            <Grid className="fermentation-model__container" container>
              <Grid item xs={6}>
                <DailyReportsTable dailyReports={batch?.fermentationPhase.dailyReports} />
              </Grid>
              <Grid item xs={6}>
                <FlipsTable fermentationPhase={batch?.fermentationPhase} />
              </Grid>
            </Grid>
          </div>
         </>
    );
  
}

export default FermentationModel;