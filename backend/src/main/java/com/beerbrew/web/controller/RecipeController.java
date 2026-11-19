package com.beerbrew.web.controller;

import com.beerbrew.web.model.*;
import com.beerbrew.web.repository.*;
import com.beerbrew.web.service.BeerXmlService;
import com.beerbrew.web.service.BrewMathService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeRepository recipeRepo;
    private final EquipmentProfileRepository equipmentRepo;
    private final WaterProfileRepository waterRepo;
    private final BjcpStyleRepository styleRepo;
    private final BrewNoteRepository brewNoteRepo;
    private final InventoryItemRepository inventoryRepo;
    private final FermentationProfileRepository fermRepo;
    private final CarbonationProfileRepository carbRepo;
    private final BrewMathService mathService;
    private final BeerXmlService beerXmlService;

    public RecipeController(RecipeRepository recipeRepo,
                            EquipmentProfileRepository equipmentRepo,
                            WaterProfileRepository waterRepo,
                            BjcpStyleRepository styleRepo,
                            BrewNoteRepository brewNoteRepo,
                            InventoryItemRepository inventoryRepo,
                            FermentationProfileRepository fermRepo,
                            CarbonationProfileRepository carbRepo,
                            BrewMathService mathService,
                            BeerXmlService beerXmlService) {
        this.recipeRepo = recipeRepo;
        this.equipmentRepo = equipmentRepo;
        this.waterRepo = waterRepo;
        this.styleRepo = styleRepo;
        this.brewNoteRepo = brewNoteRepo;
        this.inventoryRepo = inventoryRepo;
        this.fermRepo = fermRepo;
        this.carbRepo = carbRepo;
        this.mathService = mathService;
        this.beerXmlService = beerXmlService;
    }

    @GetMapping("/recipes")
    public List<Recipe> getAllRecipes() {
        return recipeRepo.findAll();
    }

    @PostMapping("/recipes/preview")
    public Recipe previewCalculations(@RequestBody Recipe recipe) {
        mathService.calculateRecipeMetrics(recipe);
        return recipe;
    }

    @PostMapping("/recipes")
    public Recipe saveRecipe(@RequestBody Recipe recipe) {
        mathService.calculateRecipeMetrics(recipe);
        return recipeRepo.save(recipe);
    }

    @DeleteMapping("/recipes/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeRepo.deleteById(id);
    }

    @GetMapping(value = "/recipes/{id}/beerxml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> exportBeerXml(@PathVariable Long id) {
        Recipe r = recipeRepo.findById(id).orElseThrow();
        String xml = beerXmlService.exportToBeerXml(r);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + r.getName().replaceAll("[^a-zA-Z0-9_-]", "_") + ".xml\"")
                .body(xml);
    }

    @PostMapping(value = "/recipes/import-beerxml", consumes = MediaType.TEXT_PLAIN_VALUE)
    public Recipe importBeerXml(@RequestBody String xmlContent) throws Exception {
        Recipe parsed = beerXmlService.importFromBeerXml(xmlContent);
        mathService.calculateRecipeMetrics(parsed);
        return recipeRepo.save(parsed);
    }

    @GetMapping("/equipment")
    public List<EquipmentProfile> getEquipment() { return equipmentRepo.findAll(); }

    @PostMapping("/equipment")
    public EquipmentProfile saveEquipment(@RequestBody EquipmentProfile eq) { return equipmentRepo.save(eq); }

    @DeleteMapping("/equipment/{id}")
    public void deleteEquipment(@PathVariable Long id) { equipmentRepo.deleteById(id); }

    @GetMapping("/waters")
    public List<WaterProfile> getWaters() { return waterRepo.findAll(); }

    @PostMapping("/waters")
    public WaterProfile saveWater(@RequestBody WaterProfile w) { return waterRepo.save(w); }

    @DeleteMapping("/waters/{id}")
    public void deleteWater(@PathVariable Long id) { waterRepo.deleteById(id); }

    @GetMapping("/styles")
    public List<BjcpStyle> getStyles() {
        List<BjcpStyle> list = styleRepo.findAll();
        list.sort(Comparator
                .comparing(BjcpStyle::getCategoryNumber, Comparator.nullsLast(String::compareToIgnoreCase))
                .thenComparing(BjcpStyle::getName, Comparator.nullsLast(String::compareToIgnoreCase)));
        return list;
    }

    @PostMapping("/styles")
    public BjcpStyle saveStyle(@RequestBody BjcpStyle incoming) {
        if (incoming.getId() != null) {
            return styleRepo.findById(incoming.getId())
                    .map(existing -> {
                        existing.setCategoryNumber(incoming.getCategoryNumber());
                        existing.setStyleLetter(incoming.getStyleLetter());
                        existing.setName(incoming.getName());
                        existing.setGuide(incoming.getGuide() != null ? incoming.getGuide() : "BJCP 2021");
                        existing.setOgMin(incoming.getOgMin());
                        existing.setOgMax(incoming.getOgMax());
                        existing.setFgMin(incoming.getFgMin());
                        existing.setFgMax(incoming.getFgMax());
                        existing.setIbuMin(incoming.getIbuMin());
                        existing.setIbuMax(incoming.getIbuMax());
                        existing.setSrmMin(incoming.getSrmMin());
                        existing.setSrmMax(incoming.getSrmMax());
                        existing.setAbvMin(incoming.getAbvMin());
                        existing.setAbvMax(incoming.getAbvMax());
                        existing.setNotes(incoming.getNotes());
                        return styleRepo.saveAndFlush(existing);
                    })
                    .orElseGet(() -> styleRepo.saveAndFlush(incoming));
        }
        return styleRepo.saveAndFlush(incoming);
    }

    @PutMapping("/styles/{id}")
    public BjcpStyle updateStyle(@PathVariable Long id, @RequestBody BjcpStyle incoming) {
        incoming.setId(id);
        return saveStyle(incoming);
    }

    @DeleteMapping("/styles/{id}")
    public void deleteStyle(@PathVariable Long id) {
        styleRepo.deleteById(id);
        styleRepo.flush();
    }

    // --- Fermentation Profiles ---
    @GetMapping("/fermentation-profiles")
    public List<FermentationProfile> getFermentationProfiles() {
        return fermRepo.findAll();
    }

    @PostMapping("/fermentation-profiles")
    public FermentationProfile saveFermentationProfile(@RequestBody FermentationProfile fp) {
        if (fp.getSteps() != null) {
            for (int i = 0; i < fp.getSteps().size(); i++) {
                fp.getSteps().get(i).setStepOrder(i + 1);
            }
        }
        return fermRepo.saveAndFlush(fp);
    }

    @DeleteMapping("/fermentation-profiles/{id}")
    public void deleteFermentationProfile(@PathVariable Long id) {
        fermRepo.deleteById(id);
        fermRepo.flush();
    }

    // --- Carbonation Profiles ---
    @GetMapping("/carbonation-profiles")
    public List<CarbonationProfile> getCarbonationProfiles() {
        return carbRepo.findAll();
    }

    @PostMapping("/carbonation-profiles")
    public CarbonationProfile saveCarbonationProfile(@RequestBody CarbonationProfile cp) {
        if ("Forced".equalsIgnoreCase(cp.getType())) {
            double psi = mathService.calculateForcedCarbonationPsi(cp.getTemperatureC(), cp.getTargetCo2Volumes());
            cp.setKegPressurePsi(Math.round(psi * 10.0) / 10.0);
            cp.setKegPressureBar(Math.round((psi * 0.0689476) * 100.0) / 100.0);
            cp.setPrimingRateGramsPerLiter(0.0);
        } else {
            double totalGrams = mathService.calculatePrimingSugarGramsByAgent(1.0, cp.getTemperatureC(), cp.getTargetCo2Volumes(), cp.getPrimingAgent());
            cp.setPrimingRateGramsPerLiter(Math.round(totalGrams * 100.0) / 100.0);
            cp.setKegPressurePsi(0.0);
            cp.setKegPressureBar(0.0);
        }
        return carbRepo.saveAndFlush(cp);
    }

    @DeleteMapping("/carbonation-profiles/{id}")
    public void deleteCarbonationProfile(@PathVariable Long id) {
        carbRepo.deleteById(id);
        carbRepo.flush();
    }

    @GetMapping("/inventory")
    public List<InventoryItem> getInventory() { return inventoryRepo.findAll(); }

    @PostMapping("/inventory")
    public InventoryItem saveInventoryItem(@RequestBody InventoryItem item) { return inventoryRepo.save(item); }

    @DeleteMapping("/inventory/{id}")
    public void deleteInventoryItem(@PathVariable Long id) { inventoryRepo.deleteById(id); }

    @PostMapping("/recipes/{id}/brew-day")
    public BrewNote executeBrewDay(@PathVariable Long id, @RequestBody(required = false) Map<String, Object> body) {
        Recipe r = recipeRepo.findById(id).orElseThrow();
        List<InventoryItem> stock = inventoryRepo.findAll();

        for (Fermentable f : r.getFermentables()) {
            stock.stream().filter(i -> "Fermentable".equals(i.getCategory()) && i.getName().equalsIgnoreCase(f.getName()))
                 .findFirst().ifPresent(i -> { i.setQuantity(Math.max(0, i.getQuantity() - f.getAmountKg())); inventoryRepo.save(i); });
        }
        for (Hop h : r.getHops()) {
            stock.stream().filter(i -> "Hop".equals(i.getCategory()) && i.getName().equalsIgnoreCase(h.getName()))
                 .findFirst().ifPresent(i -> { i.setQuantity(Math.max(0, i.getQuantity() - h.getAmountGrams())); inventoryRepo.save(i); });
        }
        for (Yeast y : r.getYeasts()) {
            stock.stream().filter(i -> "Yeast".equals(i.getCategory()) && i.getName().toLowerCase().contains(y.getName().toLowerCase()))
                 .findFirst().ifPresent(i -> { i.setQuantity(Math.max(0, i.getQuantity() - y.getAmountPackages())); inventoryRepo.save(i); });
        }

        BrewNote note = new BrewNote();
        note.setRecipeId(r.getId());
        note.setRecipeName(r.getName());
        note.setTargetOg(r.getOg());
        note.setActualOg(r.getOg());
        note.setTargetFg(r.getFg());
        note.setActualFg(r.getFg());
        note.setTargetVolumeLiters(r.getBatchSizeLiters());
        note.setActualVolumeLiters(r.getBatchSizeLiters());
        note.setActualEfficiencyPercent(r.getEfficiencyPercent());
        note.setNotes(body != null && body.get("notes") != null ? body.get("notes").toString() : "Brewed & deducted ingredients from inventory.");
        return brewNoteRepo.save(note);
    }

    @GetMapping("/brew-notes")
    public List<BrewNote> getBrewNotes() { return brewNoteRepo.findAll(); }

    @PostMapping("/brew-notes")
    public BrewNote saveBrewNote(@RequestBody BrewNote note) { return brewNoteRepo.save(note); }

    @PostMapping("/calculators/strike-temp")
    public Map<String, Double> calcStrike(@RequestBody Map<String, Double> p) {
        double strike = mathService.calculateStrikeTempC(
                p.getOrDefault("targetTempC", 66.0),
                p.getOrDefault("grainTempC", 20.0),
                p.getOrDefault("ratioLPerKg", 3.0));
        return Map.of("strikeTempC", Math.round(strike * 10.0) / 10.0);
    }

    @PostMapping("/calculators/refractometer")
    public Map<String, Double> calcRefractometer(@RequestBody Map<String, Double> p) {
        double fg = mathService.calculateRefractometerFg(
                p.getOrDefault("originalBrix", 12.0),
                p.getOrDefault("currentBrix", 6.0),
                p.getOrDefault("wcf", 1.04));
        return Map.of("correctedFg", Math.round(fg * 1000.0) / 1000.0);
    }

    @PostMapping("/calculators/priming")
    public Map<String, Double> calcPriming(@RequestBody Map<String, Double> p) {
        double grams = mathService.calculatePrimingSugarGrams(
                p.getOrDefault("batchLiters", 20.0),
                p.getOrDefault("beerTempC", 20.0),
                p.getOrDefault("targetCo2", 2.4));
        return Map.of("dextroseGrams", Math.round(grams * 10.0) / 10.0);
    }

    @PostMapping("/calculators/hydrometer")
    public Map<String, Double> calcHydrometer(@RequestBody Map<String, Double> p) {
        double sg = mathService.correctHydrometerReading(
                p.getOrDefault("measuredSg", 1.050),
                p.getOrDefault("sampleTempC", 25.0),
                p.getOrDefault("calibrationTempC", 20.0));
        return Map.of("correctedSg", Math.round(sg * 1000.0) / 1000.0);
    }
}
