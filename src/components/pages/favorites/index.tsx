import { useMemo } from "react";
import { useSelector } from "react-redux";
import RecipeCard from "@/components/recipe_card";
import type { RootState } from "@/store";
import classes from "./index.module.scss";

const Favorites = () => {
	const favoritesMap = useSelector(
		(state: RootState) => state.favorites.mapByID,
	);

	const favoriteRecipes = useMemo(() => {
		return Object.values(favoritesMap);
	}, [favoritesMap]);

	if (favoriteRecipes.length === 0) {
		return (
			<div className={classes.emptyState}>
				<div className={classes.emptyContent}>
					<span className={classes.emptyIcon}>💔</span>
					<h2>No Favorites Yet</h2>
					<p>Start exploring recipes and add your favorites!</p>
					<p className={classes.emptySubtext}>
						Click the heart icon on any recipe card to save it here.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.container}>
			{favoriteRecipes.map((recipe) => (
				<div key={recipe.id} className={classes.recipeCard}>
					<RecipeCard recipe={recipe} />
				</div>
			))}
		</div>
	);
};

export default Favorites;
