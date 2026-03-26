
export default function Mapa() {
  const googleMapsUrl = `https://www.google.pl/maps/dir/Czersk,+89-650/Dąbki/Ostrowite/Mosna,+89-650/Klaskawa,+89-650/Będźmierowice,+89-652/Łubna,+89-650/Malachin,+89-650/Czersk,+89-650/@53.8955141,18.0036953,11.6z/data=!4m71!4m70!1m10!1m1!1s0x470260a308f7d227:0x21d2eff688d2ae92!2m2!1d17.9763976!2d53.7950936!3m4!1m2!1d17.967865!2d53.7542276!3s0x47025e4153448d9d:0x921fe70b17d4599c!1m5!1m1!1s0x47025fb3486dd09b:0x1e796a1aaa11cea2!2m2!1d17.9901717!2d53.7497062!1m5!1m1!1s0x47025feb37bec0fb:0xc8aa1aff4579671!2m2!1d18.0316753!2d53.7503318!1m5!1m1!1s0x47025ff098612023:0x41cfdd9a1ff0539d!2m2!1d18.053055!2d53.7577801!1m5!1m1!1s0x4702600ff6c6493b:0x8dfc47b58680f3d9!2m2!1d18.0549537!2d53.7839888!1m5!1m1!1s0x470260469c80b8dd:0xa31656ccbc5be814!2m2!1d18.0484102!2d53.8058017!1m10!1m1!1s0x470260dc0d45f607:0x71174b08b1cd70b3!2m2!1d17.992504!2d53.816844!3m4!1m2!1d17.9553918!2d53.818963!3s0x4702672e37529f51:0x142cebac8e2df3dc!1m10!1m1!1s0x47026733c6907a41:0x9f4c1723735680ac!2m2!1d17.9563206!2d53.8138882!3m4!1m2!1d17.9707024!2d53.7993295!3s0x470260ba01b1c451:0x84609cccc8c6bb96!1m5!1m1!1s0x470260a308f7d227:0x21d2eff688d2ae92!2m2!1d17.9763976!2d53.7950936!3e2?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D`;


  const embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8917.410722578203!2d17.981479017436254!3d53.798986447283184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470260bb6463c1ad%3A0xc85260eff9851286!2zS2_Fm2Npw7PFgiDFm3cuIE1hcmlpIE1hZ2RhbGVueQ!5e0!3m2!1sen!2spl!4v1774565605900!5m2!1sen!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';

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
