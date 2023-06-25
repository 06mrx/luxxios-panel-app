import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import Link from 'next/link';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 13);
  return null;
}
// 6.856560, 106.957705
function MyComponent({ saveMarkers }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng], { icon }).addTo(map);
      // saveMarkers([lat, lng]);
    }
  });
  return null;
}
export default function Map({ lan = '2.482838', lon = '115.711902', lat_id, lng_id}) {

  const [geoData, setGeoData] = useState({ lat: -6.924974, lng: 106.931730 });

  const center = [lan, lon];
  const saveMarkers = (newMarkerCoords) => {
    const data = [newMarkerCoords];
    setS((prevState) => ({ ...prevState, data }));
  };
  const SearchField = () => {
    const provider = new OpenStreetMapProvider();

    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      searchLabel: 'Cari Desa / Kecamatan',
      marker: {
        draggable: true,
      }
    });

    const map = useMap();
    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);

    map.on('geosearch/marker/dragend', (result) => {
      document.getElementById(lat_id).value = result.location.lat
      document.getElementById(lng_id).value = result.location.lng
      // lan = result.location.lat;
      // lon = result.location.lng;
    });
    map.on('geosearch/showlocation', (result) => {
      console.log(result)
      document.getElementById(lat_id).value = result.location.y
      document.getElementById(lng_id).value = result.location.x
      // lan = result.location.y;
      // lon = result.location.x;
    });

    return null;
  };
  
  return (
    <MapContainer center={center} zoom={1} style={{ height: '500px' }}>
      {<SearchField />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {
        coordinates?.map((data, index) => {
          return (
            <Marker position={[data.latitude, data.longitude]} >
              <Popup>
                {data.personal_data?.name} <br />
                {data.updated_at} <br />
                <Link href={'/headmaster/daily-report/subordinate/' + data.id} target='_blank'>
                  Lihat Laporan
                </Link>
              </Popup>
            </Marker>
          )
        })
      } */}

      <ChangeView coords={center} />
      {/* <MyComponent saveMarkers={saveMarkers} /> */}
    </MapContainer>
  );
}
