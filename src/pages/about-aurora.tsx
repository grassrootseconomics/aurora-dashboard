import { BackButton } from "@/components/core/buttons/BackButton";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

const AboutAurora: FC = () => {
    const { t } = useTranslation('translation');
    return <>
        <div className="about-title__container">
            <BackButton />
            <h1 className="about-title">{t("about.title")}</h1>
        </div>
        <div className="about-subtitle__container">
            {t("about.subtitle_main")} <span>Caqueta</span> {t("about.and")} <span>Huila</span> {t("about.in_colombia")}
        </div>
        <div className="about-section-title">
            {t("about.objective_title")}
        </div>
        <div>
            <ul className="about__list">
                <li>
                    {t("about.sentence_1")}
                </li>
                <li>
                    {t("about.sentence_2")}
                </li>
                <li>
                    {t("about.sentence_3")}
                </li>
            </ul>
        </div>
    </>;
}

export default AboutAurora;