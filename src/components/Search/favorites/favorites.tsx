import type React from "react";
import { useState } from "react";
import type { Recipe } from "@/api/recipe";
import Icon from "../../UI/Icon/Icon";
import Favorite from "./favorite/favorite";
import classes from "./favorites.module.scss";

interface FavoritesProps {
	favorites: { [key: string]: Recipe };
	handleRecipeSelect: (recipe: Recipe) => void;
	recipe: Recipe | null;
}

const Favorites: React.FC<FavoritesProps> = ({
	favorites,
	handleRecipeSelect,
	recipe,
}) => {
	const [show, setShow] = useState(false);

	const handleClick = () => {
		setShow(!show);
	};

	return (
		<div className={classes.Container}>
			<Icon
				name="heart-solid"
				className={classes.Container__Icon}
				onClick={handleClick}
			/>
			<div
				style={
					show
						? {
								height: "300px",
								opacity: "1",
								transition: "height 1s ease, opacity 0.7s ease",
							}
						: {}
				}
				className={`${classes.Container__Dropdown} ${
					false ? classes.alternate : ""
				}`}
			>
				{Object.keys(favorites).map((recipeID) => {
					return (
						<Favorite
							key={recipeID}
							image={favorites[recipeID].image}
							title={favorites[recipeID].label}
							author="Tasty Recipe"
							imageText={favorites[recipeID].label}
							handleRecipeSelect={() => {
								handleRecipeSelect(favorites[recipeID]);
							}}
							highlight={recipe ? recipe.uri === recipeID : false}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Favorites;
