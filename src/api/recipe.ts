const baseURL = "https://tasty.p.rapidapi.com";
// Using a CORS proxy to bypass CORS restrictions in development

interface Recipe {
  uri: string; // unique id
  label: string; // recipe
  image: string; // image URL
  ingredients: string[];
  formattedIngredients: {
    amount: number; // ingredient amount
    name: string; // ingredient name
    metric: string; // ingredient metric
  }[];
  ingredients_formatted: {
    text: string;
    amount: number; // ingredient amount
    name: string; // ingredient name
    metric: string; // ingredient metric
  }[];
  instructions: { text: string; start_time: number; end_time: number }[];
  nutrition: {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
    sugar: number;
    fiber: number;
  };
  total_time: number;
}

const searchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

    if (!apiKey) {
      throw new Error("VITE_RAPIDAPI_KEY environment variable is not set");
    }

    const url = `${baseURL}/recipes/list?from=0&size=20&q=${encodeURIComponent(
      query
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "tasty.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.results || !Array.isArray(data.results)) {
      console.warn("No results found in API response");
      return [];
    }

    const recipes: Recipe[] = data.results.map((recipe: any, index: number) => {
      // Extract ingredients from sections
      const ingredients: string[] = [];
      const formattedIngredients: Recipe["ingredients_formatted"] = [];
      if (recipe.sections && Array.isArray(recipe.sections)) {
        recipe.sections.forEach((section: any) => {
          if (section.components && Array.isArray(section.components)) {
            section.components.forEach((component: any) => {
              if (component.raw_text) {
                ingredients.push(component.raw_text);
              }
            });
          }
        });
      }

      // Formatted INgredients
      if (recipe.sections && Array.isArray(recipe.sections)) {
        recipe.sections.forEach((section: any) => {
          if (section.components && Array.isArray(section.components)) {
            section.components.forEach((component: any) => {
              if (component.raw_text) {
                formattedIngredients.push({
                  text: component.raw_text,
                  amount: Number(component?.measurements?.[0]?.quantity) || 1,
                  name: component?.ingredient?.name || "",
                  metric: component?.measurements?.[0]?.unit?.name || "item",
                });
              }
            });
          }
        });
      }

      return {
        uri: recipe.canonical_id || `recipe-${recipe.id || index}`,
        label: recipe.name || recipe.title || `Recipe ${index + 1}`,
        image: recipe.thumbnail_url || "",
        ingredients: ingredients,
        ingredients_formatted: formattedIngredients,
        instructions: recipe.instructions || [],
        nutrition: recipe.nutrition || {
          calories: 0,
          carbohydrates: 0,
          fat: 0,
          protein: 0,
          sugar: 0,
          fiber: 0,
        },
        total_time: recipe.total_time_minutes || 0,
      };
    });

    console.log(
      `Successfully fetched ${recipes.length} recipes for query: ${query}`
    );
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes from Tasty API:", error);
    throw new Error(
      `Failed to fetch recipes: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Export the main function and interface
export { searchRecipes };
export type { Recipe };
