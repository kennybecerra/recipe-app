import type { Recipe } from "@/api/recipe";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchRecipe } from "@/store/slices/currentRecipeSlice";
import Message from "./../../UI/Message/Message";
import Spinner from "../../UI/Spinner/Spinner";
import Result from "./Result/Result";
import classes from "./Results.module.scss";

const Results: React.FC = () => {
	// Redux hooks
	const loadingRecipes = useAppSelector(
		(state) => state.recipes.loadingRecipes,
	);
	const results = useAppSelector((state) => state.recipes.recipes);
	const recipe = useAppSelector((state) => state.currentRecipe.currentRecipe);
	const dispatch = useAppDispatch();

	// Action handler
	const handleRecipeSelect = (selectedRecipe: Recipe) => {
		dispatch(fetchRecipe(selectedRecipe));
	};

	let ResultsContent: React.ReactNode = (
		<Message>Search for a recipe to load all the results</Message>
	);

	if (loadingRecipes === "pending") {
		ResultsContent = <Spinner />;
	} else if (results.length !== 0) {
		ResultsContent = (
			<>
				{results.map((result) => {
					return (
						<Result
							key={result.id}
							image={result.thumbnail_url}
							title={result.name}
							author="Tasty Recipe"
							imageText={result.thumbnail_alt_text}
							handleRecipeSelect={() => handleRecipeSelect(result)}
							highlight={recipe ? recipe.name === result.name : false}
						/>
					);
				})}
			</>
		);
	}

	return <div className={classes.Container}>{ResultsContent}</div>;
};

export default Results;
