import type { RecipeSearchResponse } from "../api/types";

const CACHE_NAME = "recipe-api-cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getCachedResponse = async (
	url: string,
): Promise<RecipeSearchResponse["results"] | null> => {
	try {
		const cache = await caches.open(CACHE_NAME);
		const cachedResponse = await cache.match(url);

		if (!cachedResponse) return null;

		// Check if cache is still valid
		const cachedTime = cachedResponse.headers.get("X-Cache-Time");
		if (cachedTime && Date.now() - Number(cachedTime) < CACHE_DURATION) {
			const data = await cachedResponse.json();
			return data;
		}

		// Remove expired cache
		await cache.delete(url);
		return null;
	} catch (error) {
		console.error("Error reading from cache:", error);
		return null;
	}
};

export const setCachedResponse = async (
	url: string,
	data: RecipeSearchResponse["results"],
) => {
	try {
		const cache = await caches.open(CACHE_NAME);

		// Create a Response object with custom headers
		const response = new Response(JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
				"X-Cache-Time": Date.now().toString(),
			},
		});

		await cache.put(url, response);
	} catch (error) {
		console.error("Error writing to cache:", error);
	}
};

export const clearRecipeCache = async () => {
	try {
		const deleted = await caches.delete(CACHE_NAME);
		console.log(`Recipe cache ${deleted ? "cleared" : "not found"}`);
		return deleted;
	} catch (error) {
		console.error("Error clearing cache:", error);
		return false;
	}
};
