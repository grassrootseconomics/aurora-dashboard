import { useEffect, useRef } from 'react';

// Define the regions of Colombia
const colombiaRegions = [
  {
    name: 'Amazonas',
    coordinates: [
      /* Amazonas coordinates */
    ],
  },
  {
    name: 'Antioquia',
    coordinates: [
      /* Antioquia coordinates */
    ],
  },
  {
    name: 'Arauca',
    coordinates: [
      /* Arauca coordinates */
    ],
  },
  // Add more regions...
];

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const tooltipElement = tooltipRef.current;

    // Bind event listeners
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.parentElement?.getBoundingClientRect();

      if (!rect) return;
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const region = getRegionByCoordinates(offsetX, offsetY);

      if (tooltipElement) {
        if (region) {
          tooltipElement.innerText = region.name;
          tooltipElement.style.left = `${event.pageX + 10}px`;
          tooltipElement.style.top = `${event.pageY + 10}px`;
          tooltipElement.style.display = 'block';
        } else {
          tooltipElement.style.display = 'none';
        }
      }
    };

    const handleMouseOut = () => {
      tooltipElement.style.display = 'none';
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);

    // Define helper functions
    const getRegionByCoordinates = (x: number, y: number) => {
      for (const region of colombiaRegions) {
        const polygon = new Path2D();
        polygon.moveTo(region.coordinates[0][0], region.coordinates[0][1]);
        for (const coordinate of region.coordinates.slice(1)) {
          polygon.lineTo(coordinate[0], coordinate[1]);
        }
        polygon.closePath();

        if (ctx.isPointInPath(polygon, x, y)) {
          return region;
        }
      }
      return undefined;
    };

    const drawMap = () => {
      for (const region of colombiaRegions) {
        ctx.beginPath();
        ctx.moveTo(region.coordinates[0][0], region.coordinates[0][1]);
        for (const coordinate of region.coordinates.slice(1)) {
          ctx.lineTo(coordinate[0], coordinate[1]);
        }
        ctx.closePath();
        ctx.fillStyle = '#cccccc';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      }
    };

    drawMap();

    // Clean up event listeners
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      <div
        ref={tooltipRef}
        id="tooltip"
        style={{ display: 'none', position: 'absolute' }}
      ></div>
    </div>
  );
}

export default Map;
