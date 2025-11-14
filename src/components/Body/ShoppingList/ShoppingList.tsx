import { useAppDispatch, useAppSelector } from "@/store";
import {
	decreaseServingsInShoppingList,
	increaseServingsInShoppingList,
	removeFromShoppingList,
} from "@/store/slices/shoppingListSlice";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Message from "./../../UI/Message/Message";
import ListItem from "./ListItem/ListItem";
import classes from "./ShoppingList.module.scss";

const ShoppingList: React.FC = () => {
	// Redux hooks
	const shoppingList = useAppSelector(
		(state) => state.shoppingList.shoppingList,
	);
	const dispatch = useAppDispatch();

	// Action handlers
	const handleDeleteFromShoppingList = (index: number) => {
		dispatch(removeFromShoppingList(index));
	};

	const handleAmountChangeInShoppingList = (
		direction: "increase" | "decrease",
		index: number,
	) => {
		if (direction === "increase") {
			dispatch(increaseServingsInShoppingList(index));
		} else {
			dispatch(decreaseServingsInShoppingList(index));
		}
	};

	const output =
		shoppingList.length === 0 ? (
			<Message>
				If you like a recipe, add the ingredients to your shopping list
			</Message>
		) : (
			<Auxilary>
				<div className={classes.Container__TextContainer}>
					<h2 className={classes.Container__TextContainer__Text}>
						Shopping List
					</h2>
				</div>
				{shoppingList.map((item, index) => {
					return (
						<ListItem
							key={index}
							index={index}
							{...item}
							handleDeleteFromShoppingList={handleDeleteFromShoppingList}
							handleAmountChangeInShoppingList={
								handleAmountChangeInShoppingList
							}
						/>
					);
				})}
			</Auxilary>
		);

	return <div className={classes.Container}>{output}</div>;
};

export default ShoppingList;
