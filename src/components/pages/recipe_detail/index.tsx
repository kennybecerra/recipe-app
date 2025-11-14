import {
	ClockCircleOutlined,
	FireOutlined,
	HeartFilled,
	HeartOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Card, Tag } from "antd";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { AppDispatch, RootState } from "@/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import classes from "./index.module.scss";

const RecipeDetail = () => {
	const { recipeID } = useParams<{ recipeID: string }>();
	const dispatch = useDispatch<AppDispatch>();

	// Get recipe from Redux state
	const recipe = useSelector((state: RootState) => {
		if (!recipeID) return null;
		// Check both allRecipes and favorites
		return (
			state.recipes.allRecipes[recipeID] ||
			state.favorites.mapByID[Number(recipeID)]
		);
	});

	const favoritesMap = useSelector(
		(state: RootState) => state.favorites.mapByID,
	);

	// Check if recipe is favorited
	const isFavorited = useMemo(
		() => recipe && Boolean(favoritesMap[recipe.id]),
		[favoritesMap, recipe],
	);

	// Handle favorite toggle
	const handleFavoriteClick = useCallback(() => {
		if (recipe) {
			dispatch(toggleFavorite(recipe));
		}
	}, [dispatch, recipe]);

	// Recipe not found
	if (!recipe) {
		return (
			<div className={classes.emptyState}>
				<div className={classes.emptyContent}>
					<span className={classes.emptyIcon}>🔍</span>
					<h2>Recipe Not Found</h2>
					<p>We couldn't find this recipe in our records.</p>
					<p className={classes.emptySubtext}>
						Try browsing recipes from the menu to discover something delicious!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.container}>
			<div className={classes.hero}>
				<div className={classes.imageContainer}>
					<img src={recipe.thumbnail_url} alt={recipe.thumbnail_alt_text} />
					<button
						type="button"
						className={classes.favoriteButton}
						onClick={handleFavoriteClick}
						aria-label={
							isFavorited ? "Remove from favorites" : "Add to favorites"
						}
					>
						{isFavorited ? (
							<HeartFilled
								className={`${classes.favoriteIcon} ${classes.favorited}`}
							/>
						) : (
							<HeartOutlined className={classes.favoriteIcon} />
						)}
					</button>
				</div>

				<div className={classes.header}>
					<h1>{recipe.name}</h1>

					<div className={classes.metadata}>
						{recipe.total_time && (
							<div className={classes.metaItem}>
								<ClockCircleOutlined />
								<span>{recipe.total_time} min</span>
							</div>
						)}
						{recipe.nutrition?.calories && (
							<div className={classes.metaItem}>
								<FireOutlined />
								<span>{recipe.nutrition.calories} cal</span>
							</div>
						)}
						<div className={classes.metaItem}>
							<UserOutlined />
							<span>
								{recipe.servings}{" "}
								{recipe.servings > 1
									? recipe.servings_noun_plural
									: recipe.servings_noun_singular}
							</span>
						</div>
					</div>

					{recipe.tags && recipe.tags.length > 0 && (
						<div className={classes.tags}>
							{recipe.tags.slice(0, 8).map((tag) => (
								<Tag key={tag.id} color="orange">
									{tag.display_name}
								</Tag>
							))}
						</div>
					)}
				</div>
			</div>

			<div className={classes.content}>
				<div className={classes.section}>
					<Card title="Ingredients" className={classes.card}>
						{recipe.ingredients && recipe.ingredients.length > 0 ? (
							<ul className={classes.ingredientsList}>
								{recipe.ingredients.map((ingredient) => (
									<li
										key={`${ingredient.position}-${ingredient.name}`}
										className={classes.ingredient}
									>
										<span className={classes.quantity}>
											{ingredient.quantity}{" "}
											{ingredient.unit?.display_singular ||
												ingredient.unit?.abbreviation}
										</span>
										<span className={classes.name}>{ingredient.name}</span>
									</li>
								))}
							</ul>
						) : (
							<p className={classes.noData}>No ingredients available</p>
						)}
					</Card>
				</div>

				<div className={classes.section}>
					<Card title="Instructions" className={classes.card}>
						{recipe.instructions && recipe.instructions.length > 0 ? (
							<ol className={classes.instructionsList}>
								{recipe.instructions.map((instruction) => (
									<li key={instruction.id} className={classes.instruction}>
										<div className={classes.stepNumber}>
											{instruction.position}
										</div>
										<div className={classes.stepContent}>
											<p>{instruction.display_text}</p>
											{instruction.appliance && (
												<div className={classes.stepMeta}>
													<Tag color="blue">{instruction.appliance}</Tag>
												</div>
											)}
										</div>
									</li>
								))}
							</ol>
						) : (
							<p className={classes.noData}>No instructions available</p>
						)}
					</Card>
				</div>
			</div>
		</div>
	);
};

export default RecipeDetail;
