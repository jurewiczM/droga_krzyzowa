import { useState, useEffect, useRef } from "react";


const EMBED_URL_A = "https://www.google.com/maps/embed?pb=!1m58!1m12!1m3!1d..."; // TUTAJ WKLEJ EMBED TRASY A
const GOOGLE_URL_A = "https://www.google.pl/maps/dir/53.794535,17.975884/..."; // TUTAJ WKLEJ LINK TRASY A

const GOOGLE_URL_B = "https://www.google.pl/maps/dir/Czersk,+89-650/Dąbki/Ostrowite/Mosna,+89-650/Klaskawa,+89-650/Będźmierowice,+89-652/Łubna,+89-650/Malachin,+89-650/Czersk,+89-650/@53.8955141,18.0036953,11.6z/data=!4m71!4m70!1m10!1m1!1s0x470260a308f7d227:0x21d2eff688d2ae92!2m2!1d17.9763976!2d53.7950936!3m4!1m2!1d17.967865!2d53.7542276!3s0x47025e4153448d9d:0x921fe70b17d4599c!1m5!1m1!1s0x47025fb3486dd09b:0x1e796a1aaa11cea2!2m2!1d17.9901717!2d53.7497062!1m5!1m1!1s0x47025feb37bec0fb:0xc8aa1aff4579671!2m2!1d18.0316753!2d53.7503318!1m5!1m1!1s0x47025ff098612023:0x41cfdd9a1ff0539d!2m2!1d18.053055!2d53.7577801!1m5!1m1!1s0x4702600ff6c6493b:0x8dfc47b58680f3d9!2m2!1d18.0549537!2d53.7839888!1m5!1m1!1s0x470260469c80b8dd:0xa31656ccbc5be814!2m2!1d18.0484102!2d53.8058017!1m10!1m1!1s0x470260dc0d45f607:0x71174b08b1cd70b3!2m2!1d17.992504!2d53.816844!3m4!1m2!1d17.9553918!2d53.818963!3s0x4702672e37529f51:0x142cebac8e2df3dc!1m10!1m1!1s0x47026733c6907a41:0x9f4c1723735680ac!2m2!1d17.9563206!2d53.8138882!3m4!1m2!1d17.9707024!2d53.7993295!3s0x470260ba01b1c451:0x84609cccc8c6bb96!1m5!1m1!1s0x470260a308f7d227:0x21d2eff688d2ae92!2m2!1d17.9763976!2d53.7950936!3e2";

const EMBED_URL_B = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8917.410722578203!2d17.981479017436254!3d53.798986447283184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470260bb6463c1ad%3A0xc85260eff9851286!2zS2_Fm2Npw7PFgiDFm3cuIE1hcmlpIE1hZ2RhbGVueQ!5e0!3m2!1sen!2spl!4v1774565605900!5m2!1sen!2spl";

export default function Mapa() {
  const [aktywna, setAktywna] = useState("A");
  const mapRef = useRef(null);
  const leafletRef = useRef(null);

  useEffect(() => {
    if (aktywna !== "A") return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      if (!mapRef.current || leafletRef.current) return;
      const L = window.L;
      const map = L.map(mapRef.current).setView(GPX_TRASA_A[0], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);
      L.polyline(GPX_TRASA_A, { color: "#185FA5", weight: 3 }).addTo(map);
      L.marker(GPX_TRASA_A[0]).addTo(map).bindPopup("Start").openPopup();
      L.marker(GPX_TRASA_A[GPX_TRASA_A.length - 1]).addTo(map).bindPopup("Koniec");
      leafletRef.current = map;
    };
    document.head.appendChild(script);

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
        <button className={`trasa-btn ${aktywna === "A" ? "active" : ""}`} onClick={() => setAktywna("A")}>Trasa 20km</button>
        <button className={`trasa-btn ${aktywna === "B" ? "active" : ""}`} onClick={() => setAktywna("B")}>Trasa 30km</button>
      </div>

      {aktywna === "A" ? (
      <>
        <iframe
        className="mapa-iframe"
        title="Trasa 20km"
        src={EMBED_URL_A}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a className="mapa-btn" href={GOOGLE_URL_A} target="_blank" rel="noreferrer">
        Otwórz w Google Maps
      </a>
  </>
      ) : (
        <>
          <iframe
            className="mapa-iframe"
            title="Trasa B"
            src={EMBED_URL_B}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="mapa-btn" href={GOOGLE_URL_B} target="_blank" rel="noreferrer">
            Otwórz w Google Maps
          </a>
        </>
      )}
    </div>
  );
}