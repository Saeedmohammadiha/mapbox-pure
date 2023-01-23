import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import styles from './app.module.css';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FlZWQxNDQwMTI0IiwiYSI6ImNsY3Zxbng1YTBsNTUzcW52dmZ3ZzNoNmwifQ.7p3riT3z8qonYOZfbptLnw';
mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  true // Lazy load the plugin
);

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(40);
  const [lat, setLat] = useState(35);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
 

  return (
    <div className={styles.cc}>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
}

export default App;
