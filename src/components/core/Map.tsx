import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

import { regionsOfColombia } from '@/util/constants/regions';

const geoUrl = 'geojson/colombia-regions.json';

const ColombiaMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState({
    header: '',
    description: '',
  });
  const [center, setCenter] = useState<[number, number]>([
    -50.080916, -3.60971,
  ]);
  const [zoom, setZoom] = useState(4.6);

  const handleMouseEnter = (geography: any) => {
    const region = regionsOfColombia.find(
      (r) => r == geography.properties.NAME_1
    );
    if (region) {
      setTooltipContent({
        header: geography.properties.NAME_1,
        description:
          region == 'Huila'
            ? 'Description of Huila'
            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setZoom(10.1);
        setCenter([-50.080916, 4.091]);
      } else {
        setZoom(4.6);
      }
    };

    handleResize(); // Check initial window width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseLeave = () => {
    setTooltipContent({
      header: '',
      description: '',
    });
  };

  return (
    <div className="map-container">
      <ComposableMap>
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={({ zoom, coordinates }) => {
            setZoom(zoom);
            setCenter(coordinates);
          }}
          disablePanning
        >
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
                  strokeWidth={0.2}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {tooltipContent.header && (
        <div className="map-tooltip">
          <h2>{tooltipContent.header}</h2>
          <p>{tooltipContent.description}</p>
        </div>
      )}
    </div>
  );
};

export default ColombiaMap;
