import { useState, useEffect, useRef } from "react";

const TRASY = {
  A: {
    nazwa: "Trasa 20km",
    start: [53.794535, 17.975884],
    googleUrl: "https://maps.app.goo.gl/ww8AydveAkk3r8Ux8",
    trasa: [
      [53.794535,17.975884],[53.794541,17.975639],[53.794567,17.975519],[53.794690,17.975428],[53.794873,17.975497],[53.794967,17.975523],[53.795004,17.975043],[53.795066,17.974646],[53.795168,17.974232],[53.795331,17.973716],[53.795184,17.973474],[53.794902,17.973539],[53.794278,17.973334],[53.793596,17.973145],[53.792987,17.972987],[53.792450,17.972855],[53.790249,17.972233],[53.788626,17.971798],[53.788161,17.971276],[53.787614,17.969787],[53.787347,17.966946],[53.787047,17.964357],[53.786172,17.961786],[53.785156,17.959660],[53.784124,17.957220],[53.781568,17.950665],[53.781077,17.949683],
    ],
  },
  B: {
    nazwa: "Trasa 30km",
    start: [53.7950936, 17.9763976],
    googleUrl: "https://www.google.pl/maps/dir/Czersk,+89-650/Dąbki/Ostrowite/Mosna,+89-650/Klaskawa,+89-650/Będźmierowice,+89-652/Łubna,+89-650/Malachin,+89-650/Czersk,+89-650/@53.8955141,18.0036953,11.6z",
    trasa: null,
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