export interface Fermentable {
  id?: number;
  name: string;
  amountKg: number;
  yieldPercent: number;
  colorLovibond: number;
}

export interface Hop {
  id?: number;
  name: string;
  amountGrams: number;
  alphaAcidPercent: number;
  boilTimeMinutes: number;
  useType: string;
}

export interface Recipe {
  id?: number;
  name: string;
  style: string;
  batchSizeLiters: number;
  boilTimeMinutes: number;
  efficiencyPercent: number;
  yeastAttenuationPercent: number;
  og: number;
  fg: number;
  abv: number;
  ibu: number;
  srm: number;
  fermentables: Fermentable[];
  hops: Hop[];
}