import { getCachedResponse, setCachedResponse } from "../cache/recipeCache";
import type { RecipeSearchResponse, Tag } from "./types";

const baseURL = "https://tasty.p.rapidapi.com";

interface Recipe {
	id: number;
	name: string;
	servings: number;
	nutrition: {
		calories?: number;
		carbohydrates?: number;
		fat?: number;
		protein?: number;
		sugar?: number;
		fiber?: number;
		updated_at?: string;
	};
	total_time: number | null;
	user_ratings: {
		count_positive: number;
		score: number | null;
		count_negative: number;
	};
	servings_noun_plural: string;
	servings_noun_singular: string;
	thumbnail_url: string;
	thumbnail_alt_text: string;
	prep_time_minutes: number | null;
	country: string;
	ingredients: {
		name: string;
		quantity: string;
		unit: {
			system: string;
			name: string;
			display_plural: string;
			display_singular: string;
			abbreviation: string;
		};
		position: number;
	}[];
	instructions: {
		id: number;
		position: number;
		display_text: string;
		start_time: number;
		appliance: string | null;
		end_time: number;
		temperature: number | null;
	}[];
	tags: {
		id: number;
		display_name: string;
		type: string;
		name: string;
	}[];
}

const getRecipes = async (props: {
	query?: string;
	from?: number;
	size?: number;
	tags?: Tag["name"][];
}) => {
	try {
		const {
			query = "",
			from = 0,
			size = 0,
			tags = ["under_30_minutes"],
		} = props;

		const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

		if (!apiKey) {
			throw new Error("VITE_RAPIDAPI_KEY environment variable is not set");
		}

		const params = new URLSearchParams();

		if (typeof query === "string" && query.length > 0)
			params.append("q", query);

		if (typeof from === "number") params.append("from", `${from}`);
		if (typeof size === "number") params.append("size", `${size}`);
		if (Array.isArray(tags) && tags.length > 0)
			params.append("tags", tags.join("%20"));

		const url = `${baseURL}/recipes/list?${params.toString()}`;

		// Check cache first
		const cached = await getCachedResponse(url);
		if (cached) {
			console.log("Returning cached results for:", url);
			if (Array.isArray(cached)) {
				return cached.map(transformToRecipe);
			} else {
				console.error("something went wrong");
			}
		}

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

		const data = (await response.json()) as RecipeSearchResponse;
		console.log("API Response:", data);

		if (!data.results || !Array.isArray(data.results)) {
			console.warn("No results found in API response");
			return [];
		}

		// Store the results in cache
		await setCachedResponse(url, data.results);

		const recipes = data.results.map(transformToRecipe);

		return recipes;
	} catch (error) {
		console.error("Error fetching recipes from Tasty API:", error);
		throw new Error(
			`Failed to fetch recipes: ${
				error instanceof Error ? error.message : "Unknown error"
			}`,
		);
	}
};

const transformToRecipe = (recipe: RecipeSearchResponse["results"][number]) => {
	const ingredients = recipe.sections.flatMap((section) => {
		return section.components.flatMap((component) => {
			const bestMeasurement =
				component.measurements.filter((measure) => {
					return (
						typeof Number(measure?.quantity) === "number" &&
						!isNaN(Number(measure.quantity))
					);
				})?.[0] ?? component?.measurements?.[0];

			return {
				name: component.ingredient.name,
				quantity: bestMeasurement?.quantity,
				unit: bestMeasurement?.unit,
				position: component.position,
			};
		});
	});

	return {
		id: recipe.id,
		name: recipe.name,
		servings: recipe.num_servings,
		nutrition: recipe.nutrition,
		total_time: recipe.total_time_minutes,
		user_ratings: recipe.user_ratings,
		servings_noun_plural: recipe.servings_noun_plural,
		servings_noun_singular: recipe.servings_noun_singular,
		thumbnail_url: recipe.thumbnail_url,
		thumbnail_alt_text: recipe.thumbnail_alt_text,
		prep_time_minutes: recipe.prep_time_minutes,
		country: recipe.country,
		ingredients: ingredients,
		instructions: recipe.instructions,
		tags: recipe.tags,
	};
};

export { getRecipes };
export type { Recipe };
