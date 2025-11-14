import type { Tag } from "../api/types";

// Organized tag categories for menu items
export const cuisineTags: { id: number; key: Tag["name"]; label: string }[] = [
	{ id: 64444, key: "american", label: "American" },
	{ id: 64447, key: "british", label: "British" },
	{ id: 64448, key: "chinese", label: "Chinese" },
	{ id: 64449, key: "french", label: "French" },
	{ id: 64450, key: "german", label: "German" },
	{ id: 64451, key: "greek", label: "Greek" },
	{ id: 64452, key: "indian", label: "Indian" },
	{ id: 64453, key: "italian", label: "Italian" },
	{ id: 64454, key: "japanese", label: "Japanese" },
	{ id: 64455, key: "korean", label: "Korean" },
	{ id: 64457, key: "mexican", label: "Mexican" },
	{ id: 64458, key: "middle_eastern", label: "Middle Eastern" },
	{ id: 64460, key: "thai", label: "Thai" },
	{ id: 64461, key: "vietnamese", label: "Vietnamese" },
	{ id: 64446, key: "brazilian", label: "Brazilian" },
	{ id: 64459, key: "seafood", label: "Seafood" },
	{ id: 64445, key: "bbq", label: "BBQ" },
	{ id: 65410, key: "fusion", label: "Fusion" },
	{ id: 3801553, key: "african", label: "African" },
	{ id: 3801554, key: "caribbean", label: "Caribbean" },
	{ id: 6953013, key: "ethiopian", label: "Ethiopian" },
	{ id: 6953008, key: "filipino", label: "Filipino" },
	{ id: 6953041, key: "haitian", label: "Haitian" },
	{ id: 6953012, key: "hawaiian", label: "Hawaiian" },
	{ id: 6953049, key: "jamaican", label: "Jamaican" },
	{ id: 6953014, key: "kenyan", label: "Kenyan" },
	{ id: 6953015, key: "south_african", label: "South African" },
	{ id: 6953016, key: "west_african", label: "West African" },
	{ id: 6953039, key: "taiwanese", label: "Taiwanese" },
	{ id: 6953048, key: "cuban", label: "Cuban" },
	{ id: 6953047, key: "dominican", label: "Dominican" },
	{ id: 6953050, key: "puerto_rican", label: "Puerto Rican" },
	{ id: 6953044, key: "peruvian", label: "Peruvian" },
	{ id: 6953052, key: "venezuelan", label: "Venezuelan" },
	{ id: 6953045, key: "indigenous", label: "Indigenous" },
	{ id: 6953046, key: "laotian", label: "Laotian" },
	{ id: 6953043, key: "lebanese", label: "Lebanese" },
	{ id: 6953042, key: "persian", label: "Persian" },
	{ id: 6953051, key: "soul_food", label: "Soul Food" },
	{ id: 6953040, key: "swedish", label: "Swedish" },
	{ id: 64456, key: "latin_american", label: "Latin American" },
];

export const dietaryTags: { id: number; key: Tag["name"]; label: string }[] = [
	{ id: 64468, key: "vegan", label: "Vegan" },
	{ id: 64469, key: "vegetarian", label: "Vegetarian" },
	{ id: 64465, key: "gluten_free", label: "Gluten-Free" },
	{ id: 64463, key: "dairy_free", label: "Dairy-Free" },
	{ id: 64466, key: "healthy", label: "Healthy" },
	{ id: 64467, key: "low_carb", label: "Low-Carb" },
	{ id: 3801552, key: "pescatarian", label: "Pescatarian" },
	{ id: 64462, key: "comfort_food", label: "Comfort Food" },
	{ id: 64488, key: "kid_friendly", label: "Kid-Friendly" },
	{ id: 65850, key: "indulgent_sweets", label: "Indulgent Sweets" },
	{ id: 5285641, key: "contains_alcohol", label: "Contains Alcohol" },
];

export const mealTypeTags: { id: number; key: Tag["name"]; label: string }[] = [
	{ id: 64483, key: "breakfast", label: "Breakfast" },
	{ id: 64484, key: "brunch", label: "Brunch" },
	{ id: 64489, key: "lunch", label: "Lunch" },
	{ id: 64486, key: "dinner", label: "Dinner" },
	{ id: 64481, key: "appetizers", label: "Appetizers" },
	{ id: 64491, key: "snacks", label: "Snacks" },
	{ id: 64485, key: "desserts", label: "Desserts" },
	{ id: 64490, key: "sides", label: "Sides" },
	{ id: 64487, key: "drinks", label: "Drinks" },
	{ id: 65857, key: "bakery_goods", label: "Bakery Goods" },
];

export const difficultyTags: { id: number; key: Tag["name"]; label: string }[] =
	[
		{ id: 64471, key: "easy", label: "Easy" },
		{ id: 64470, key: "5_ingredients_or_less", label: "5 Ingredients or Less" },
		{ id: 64472, key: "under_30_minutes", label: "Under 30 Minutes" },
	];

