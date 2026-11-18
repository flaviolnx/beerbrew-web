package com.brewtarget.web.controller;

import com.brewtarget.web.model.Recipe;
import com.brewtarget.web.repository.RecipeRepository;
import com.brewtarget.web.service.BrewMathService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeRepository repository;
    private final BrewMathService mathService;

    public RecipeController(RecipeRepository repository, BrewMathService mathService) {
        this.repository = repository;
        this.mathService = mathService;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    @PostMapping("/preview")
    public Recipe previewCalculations(@RequestBody Recipe recipe) {
        mathService.calculateRecipeMetrics(recipe);
        return recipe;
    }

    @PostMapping
    public Recipe saveRecipe(@RequestBody Recipe recipe) {
        mathService.calculateRecipeMetrics(recipe);
        return repository.save(recipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        repository.deleteById(id);
    }
}