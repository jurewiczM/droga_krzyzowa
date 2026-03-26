import { useState, useRef, useEffect } from "react";

export default function WidokStacji({ stacje, id, onWroc, onZmienStacje }) {
  const stacja = stacje.find((s) => s.id === id);
  const audioRef = useRef(null);
  const [gra, setGra] = useState(false);
  const [postep, setPostep] = useState(0);
  const [czas, setCzas] = useState({ obecny: 0, calkowity: 0 });

  useEffect(() => {
    setGra(false);
    setPostep(0);
    setCzas({ obecny: 0, calkowity: 0 });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = `/audio/stacja_${String(id).padStart(2, "0")}.mp3`;
      audioRef.current.load();
    }
  }, [id]);

  function formatCzas(sek) {
    const s = Math.floor(sek);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (gra) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
  }

  function onTimeUpdate() {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setPostep((a.currentTime / a.duration) * 100);
    setCzas({ obecny: a.currentTime, calkowity: a.duration });
  }

  function onKliknijTrack(e) {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    a.currentTime = (x / rect.width) * a.duration;
  }

  function przejdz(kierunek) {
    onZmienStacje(id + kierunek);
  }

  if (!stacja) return null;

  return (
    <div>
      <div className="header">
        <button className="header-back" onClick={onWroc}>‹</button>
        <div>
          <div className="header-title">Stacja {stacja.numer}</div>
          <div className="header-sub">{stacja.tytul}</div>
        </div>
      </div>

      <div className="stacja-body">
        <div className="stacja-numer-duzy">Stacja {stacja.numer}</div>
        <div className="stacja-tytul-duzy">{stacja.tytul}</div>
        <div className="stacja-opis">{stacja.opis}</div>

        <div className="player">
          <div className="player-label">Rozważania</div>
          <div className="player-row">
            <button className="play-btn" onClick={togglePlay}>
              {gra ? "⏸" : "▶"}
            </button>
            <div className="track-wrapper">
              <div className="track-bar" onClick={onKliknijTrack} style={{ position: "relative" }}>
                <div className="track-fill" style={{ width: `${postep}%` }} />
                <div className="track-thumb" style={{ left: `${postep}%` }} />
              </div>
              <div className="czas-row">
                <span className="czas">{formatCzas(czas.obecny)}</span>
                <span className="czas">{formatCzas(czas.calkowity)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-row">
          <button
            className="nav-btn"
            onClick={() => przejdz(-1)}
            disabled={id <= 1}
          >
            ‹ Poprzednia
          </button>
          <button
            className="nav-btn primary"
            onClick={() => przejdz(1)}
            disabled={id >= 14}
          >
            Następna ›
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={`/audio/stacja_${String(id).padStart(2, "0")}.mp3`}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setGra(true)}
        onPause={() => setGra(false)}
        onEnded={() => { setGra(false); setPostep(0); }}
      />
    </div>
  );
}
