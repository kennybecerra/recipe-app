import { useState } from "react";
import type { Recipe } from "@/api/recipe";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchRecipe } from "@/store/slices/currentRecipeSlice";
import { fetchResults } from "@/store/slices/recipesSlice";
import { removeFromShoppingList } from "@/store/slices/shoppingListSlice";
import ListItem from "./../Body/ShoppingList/ListItem/ListItem";
import Icon from "../UI/Icon/Icon";
import Modal from "./../UI/Modal/Modal";
import Favorites from "./favorites/favorites";
import classes from "./Search.module.scss";

const Search: React.FC = () => {
	// Local state
	const [show, setShow] = useState(false);
	const [value, setValue] = useState("");

	// Redux hooks
	const shoppingList = useAppSelector(
		(state) => state.shoppingList.shoppingList,
	);
	const recipe = useAppSelector((state) => state.currentRecipe.currentRecipe);
	const favorites = useAppSelector((state) => state.favorites.mapByID);
	const dispatch = useAppDispatch();

	// Event handlers
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(fetchResults({ query: value, size: 40 }));
	};

	const handleModalToggle = () => {
		setShow(!show);
	};

	const handleDeleteFromShoppingList = (index: number) => {
		dispatch(removeFromShoppingList(index));
	};

	const handleAmountChangeInShoppingList = () => {
		// This function seems incomplete - leaving as is for now
		// TODO: Implement proper shopping list addition
	};

	const handleRecipeSelect = (selectedRecipe: Recipe) => {
		dispatch(fetchRecipe(selectedRecipe));
	};

	return (
		<div className={classes.Container}>
			<div className={classes.CartContainer}>
				<Icon
					name="cart"
					className={classes.CartContainer__Icon}
					onClick={handleModalToggle}
				/>
				<Modal show={show} toggleModal={handleModalToggle}>
					<div className={classes.InnerContainer}>
						<div className={classes.InnerContainer__TextContainer}>
							<h2 className={classes.InnerContainer__TextContainer__Text}>
								Shopping List
							</h2>
						</div>
						{shoppingList.length === 0
							? null
							: shoppingList.map((item, index) => {
									return (
										<ListItem
											key={index}
											index={index}
											{...item}
											handleDeleteFromShoppingList={
												handleDeleteFromShoppingList
											}
											handleAmountChangeInShoppingList={
												handleAmountChangeInShoppingList
											}
										/>
									);
								})}
					</div>
				</Modal>
			</div>

			<form onSubmit={handleSubmit} className={classes.FormContainer}>
				<input
					type="text"
					className={classes.FormContainer__TextField}
					onChange={handleChange}
					value={value}
					placeholder="Search over 1,000,000 recipes and more ...."
				/>
				<button className={classes.FormContainer__ButtonField}>
					<Icon
						name="search"
						className={classes.FormContainer__ButtonField__Icon}
					/>
					<span className={classes.FormContainer__ButtonField__Text}>
						SEARCH
					</span>
				</button>
			</form>

			<div className={classes.FavoritesContainer}>
				<Favorites
					favorites={favorites}
					handleRecipeSelect={handleRecipeSelect}
					recipe={recipe}
				/>
			</div>
		</div>
	);
};

export default Search;
