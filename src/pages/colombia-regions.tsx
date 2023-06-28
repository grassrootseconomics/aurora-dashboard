import { BackButton } from "@/components/core/buttons/BackButton";
import ColombiaMap from "@/components/core/Map";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

const ColombiaRegions: FC = () => {
    const { t } = useTranslation('translation');
    return <>
        <div className="map-title__container">
            <BackButton />
            <h1 className="map-title">{t("regions_colombia")}</h1>
        </div>
        <ColombiaMap/>
    </>;
}

export default ColombiaRegions;