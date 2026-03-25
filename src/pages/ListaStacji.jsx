import Menu from "../components/Menu";

export default function ListaStacji({ stacje, onOtworz }) {
  return (
    <div>
      <div className="header">
        <div>
          <div className="header-title">Droga Krzyżowa</div>
          <div className="header-sub">14 stacji</div>
        </div>
         <Menu darkMode={darkMode} onToggleDark={onToggleDark} />
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
