import { useEffect, useState } from 'react';
import {
  Recipe, EquipmentProfile, WaterProfile, BjcpStyle, BrewNote, InventoryItem
} from './types';
import { Lang, translations } from './i18n';

const API = '/api';

const emptyRecipe: Recipe = {
  name: 'New Homebrew Recipe',
  brewer: 'Y&B Crew Beer C.O.',
  type: 'All Grain',
  style: '18B - American Pale Ale',
  ibuFormula: 'Tinseth',
  batchSizeLiters: 20,
  boilSizeLiters: 24,
  boilTimeMinutes: 60,
  efficiencyPercent: 75,
  yeastAttenuationPercent: 77,
  notes: '',
  og: 1.050,
  fg: 1.012,
  abv: 5.0,
  ibu: 35.0,
  srm: 6.0,
  caloriesPer355ml: 165,
  fermentables: [
    { name: 'Pale Ale Malt (2-Row)', type: 'Grain', amountKg: 4.5, yieldPercent: 80, colorLovibond: 3 },
  ],
  hops: [
    { name: 'Cascade', form: 'Pellet', amountGrams: 30, alphaAcidPercent: 6.0, boilTimeMinutes: 60, useType: 'Boil' },
  ],
  yeasts: [
    { name: 'Safale US-05', laboratory: 'Fermentis', productId: 'US-05', type: 'Ale', form: 'Dry', attenuationPercent: 78, minTempC: 18, maxTempC: 22, flocculation: 'Medium', amountPackages: 1 },
  ],
  miscs: [],
  mashSteps: [
    { stepOrder: 1, name: 'Saccharification', type: 'Infusion', infuseAmountLiters: 14, targetTempC: 66, stepTimeMinutes: 60, rampTimeMinutes: 2 },
  ],
};

function srmToHex(srm: number): string {
  const palette = [
    '#FFE699', '#FFD878', '#FFCA5A', '#FFBF42', '#FBB123', '#F8A600', '#F39C00', '#EA8F00', '#E58500', '#DE7C00',
    '#D77200', '#CF6900', '#CB6200', '#C35900', '#BB5100', '#B54C00', '#B04500', '#A63E00', '#A13700', '#9B3200',
    '#952D00', '#8E2900', '#882300', '#821E00', '#7B1A00', '#771900', '#701400', '#6A0E00', '#660D00', '#5E0B00',
  ];
  const idx = Math.min(Math.max(Math.round(srm) - 1, 0), palette.length - 1);
  return palette[idx];
}

