import { useState, useEffect } from "react";
import "./App.css";
import { stacje } from "./stacje";
import ListaStacji from "./pages/ListaStacji";
import WidokStacji from "./pages/WidokStacji";
import Mapa from "./pages/Mapa";
import { Analytics } from "@vercel/analytics/react";
import Menu from "./Menu";


export default function App() {
  const [ekran, setEkran] = useState("lista"); // "lista" | "stacja" | "mapa"
  const [aktywnaStacja, setAktywnaStacja] = useState(null);
  const [aktywnaZakladka, setAktywnaZakladka] = useState("lista");
  const [darkMode, setDarkMode] = useState(false);
  const [wcagMode, setWcagMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);


useEffect(() => {
  document.body.classList.toggle("wcag", wcagMode);
}, [wcagMode]);


  function otworz(id) {
    setAktywnaStacja(id);
    setEkran("stacja");
  }

  function wrocDoListy() {
    setEkran("lista");
    setAktywnaZakladka("lista");
  }

  function przelaczZakladke(tab) {
    setAktywnaZakladka(tab);
    if (tab === "lista") setEkran("lista");
    if (tab === "mapa") setEkran("mapa");
  }


  return (
    <div>
      {ekran === "lista" && (
        <ListaStacji stacje={stacje} 
          onOtworz={otworz}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(!darkMode)}
          wcagMode = {wcagMode}
          onToggleWcag = {() => setWcagMode(!wcagMode)}
        />
      )}
      {ekran === "stacja" && (
        <WidokStacji
          stacje={stacje}
          id={aktywnaStacja}
          onWroc={wrocDoListy}
          onZmienStacje={setAktywnaStacja}
        />
      )}
      {ekran === "mapa" && <Mapa />}

      {ekran !== "stacja" && (
        <div className="tabbar">
          <button
            className={`tab ${aktywnaZakladka === "lista" ? "active" : ""}`}
            onClick={() => przelaczZakladke("lista")}
          >
            <span className="tab-icon">☰</span>
            Stacje
          </button>
          <button
            className={`tab ${aktywnaZakladka === "mapa" ? "active" : ""}`}
            onClick={() => przelaczZakladke("mapa")}
          >
            <span className="tab-icon">◎</span>
            Mapa
          </button>
        </div>
      )}
     <Analytics />
    </div>
   );
}
