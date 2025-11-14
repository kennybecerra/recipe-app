import {
	BookOutlined,
	FireOutlined,
	HeartOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router";
import classes from "./index.module.scss";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className={classes.container}>
			<div className={classes.hero}>
				<div className={classes.heroContent}>
					<h1 className={classes.title}>
						Welcome to <span className={classes.highlight}>Recipe App</span>
					</h1>
					<p className={classes.subtitle}>
						Discover thousands of delicious recipes from around the world.
						Search, save your favorites, and cook with confidence.
					</p>
					<div className={classes.ctaButtons}>
						<Button
							type="primary"
							size="large"
							icon={<SearchOutlined />}
							onClick={() => navigate("/search")}
							className={classes.primaryButton}
						>
							Search Recipes
						</Button>
						<Button
							size="large"
							icon={<HeartOutlined />}
							onClick={() => navigate("/favorites")}
							className={classes.secondaryButton}
						>
							View Favorites
						</Button>
					</div>
				</div>
			</div>

			<div className={classes.features}>
				<h2 className={classes.sectionTitle}>Why Choose Recipe App?</h2>
				<div className={classes.featureGrid}>
					<div className={classes.featureCard}>
						<div className={classes.featureIcon}>
							<SearchOutlined />
						</div>
						<h3>Extensive Search</h3>
						<p>
							Search through thousands of recipes by cuisine, dietary
							preferences, ingredients, and more.
						</p>
					</div>

					<div className={classes.featureCard}>
						<div className={classes.featureIcon}>
							<FireOutlined />
						</div>
						<h3>Diverse Categories</h3>
						<p>
							Explore recipes by meal type, cooking method, difficulty level,
							and seasonal ingredients.
						</p>
					</div>

					<div className={classes.featureCard}>
						<div className={classes.featureIcon}>
							<HeartOutlined />
						</div>
						<h3>Save Favorites</h3>
						<p>
							Keep track of your favorite recipes and access them anytime with
							our built-in favorites feature.
						</p>
					</div>

					<div className={classes.featureCard}>
						<div className={classes.featureIcon}>
							<BookOutlined />
						</div>
						<h3>Detailed Instructions</h3>
						<p>
							Get step-by-step instructions, ingredient lists, and nutritional
							information for every recipe.
						</p>
					</div>
				</div>
			</div>

			<div className={classes.cta}>
				<h2>Ready to Start Cooking?</h2>
				<p>Browse our collection and find your next favorite dish today!</p>
				<Button
					type="primary"
					size="large"
					icon={<SearchOutlined />}
					onClick={() => navigate("/search")}
					className={classes.ctaButton}
				>
					Get Started
				</Button>
			</div>
		</div>
	);
};

export default Home;
