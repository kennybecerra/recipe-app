import Icon from "../../../UI/Icon/Icon";
import classes from "./Ingredient.module.scss";

interface IngredientItem {
	name: string;
	quantity: string;
	unit: {
		system: string;
		name: string;
		display_plural: string;
		display_singular: string;
		abbreviation: string;
	};
	position: number;
}

interface IngredientProps {
	ingredient: IngredientItem;
	servings: number;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient, servings }) => {
	const quantity = parseFloat(ingredient.quantity) || 0;
	const adjustedQuantity = quantity * servings;
	const unit = ingredient.unit.abbreviation || ingredient.unit.name;

	return (
		<div className={classes.Container}>
			<Icon className={classes.Container__Icon} name="checkmark-outline" />
			<p className={classes.Container__Text}>
				{adjustedQuantity.toFixed(2)} {unit} {ingredient.name}
			</p>
		</div>
	);
};

export default Ingredient;
