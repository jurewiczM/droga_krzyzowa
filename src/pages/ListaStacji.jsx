import Menu from "../Menu";

export default function ListaStacji({ stacje, onOtworz, darkMode, onToggleDark, wcagMode, onToggleWcag }) {
  return (
    <div>
      <div className="header" style={{ justifyContent: "space-between" }}> 
        <div>
          <div className="header-title">Droga Krzyżowa</div>
          <div className="header-sub">14 stacji</div>
        </div>
         <Menu darkMode={darkMode} onToggleDark={onToggleDark}  wcagMode={wcagMode} onToggleWcag={onToggleWcag}/>
      </div>
      <div className="lista">
        {stacje.map((s) => (
          <div key={s.id} className="stacja-row" onClick={() => onOtworz(s.id)}>
            <div className="numer-badge">{s.numer}</div>
            <div className="stacja-tytul">{s.tytul}</div>
            <span className="chevron">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
