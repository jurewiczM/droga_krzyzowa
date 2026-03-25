import { useState, useEffect, useRef } from "react";

export default function Menu({ darkMode, onToggleDark }) {
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="dots-btn" onClick={() => setOpen(!open)}>⋯</button>

      {open && (
        <div className="dropdown">
          <div className="menu-toggle-row" onClick={(e) => { e.stopPropagation(); onToggleDark(); }}>
            <div className="menu-item-label">
              <span className="menu-icon">☾</span>
              Tryb ciemny
            </div>
            <div className={`toggle-track ${darkMode ? "on" : ""}`}>
              <div className="toggle-thumb" />
            </div>
          </div>
          <div className="menu-item" onClick={() => { setShowInfo(true); setOpen(false); }}>
            <span className="menu-icon">ℹ</span>
            O aplikacji
          </div>
        </div>
      )}

      {showInfo && (
        <div className="modal-overlay" onClick={() => setShowInfo(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">O aplikacji</div>
            <div className="modal-body">
              {/* TUTAJ WPISZ SWOJE DANE */}
              <p>Aplikacja stworzona przez <strong>Imię Nazwisko</strong>.</p>
              <p>Parafia / organizacja</p>
              <p>Kontakt: email@example.com</p>
            </div>
            <button className="modal-close" onClick={() => setShowInfo(false)}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}