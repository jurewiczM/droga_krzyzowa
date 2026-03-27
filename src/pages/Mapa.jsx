import { useState, useEffect, useRef } from "react";

const TRASY = {
  A: {
    nazwa: "Trasa 20km",
    start: [53.794535, 17.975884],
    googleUrl: "https://maps.app.goo.gl/ww8AydveAkk3r8Ux8",
    trasa: [
        
    [53.794535, 17.975884],
    [53.7793012, 17.9469341],
    [53.7754213, 17.8575994],
    [53.7724348, 17.8505615],
    [53.7915462, 17.8585876],
    [53.7881192, 17.9038778],
    [53.7938756, 17.9340607],
    [53.7947808, 17.9760835],
    
    
    ],
  },
  B: {
    nazwa: "Trasa 30km",
    start: [53.7950936, 17.9763976],
    googleUrl: "https://maps.app.goo.gl/7KF5NsbVUgvLNvvcA",
    trasa: [
    [53.7950936, 17.9763976],
    [53.7542276, 17.967865],
    [53.7497062, 17.9901717],
    [53.7503318, 18.0316753],
    [53.7577801, 18.053055],
    [53.7839888, 18.0549537],
    [53.8058017, 18.0484102],
    [53.816844,  17.992504],
    [53.818963,  17.9553918],
    [53.8138882, 17.9563206],
    [53.7993295, 17.9707024],
    [53.7950936, 17.9763976],
  ],
  },
};

export default function Mapa() {
  const [aktywna, setAktywna] = useState("A");
  const mapRef = useRef(null);
  const leafletRef = useRef(null);

  useEffect(() => {
    const t = TRASY[aktywna];

    const initMap = () => {
      if (!mapRef.current) return;
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
      const L = window.L;
      const map = L.map(mapRef.current).setView(t.start, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      if (t.trasa) {
        L.polyline(t.trasa, { color: "#185FA5", weight: 3 }).addTo(map);
        map.fitBounds(L.polyline(t.trasa).getBounds(), { padding: [20, 20] });
      }

      L.marker(t.start).addTo(map).bindPopup("Start").openPopup();
      leafletRef.current = map;
    };

    if (window.L) {
      initMap();
    } else {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, [aktywna]);

  return (
    <div className="mapa-container">
      <div className="header">
        <div>
          <div className="header-title">Mapa trasy</div>
          <div className="header-sub">Droga Krzyżowa</div>
        </div>
      </div>

      <div className="trasy-toggle">
        {Object.entries(TRASY).map(([key, t]) => (
          <button
            key={key}
            className={`trasa-btn ${aktywna === key ? "active" : ""}`}
            onClick={() => setAktywna(key)}
          >
            {t.nazwa}
          </button>
        ))}
      </div>
        <div ref={mapRef} style={{ flex: 1, width: "100%", minHeight: 0 }} />

      <a
        className="mapa-btn"
        href={TRASY[aktywna].googleUrl}
        target="_blank"
        rel="noreferrer"
      >
        Otwórz w Google Maps
      </a>
    </div>
  );
}