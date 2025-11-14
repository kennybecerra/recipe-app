import { useEffect } from "react";
import { useParams } from "react-router";
import RecipeCard from "@/components/recipe_card";
import RecipeCardSkeleton from "@/components/recipe_card/RecipeCardSkeleton";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchRecipesWithTags } from "@/store/slices/recipesSlice";
import { mapTagByID } from "@/utils/menuTags";
import classes from "./index.module.scss";

const RecipeTag = () => {
	const { tagID } = useParams<{ tagID: string }>();
	const { recipes, loadingRecipes } = useAppSelector((state) => state.recipes);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const tag = mapTagByID?.[Number(tagID)];
		if (tag?.key) {
			dispatch(
				fetchRecipesWithTags({
					query: "",
					from: 0,
					size: 40,
					tags: [tag.key],
				}),
			);
		}
	}, [tagID, dispatch]);

	if (loadingRecipes === "pending") {
		return (
			<div className={classes.container}>
				{Array.from({ length: 8 }).map((_, index) => (
					<RecipeCardSkeleton key={`skeleton-${index}`} />
				))}
			</div>
		);
	}

	if (loadingRecipes === "error") {
		return (
			<div className={classes.emptyState}>
				<div className={classes.emptyContent}>
					<span className={classes.emptyIcon}>⚠️</span>
					<h2>Oops! Something went wrong</h2>
					<p>We couldn't load the recipes. Please try again.</p>
				</div>
			</div>
		);
	}

	if (recipes.length === 0 && loadingRecipes === "success") {
		return (
			<div className={classes.emptyState}>
				<div className={classes.emptyContent}>
					<span className={classes.emptyIcon}>🍽️</span>
					<h2>No Recipes Found</h2>
					<p>We couldn't find any recipes for this category.</p>
					<p className={classes.emptySubtext}>
						Try selecting a different category from the menu!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.container}>
			{recipes.map((recipe) => {
				return (
					<div key={recipe.id} className={classes.recipeCard}>
						<RecipeCard recipe={recipe} />
					</div>
				);
			})}
		</div>
	);
};

export default RecipeTag;
