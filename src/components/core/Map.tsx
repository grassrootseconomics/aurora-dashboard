import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ProjectionConfig,
} from 'react-simple-maps';

import { regionsOfColombia } from '@/util/constants/regions';

const geoUrl = 'geojson/colombia-regions.json';

const ColombiaMap: React.FC = () => {
  const [hasHuilaClass, setHasHuilaClass] = useState<boolean>(false);
  const [hasCaquetaClass, setHasCaquetaClass] = useState<boolean>(false);
  const [projection, setProjection] = useState<ProjectionConfig>({
    scale: 1060,
    rotate: [70.5, 4, -20],
  });
  const { t } = useTranslation('translation');

  const handleMouseEnter = (geography: any) => {
    const region = regionsOfColombia.find(
      (r) => r == geography.properties.NAME_1
    );
    if (region == 'Huila') {
      setHasHuilaClass(true);
    } else {
      setHasCaquetaClass(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setProjection({
          scale: 2060,
          rotate: [73, -4.1, 0],
        });
      } else {
        setProjection({
          scale: 1760,
          rotate: [73, -5.4, 0],
        });
      }
    };

    handleResize(); // Check initial window width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseLeave = () => {
    setHasHuilaClass(false);
    setHasCaquetaClass(false);
  };

  return (
    <div className="map-container" style={{ minHeight: '1000px' }}>
      <ComposableMap projection="geoMercator" projectionConfig={projection}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: regionsOfColombia.includes(geo.properties.NAME_1)
                    ? { fill: '#964514', border: '#000', outline: 'none' }
                    : {
                        fill: 'transparent',
                        border: '#000',
                        outline: 'none',
                      },
                  hover: regionsOfColombia.includes(geo.properties.NAME_1)
                    ? { fill: '#b43f3c', outline: 'none' }
                    : { fill: 'transparent', outline: 'none' },
                  pressed: { fill: '', outline: 'none' },
                }}
                onMouseEnter={() => handleMouseEnter(geo)}
                onMouseLeave={handleMouseLeave}
                stroke="#f29a1a"
                strokeWidth={1}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <div className={`map-tooltip ${hasHuilaClass ? 'opacity' : ''}`}>
        <h2>{t('regions_colombia.regions.Huila.header')}</h2>
        <p>{t('regions_colombia.regions.Huila.description')}</p>
      </div>
      <div
        className={`map-tooltip map-tooltip--caqueta ${
          hasCaquetaClass ? 'opacity' : ''
        }`}
      >
        <h2>{t('regions_colombia.regions.Caqueta.header')}</h2>
        <p>{t('regions_colombia.regions.Caqueta.description')}</p>
      </div>
    </div>
  );
};

export default ColombiaMap;
