import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useCallback, useState } from "react";
import RecipeCard from "@/components/recipe_card";
import RecipeCardSkeleton from "@/components/recipe_card/RecipeCardSkeleton";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchResults } from "@/store/slices/recipesSlice";
import classes from "./index.module.scss";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { recipes, loadingRecipes } = useAppSelector((state) => state.recipes);
	const dispatch = useAppDispatch();

	const handleSearch = useCallback(
		(value: string) => {
			if (value.trim().length > 0) {
				dispatch(fetchResults({ query: value.trim(), size: 40 }));
			}
		},
		[dispatch],
	);

	return (
		<div className={classes.container}>
			<div className={classes.searchSection}>
				<Input.Search
					placeholder="Search for recipes..."
					allowClear
					enterButton={<SearchOutlined />}
					size="large"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onSearch={handleSearch}
					className={classes.searchInput}
				/>
			</div>

			{loadingRecipes === "pending" && (
				<div className={classes.resultsGrid}>
					{Array.from({ length: 8 }, (_, i) => i).map((num) => (
						<RecipeCardSkeleton key={`skeleton-${num}`} />
					))}
				</div>
			)}

			{loadingRecipes === "error" && (
				<div className={classes.emptyState}>
					<div className={classes.emptyContent}>
						<span className={classes.emptyIcon}>⚠️</span>
						<h2>Oops! Something went wrong</h2>
						<p>We couldn't load the recipes. Please try again.</p>
					</div>
				</div>
			)}

			{loadingRecipes === "success" && recipes.length === 0 && (
				<div className={classes.emptyState}>
					<div className={classes.emptyContent}>
						<span className={classes.emptyIcon}>🔍</span>
						<h2>No Recipes Found</h2>
						<p>We couldn't find any recipes matching your search.</p>
						<p className={classes.emptySubtext}>
							Try different keywords or browse recipes from the menu!
						</p>
					</div>
				</div>
			)}

			{loadingRecipes === "idle" && (
				<div className={classes.emptyState}>
					<div className={classes.emptyContent}>
						<span className={classes.emptyIcon}>🍳</span>
						<h2>Start Your Search</h2>
						<p>Enter a recipe name, ingredient, or cuisine to get started!</p>
						<p className={classes.emptySubtext}>
							Try searching for "pasta", "chicken", or "dessert"
						</p>
					</div>
				</div>
			)}

			{loadingRecipes === "success" && recipes.length > 0 && (
				<div className={classes.resultsGrid}>
					{recipes.map((recipe) => (
						<div key={recipe.id} className={classes.recipeCard}>
							<RecipeCard recipe={recipe} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Search;
