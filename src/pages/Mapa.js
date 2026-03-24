const WSPOLRZEDNE = [
  { id: 1,  lat: 31.7784, lng: 35.2269 },
  { id: 2,  lat: 31.7788, lng: 35.2271 },
  { id: 3,  lat: 31.7792, lng: 35.2268 },
  { id: 4,  lat: 31.7796, lng: 35.2265 },
  { id: 5,  lat: 31.7800, lng: 35.2263 },
  { id: 6,  lat: 31.7804, lng: 35.2261 },
  { id: 7,  lat: 31.7808, lng: 35.2259 },
  { id: 8,  lat: 31.7812, lng: 35.2257 },
  { id: 9,  lat: 31.7816, lng: 35.2256 },
  { id: 10, lat: 31.7820, lng: 35.2254 },
  { id: 11, lat: 31.7822, lng: 35.2251 },
  { id: 12, lat: 31.7824, lng: 35.2248 },
  { id: 13, lat: 31.7823, lng: 35.2245 },
  { id: 14, lat: 31.7821, lng: 35.2242 },
];

export default function Mapa() {
  const trasa = WSPOLRZEDNE.map((w) => `${w.lat},${w.lng}`).join("/");
  const googleMapsUrl = `https://www.google.com/maps/dir/${trasa}`;

  const centrum = WSPOLRZEDNE[6];
  const embedUrl = `https://maps.google.com/maps?q=${centrum.lat},${centrum.lng}&z=16&output=embed`;

  return (
    <div className="mapa-container">
      <div className="header">
        <div>
          <div className="header-title">Mapa trasy</div>
          <div className="header-sub">Droga Krzyżowa — 14 stacji</div>
        </div>
      </div>
      <iframe
        className="mapa-iframe"
        title="Mapa Drogi Krzyżowej"
        src={embedUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        className="mapa-btn"
        href={googleMapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Otwórz trasę w Google Maps
      </a>
    </div>
  );
}
