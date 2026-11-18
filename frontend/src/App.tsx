import { useEffect, useState } from 'react';
import { Recipe } from './types';

const API = '/api/recipes';

const emptyRecipe: Recipe = {
  name: 'American Pale Ale',
  style: '18B - American Pale Ale',
  batchSizeLiters: 20,
  boilTimeMinutes: 60,
  efficiencyPercent: 75,
  yeastAttenuationPercent: 77,
  og: 1.052,
  fg: 1.012,
  abv: 5.3,
  ibu: 38.0,
  srm: 6.5,
  fermentables: [
    { name: 'Pale Ale Malt (2-Row)', amountKg: 4.5, yieldPercent: 80, colorLovibond: 3 },
    { name: 'Caramel/Crystal 40L', amountKg: 0.35, yieldPercent: 74, colorLovibond: 40 },
  ],
  hops: [
    { name: 'Cascade', amountGrams: 25, alphaAcidPercent: 6.0, boilTimeMinutes: 60, useType: 'Boil' },
    { name: 'Citra', amountGrams: 30, alphaAcidPercent: 12.0, boilTimeMinutes: 10, useType: 'Boil' },
  ],
};

function srmToHex(srm: number): string {
  const palette = [
    '#FFE699', '#FFD878', '#FFCA5A', '#FFBF42', '#FBB123',
    '#F8A600', '#F39C00', '#EA8F00', '#E58500', '#DE7C00',
    '#D77200', '#CF6900', '#CB6200', '#C35900', '#BB5100',
    '#B54C00', '#B04500', '#A63E00', '#A13700', '#9B3200',
    '#952D00', '#8E2900', '#882300', '#821E00', '#7B1A00',
    '#771900', '#701400', '#6A0E00', '#660D00', '#5E0B00',
  ];
  const idx = Math.min(Math.max(Math.round(srm) - 1, 0), palette.length - 1);
  return palette[idx];
}

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [current, setCurrent] = useState<Recipe>(emptyRecipe);

  const loadRecipes = async () => {
    const res = await fetch(API);
    setRecipes(await res.json());
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // Recalculate OG/FG/ABV/IBU/SRM via Spring Boot whenever ingredients change
  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await fetch(`${API}/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current),
      });
      if (res.ok) {
        const calculated: Recipe = await res.json();
        setCurrent((prev) => ({
          ...prev,
          og: calculated.og,
          fg: calculated.fg,
          abv: calculated.abv,
          ibu: calculated.ibu,
          srm: calculated.srm,
        }));
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [
    current.batchSizeLiters,
    current.efficiencyPercent,
    current.yeastAttenuationPercent,
    current.fermentables,
    current.hops,
  ]);

  const handleSave = async () => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(current),
    });
    const saved = await res.json();
    setCurrent(saved);
    loadRecipes();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadRecipes();
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'system-ui, sans-serif', height: '100vh' }}>
      {/* Sidebar: Saved SQLite Recipes */}
      <aside style={{ width: 260, borderRight: '1px solid #ddd', padding: 16, background: '#f8f9fa' }}>
        <h2>Brewtarget Web</h2>
        <button onClick={() => setCurrent({ ...emptyRecipe, id: undefined })} style={{ width: '100%', padding: 8, marginBottom: 12 }}>
          + New Recipe
        </button>
        {recipes.map((r) => (
          <div
            key={r.id}
            style={{
              padding: 8,
              marginBottom: 6,
              background: current.id === r.id ? '#e2e8f0' : '#fff',
              border: '1px solid #ddd',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            onClick={() => setCurrent(r)}
          >
            <div>
              <strong>{r.name}</strong>
              <div style={{ fontSize: 12, color: '#555' }}>
                {r.abv}% ABV | {r.ibu} IBU
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}>✕</button>
          </div>
        ))}
      </aside>

      {/* Main Workspace */}
      <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
          <input
            value={current.name}
            onChange={(e) => setCurrent({ ...current, name: e.target.value })}
            placeholder="Recipe Name"
            style={{ fontSize: 20, fontWeight: 'bold', padding: 6 }}
          />
          <input
            value={current.style}
            onChange={(e) => setCurrent({ ...current, style: e.target.value })}
            placeholder="BJCP Style"
            style={{ padding: 8 }}
          />
          <button onClick={handleSave} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4 }}>
            Save to SQLite
          </button>
        </div>

        {/* Live Vitals Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: '#666' }}>OG</div>
            <strong style={{ fontSize: 20 }}>{current.og.toFixed(3)}</strong>
          </div>
          <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: '#666' }}>FG</div>
            <strong style={{ fontSize: 20 }}>{current.fg.toFixed(3)}</strong>
          </div>
          <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: '#666' }}>ABV</div>
            <strong style={{ fontSize: 20 }}>{current.abv}%</strong>
          </div>
          <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: '#666' }}>IBU (Tinseth)</div>
            <strong style={{ fontSize: 20 }}>{current.ibu}</strong>
          </div>
          <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6, background: srmToHex(current.srm), color: current.srm > 15 ? '#fff' : '#000' }}>
            <div style={{ fontSize: 12 }}>Color (SRM)</div>
            <strong style={{ fontSize: 20 }}>{current.srm}</strong>
          </div>
          <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: '#666' }}>Batch (L)</div>
            <input
              type="number"
              value={current.batchSizeLiters}
              onChange={(e) => setCurrent({ ...current, batchSizeLiters: Number(e.target.value) })}
              style={{ width: '100%', fontSize: 16 }}
            />
          </div>
        </div>

        {/* Fermentables Table */}
        <h3>Fermentables</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>
              <th>Grain / Extract</th>
              <th>Weight (kg)</th>
              <th>Yield (%)</th>
              <th>Color (°L)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {current.fermentables.map((f, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    value={f.name}
                    onChange={(e) => {
                      const list = [...current.fermentables];
                      list[idx].name = e.target.value;
                      setCurrent({ ...current, fermentables: list });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.05"
                    value={f.amountKg}
                    onChange={(e) => {
                      const list = [...current.fermentables];
                      list[idx].amountKg = Number(e.target.value);
                      setCurrent({ ...current, fermentables: list });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={f.yieldPercent}
                    onChange={(e) => {
                      const list = [...current.fermentables];
                      list[idx].yieldPercent = Number(e.target.value);
                      setCurrent({ ...current, fermentables: list });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={f.colorLovibond}
                    onChange={(e) => {
                      const list = [...current.fermentables];
                      list[idx].colorLovibond = Number(e.target.value);
                      setCurrent({ ...current, fermentables: list });
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={() =>
                      setCurrent({
                        ...current,
                        fermentables: current.fermentables.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() =>
            setCurrent({
              ...current,
              fermentables: [...current.fermentables, { name: 'Pilsner Malt', amountKg: 1.0, yieldPercent: 81, colorLovibond: 1.8 }],
            })
          }
        >
          + Add Fermentable
        </button>

        {/* Hops Table */}
        <h3 style={{ marginTop: 24 }}>Hops</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>
              <th>Hop Variety</th>
              <th>Weight (g)</th>
              <th>Alpha Acid (%)</th>
              <th>Boil Time (min)</th>
              <th>Use</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {current.hops.map((h, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    value={h.name}
                    onChange={(e) => {
                      const list = [...current.hops];
                      list[idx].name = e.target.value;
                      setCurrent({ ...current, hops: list });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={h.amountGrams}
                    onChange={(e) => {
                      const list = [...current.hops];
                      list[idx].amountGrams = Number(e.target.value);
                      setCurrent({ ...current, hops: list });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.1"
                    value={h.alphaAcidPercent}
                    onChange={(e) => {
                      const list = [...current.hops];
                      list[idx].alphaAcidPercent = Number(e.target.value);
                      setCurrent({ ...current, hops: list });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={h.boilTimeMinutes}
                    onChange={(e) => {
                      const list = [...current.hops];
                      list[idx].boilTimeMinutes = Number(e.target.value);
                      setCurrent({ ...current, hops: list });
                    }}
                  />
                </td>
                <td>
                  <select
                    value={h.useType}
                    onChange={(e) => {
                      const list = [...current.hops];
                      list[idx].useType = e.target.value;
                      setCurrent({ ...current, hops: list });
                    }}
                  >
                    <option value="Boil">Boil</option>
                    <option value="Whirlpool">Whirlpool</option>
                    <option value="Dry Hop">Dry Hop</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() =>
                      setCurrent({
                        ...current,
                        hops: current.hops.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() =>
            setCurrent({
              ...current,
              hops: [...current.hops, { name: 'Saaz', amountGrams: 20, alphaAcidPercent: 3.8, boilTimeMinutes: 15, useType: 'Boil' }],
            })
          }
        >
          + Add Hop
        </button>
      </main>
    </div>
  );
}