export const cookingMethodTags: {
	id: number;
	key: Tag["name"];
	label: string;
}[] = [
	{ id: 64492, key: "bake", label: "Bake" },
	{ id: 64494, key: "grill", label: "Grill" },
	{ id: 64493, key: "deep_fry", label: "Deep-Fry" },
	{ id: 65859, key: "pan_fry", label: "Pan Fry" },
	{ id: 64498, key: "steam", label: "Steam" },
];

export const occasionTags: { id: number; key: Tag["name"]; label: string }[] = [
	{ id: 64505, key: "weeknight", label: "Weeknight" },
	{ id: 64500, key: "date_night", label: "Date Night" },
	{ id: 64502, key: "happy_hour", label: "Happy Hour" },
	{ id: 64503, key: "casual_party", label: "Casual Party" },
	{ id: 64504, key: "bbq", label: "BBQ" },
	{ id: 64501, key: "game_day", label: "Game Day" },
	{ id: 188967, key: "special_occasion", label: "Special Occasion" },
];

export const holidayTags: { id: number; key: Tag["name"]; label: string }[] = [
	{ id: 64473, key: "christmas", label: "Christmas" },
	{ id: 64479, key: "thanksgiving", label: "Thanksgiving" },
	{ id: 64476, key: "halloween", label: "Halloween" },
	{ id: 64474, key: "easter", label: "Easter" },
	{ id: 64475, key: "fourth_of_july", label: "Fourth of July" },
	{ id: 64480, key: "valentines_day", label: "Valentine's Day" },
	{ id: 6711300, key: "st_patrick_s_day", label: "St. Patrick's Day" },
	{ id: 6854261, key: "cinco_de_mayo", label: "Cinco de Mayo" },
	{ id: 6854262, key: "mothers_day", label: "Mother's Day" },
	{ id: 6742797, key: "passover", label: "Passover" },
	{ id: 6573766, key: "lunar_new_year", label: "Lunar New Year" },
	{ id: 3802076, key: "black_history_month", label: "Black History Month" },
	{ id: 3802078, key: "pride_month", label: "Pride Month" },
	{
		id: 3802077,
		key: "asian_pacific_american_heritage_month",
		label: "Asian Pacific American Heritage Month",
	},
	{ id: 7145248, key: "latinx_heritage_month", label: "Latinx Heritage Month" },
];

export const seasonalTags: { id: number; key: Tag["name"]; label: string }[] = [
	{ id: 64509, key: "spring", label: "Spring" },
	{ id: 64510, key: "summer", label: "Summer" },
	{ id: 64508, key: "fall", label: "Fall" },
	{ id: 64511, key: "winter", label: "Winter" },
];

export const applianceTags: { id: number; key: Tag["name"]; label: string }[] =
	[
		{ id: 65846, key: "oven", label: "Oven" },
		{ id: 65848, key: "stove_top", label: "Stove Top" },
		{ id: 65847, key: "slow_cooker", label: "Slow Cooker" },
		{ id: 4767336, key: "instant_pot", label: "Instant Pot" },
		{ id: 4767335, key: "pressure_cooker", label: "Pressure Cooker" },
		{ id: 6931167, key: "air_fryer", label: "Air Fryer" },
		{ id: 65838, key: "blender", label: "Blender" },
		{ id: 65842, key: "food_processor", label: "Food Processor" },
		{ id: 65845, key: "microwave", label: "Microwave" },
		{ id: 65844, key: "hand_mixer", label: "Hand Mixer" },
		{ id: 65839, key: "broiler", label: "Broiler" },
		{ id: 65843, key: "freezer", label: "Freezer" },
		{ id: 65840, key: "cast_iron_pan", label: "Cast Iron Pan" },
		{ id: 65841, key: "dutch_oven", label: "Dutch Oven" },
		{ id: 65849, key: "wok", label: "Wok" },
	];

export const dishStyleTags: { id: number; key: Tag["name"]; label: string }[] =
	[
		{ id: 65855, key: "one_pot_or_pan", label: "One-Pot or Pan" },
		{ id: 65853, key: "meal_prep", label: "Meal Prep" },
		{ id: 65851, key: "big_batch", label: "Big Batch" },
		{ id: 65854, key: "no_bake_desserts", label: "No Bake Desserts" },
		{ id: 65856, key: "stuffed", label: "Stuffed" },
		{ id: 65852, key: "mashup", label: "Mashup" },
	];

// Combine all tags into a single array
const allTags = [
	...cuisineTags,
	...dietaryTags,
	...mealTypeTags,
	...difficultyTags,
	...cookingMethodTags,
	...occasionTags,
	...holidayTags,
	...seasonalTags,
	...applianceTags,
	...dishStyleTags,
];

// Map tags by their ID for quick lookup
export const mapTagByID: Record<
	number,
	{ id: number; key: Tag["name"]; label: string }
> = allTags.reduce(
	(acc, tag) => {
		acc[tag.id] = tag;
		return acc;
	},
	{} as Record<number, { id: number; key: Tag["name"]; label: string }>,
);
