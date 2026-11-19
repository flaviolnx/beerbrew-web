export interface Fermentable {
  id?: number;
  name: string;
  type: string;
  amountKg: number;
  yieldPercent: number;
  colorLovibond: number;
  addAfterBoil?: boolean;
}

export interface Hop {
  id?: number;
  name: string;
  form: string;
  amountGrams: number;
  alphaAcidPercent: number;
  boilTimeMinutes: number;
  useType: string;
}

export interface Yeast {
  id?: number;
  name: string;
  laboratory: string;
  productId: string;
  type: string;
  form: string;
  attenuationPercent: number;
  minTempC: number;
  maxTempC: number;
  flocculation: string;
  amountPackages: number;
}

export interface Misc {
  id?: number;
  name: string;
  type: string;
  useType: string;
  amount: number;
  unit: string;
  timeMinutes: number;
}

export interface MashStep {
  id?: number;
  stepOrder: number;
  name: string;
  type: string;
  infuseAmountLiters: number;
  targetTempC: number;
  stepTimeMinutes: number;
  rampTimeMinutes: number;
}

export interface FermentationStep {
  id?: number;
  stepOrder: number;
  name: string;
  stepType: string; // Hold, Ramp, Conditioning
  durationDays: number;
  startTempC: number;
  endTempC: number;
  dryHopAddition: string;
  notes: string;
}

export interface FermentationProfile {
  id?: number;
  name: string;
  description: string;
  steps: FermentationStep[];
}

export interface CarbonationProfile {
  id?: number;
  name: string;
  type: string; // Forced or Priming
  targetCo2Volumes: number;
  temperatureC: number;
  primingAgent: string;
  primingRateGramsPerLiter: number;
  kegPressurePsi: number;
  kegPressureBar: number;
  conditioningDays: number;
  notes: string;
}

export interface EquipmentProfile {
  id?: number;
  name: string;
  batchSizeLiters: number;
  boilTimeMinutes: number;
  evaporationRateLitersPerHour: number;
  kettleDeadspaceLiters: number;
  lauterDeadspaceLiters: number;
  trubChillerLossLiters: number;
  grainAbsorptionLitersPerKg: number;
  efficiencyPercent: number;
}

export interface WaterProfile {
  id?: number;
  name: string;
  calciumPpm: number;
  bicarbonatePpm: number;
  sulfatePpm: number;
  chloridePpm: number;
  sodiumPpm: number;
  magnesiumPpm: number;
  ph: number;
}

export interface BjcpStyle {
  id?: number;
  categoryNumber: string;
  name: string;
  guide?: string;
  ogMin: number;
  ogMax: number;
  fgMin: number;
  fgMax: number;
  ibuMin: number;
  ibuMax: number;
  srmMin: number;
  srmMax: number;
  abvMin: number;
  abvMax: number;
  notes: string;
}

export interface BrewNote {
  id?: number;
  recipeId?: number;
  recipeName: string;
  brewDate: string;
  targetOg: number;
  actualOg: number;
  targetFg: number;
  actualFg: number;
  targetVolumeLiters: number;
  actualVolumeLiters: number;
  actualEfficiencyPercent: number;
  notes: string;
}

export interface InventoryItem {
  id?: number;
  category: string;
  name: string;
  quantity: number;
  unit: string;
  alphaOrColorOrAtten: number;
}

export interface Recipe {
  id?: number;
  name: string;
  brewer: string;
  type: string;
  style: string;
  ibuFormula: string;
  batchSizeLiters: number;
  boilSizeLiters: number;
  boilTimeMinutes: number;
  efficiencyPercent: number;
  yeastAttenuationPercent: number;
  notes: string;
  og: number;
  fg: number;
  abv: number;
  ibu: number;
  srm: number;
  caloriesPer355ml: number;
  waterProfile?: WaterProfile | null;
  carbonationProfile?: CarbonationProfile | null;
  fermentables: Fermentable[];
  hops: Hop[];
  yeasts: Yeast[];
  miscs: Misc[];
  mashSteps: MashStep[];
  fermentationSteps: FermentationStep[];
}
