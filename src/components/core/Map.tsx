import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ProjectionConfig
} from 'react-simple-maps';

import { regionsOfColombia } from '@/util/constants/regions';

const geoUrl = 'geojson/colombia-regions.json';

const ColombiaMap: React.FC = () => {
  const [hasHuilaClass, setHasHuilaClass] = useState<boolean>(false);
  const [hasCaquetaClass, setHasCaquetaClass] = useState<boolean>(false);
  const [projection, setProjection] = useState<ProjectionConfig>({
    scale: 1060,
    rotate: [70.5, 4, -20]
  });

  const huilaContent = {
    header: 'Huila',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  const caqueta = { 
    header: 'Caqueta',
    description: "Lorem Caqueta is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

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
          rotate: [72.5, -3.4, -20]
        })
      } else {
        setProjection({
          scale: 1760,
          rotate: [73.5, -4.5, -20]
        })
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
    <div className="map-container">
      <ComposableMap projection="geoMercator"
        projectionConfig={projection}>
   
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
          <h2>{huilaContent.header}</h2>
          <p>{huilaContent.description}</p>
        </div>
        <div className={`map-tooltip map-tooltip--caqueta ${hasCaquetaClass ? 'opacity' : ''}`}>
          <h2>{caqueta.header}</h2>
          <p>{caqueta.description}</p>
        </div>
    </div>
  );
};

export default ColombiaMap;
