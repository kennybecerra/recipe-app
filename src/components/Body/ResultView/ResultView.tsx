import { useAppDispatch, useAppSelector } from "@/store";
import {
	decrementServings,
	incrementServings,
} from "@/store/slices/currentRecipeSlice";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Icon from "../../UI/Icon/Icon";
import Message from "./../../UI/Message/Message";
import Spinner from "./../../UI/Spinner/Spinner";
import Ingredient from "./Ingredients/Ingredient";
import classes from "./ResultView.module.scss";

const ResultView: React.FC = () => {
	// Redux hooks
	const recipe = useAppSelector((state) => state.currentRecipe.currentRecipe);
	const servings = useAppSelector((state) => state.currentRecipe.servings);
	const loading = useAppSelector((state) => state.currentRecipe.loadingRecipe);
	const favorites = useAppSelector((state) => state.favorites.favorites);
	const dispatch = useAppDispatch();

	// Action handlers
	const handleServingChange = (direction: "increment" | "decrement") => {
		if (direction === "increment") {
			dispatch(incrementServings());
		} else {
			dispatch(decrementServings());
		}
	};

	const handleAddToFavorites = () => {
		if (recipe) {
			dispatch(toggleFavorite(recipe));
		}
	};

	const handleAddToShoppingList = () => {
		// TODO: Implement shopping list logic with new slice
		console.log("Add to shopping list");
	};

	let View = (
		<Message>Click on a recipe result to view the recipe ingredients</Message>
	);

	if (loading) {
		View = <Spinner />;
	} else if (recipe !== null) {
		View = (
			<Auxilary>
				<div className={classes.ImageContainer}>
					<img
						src={recipe.thumbnail_url}
						alt={recipe.thumbnail_alt_text}
						className={classes.ImageContainer__Image}
					/>
				</div>
				<div className={classes.InfoContainer}>
					<span className={classes.InfoContainer__Caption}>{recipe.name}</span>
					<div className={classes.InfoContainer__Time}>
						<Icon
							name="stopwatch"
							className={classes.InfoContainer__Time__Icon}
						/>
						<p className={classes.InfoContainer__Time__Text}>
							{recipe.total_time || recipe.prep_time_minutes || 0} minutes
						</p>
					</div>
					<div className={classes.InfoContainer__Servings}>
						<Icon
							name="user"
							className={classes.InfoContainer__Servings__Icon}
						/>
						<p className={classes.InfoContainer__Servings__Text}>
							{servings} servings
						</p>
						<Icon
							name="minus-solid"
							className={classes.InfoContainer__Servings__Icon}
							onClick={() => handleServingChange("decrement")}
						/>
						<Icon
							name="add-solid"
							className={classes.InfoContainer__Servings__Icon}
							onClick={() => handleServingChange("increment")}
						/>
					</div>
					<div className={classes.InfoContainer__Like}>
						<button
							type="button"
							className={classes.InfoContainer__Like__Button}
						>
							<Icon
								name={favorites[recipe.name] ? "heart-solid" : "heart-outline"}
								className={classes.InfoContainer__Like__Button__Icon}
								onClick={handleAddToFavorites}
							/>
						</button>
					</div>
				</div>
				<div className={classes.IngredientsContainer}>
					{recipe?.ingredients?.map((item) => {
						return (
							<Ingredient
								key={item.position}
								ingredient={item}
								servings={servings}
							/>
						);
					})}
				</div>
				<div className={classes.ButtonContainer}>
					<button
						type="button"
						className={classes.ButtonContainer__Button}
						onClick={handleAddToShoppingList}
					>
						<Icon
							name="cart"
							className={classes.ButtonContainer__Button__Icon}
						/>
						<p className={classes.ButtonContainer__Button__Text}>
							add to shopping list
						</p>
					</button>
				</div>
			</Auxilary>
		);
	}

	return <div className={classes.Container}>{View}</div>;
};

export default ResultView;
