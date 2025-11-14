import {
	DislikeOutlined,
	FireOutlined,
	HeartFilled,
	HeartOutlined,
	LikeOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { Recipe } from "@/api/recipe";
import type { AppDispatch, RootState } from "@/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import classes from "./index.module.scss";

const { Meta } = Card;

interface IRecipeCard {
	recipe: Recipe;
}

const RecipeCard = ({ recipe }: IRecipeCard) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const favoritesMap = useSelector(
		(state: RootState) => state.favorites.mapByID,
	);

	// Check if recipe is favorited
	const isFavorited = useMemo(
		() => Boolean(favoritesMap[recipe.id]),
		[favoritesMap, recipe.id],
	);

	// Handle favorite toggle
	const handleFavoriteClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation(); // Prevent card click event
			dispatch(toggleFavorite(recipe));
		},
		[dispatch, recipe],
	);

	// Handle card click
	const handleCardClick = useCallback(() => {
		navigate(`/recipe/${recipe.id}`);
	}, [navigate, recipe.id]);

	return (
		<Card
			hoverable
			style={{ width: 250 }}
			rootClassName={classes.card}
			onClick={handleCardClick}
			cover={
				<div className={classes.image_container}>
					<img
						className={classes.image}
						draggable={false}
						alt={recipe.thumbnail_alt_text}
						src={recipe.thumbnail_url}
					/>
				</div>
			}
			styles={{
				body: {
					padding: 15,
				},
			}}
		>
			<button
				type="button"
				className={classes.favoriteButton}
				onClick={handleFavoriteClick}
				aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
			>
				{isFavorited ? (
					<HeartFilled
						className={`${classes.favoriteIcon} ${classes.filled}`}
					/>
				) : (
					<HeartOutlined className={classes.favoriteIcon} />
				)}
			</button>
			<Meta
				title={recipe.name}
				description={
					<div className={classes.info}>
						<span className={classes.infoItem}>
							<FireOutlined className={classes.icon} />
							{recipe.nutrition.calories} kcal
						</span>
						<span className={classes.infoItem}>
							<LikeOutlined className={classes.iconPositive} />
							{recipe.user_ratings.count_positive}
							<DislikeOutlined className={classes.iconNegative} />
							{recipe.user_ratings.count_negative}
						</span>
					</div>
				}
			/>
		</Card>
	);
};

export default RecipeCard;