function RangeBar({ label, value, min, max, decimals = 1, unit = '' }: {
  label: string; value: number; min?: number; max?: number; decimals?: number; unit?: string;
}) {
  const inRange = min !== undefined && max !== undefined && value >= min && value <= max;
  return (
    <div style={{ padding: 12, background: '#fff', border: '1px solid #d1d5db', borderRadius: 8 }}>
      <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', justifyContent: 'space-between' }}>
        <span>{label}</span>
        {min !== undefined && max !== undefined && (
          <span style={{ color: inRange ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
            {min.toFixed(decimals)}–{max.toFixed(decimals)}
          </span>
        )}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4, color: min !== undefined ? (inRange ? '#15803d' : '#b91c1c') : '#111827' }}>
        {value.toFixed(decimals)}{unit}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('yb_lang');
    return saved === 'pt' || saved === 'es' || saved === 'en' ? saved : 'en';
  });
  const t = (key: string) => translations[lang][key] || translations.en[key] || key;

  const handleLanguageChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('yb_lang', newLang);
  };

  const [navSection, setNavSection] = useState<'recipe' | 'styles' | 'inventory' | 'equipment' | 'water' | 'brewnotes' | 'calculators'>('recipe');
  const [recipeTab, setRecipeTab] = useState<'ingredients' | 'mash' | 'brewsheet'>('ingredients');

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [current, setCurrent] = useState<Recipe>(emptyRecipe);
  const [equipmentList, setEquipmentList] = useState<EquipmentProfile[]>([]);
  const [waterList, setWaterList] = useState<WaterProfile[]>([]);
  const [stylesList, setStylesList] = useState<BjcpStyle[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [brewNotes, setBrewNotes] = useState<BrewNote[]>([]);

  const [strikeIn, setStrikeIn] = useState({ targetTempC: 66, grainTempC: 20, ratioLPerKg: 3.0 });
  const [strikeOut, setStrikeOut] = useState<number | null>(null);
  const [refracIn, setRefracIn] = useState({ originalBrix: 13.0, currentBrix: 6.5, wcf: 1.04 });
  const [refracOut, setRefracOut] = useState<number | null>(null);
  const [primeIn, setPrimeIn] = useState({ batchLiters: 20, beerTempC: 20, targetCo2: 2.4 });
  const [primeOut, setPrimeOut] = useState<number | null>(null);
  const [hydroIn, setHydroIn] = useState({ measuredSg: 1.050, sampleTempC: 26, calibrationTempC: 20 });
  const [hydroOut, setHydroOut] = useState<number | null>(null);

  const [newInv, setNewInv] = useState<InventoryItem>({ category: 'Fermentable', name: '', quantity: 1, unit: 'kg', alphaOrColorOrAtten: 3.0 });

  const emptyEquipment: EquipmentProfile = {
    name: '',
    batchSizeLiters: 20.0,
    boilTimeMinutes: 60.0,
    evaporationRateLitersPerHour: 3.0,
    kettleDeadspaceLiters: 0.5,
    lauterDeadspaceLiters: 0.5,
    trubChillerLossLiters: 1.0,
    grainAbsorptionLitersPerKg: 1.08,
    efficiencyPercent: 75.0,
  };
  const [eqForm, setEqForm] = useState<EquipmentProfile>(emptyEquipment);

  const emptyWater: WaterProfile = {
    name: '',
    calciumPpm: 50,
    bicarbonatePpm: 30,
    sulfatePpm: 50,
    chloridePpm: 50,
    sodiumPpm: 10,
    magnesiumPpm: 5,
    ph: 7.0,
  };
  const [waterForm, setWaterForm] = useState<WaterProfile>(emptyWater);

  const emptyStyle: BjcpStyle = {
    categoryNumber: '34A',
    name: '',
    guide: 'Custom / BJCP 2021',
    ogMin: 1.045,
    ogMax: 1.060,
    fgMin: 1.008,
    fgMax: 1.015,
    ibuMin: 20,
    ibuMax: 45,
    srmMin: 4,
    srmMax: 12,
    abvMin: 4.5,
    abvMax: 6.5,
    notes: '',
  };
  const [styleForm, setStyleForm] = useState<BjcpStyle>(emptyStyle);
  const [styleFilter, setStyleFilter] = useState('');
  const [styleStatusMsg, setStyleStatusMsg] = useState<string | null>(null);

  const loadAll = async () => {
    const opts: RequestInit = { cache: 'no-store' };
    const [rRes, eRes, wRes, sRes, iRes, bRes] = await Promise.all([
      fetch(`${API}/recipes`, opts), fetch(`${API}/equipment`, opts), fetch(`${API}/waters`, opts),
      fetch(`${API}/styles`, opts), fetch(`${API}/inventory`, opts), fetch(`${API}/brew-notes`, opts),
    ]);
    const rData = await rRes.json();
    setRecipes(rData);
    if (rData.length > 0 && !current.id) setCurrent(rData[0]);
    setEquipmentList(await eRes.json());
    setWaterList(await wRes.json());
    setStylesList(await sRes.json());
    setInventory(await iRes.json());
    setBrewNotes(await bRes.json());
  };

  useEffect(() => { loadAll(); }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await fetch(`${API}/recipes/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current),
      });
      if (res.ok) {
        const calc: Recipe = await res.json();
        setCurrent((prev) => ({
          ...prev,
          og: calc.og, fg: calc.fg, abv: calc.abv, ibu: calc.ibu, srm: calc.srm,
          caloriesPer355ml: calc.caloriesPer355ml,
          yeastAttenuationPercent: calc.yeastAttenuationPercent,
        }));
      }
    }, 180);
    return () => clearTimeout(timer);
  }, [
    current.batchSizeLiters, current.efficiencyPercent, current.yeastAttenuationPercent,
    current.ibuFormula, current.boilTimeMinutes, current.fermentables, current.hops, current.yeasts,
  ]);

  const handleSaveRecipe = async () => {
    const res = await fetch(`${API}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(current),
    });
    const saved = await res.json();
    setCurrent(saved);
    loadAll();
  };

  const handleBrewDay = async () => {
    let targetId = current.id;
    if (!targetId) {
      const res = await fetch(`${API}/recipes`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(current),
      });
      const saved = await res.json();
      setCurrent(saved);
      targetId = saved.id;
    }
    await fetch(`${API}/recipes/${targetId}/brew-day`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: `${current.name} (${current.batchSizeLiters}L)` }),
    });
    await loadAll();
    alert(t('alertBrewLogged'));
  };

  const handleImportBeerXml = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const res = await fetch(`${API}/recipes/import-beerxml`, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: text,
    });
    if (res.ok) {
      const imported = await res.json();
      setCurrent(imported);
      loadAll();
    } else {
      alert(t('alertXmlFailed'));
    }
  };

  const matchedStyle =
    stylesList.find((s) => `${s.categoryNumber} - ${s.name}` === current.style) ||
    stylesList.find((s) => current.style?.toLowerCase() === s.name.toLowerCase()) ||
    stylesList.find((s) => current.style?.startsWith(`${s.categoryNumber} `));
  const totalGrainKg = current.fermentables.reduce((acc, f) => acc + (f.type === 'Grain' ? f.amountKg : 0), 0);

  return (
    <div style={{ display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif', height: '100vh', color: '#1f2937' }}>
      <aside style={{ width: 285, background: '#1e293b', color: '#f8fafc', display: 'flex', flexDirection: 'column', padding: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: '#fbbf24' }}>🍺 Yuki & Bomb's Crew Brew CO.</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>{t('subtitle')}</div>

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0f172a', padding: '6px 10px', borderRadius: 6, marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>🌐 {t('languageLabel')}</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {([
              ['en', '🇺🇸 EN'],
              ['pt', '🇧🇷 PT'],
              ['es', '🇪🇸 ES'],
            ] as [Lang, string][]).map(([code, label]) => (
              <button
                key={code}
                type="button"
                onClick={() => handleLanguageChange(code)}
                style={{
                  padding: '3px 7px',
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  background: lang === code ? '#2563eb' : '#334155',
                  color: '#fff',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <nav style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 16 }}>
          {[
            ['recipe', t('navRecipes')],
            ['styles', `${t('navStyles')} (${stylesList.length})`],
            ['inventory', t('navInventory')],
            ['equipment', t('navEquipment')],
            ['water', t('navWater')],
            ['brewnotes', t('navBrewNotes')],
            ['calculators', t('navCalculators')],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setNavSection(key as any)}
              style={{
                padding: '8px 6px', fontSize: 12, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer',
                background: navSection === key ? '#2563eb' : '#334155', color: '#fff', textAlign: 'left',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <button
            onClick={() => { setCurrent({ ...emptyRecipe, id: undefined }); setNavSection('recipe'); }}
            style={{ flex: 1, padding: 8, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
          >
            {t('newRecipe')}
          </button>
          <label style={{ padding: 8, background: '#475569', color: '#fff', borderRadius: 6, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {t('importXml')}
            <input type="file" accept=".xml" onChange={handleImportBeerXml} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginBottom: 8 }}>{t('savedRecipes')} ({recipes.length})</div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {recipes.map((r) => (
            <div
              key={r.id}
              onClick={() => { setCurrent(r); setNavSection('recipe'); }}
              style={{
                padding: 10, marginBottom: 6, borderRadius: 6, cursor: 'pointer',
                background: current.id === r.id && navSection === 'recipe' ? '#3b82f6' : '#334155',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: '#cbd5e1' }}>
                  {r.abv}% ABV · {r.ibu} IBU · {r.srm} SRM
                </div>
              </div>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!r.id) return;
                  await fetch(`${API}/recipes/${r.id}`, { method: 'DELETE' });
                  loadAll();
                }}
                style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: 14 }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </aside>

      <main style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <style>{`@media print { .no-print-watermark { display: none !important; } }`}</style>
        <div
          aria-hidden="true"
          className="no-print-watermark"
          style={{
            position: 'fixed',
            top: '50%',
            left: 'calc(50% + 142px)',
            transform: 'translate(-50%, -50%)',
            width: 420,
            height: 420,
            backgroundImage: "url('/images/logo.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            opacity: 0.07,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          {navSection === 'recipe' && (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                <input
                  value={current.name}
                  onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                  style={{ fontSize: 20, fontWeight: 700, padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', minWidth: 260 }}
                />
                <select
                  value={current.style}
                  onChange={(e) => setCurrent({ ...current, style: e.target.value })}
                  style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', background: '#fff', color: '#111827', minWidth: 230 }}
                >
                  {!stylesList.some((s) => `${s.categoryNumber} - ${s.name}` === current.style) && (
                    <option value={current.style} style={{ color: '#111827', background: '#fff' }}>{current.style}</option>
                  )}
                  {stylesList.map((s) => (
                    <option key={s.id} value={`${s.categoryNumber} - ${s.name}`} style={{ color: '#111827', background: '#fff' }}>
                      {s.categoryNumber} - {s.name}
                    </option>
                  ))}
                </select>
                <select
                  value={current.ibuFormula}
                  onChange={(e) => setCurrent({ ...current, ibuFormula: e.target.value })}
                  style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }}
                >
                  <option value="Tinseth">IBU: Tinseth</option>
                  <option value="Rager">IBU: Rager</option>
                </select>
                <button onClick={handleSaveRecipe} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>
                  {t('saveRecipe')}
                </button>
                <button onClick={handleBrewDay} style={{ padding: '8px 14px', background: '#d97706', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>
                  {t('brewIt')}
                </button>
                {current.id && (
                  <a
                    href={`${API}/recipes/${current.id}/beerxml`}
                    style={{ padding: '8px 12px', background: '#475569', color: '#fff', borderRadius: 6, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}
                  >
                    {t('exportBeerXml')}
                  </a>
                )}
              </div>

              {matchedStyle && (
                <div style={{ padding: '8px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6, marginBottom: 14, fontSize: 13, color: '#1e40af' }}>
                  <strong>BJCP {matchedStyle.categoryNumber} ({matchedStyle.name}):</strong> {matchedStyle.notes}
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 16, fontSize: 13 }}>
                <label>
                  {t('equipmentPreset')}{' '}
                  <select
                    onChange={(e) => {
                      const eq = equipmentList.find((x) => x.id === Number(e.target.value));
                      if (eq) {
                        setCurrent({
                          ...current,
                          batchSizeLiters: eq.batchSizeLiters,
                          boilTimeMinutes: eq.boilTimeMinutes,
                          efficiencyPercent: eq.efficiencyPercent,
                          boilSizeLiters: Number((eq.batchSizeLiters + eq.evaporationRateLitersPerHour * (eq.boilTimeMinutes / 60) + eq.trubChillerLossLiters).toFixed(1)),
                        });
                      }
                    }}
                  >
                    <option value="">{t('selectEquipment')}</option>
                    {equipmentList.map((eq) => (
                      <option key={eq.id} value={eq.id}>{eq.name}</option>
                    ))}
                  </select>
                </label>
                <label>{t('batchL')} <input type="number" style={{ width: 65 }} value={current.batchSizeLiters} onChange={(e) => setCurrent({ ...current, batchSizeLiters: Number(e.target.value) })} /></label>
                <label>{t('boilL')} <input type="number" style={{ width: 65 }} value={current.boilSizeLiters} onChange={(e) => setCurrent({ ...current, boilSizeLiters: Number(e.target.value) })} /></label>
                <label>{t('boilMin')} <input type="number" style={{ width: 65 }} value={current.boilTimeMinutes} onChange={(e) => setCurrent({ ...current, boilTimeMinutes: Number(e.target.value) })} /></label>
                <label>{t('efficiencyPct')} <input type="number" style={{ width: 65 }} value={current.efficiencyPercent} onChange={(e) => setCurrent({ ...current, efficiencyPercent: Number(e.target.value) })} /></label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 20 }}>
                <RangeBar label="OG" value={current.og} min={matchedStyle?.ogMin} max={matchedStyle?.ogMax} decimals={3} />
                <RangeBar label="FG" value={current.fg} min={matchedStyle?.fgMin} max={matchedStyle?.fgMax} decimals={3} />
                <RangeBar label="ABV" value={current.abv} min={matchedStyle?.abvMin} max={matchedStyle?.abvMax} decimals={1} unit="%" />
                <RangeBar label={`IBU (${current.ibuFormula})`} value={current.ibu} min={matchedStyle?.ibuMin} max={matchedStyle?.ibuMax} decimals={1} />
                <div style={{ padding: 12, borderRadius: 8, border: '1px solid #d1d5db', background: srmToHex(current.srm), color: current.srm > 14 ? '#fff' : '#111' }}>
                  <div style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t('colorSrm')}</span>
                    {matchedStyle && <span>{matchedStyle.srmMin}–{matchedStyle.srmMax}</span>}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{current.srm.toFixed(1)}</div>
                </div>
                <div style={{ padding: 12, background: '#fff', border: '1px solid #d1d5db', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{t('calories355')}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{current.caloriesPer355ml} kcal</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #e2e8f0', marginBottom: 16 }}>
                {[
                  ['ingredients', t('tabIngredients')],
                  ['mash', t('tabMash')],
                  ['brewsheet', t('tabBrewSheet')],
                ].map(([tab, title]) => (
                  <button
                    key={tab}
                    onClick={() => setRecipeTab(tab as any)}
                    style={{
                      padding: '10px 16px', border: 'none', background: recipeTab === tab ? '#2563eb' : 'transparent',
                      color: recipeTab === tab ? '#fff' : '#475569', fontWeight: 600, borderRadius: '6px 6px 0 0', cursor: 'pointer',
                    }}
                  >
                    {title}
                  </button>
                ))}
              </div>

              {recipeTab === 'ingredients' && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <section style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h3 style={{ margin: 0 }}>{t('fermentablesTitle')} ({t('totalGrain')}: {totalGrainKg.toFixed(2)} kg)</h3>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <select
                          onChange={(e) => {
                            const item = inventory.find((i) => i.id === Number(e.target.value));
                            if (item) {
                              setCurrent({
                                ...current,
                                fermentables: [...current.fermentables, { name: item.name, type: 'Grain', amountKg: 1.0, yieldPercent: 80, colorLovibond: item.alphaOrColorOrAtten }],
                              });
                            }
                          }}
                        >
                          <option value="">{t('quickAddInventory')}</option>
                          {inventory.filter((i) => i.category === 'Fermentable').map((i) => (
                            <option key={i.id} value={i.id}>{i.name} ({i.quantity} kg {t('inStock')})</option>
                          ))}
                        </select>
                        <button onClick={() => setCurrent({ ...current, fermentables: [...current.fermentables, { name: 'Pilsner Malt', type: 'Grain', amountKg: 1.0, yieldPercent: 81, colorLovibond: 1.8 }] })}>
                          {t('blankRow')}
                        </button>
                      </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                          <th>{t('colName')}</th><th>{t('colType')}</th><th>{t('colWeightKg')}</th><th>{t('colGristPct')}</th><th>{t('colYieldPct')}</th><th>{t('colColorL')}</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {current.fermentables.map((f, idx) => {
                          const totalWeight = current.fermentables.reduce((a, b) => a + b.amountKg, 0) || 1;
                          return (
                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td><input value={f.name} onChange={(e) => { const l = [...current.fermentables]; l[idx].name = e.target.value; setCurrent({ ...current, fermentables: l }); }} /></td>
                              <td>
                                <select value={f.type} onChange={(e) => { const l = [...current.fermentables]; l[idx].type = e.target.value; setCurrent({ ...current, fermentables: l }); }}>
                                  <option value="Grain">{t('typeGrain')}</option>
                                  <option value="Sugar">{t('typeSugar')}</option>
                                  <option value="Extract">{t('typeExtract')}</option>
                                  <option value="Dry Extract">{t('typeDryExtract')}</option>
                                </select>
                              </td>
                              <td><input type="number" step="0.05" style={{ width: 70 }} value={f.amountKg} onChange={(e) => { const l = [...current.fermentables]; l[idx].amountKg = Number(e.target.value); setCurrent({ ...current, fermentables: l }); }} /></td>
                              <td style={{ fontSize: 13, color: '#64748b' }}>{((f.amountKg / totalWeight) * 100).toFixed(1)}%</td>
                              <td><input type="number" style={{ width: 65 }} value={f.yieldPercent} onChange={(e) => { const l = [...current.fermentables]; l[idx].yieldPercent = Number(e.target.value); setCurrent({ ...current, fermentables: l }); }} /></td>
                              <td><input type="number" style={{ width: 65 }} value={f.colorLovibond} onChange={(e) => { const l = [...current.fermentables]; l[idx].colorLovibond = Number(e.target.value); setCurrent({ ...current, fermentables: l }); }} /></td>
                              <td><button onClick={() => setCurrent({ ...current, fermentables: current.fermentables.filter((_, i) => i !== idx) })}>✕</button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </section>

                  <section style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h3 style={{ margin: 0 }}>{t('hopsTitle')}</h3>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <select
                          onChange={(e) => {
                            const item = inventory.find((i) => i.id === Number(e.target.value));
                            if (item) {
                              setCurrent({
                                ...current,
                                hops: [...current.hops, { name: item.name, form: 'Pellet', amountGrams: 25, alphaAcidPercent: item.alphaOrColorOrAtten, boilTimeMinutes: 15, useType: 'Boil' }],
                              });
                            }
                          }}
                        >
                          <option value="">{t('quickAddInventory')}</option>
                          {inventory.filter((i) => i.category === 'Hop').map((i) => (
                            <option key={i.id} value={i.id}>{i.name} ({i.alphaOrColorOrAtten}% AA · {i.quantity}g)</option>
                          ))}
                        </select>
                        <button onClick={() => setCurrent({ ...current, hops: [...current.hops, { name: 'Citra', form: 'Pellet', amountGrams: 25, alphaAcidPercent: 12.0, boilTimeMinutes: 10, useType: 'Boil' }] })}>
                          {t('blankRow')}
                        </button>
                      </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                          <th>{t('colVariety')}</th><th>{t('colForm')}</th><th>{t('colWeightG')}</th><th>{t('colAlphaPct')}</th><th>{t('colUse')}</th><th>{t('colTimeMin')}</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {current.hops.map((h, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td><input value={h.name} onChange={(e) => { const l = [...current.hops]; l[idx].name = e.target.value; setCurrent({ ...current, hops: l }); }} /></td>
                            <td>
                              <select value={h.form} onChange={(e) => { const l = [...current.hops]; l[idx].form = e.target.value; setCurrent({ ...current, hops: l }); }}>
                                <option value="Pellet">{t('formPellet')}</option>
                                <option value="Leaf">{t('formLeaf')}</option>
                                <option value="Plug">{t('formPlug')}</option>
                              </select>
                            </td>
                            <td><input type="number" style={{ width: 70 }} value={h.amountGrams} onChange={(e) => { const l = [...current.hops]; l[idx].amountGrams = Number(e.target.value); setCurrent({ ...current, hops: l }); }} /></td>
                            <td><input type="number" step="0.1" style={{ width: 65 }} value={h.alphaAcidPercent} onChange={(e) => { const l = [...current.hops]; l[idx].alphaAcidPercent = Number(e.target.value); setCurrent({ ...current, hops: l }); }} /></td>
                            <td>
                              <select value={h.useType} onChange={(e) => { const l = [...current.hops]; l[idx].useType = e.target.value; setCurrent({ ...current, hops: l }); }}>
                                <option value="Boil">{t('useBoil')}</option>
                                <option value="First Wort">{t('useFirstWort')}</option>
                                <option value="Aroma/Whirlpool">{t('useWhirlpool')}</option>
                                <option value="Dry Hop">{t('useDryHop')}</option>
                              </select>
                            </td>
                            <td><input type="number" style={{ width: 65 }} value={h.boilTimeMinutes} onChange={(e) => { const l = [...current.hops]; l[idx].boilTimeMinutes = Number(e.target.value); setCurrent({ ...current, hops: l }); }} /></td>
                            <td><button onClick={() => setCurrent({ ...current, hops: current.hops.filter((_, i) => i !== idx) })}>✕</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <section style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <h3 style={{ margin: 0 }}>{t('yeastTitle')}</h3>
                        <button onClick={() => setCurrent({ ...current, yeasts: [...current.yeasts, { name: 'Safale US-05', laboratory: 'Fermentis', productId: 'US-05', type: 'Ale', form: 'Dry', attenuationPercent: 78, minTempC: 18, maxTempC: 22, flocculation: 'Medium', amountPackages: 1 }] })}>
                          {t('addYeast')}
                        </button>
                      </div>
                      {current.yeasts.map((y, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                          <input value={y.name} onChange={(e) => { const l = [...current.yeasts]; l[idx].name = e.target.value; setCurrent({ ...current, yeasts: l }); }} />
                          <input type="number" style={{ width: 60 }} value={y.attenuationPercent} onChange={(e) => { const l = [...current.yeasts]; l[idx].attenuationPercent = Number(e.target.value); setCurrent({ ...current, yeasts: l }); }} />
                          <span>%</span>
                          <button onClick={() => setCurrent({ ...current, yeasts: current.yeasts.filter((_, i) => i !== idx) })}>✕</button>
                        </div>
                      ))}
                    </section>

                    <section style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <h3 style={{ margin: 0 }}>{t('miscsTitle')}</h3>
                        <button onClick={() => setCurrent({ ...current, miscs: [...current.miscs, { name: 'Irish Moss', type: 'Fining', useType: 'Boil', amount: 5, unit: 'g', timeMinutes: 15 }] })}>
                          {t('addMisc')}
                        </button>
                      </div>
                      {current.miscs.map((m, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                          <input value={m.name} onChange={(e) => { const l = [...current.miscs]; l[idx].name = e.target.value; setCurrent({ ...current, miscs: l }); }} />
                          <input type="number" style={{ width: 55 }} value={m.amount} onChange={(e) => { const l = [...current.miscs]; l[idx].amount = Number(e.target.value); setCurrent({ ...current, miscs: l }); }} />
                          <input style={{ width: 40 }} value={m.unit} onChange={(e) => { const l = [...current.miscs]; l[idx].unit = e.target.value; setCurrent({ ...current, miscs: l }); }} />
                          <button onClick={() => setCurrent({ ...current, miscs: current.miscs.filter((_, i) => i !== idx) })}>✕</button>
                        </div>
                      ))}
                    </section>
                  </div>
                </div>
              )}

              {recipeTab === 'mash' && (
                <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', padding: 10, background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 14, fontSize: 13 }}>
                    <strong>{t('targetWaterProfile')}</strong>
                    <select
                      value={current.waterProfile?.id || ''}
                      onChange={(e) => {
                        const wp = waterList.find((w) => w.id === Number(e.target.value)) || null;
                        setCurrent({ ...current, waterProfile: wp });
                      }}
                    >
                      <option value="">{t('noneSelected')}</option>
                      {waterList.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name} (Ca:{w.calciumPpm} Mg:{w.magnesiumPpm} Na:{w.sodiumPpm} Cl:{w.chloridePpm} SO₄:{w.sulfatePpm} HCO₃:{w.bicarbonatePpm})
                        </option>
                      ))}
                    </select>
                    {current.waterProfile && (
                      <span style={{ color: '#0369a1', fontWeight: 600 }}>
                        pH {current.waterProfile.ph} · Ca²⁺ {current.waterProfile.calciumPpm} ppm · Cl⁻ {current.waterProfile.chloridePpm} ppm · SO₄²⁻ {current.waterProfile.sulfatePpm} ppm
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <h3 style={{ margin: 0 }}>{t('mashStepsTitle')} ({t('grainBill')}: {totalGrainKg.toFixed(2)} kg)</h3>
                    <button onClick={() => setCurrent({
                      ...current,
                      mashSteps: [...current.mashSteps, { stepOrder: current.mashSteps.length + 1, name: 'Mash Out', type: 'Infusion', infuseAmountLiters: 6, targetTempC: 75.6, stepTimeMinutes: 10, rampTimeMinutes: 2 }],
                    })}>
                      {t('addMashStep')}
                    </button>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                        <th>{t('colStep')}</th><th>{t('colType')}</th><th>{t('colWaterL')}</th><th>{t('colTargetTempC')}</th><th>{t('colDurationMin')}</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.mashSteps.map((s, idx) => (
                        <tr key={idx}>
                          <td><input value={s.name} onChange={(e) => { const l = [...current.mashSteps]; l[idx].name = e.target.value; setCurrent({ ...current, mashSteps: l }); }} /></td>
                          <td>
                            <select value={s.type} onChange={(e) => { const l = [...current.mashSteps]; l[idx].type = e.target.value; setCurrent({ ...current, mashSteps: l }); }}>
                              <option value="Infusion">{t('stepInfusion')}</option>
                              <option value="Temperature">{t('stepTemperature')}</option>
                              <option value="Decoction">{t('stepDecoction')}</option>
                            </select>
                          </td>
                          <td><input type="number" style={{ width: 70 }} value={s.infuseAmountLiters} onChange={(e) => { const l = [...current.mashSteps]; l[idx].infuseAmountLiters = Number(e.target.value); setCurrent({ ...current, mashSteps: l }); }} /></td>
                          <td><input type="number" step="0.5" style={{ width: 70 }} value={s.targetTempC} onChange={(e) => { const l = [...current.mashSteps]; l[idx].targetTempC = Number(e.target.value); setCurrent({ ...current, mashSteps: l }); }} /></td>
                          <td><input type="number" style={{ width: 70 }} value={s.stepTimeMinutes} onChange={(e) => { const l = [...current.mashSteps]; l[idx].stepTimeMinutes = Number(e.target.value); setCurrent({ ...current, mashSteps: l }); }} /></td>
                          <td><button onClick={() => setCurrent({ ...current, mashSteps: current.mashSteps.filter((_, i) => i !== idx) })}>✕</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h4>{t('brewersNotes')}</h4>
                  <textarea
                    rows={4}
                    style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }}
                    value={current.notes}
                    onChange={(e) => setCurrent({ ...current, notes: e.target.value })}
                    placeholder={t('brewersNotesPlaceholder')}
                  />
                </div>
              )}

              {recipeTab === 'brewsheet' && (
                <div style={{ background: '#fff', padding: 24, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{t('brewDaySheetTitle')} {current.name}</h2>
                    <button onClick={() => window.print()} style={{ padding: '8px 16px', background: '#111827', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      {t('printPdf')}
                    </button>
                  </div>
                  <p><strong>{t('styleLabel')}</strong> {current.style} | <strong>{t('batchSizeLabel')}</strong> {current.batchSizeLiters} L | <strong>{t('boilSizeLabel')}</strong> {current.boilSizeLiters} L ({current.boilTimeMinutes} min)</p>
                  <p><strong>{t('targetOgLabel')}</strong> {current.og.toFixed(3)} | <strong>{t('targetFgLabel')}</strong> {current.fg.toFixed(3)} | <strong>ABV:</strong> {current.abv}% | <strong>IBU:</strong> {current.ibu} | <strong>SRM:</strong> {current.srm}</p>
                  <hr />
                  <h4>{t('sheetGrainBill')} ({totalGrainKg.toFixed(2)} kg)</h4>
                  <ul>{current.fermentables.map((f, i) => <li key={i}>{f.amountKg} kg — {f.name} ({f.colorLovibond} °L)</li>)}</ul>
                  <h4>{t('sheetMashSchedule')}</h4>
                  <ul>{current.mashSteps.map((s, i) => <li key={i}>{s.name} ({s.type}): {s.infuseAmountLiters} L @ {s.targetTempC}°C ({s.stepTimeMinutes} min)</li>)}</ul>
                  <h4>{t('sheetHopBoil')}</h4>
                  <ul>
                    {current.hops.map((h, i) => <li key={i}>{h.amountGrams} g — {h.name} ({h.alphaAcidPercent}% AA) — {h.useType} @ {h.boilTimeMinutes} min</li>)}
                    {current.miscs.map((m, i) => <li key={i}>{m.amount} {m.unit} — {m.name} ({m.useType} @ {m.timeMinutes} min)</li>)}
                  </ul>
                  <h4>{t('sheetFermentation')}</h4>
                  <ul>{current.yeasts.map((y, i) => <li key={i}>{y.name} ({y.laboratory} {y.productId}) — {y.attenuationPercent}% {t('attenuation')}</li>)}</ul>
                  {current.notes && <><h4>{t('sheetNotes')}</h4><p>{current.notes}</p></>}
                </div>
              )}
            </>
          )}

          {navSection === 'styles' && (
            <div style={{ display: 'grid', gap: 20 }}>
              <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h2 style={{ marginTop: 0 }}>{styleForm.id ? t('editBeerStyle') : t('addBeerStyle')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 12, fontSize: 13 }}>
                  <label>
                    {t('categoryNum')}
                    <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} placeholder="e.g., 21D" value={styleForm.categoryNumber} onChange={(e) => setStyleForm({ ...styleForm, categoryNumber: e.target.value })} />
                  </label>
                  <label style={{ gridColumn: 'span 3' }}>
                    {t('styleName')}
                    <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.name} onChange={(e) => setStyleForm({ ...styleForm, name: e.target.value })} />
                  </label>
                  <label style={{ gridColumn: 'span 2' }}>
                    {t('guide')}
                    <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.guide || 'BJCP 2021'} onChange={(e) => setStyleForm({ ...styleForm, guide: e.target.value })} />
                  </label>

                  <label>OG Min <input type="number" step="0.001" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.ogMin} onChange={(e) => setStyleForm({ ...styleForm, ogMin: Number(e.target.value) })} /></label>
                  <label>OG Max <input type="number" step="0.001" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.ogMax} onChange={(e) => setStyleForm({ ...styleForm, ogMax: Number(e.target.value) })} /></label>
                  <label>FG Min <input type="number" step="0.001" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.fgMin} onChange={(e) => setStyleForm({ ...styleForm, fgMin: Number(e.target.value) })} /></label>
                  <label>FG Max <input type="number" step="0.001" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.fgMax} onChange={(e) => setStyleForm({ ...styleForm, fgMax: Number(e.target.value) })} /></label>
                  <label>ABV Min (%) <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.abvMin} onChange={(e) => setStyleForm({ ...styleForm, abvMin: Number(e.target.value) })} /></label>
                  <label>ABV Max (%) <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.abvMax} onChange={(e) => setStyleForm({ ...styleForm, abvMax: Number(e.target.value) })} /></label>

                  <label>IBU Min <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.ibuMin} onChange={(e) => setStyleForm({ ...styleForm, ibuMin: Number(e.target.value) })} /></label>
                  <label>IBU Max <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.ibuMax} onChange={(e) => setStyleForm({ ...styleForm, ibuMax: Number(e.target.value) })} /></label>
                  <label>SRM Min <input type="number" step="0.5" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.srmMin} onChange={(e) => setStyleForm({ ...styleForm, srmMin: Number(e.target.value) })} /></label>
                  <label>SRM Max <input type="number" step="0.5" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={styleForm.srmMax} onChange={(e) => setStyleForm({ ...styleForm, srmMax: Number(e.target.value) })} /></label>
                  <label style={{ gridColumn: 'span 2' }}>
                    {t('descriptionNotes')}
                    <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} placeholder={t('notesPlaceholder')} value={styleForm.notes} onChange={(e) => setStyleForm({ ...styleForm, notes: e.target.value })} />
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!styleForm.name.trim()) {
                        alert(t('alertEnterStyleName'));
                        return;
                      }
                      const isEdit = Boolean(styleForm.id);
                      const url = isEdit ? `${API}/styles/${styleForm.id}` : `${API}/styles`;
                      const method = isEdit ? 'PUT' : 'POST';
                      const res = await fetch(url, {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(styleForm),
                      });
                      if (res.ok) {
                        const saved: BjcpStyle = await res.json();
                        setStyleStatusMsg(`${saved.categoryNumber} - ${saved.name} ✓`);
                        setStyleForm(emptyStyle);
                        await loadAll();
                      } else {
                        const errText = await res.text();
                        alert('HTTP ' + res.status + ': ' + errText);
                      }
                    }}
                    style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                  >
                    {styleForm.id ? t('updateBeerStyle') : t('saveBeerStyle')}
                  </button>
                  {styleForm.id && (
                    <button type="button" onClick={() => setStyleForm(emptyStyle)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      {t('cancelEdit')}
                    </button>
                  )}
                  {styleStatusMsg && (
                    <span style={{ color: '#15803d', fontWeight: 600, fontSize: 13 }}>{styleStatusMsg}</span>
                  )}
                </div>
              </div>

              <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h2 style={{ margin: 0 }}>{t('styleLibraryTitle')} ({stylesList.length})</h2>
                  <input
                    placeholder={t('searchStylePlaceholder')}
                    value={styleFilter}
                    onChange={(e) => setStyleFilter(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', width: 250 }}
                  />
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                      <th>{t('colCode')}</th><th>{t('colStyleName')}</th><th>OG</th><th>FG</th><th>ABV</th><th>IBU</th><th>SRM</th><th>{t('colColor')}</th><th>{t('colActions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stylesList
                      .filter((s) => !styleFilter || `${s.categoryNumber} ${s.name} ${s.notes}`.toLowerCase().includes(styleFilter.toLowerCase()))
                      .map((s) => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                          <td><strong>{s.categoryNumber}</strong></td>
                          <td>
                            <strong>{s.name}</strong>
                            <div style={{ fontSize: 11, color: '#64748b' }}>{s.notes}</div>
                          </td>
                          <td>{s.ogMin.toFixed(3)}–{s.ogMax.toFixed(3)}</td>
                          <td>{s.fgMin.toFixed(3)}–{s.fgMax.toFixed(3)}</td>
                          <td>{s.abvMin}–{s.abvMax}%</td>
                          <td>{s.ibuMin}–{s.ibuMax}</td>
                          <td>{s.srmMin}–{s.srmMax}</td>
                          <td>
                            <span style={{ display: 'inline-block', width: 16, height: 16, borderRadius: 3, background: srmToHex(s.srmMin), border: '1px solid #cbd5e1' }} />
                            <span style={{ display: 'inline-block', width: 16, height: 16, borderRadius: 3, background: srmToHex(s.srmMax), border: '1px solid #cbd5e1', marginLeft: 2 }} />
                          </td>
                          <td style={{ display: 'flex', gap: 6, padding: '6px 0' }}>
                            <button type="button" onClick={() => { setCurrent({ ...current, style: `${s.categoryNumber} - ${s.name}` }); setNavSection('recipe'); }}>{t('btnUse')}</button>
                            <button
                              type="button"
                              onClick={() => {
                                setStyleStatusMsg(null);
                                setStyleForm({
                                  id: s.id,
                                  categoryNumber: s.categoryNumber || '',
                                  name: s.name || '',
                                  guide: s.guide || 'BJCP 2021',
                                  ogMin: s.ogMin ?? 1.045,
                                  ogMax: s.ogMax ?? 1.060,
                                  fgMin: s.fgMin ?? 1.008,
                                  fgMax: s.fgMax ?? 1.015,
                                  ibuMin: s.ibuMin ?? 20,
                                  ibuMax: s.ibuMax ?? 45,
                                  srmMin: s.srmMin ?? 4,
                                  srmMax: s.srmMax ?? 12,
                                  abvMin: s.abvMin ?? 4.5,
                                  abvMax: s.abvMax ?? 6.5,
                                  notes: s.notes || '',
                                });
                                document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              {t('btnEdit')}
                            </button>
                            <button type="button" onClick={async () => { if (!s.id) return; await fetch(`${API}/styles/${s.id}`, { method: 'DELETE' }); await loadAll(); }}>✕</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {navSection === 'inventory' && (
            <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h2>{t('inventoryTitle')}</h2>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <select value={newInv.category} onChange={(e) => setNewInv({ ...newInv, category: e.target.value })}>
                  <option value="Fermentable">{t('catFermentable')}</option>
                  <option value="Hop">{t('catHop')}</option>
                  <option value="Yeast">{t('catYeast')}</option>
                  <option value="Misc">{t('catMisc')}</option>
                </select>
                <input placeholder={t('ingredientNamePlaceholder')} value={newInv.name} onChange={(e) => setNewInv({ ...newInv, name: e.target.value })} />
                <input type="number" style={{ width: 80 }} value={newInv.quantity} onChange={(e) => setNewInv({ ...newInv, quantity: Number(e.target.value) })} />
                <input style={{ width: 60 }} placeholder="unit" value={newInv.unit} onChange={(e) => setNewInv({ ...newInv, unit: e.target.value })} />
                <input type="number" step="0.1" style={{ width: 80 }} value={newInv.alphaOrColorOrAtten} onChange={(e) => setNewInv({ ...newInv, alphaOrColorOrAtten: Number(e.target.value) })} />
                <button onClick={async () => {
                  if (!newInv.name) return;
                  await fetch(`${API}/inventory`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newInv) });
                  setNewInv({ ...newInv, name: '' });
                  loadAll();
                }}>{t('addStock')}</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                    <th>{t('colCategory')}</th><th>{t('colIngredient')}</th><th>{t('colOnHand')}</th><th>{t('colSpec')}</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td>{item.category}</td>
                      <td><strong>{item.name}</strong></td>
                      <td>{item.quantity.toFixed(2)} {item.unit}</td>
                      <td>{item.alphaOrColorOrAtten}</td>
                      <td><button onClick={async () => { await fetch(`${API}/inventory/${item.id}`, { method: 'DELETE' }); loadAll(); }}>{t('btnDelete')}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {navSection === 'equipment' && (
            <div style={{ display: 'grid', gap: 20 }}>
              <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h2 style={{ marginTop: 0 }}>{eqForm.id ? t('editEquipment') : t('addEquipment')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14, fontSize: 13 }}>
                  <label style={{ gridColumn: 'span 2' }}>
                    {t('profileName')}
                    <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.name} onChange={(e) => setEqForm({ ...eqForm, name: e.target.value })} />
                  </label>
                  <label>{t('batchSizeL')} <input type="number" step="0.5" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.batchSizeLiters} onChange={(e) => setEqForm({ ...eqForm, batchSizeLiters: Number(e.target.value) })} /></label>
                  <label>{t('boilTimeMin')} <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.boilTimeMinutes} onChange={(e) => setEqForm({ ...eqForm, boilTimeMinutes: Number(e.target.value) })} /></label>
                  <label>{t('evapRate')} <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.evaporationRateLitersPerHour} onChange={(e) => setEqForm({ ...eqForm, evaporationRateLitersPerHour: Number(e.target.value) })} /></label>
                  <label>{t('kettleDeadspace')} <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.kettleDeadspaceLiters} onChange={(e) => setEqForm({ ...eqForm, kettleDeadspaceLiters: Number(e.target.value) })} /></label>
                  <label>{t('lauterDeadspace')} <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.lauterDeadspaceLiters} onChange={(e) => setEqForm({ ...eqForm, lauterDeadspaceLiters: Number(e.target.value) })} /></label>
                  <label>{t('trubLoss')} <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.trubChillerLossLiters} onChange={(e) => setEqForm({ ...eqForm, trubChillerLossLiters: Number(e.target.value) })} /></label>
                  <label>{t('grainAbsorption')} <input type="number" step="0.02" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.grainAbsorptionLitersPerKg} onChange={(e) => setEqForm({ ...eqForm, grainAbsorptionLitersPerKg: Number(e.target.value) })} /></label>
                  <label>{t('brewhouseEff')} <input type="number" step="0.5" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.efficiencyPercent} onChange={(e) => setEqForm({ ...eqForm, efficiencyPercent: Number(e.target.value) })} /></label>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={async () => {
                      if (!eqForm.name.trim()) return;
                      await fetch(`${API}/equipment`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(eqForm) });
                      setEqForm(emptyEquipment);
                      loadAll();
                    }}
                    style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                  >
                    {eqForm.id ? t('updateEquipment') : t('saveEquipment')}
                  </button>
                  {eqForm.id && (
                    <button onClick={() => setEqForm(emptyEquipment)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      {t('cancelEdit')}
                    </button>
                  )}
                </div>
              </div>

              <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h2 style={{ marginTop: 0 }}>{t('savedEquipmentTitle')} ({equipmentList.length})</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                      <th>{t('profileName')}</th><th>{t('batchSizeL')}</th><th>{t('boilTimeMin')}</th><th>{t('evapRate')}</th><th>{t('kettleDeadspace')}</th><th>{t('lauterDeadspace')}</th><th>{t('trubLoss')}</th><th>{t('grainAbsorption')}</th><th>{t('brewhouseEff')}</th><th>{t('colActions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentList.map((eq) => (
                      <tr key={eq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td><strong>{eq.name}</strong></td>
                        <td>{eq.batchSizeLiters}</td><td>{eq.boilTimeMinutes}</td><td>{eq.evaporationRateLitersPerHour}</td>
                        <td>{eq.kettleDeadspaceLiters}</td><td>{eq.lauterDeadspaceLiters}</td><td>{eq.trubChillerLossLiters}</td>
                        <td>{eq.grainAbsorptionLitersPerKg}</td><td>{eq.efficiencyPercent}%</td>
                        <td style={{ display: 'flex', gap: 6, padding: '6px 0' }}>
                          <button onClick={() => setEqForm(eq)}>{t('btnEdit')}</button>
                          <button onClick={async () => { if (!eq.id) return; await fetch(`${API}/equipment/${eq.id}`, { method: 'DELETE' }); if (eqForm.id === eq.id) setEqForm(emptyEquipment); loadAll(); }}>{t('btnDelete')}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {navSection === 'water' && (
            <div style={{ display: 'grid', gap: 20 }}>
              <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h2 style={{ marginTop: 0 }}>{waterForm.id ? t('editWater') : t('addWater')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14, fontSize: 13 }}>
                  <label style={{ gridColumn: 'span 2' }}>
                    {t('waterProfileName')}
                    <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.name} onChange={(e) => setWaterForm({ ...waterForm, name: e.target.value })} />
                  </label>
                  <label>pH <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.ph} onChange={(e) => setWaterForm({ ...waterForm, ph: Number(e.target.value) })} /></label>
                  <label>Ca²⁺ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.calciumPpm} onChange={(e) => setWaterForm({ ...waterForm, calciumPpm: Number(e.target.value) })} /></label>
                  <label>Mg²⁺ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.magnesiumPpm} onChange={(e) => setWaterForm({ ...waterForm, magnesiumPpm: Number(e.target.value) })} /></label>
                  <label>Na⁺ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.sodiumPpm} onChange={(e) => setWaterForm({ ...waterForm, sodiumPpm: Number(e.target.value) })} /></label>
                  <label>Cl⁻ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.chloridePpm} onChange={(e) => setWaterForm({ ...waterForm, chloridePpm: Number(e.target.value) })} /></label>
                  <label>SO₄²⁻ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.sulfatePpm} onChange={(e) => setWaterForm({ ...waterForm, sulfatePpm: Number(e.target.value) })} /></label>
                  <label>HCO₃⁻ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.bicarbonatePpm} onChange={(e) => setWaterForm({ ...waterForm, bicarbonatePpm: Number(e.target.value) })} /></label>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={async () => {
                      if (!waterForm.name.trim()) return;
                      await fetch(`${API}/waters`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(waterForm) });
                      setWaterForm(emptyWater);
                      loadAll();
                    }}
                    style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                  >
                    {waterForm.id ? t('updateWater') : t('saveWater')}
                  </button>
                  {waterForm.id && (
                    <button onClick={() => setWaterForm(emptyWater)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      {t('cancelEdit')}
                    </button>
                  )}
                </div>
              </div>

              <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h2 style={{ marginTop: 0 }}>{t('waterProfilesTitle')}</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                      <th>{t('waterProfileName')}</th><th>pH</th><th>Ca²⁺</th><th>Mg²⁺</th><th>Na⁺</th><th>Cl⁻</th><th>SO₄²⁻</th><th>HCO₃⁻</th><th>SO₄:Cl</th><th>{t('colActions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterList.map((w) => {
                      const ratio = w.chloridePpm > 0 ? (w.sulfatePpm / w.chloridePpm).toFixed(2) : t('waterBalanced');
                      const character = w.chloridePpm === 0 && w.sulfatePpm === 0 ? t('waterNeutral')
                        : w.sulfatePpm > w.chloridePpm * 1.4 ? t('waterHoppy')
                        : w.chloridePpm > w.sulfatePpm * 1.4 ? t('waterMalty')
                        : t('waterBalanced');
                      return (
                        <tr key={w.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td><strong>{w.name}</strong></td>
                          <td>{w.ph}</td><td>{w.calciumPpm}</td><td>{w.magnesiumPpm}</td><td>{w.sodiumPpm}</td>
                          <td>{w.chloridePpm}</td><td>{w.sulfatePpm}</td><td>{w.bicarbonatePpm}</td>
                          <td>{ratio} ({character})</td>
                          <td style={{ display: 'flex', gap: 6, padding: '6px 0' }}>
                            <button onClick={() => setWaterForm(w)}>{t('btnEdit')}</button>
                            <button onClick={async () => { if (!w.id) return; await fetch(`${API}/waters/${w.id}`, { method: 'DELETE' }); if (waterForm.id === w.id) setWaterForm(emptyWater); loadAll(); }}>{t('btnDelete')}</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {navSection === 'brewnotes' && (
            <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h2>{t('brewLogsTitle')}</h2>
              {brewNotes.length === 0 ? <p>{t('noBrewLogs')}</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                      <th>{t('colDate')}</th><th>{t('colRecipe')}</th><th>{t('colTargetActualOg')}</th><th>{t('colTargetActualFg')}</th><th>{t('colVolumeL')}</th><th>{t('colNotes')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brewNotes.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td>{b.brewDate}</td>
                        <td><strong>{b.recipeName}</strong></td>
                        <td>{b.targetOg.toFixed(3)} / {b.actualOg.toFixed(3)}</td>
                        <td>{b.targetFg.toFixed(3)} / {b.actualFg.toFixed(3)}</td>
                        <td>{b.actualVolumeLiters} L</td>
                        <td>{b.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {navSection === 'calculators' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h3>{t('calc1Title')}</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label>{t('targetMashTempC')} <input type="number" value={strikeIn.targetTempC} onChange={(e) => setStrikeIn({ ...strikeIn, targetTempC: Number(e.target.value) })} /></label>
                  <label>{t('dryGrainTempC')} <input type="number" value={strikeIn.grainTempC} onChange={(e) => setStrikeIn({ ...strikeIn, grainTempC: Number(e.target.value) })} /></label>
                  <label>{t('waterGrainRatio')} <input type="number" step="0.1" value={strikeIn.ratioLPerKg} onChange={(e) => setStrikeIn({ ...strikeIn, ratioLPerKg: Number(e.target.value) })} /></label>
                  <button onClick={async () => {
                    const r = await fetch(`${API}/calculators/strike-temp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(strikeIn) });
                    setStrikeOut((await r.json()).strikeTempC);
                  }}>{t('calcStrikeBtn')}</button>
                  {strikeOut !== null && <strong>{t('strikeTempResult')} {strikeOut} °C</strong>}
                </div>
              </div>

              <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h3>{t('calc2Title')}</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label>{t('originalBrix')} <input type="number" step="0.1" value={refracIn.originalBrix} onChange={(e) => setRefracIn({ ...refracIn, originalBrix: Number(e.target.value) })} /></label>
                  <label>{t('currentBrix')} <input type="number" step="0.1" value={refracIn.currentBrix} onChange={(e) => setRefracIn({ ...refracIn, currentBrix: Number(e.target.value) })} /></label>
                  <label>{t('wortCorrectionFactor')} <input type="number" step="0.01" value={refracIn.wcf} onChange={(e) => setRefracIn({ ...refracIn, wcf: Number(e.target.value) })} /></label>
                  <button onClick={async () => {
                    const r = await fetch(`${API}/calculators/refractometer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(refracIn) });
                    setRefracOut((await r.json()).correctedFg);
                  }}>{t('calcTrueFgBtn')}</button>
                  {refracOut !== null && <strong>{t('correctedFgResult')} {refracOut.toFixed(3)} SG</strong>}
                </div>
              </div>

              <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h3>{t('calc3Title')}</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label>{t('batchVolumeL')} <input type="number" value={primeIn.batchLiters} onChange={(e) => setPrimeIn({ ...primeIn, batchLiters: Number(e.target.value) })} /></label>
                  <label>{t('beerTempBottlingC')} <input type="number" value={primeIn.beerTempC} onChange={(e) => setPrimeIn({ ...primeIn, beerTempC: Number(e.target.value) })} /></label>
                  <label>{t('targetCo2Vol')} <input type="number" step="0.1" value={primeIn.targetCo2} onChange={(e) => setPrimeIn({ ...primeIn, targetCo2: Number(e.target.value) })} /></label>
                  <button onClick={async () => {
                    const r = await fetch(`${API}/calculators/priming`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(primeIn) });
                    setPrimeOut((await r.json()).dextroseGrams);
                  }}>{t('calcPrimingBtn')}</button>
                  {primeOut !== null && <strong>{t('cornSugarResult')} {primeOut} g</strong>}
                </div>
              </div>

              <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <h3>{t('calc4Title')}</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label>{t('measuredGravity')} <input type="number" step="0.001" value={hydroIn.measuredSg} onChange={(e) => setHydroIn({ ...hydroIn, measuredSg: Number(e.target.value) })} /></label>
                  <label>{t('sampleTempC')} <input type="number" value={hydroIn.sampleTempC} onChange={(e) => setHydroIn({ ...hydroIn, sampleTempC: Number(e.target.value) })} /></label>
                  <label>{t('calibrationTempC')} <input type="number" value={hydroIn.calibrationTempC} onChange={(e) => setHydroIn({ ...hydroIn, calibrationTempC: Number(e.target.value) })} /></label>
                  <button onClick={async () => {
                    const r = await fetch(`${API}/calculators/hydrometer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hydroIn) });
                    setHydroOut((await r.json()).correctedSg);
                  }}>{t('correctSgBtn')}</button>
                  {hydroOut !== null && <strong>{t('correctedSgResult')} {hydroOut.toFixed(3)} SG</strong>}
                </div>
              </div>
            </div>
          )}
        </div>

        <footer style={{ marginTop: 32, paddingTop: 14, borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: 12, color: '#64748b', position: 'relative', zIndex: 1 }}>
          © {new Date().getFullYear()} Y&amp;B Crew Beer C.O. — {t('footerRights')} / 
          Developed By @flaviolnx https://github.com/flaviolnx/beerbrew-web.
        </footer>
      </main>
    </div>
  );
}
