import { useEffect, useRef } from 'react';

import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';

function Map() {
  const mapRef = useRef();

  useEffect(() => {
    const svg = select(mapRef!.current);
    const width = 800;
    const height = 600;

    // Create a projection for Colombia
    const projection = geoMercator()
      .center([-74, 4])
      .scale(800)
      .translate([width / 2, height / 2]);

    // Create a path generator
    const path = geoPath().projection(projection);

    // Load the GeoJSON data from an external URL
    const url = 'https://example.com/colombia.geojson';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Draw the map
        svg
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', '#cccccc')
          .attr('stroke', '#000000')
          .attr('stroke-width', 1);
      })
      .catch((error) => {
        console.log('Error loading GeoJSON data:', error);
      });
  }, []);

  return <svg ref={mapRef} width={800} height={600} />;
}

export default Map;
