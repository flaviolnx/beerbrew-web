import { useEffect, useState } from 'react';
import {
  Recipe, EquipmentProfile, WaterProfile, BjcpStyle, BrewNote, InventoryItem
} from './types';

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
      body: JSON.stringify({ notes: `Brewed ${current.name} (${current.batchSizeLiters}L)` }),
    });
    await loadAll();
    alert('Brew Day logged and recipe ingredients deducted from Inventory!');
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
      alert('Failed to parse BeerXML file.');
    }
  };

  const matchedStyle =
    stylesList.find((s) => `${s.categoryNumber} - ${s.name}` === current.style) ||
    stylesList.find((s) => current.style?.toLowerCase() === s.name.toLowerCase()) ||
    stylesList.find((s) => current.style?.startsWith(`${s.categoryNumber} `));
  const totalGrainKg = current.fermentables.reduce((acc, f) => acc + (f.type === 'Grain' ? f.amountKg : 0), 0);

  return (
    <div style={{ display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif', height: '100vh', color: '#1f2937' }}>
      <aside style={{ width: 280, background: '#1e293b', color: '#f8fafc', display: 'flex', flexDirection: 'column', padding: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: '#fbbf24' }}>🍺 Y&B Crew Beer C.O.</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Yuki & Bombs Crew Brewing Studio</div>

        <nav style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 16 }}>
          {[
            ['recipe', '📋 Recipes'],
            ['styles', `🏆 Styles (${stylesList.length})`],
            ['inventory', '📦 Inventory'],
            ['equipment', '⚙️ Equipment'],
            ['water', '💧 Water'],
            ['brewnotes', '📓 Brew Logs'],
            ['calculators', '🧮 Tools'],
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
            + New Recipe
          </button>
          <label style={{ padding: 8, background: '#475569', color: '#fff', borderRadius: 6, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            Import XML
            <input type="file" accept=".xml" onChange={handleImportBeerXml} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#94a3b8', marginBottom: 8 }}>Saved Recipes ({recipes.length})</div>
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

      <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
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
                title={`Select Beer Style (${stylesList.length} loaded)`}
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
                Save Recipe
              </button>
              <button onClick={handleBrewDay} style={{ padding: '8px 14px', background: '#d97706', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>
                🍺 Brew It (Deduct Stock)
              </button>
              {current.id && (
                <a
                  href={`${API}/recipes/${current.id}/beerxml`}
                  style={{ padding: '8px 12px', background: '#475569', color: '#fff', borderRadius: 6, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}
                >
                  Export BeerXML
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
                Equipment Preset:{' '}
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
                  <option value="">-- Select Equipment --</option>
                  {equipmentList.map((eq) => (
                    <option key={eq.id} value={eq.id}>{eq.name}</option>
                  ))}
                </select>
              </label>
              <label>Batch (L): <input type="number" style={{ width: 65 }} value={current.batchSizeLiters} onChange={(e) => setCurrent({ ...current, batchSizeLiters: Number(e.target.value) })} /></label>
              <label>Boil (L): <input type="number" style={{ width: 65 }} value={current.boilSizeLiters} onChange={(e) => setCurrent({ ...current, boilSizeLiters: Number(e.target.value) })} /></label>
              <label>Boil (min): <input type="number" style={{ width: 65 }} value={current.boilTimeMinutes} onChange={(e) => setCurrent({ ...current, boilTimeMinutes: Number(e.target.value) })} /></label>
              <label>Efficiency (%): <input type="number" style={{ width: 65 }} value={current.efficiencyPercent} onChange={(e) => setCurrent({ ...current, efficiencyPercent: Number(e.target.value) })} /></label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 20 }}>
              <RangeBar label="OG" value={current.og} min={matchedStyle?.ogMin} max={matchedStyle?.ogMax} decimals={3} />
              <RangeBar label="FG" value={current.fg} min={matchedStyle?.fgMin} max={matchedStyle?.fgMax} decimals={3} />
              <RangeBar label="ABV" value={current.abv} min={matchedStyle?.abvMin} max={matchedStyle?.abvMax} decimals={1} unit="%" />
              <RangeBar label={`IBU (${current.ibuFormula})`} value={current.ibu} min={matchedStyle?.ibuMin} max={matchedStyle?.ibuMax} decimals={1} />
              <div style={{ padding: 12, borderRadius: 8, border: '1px solid #d1d5db', background: srmToHex(current.srm), color: current.srm > 14 ? '#fff' : '#111' }}>
                <div style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Color (SRM)</span>
                  {matchedStyle && <span>{matchedStyle.srmMin}–{matchedStyle.srmMax}</span>}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{current.srm.toFixed(1)}</div>
              </div>
              <div style={{ padding: 12, background: '#fff', border: '1px solid #d1d5db', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>Calories / 355ml</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{current.caloriesPer355ml} kcal</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #e2e8f0', marginBottom: 16 }}>
              {[
                ['ingredients', 'Fermentables, Hops, Yeast & Miscs'],
                ['mash', 'Mash Schedule & Water Chemistry'],
                ['brewsheet', 'Printable Brew Day Sheet'],
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
                    <h3 style={{ margin: 0 }}>Fermentables (Total Grain: {totalGrainKg.toFixed(2)} kg)</h3>
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
                        <option value="">+ Quick Add from Inventory</option>
                        {inventory.filter((i) => i.category === 'Fermentable').map((i) => (
                          <option key={i.id} value={i.id}>{i.name} ({i.quantity} kg in stock)</option>
                        ))}
                      </select>
                      <button onClick={() => setCurrent({ ...current, fermentables: [...current.fermentables, { name: 'Pilsner Malt', type: 'Grain', amountKg: 1.0, yieldPercent: 81, colorLovibond: 1.8 }] })}>
                        + Blank Row
                      </button>
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                        <th>Name</th><th>Type</th><th>Weight (kg)</th><th>% Grist</th><th>Yield (%)</th><th>Color (°L)</th><th></th>
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
                                <option value="Grain">Grain</option><option value="Sugar">Sugar</option><option value="Extract">Extract</option><option value="Dry Extract">Dry Extract</option>
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
                    <h3 style={{ margin: 0 }}>Hops</h3>
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
                        <option value="">+ Quick Add from Inventory</option>
                        {inventory.filter((i) => i.category === 'Hop').map((i) => (
                          <option key={i.id} value={i.id}>{i.name} ({i.alphaOrColorOrAtten}% AA · {i.quantity}g)</option>
                        ))}
                      </select>
                      <button onClick={() => setCurrent({ ...current, hops: [...current.hops, { name: 'Citra', form: 'Pellet', amountGrams: 25, alphaAcidPercent: 12.0, boilTimeMinutes: 10, useType: 'Boil' }] })}>
                        + Blank Row
                      </button>
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                        <th>Variety</th><th>Form</th><th>Weight (g)</th><th>Alpha (%)</th><th>Use</th><th>Time (min)</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.hops.map((h, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td><input value={h.name} onChange={(e) => { const l = [...current.hops]; l[idx].name = e.target.value; setCurrent({ ...current, hops: l }); }} /></td>
                          <td>
                            <select value={h.form} onChange={(e) => { const l = [...current.hops]; l[idx].form = e.target.value; setCurrent({ ...current, hops: l }); }}>
                              <option value="Pellet">Pellet</option><option value="Leaf">Leaf</option><option value="Plug">Plug</option>
                            </select>
                          </td>
                          <td><input type="number" style={{ width: 70 }} value={h.amountGrams} onChange={(e) => { const l = [...current.hops]; l[idx].amountGrams = Number(e.target.value); setCurrent({ ...current, hops: l }); }} /></td>
                          <td><input type="number" step="0.1" style={{ width: 65 }} value={h.alphaAcidPercent} onChange={(e) => { const l = [...current.hops]; l[idx].alphaAcidPercent = Number(e.target.value); setCurrent({ ...current, hops: l }); }} /></td>
                          <td>
                            <select value={h.useType} onChange={(e) => { const l = [...current.hops]; l[idx].useType = e.target.value; setCurrent({ ...current, hops: l }); }}>
                              <option value="Boil">Boil</option><option value="First Wort">First Wort</option><option value="Aroma/Whirlpool">Aroma/Whirlpool</option><option value="Dry Hop">Dry Hop</option>
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
                      <h3 style={{ margin: 0 }}>Yeast</h3>
                      <button onClick={() => setCurrent({ ...current, yeasts: [...current.yeasts, { name: 'Safale US-05', laboratory: 'Fermentis', productId: 'US-05', type: 'Ale', form: 'Dry', attenuationPercent: 78, minTempC: 18, maxTempC: 22, flocculation: 'Medium', amountPackages: 1 }] })}>
                        + Add Yeast
                      </button>
                    </div>
                    {current.yeasts.map((y, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                        <input value={y.name} onChange={(e) => { const l = [...current.yeasts]; l[idx].name = e.target.value; setCurrent({ ...current, yeasts: l }); }} />
                        <input type="number" style={{ width: 60 }} title="Attenuation %" value={y.attenuationPercent} onChange={(e) => { const l = [...current.yeasts]; l[idx].attenuationPercent = Number(e.target.value); setCurrent({ ...current, yeasts: l }); }} />
                        <span>%</span>
                        <button onClick={() => setCurrent({ ...current, yeasts: current.yeasts.filter((_, i) => i !== idx) })}>✕</button>
                      </div>
                    ))}
                  </section>

                  <section style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h3 style={{ margin: 0 }}>Miscs & Water Salts</h3>
                      <button onClick={() => setCurrent({ ...current, miscs: [...current.miscs, { name: 'Irish Moss', type: 'Fining', useType: 'Boil', amount: 5, unit: 'g', timeMinutes: 15 }] })}>
                        + Add Misc
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
                  <strong>Target Water Profile:</strong>
                  <select
                    value={current.waterProfile?.id || ''}
                    onChange={(e) => {
                      const wp = waterList.find((w) => w.id === Number(e.target.value)) || null;
                      setCurrent({ ...current, waterProfile: wp });
                    }}
                  >
                    <option value="">-- None Selected --</option>
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
                  <h3 style={{ margin: 0 }}>Mash Steps (Grain Bill: {totalGrainKg.toFixed(2)} kg)</h3>
                  <button onClick={() => setCurrent({
                    ...current,
                    mashSteps: [...current.mashSteps, { stepOrder: current.mashSteps.length + 1, name: 'Mash Out', type: 'Infusion', infuseAmountLiters: 6, targetTempC: 75.6, stepTimeMinutes: 10, rampTimeMinutes: 2 }],
                  })}>
                    + Add Mash Step
                  </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                      <th>Step</th><th>Type</th><th>Water (L)</th><th>Target Temp (°C)</th><th>Duration (min)</th><th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.mashSteps.map((s, idx) => (
                      <tr key={idx}>
                        <td><input value={s.name} onChange={(e) => { const l = [...current.mashSteps]; l[idx].name = e.target.value; setCurrent({ ...current, mashSteps: l }); }} /></td>
                        <td>
                          <select value={s.type} onChange={(e) => { const l = [...current.mashSteps]; l[idx].type = e.target.value; setCurrent({ ...current, mashSteps: l }); }}>
                            <option value="Infusion">Infusion</option><option value="Temperature">Temperature</option><option value="Decoction">Decoction</option>
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
                <h4>Brewer's Notes</h4>
                <textarea
                  rows={4}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }}
                  value={current.notes}
                  onChange={(e) => setCurrent({ ...current, notes: e.target.value })}
                  placeholder="Mash pH, sparge water volume, fermentation temp schedule..."
                />
              </div>
            )}

            {recipeTab === 'brewsheet' && (
              <div style={{ background: '#fff', padding: 24, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2>Y&B Crew Beer C.O. — Brew Day Sheet: {current.name}</h2>
                  <button onClick={() => window.print()} style={{ padding: '8px 16px', background: '#111827', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    🖨️ Print / Save PDF
                  </button>
                </div>
                <p><strong>Style:</strong> {current.style} | <strong>Batch Size:</strong> {current.batchSizeLiters} L | <strong>Boil Size:</strong> {current.boilSizeLiters} L ({current.boilTimeMinutes} min)</p>
                <p><strong>Target OG:</strong> {current.og.toFixed(3)} | <strong>Target FG:</strong> {current.fg.toFixed(3)} | <strong>ABV:</strong> {current.abv}% | <strong>IBU:</strong> {current.ibu} | <strong>SRM:</strong> {current.srm}</p>
                <hr />
                <h4>1. Grain Bill ({totalGrainKg.toFixed(2)} kg)</h4>
                <ul>{current.fermentables.map((f, i) => <li key={i}>{f.amountKg} kg — {f.name} ({f.colorLovibond} °L)</li>)}</ul>
                <h4>2. Mash Schedule</h4>
                <ul>{current.mashSteps.map((s, i) => <li key={i}>{s.name} ({s.type}): {s.infuseAmountLiters} L @ {s.targetTempC}°C for {s.stepTimeMinutes} min</li>)}</ul>
                <h4>3. Hop & Boil Additions</h4>
                <ul>
                  {current.hops.map((h, i) => <li key={i}>{h.amountGrams} g — {h.name} ({h.alphaAcidPercent}% AA) — {h.useType} @ {h.boilTimeMinutes} min</li>)}
                  {current.miscs.map((m, i) => <li key={i}>{m.amount} {m.unit} — {m.name} ({m.useType} @ {m.timeMinutes} min)</li>)}
                </ul>
                <h4>4. Fermentation</h4>
                <ul>{current.yeasts.map((y, i) => <li key={i}>{y.name} ({y.laboratory} {y.productId}) — {y.attenuationPercent}% attenuation</li>)}</ul>
                {current.notes && <><h4>5. Notes</h4><p>{current.notes}</p></>}
              </div>
            )}
          </>
        )}

        {navSection === 'styles' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h2 style={{ marginTop: 0 }}>{styleForm.id ? 'Edit Beer Style Profile' : 'Add Custom Beer Style Profile'}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 12, fontSize: 13 }}>
                <label>
                  Category #
                  <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} placeholder="e.g., 21D" value={styleForm.categoryNumber} onChange={(e) => setStyleForm({ ...styleForm, categoryNumber: e.target.value })} />
                </label>
                <label style={{ gridColumn: 'span 3' }}>
                  Style Name
                  <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} placeholder="e.g., West Coast Pilsner / Catharina Sour" value={styleForm.name} onChange={(e) => setStyleForm({ ...styleForm, name: e.target.value })} />
                </label>
                <label style={{ gridColumn: 'span 2' }}>
                  Guide
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
                  Description / Notes
                  <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} placeholder="Aroma, flavor, mouthfeel notes..." value={styleForm.notes} onChange={(e) => setStyleForm({ ...styleForm, notes: e.target.value })} />
                </label>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={async () => {
                    if (!styleForm.name.trim()) {
                      alert('Please enter a Style Name.');
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
                      setStyleStatusMsg(isEdit
                        ? `Updated style "${saved.categoryNumber} - ${saved.name}".`
                        : `Added new style "${saved.categoryNumber} - ${saved.name}".`);
                      setStyleForm(emptyStyle);
                      await loadAll();
                    } else {
                      const errText = await res.text();
                      alert('Error saving beer style (HTTP ' + res.status + '): ' + errText);
                    }
                  }}
                  style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                >
                  {styleForm.id ? 'Update Beer Style' : '+ Save Beer Style'}
                </button>
                {styleForm.id && (
                  <button type="button" onClick={() => setStyleForm(emptyStyle)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    Cancel Edit
                  </button>
                )}
                {styleStatusMsg && (
                  <span style={{ color: '#15803d', fontWeight: 600, fontSize: 13 }}>{styleStatusMsg}</span>
                )}
              </div>
            </div>

            <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ margin: 0 }}>BJCP & Custom Beer Style Library ({stylesList.length})</h2>
                <input
                  placeholder="Search by code or style name..."
                  value={styleFilter}
                  onChange={(e) => setStyleFilter(e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', width: 250 }}
                />
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                    <th>Code</th><th>Style Name</th><th>OG</th><th>FG</th><th>ABV</th><th>IBU</th><th>SRM</th><th>Color</th><th>Actions</th>
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
                          <button type="button" onClick={() => { setCurrent({ ...current, style: `${s.categoryNumber} - ${s.name}` }); setNavSection('recipe'); }}>Use</button>
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
                            Edit
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
            <h2>Ingredient Inventory</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <select value={newInv.category} onChange={(e) => setNewInv({ ...newInv, category: e.target.value })}>
                <option value="Fermentable">Fermentable</option><option value="Hop">Hop</option><option value="Yeast">Yeast</option><option value="Misc">Misc</option>
              </select>
              <input placeholder="Ingredient Name" value={newInv.name} onChange={(e) => setNewInv({ ...newInv, name: e.target.value })} />
              <input type="number" style={{ width: 80 }} value={newInv.quantity} onChange={(e) => setNewInv({ ...newInv, quantity: Number(e.target.value) })} />
              <input style={{ width: 60 }} placeholder="unit" value={newInv.unit} onChange={(e) => setNewInv({ ...newInv, unit: e.target.value })} />
              <input type="number" step="0.1" style={{ width: 80 }} title="°L / %AA / %Atten" value={newInv.alphaOrColorOrAtten} onChange={(e) => setNewInv({ ...newInv, alphaOrColorOrAtten: Number(e.target.value) })} />
              <button onClick={async () => {
                if (!newInv.name) return;
                await fetch(`${API}/inventory`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newInv) });
                setNewInv({ ...newInv, name: '' });
                loadAll();
              }}>+ Add Stock</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  <th>Category</th><th>Ingredient</th><th>On Hand</th><th>Spec (°L / AA% / Atten%)</th><th></th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td>{item.category}</td>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.quantity.toFixed(2)} {item.unit}</td>
                    <td>{item.alphaOrColorOrAtten}</td>
                    <td><button onClick={async () => { await fetch(`${API}/inventory/${item.id}`, { method: 'DELETE' }); loadAll(); }}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {navSection === 'equipment' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h2 style={{ marginTop: 0 }}>{eqForm.id ? 'Edit Equipment Profile' : 'Add Equipment Profile'}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14, fontSize: 13 }}>
                <label style={{ gridColumn: 'span 2' }}>
                  Profile Name
                  <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} placeholder="e.g., 30L BrewZilla Gen 4" value={eqForm.name} onChange={(e) => setEqForm({ ...eqForm, name: e.target.value })} />
                </label>
                <label>Batch Size (L) <input type="number" step="0.5" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.batchSizeLiters} onChange={(e) => setEqForm({ ...eqForm, batchSizeLiters: Number(e.target.value) })} /></label>
                <label>Boil Time (min) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.boilTimeMinutes} onChange={(e) => setEqForm({ ...eqForm, boilTimeMinutes: Number(e.target.value) })} /></label>
                <label>Evaporation Rate (L/hr) <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.evaporationRateLitersPerHour} onChange={(e) => setEqForm({ ...eqForm, evaporationRateLitersPerHour: Number(e.target.value) })} /></label>
                <label>Kettle Deadspace (L) <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.kettleDeadspaceLiters} onChange={(e) => setEqForm({ ...eqForm, kettleDeadspaceLiters: Number(e.target.value) })} /></label>
                <label>Lauter Deadspace (L) <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.lauterDeadspaceLiters} onChange={(e) => setEqForm({ ...eqForm, lauterDeadspaceLiters: Number(e.target.value) })} /></label>
                <label>Trub / Chiller Loss (L) <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.trubChillerLossLiters} onChange={(e) => setEqForm({ ...eqForm, trubChillerLossLiters: Number(e.target.value) })} /></label>
                <label>Grain Absorption (L/kg) <input type="number" step="0.02" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.grainAbsorptionLitersPerKg} onChange={(e) => setEqForm({ ...eqForm, grainAbsorptionLitersPerKg: Number(e.target.value) })} /></label>
                <label>Brewhouse Efficiency (%) <input type="number" step="0.5" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={eqForm.efficiencyPercent} onChange={(e) => setEqForm({ ...eqForm, efficiencyPercent: Number(e.target.value) })} /></label>
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
                  {eqForm.id ? 'Update Equipment' : '+ Save Equipment Profile'}
                </button>
                {eqForm.id && (
                  <button onClick={() => setEqForm(emptyEquipment)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h2 style={{ marginTop: 0 }}>Saved Equipment Profiles ({equipmentList.length})</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                    <th>Profile Name</th><th>Batch (L)</th><th>Boil (min)</th><th>Boil-off (L/hr)</th><th>Kettle Dead (L)</th><th>Lauter Dead (L)</th><th>Trub Loss (L)</th><th>Absorption (L/kg)</th><th>Efficiency</th><th>Actions</th>
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
                        <button onClick={() => setEqForm(eq)}>Edit</button>
                        <button onClick={async () => { if (!eq.id) return; await fetch(`${API}/equipment/${eq.id}`, { method: 'DELETE' }); if (eqForm.id === eq.id) setEqForm(emptyEquipment); loadAll(); }}>Delete</button>
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
              <h2 style={{ marginTop: 0 }}>{waterForm.id ? 'Edit Water Profile' : 'Add Brewing Water Profile'}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14, fontSize: 13 }}>
                <label style={{ gridColumn: 'span 2' }}>
                  Water Profile Name
                  <input style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} placeholder="e.g., São Paulo Tap / Burton-on-Trent" value={waterForm.name} onChange={(e) => setWaterForm({ ...waterForm, name: e.target.value })} />
                </label>
                <label>pH <input type="number" step="0.1" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.ph} onChange={(e) => setWaterForm({ ...waterForm, ph: Number(e.target.value) })} /></label>
                <label>Calcium Ca²⁺ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.calciumPpm} onChange={(e) => setWaterForm({ ...waterForm, calciumPpm: Number(e.target.value) })} /></label>
                <label>Magnesium Mg²⁺ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.magnesiumPpm} onChange={(e) => setWaterForm({ ...waterForm, magnesiumPpm: Number(e.target.value) })} /></label>
                <label>Sodium Na⁺ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.sodiumPpm} onChange={(e) => setWaterForm({ ...waterForm, sodiumPpm: Number(e.target.value) })} /></label>
                <label>Chloride Cl⁻ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.chloridePpm} onChange={(e) => setWaterForm({ ...waterForm, chloridePpm: Number(e.target.value) })} /></label>
                <label>Sulfate SO₄²⁻ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.sulfatePpm} onChange={(e) => setWaterForm({ ...waterForm, sulfatePpm: Number(e.target.value) })} /></label>
                <label>Bicarbonate HCO₃⁻ (ppm) <input type="number" style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }} value={waterForm.bicarbonatePpm} onChange={(e) => setWaterForm({ ...waterForm, bicarbonatePpm: Number(e.target.value) })} /></label>
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
                  {waterForm.id ? 'Update Water Profile' : '+ Save Water Profile'}
                </button>
                {waterForm.id && (
                  <button onClick={() => setWaterForm(emptyWater)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            <div style={{ background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h2 style={{ marginTop: 0 }}>Brewing Water Ion Profiles (ppm)</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1', fontSize: 13 }}>
                    <th>Water Profile</th><th>pH</th><th>Ca²⁺</th><th>Mg²⁺</th><th>Na⁺</th><th>Cl⁻</th><th>SO₄²⁻</th><th>HCO₃⁻</th><th>SO₄:Cl Ratio</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {waterList.map((w) => {
                    const ratio = w.chloridePpm > 0 ? (w.sulfatePpm / w.chloridePpm).toFixed(2) : 'Balanced';
                    const character = w.chloridePpm === 0 && w.sulfatePpm === 0 ? 'Neutral'
                      : w.sulfatePpm > w.chloridePpm * 1.4 ? 'Hoppy / Crisp'
                      : w.chloridePpm > w.sulfatePpm * 1.4 ? 'Malty / Full'
                      : 'Balanced';
                    return (
                      <tr key={w.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td><strong>{w.name}</strong></td>
                        <td>{w.ph}</td><td>{w.calciumPpm}</td><td>{w.magnesiumPpm}</td><td>{w.sodiumPpm}</td>
                        <td>{w.chloridePpm}</td><td>{w.sulfatePpm}</td><td>{w.bicarbonatePpm}</td>
                        <td>{ratio} ({character})</td>
                        <td style={{ display: 'flex', gap: 6, padding: '6px 0' }}>
                          <button onClick={() => setWaterForm(w)}>Edit</button>
                          <button onClick={async () => { if (!w.id) return; await fetch(`${API}/waters/${w.id}`, { method: 'DELETE' }); if (waterForm.id === w.id) setWaterForm(emptyWater); loadAll(); }}>Delete</button>
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
            <h2>Brew Day Session Logs</h2>
            {brewNotes.length === 0 ? <p>No brew sessions logged yet. Click "Brew It" on any recipe to log a session.</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                    <th>Date</th><th>Recipe</th><th>Target / Actual OG</th><th>Target / Actual FG</th><th>Volume (L)</th><th>Notes</th>
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
              <h3>1. Mash Strike Water Temperature</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                <label>Target Mash Temp (°C): <input type="number" value={strikeIn.targetTempC} onChange={(e) => setStrikeIn({ ...strikeIn, targetTempC: Number(e.target.value) })} /></label>
                <label>Dry Grain Temp (°C): <input type="number" value={strikeIn.grainTempC} onChange={(e) => setStrikeIn({ ...strikeIn, grainTempC: Number(e.target.value) })} /></label>
                <label>Water-to-Grain Ratio (L/kg): <input type="number" step="0.1" value={strikeIn.ratioLPerKg} onChange={(e) => setStrikeIn({ ...strikeIn, ratioLPerKg: Number(e.target.value) })} /></label>
                <button onClick={async () => {
                  const r = await fetch(`${API}/calculators/strike-temp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(strikeIn) });
                  setStrikeOut((await r.json()).strikeTempC);
                }}>Calculate Strike Temp</button>
                {strikeOut !== null && <strong>Strike Water Temperature: {strikeOut} °C</strong>}
              </div>
            </div>

            <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h3>2. Refractometer Alcohol Correction</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                <label>Original Brix (°Bx): <input type="number" step="0.1" value={refracIn.originalBrix} onChange={(e) => setRefracIn({ ...refracIn, originalBrix: Number(e.target.value) })} /></label>
                <label>Current Reading (°Bx): <input type="number" step="0.1" value={refracIn.currentBrix} onChange={(e) => setRefracIn({ ...refracIn, currentBrix: Number(e.target.value) })} /></label>
                <label>Wort Correction Factor: <input type="number" step="0.01" value={refracIn.wcf} onChange={(e) => setRefracIn({ ...refracIn, wcf: Number(e.target.value) })} /></label>
                <button onClick={async () => {
                  const r = await fetch(`${API}/calculators/refractometer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(refracIn) });
                  setRefracOut((await r.json()).correctedFg);
                }}>Calculate True FG</button>
                {refracOut !== null && <strong>Corrected Final Gravity: {refracOut.toFixed(3)} SG</strong>}
              </div>
            </div>

            <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h3>3. Priming Sugar Carbonation</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                <label>Batch Volume (L): <input type="number" value={primeIn.batchLiters} onChange={(e) => setPrimeIn({ ...primeIn, batchLiters: Number(e.target.value) })} /></label>
                <label>Beer Temp at Bottling (°C): <input type="number" value={primeIn.beerTempC} onChange={(e) => setPrimeIn({ ...primeIn, beerTempC: Number(e.target.value) })} /></label>
                <label>Target CO₂ Volumes: <input type="number" step="0.1" value={primeIn.targetCo2} onChange={(e) => setPrimeIn({ ...primeIn, targetCo2: Number(e.target.value) })} /></label>
                <button onClick={async () => {
                  const r = await fetch(`${API}/calculators/priming`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(primeIn) });
                  setPrimeOut((await r.json()).dextroseGrams);
                }}>Calculate Priming Sugar</button>
                {primeOut !== null && <strong>Corn Sugar (Dextrose): {primeOut} g</strong>}
              </div>
            </div>

            <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <h3>4. Hydrometer Temperature Correction</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                <label>Measured Gravity (SG): <input type="number" step="0.001" value={hydroIn.measuredSg} onChange={(e) => setHydroIn({ ...hydroIn, measuredSg: Number(e.target.value) })} /></label>
                <label>Sample Temp (°C): <input type="number" value={hydroIn.sampleTempC} onChange={(e) => setHydroIn({ ...hydroIn, sampleTempC: Number(e.target.value) })} /></label>
                <label>Calibration Temp (°C): <input type="number" value={hydroIn.calibrationTempC} onChange={(e) => setHydroIn({ ...hydroIn, calibrationTempC: Number(e.target.value) })} /></label>
                <button onClick={async () => {
                  const r = await fetch(`${API}/calculators/hydrometer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hydroIn) });
                  setHydroOut((await r.json()).correctedSg);
                }}>Correct SG Reading</button>
                {hydroOut !== null && <strong>Corrected Specific Gravity: {hydroOut.toFixed(3)} SG</strong>}
               </div>
            </div>
          </div>
        )}
        <footer style={{ marginTop: 32, paddingTop: 14, borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: 12, color: '#64748b' }}>
          © {new Date().getFullYear()} Y&amp;B Crew Beer C.O. — All rights reserved.
        </footer>
      </main>
    </div>
  );
}            
