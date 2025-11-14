import {
	CalendarOutlined,
	ClockCircleOutlined,
	CloudOutlined,
	CoffeeOutlined,
	FireOutlined,
	GlobalOutlined,
	HeartOutlined,
	HomeOutlined,
	SearchOutlined,
	StarOutlined,
	ToolOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Layout, Menu, Tooltip } from "antd";
import dayjs from "dayjs";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import classes from "./App.module.scss";
import icon from "./assets/images/flame-spoon.png";
import Favorites from "./components/pages/favorites";
import Home from "./components/pages/home";
import RecipeDetail from "./components/pages/recipe_detail";
import RecipeTag from "./components/pages/recipe_tag";
import Search from "./components/pages/search";
import Container from "./components/UI/Container/Container";
import type { AppDispatch, RootState } from "./store";
import * as actionTypes from "./store/actions/actionTypes";
import { setFavorites } from "./store/slices/favoritesSlice";
import {
	applianceTags,
	cookingMethodTags,
	cuisineTags,
	dietaryTags,
	difficultyTags,
	dishStyleTags,
	holidayTags,
	mapTagByID,
	mealTypeTags,
	occasionTags,
	seasonalTags,
} from "./utils/menuTags";

type MenuItem = Required<MenuProps>["items"][number];

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();

	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const [collapsed, setCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

	// Get favorites count
	const favoritesCount = useSelector(
		(state: RootState) => Object.keys(state.favorites.mapByID).length,
	);

	useEffect(() => {
		if ("favorites" in window.localStorage) {
			const favorites = window.localStorage.getItem("favorites");
			if (favorites) {
				dispatch(setFavorites(JSON.parse(favorites)));
			}
		}

		// Handle window resize for mobile detection
		const handleResize = () => {
			setIsMobile(window.innerWidth < 992);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [dispatch]);

	// Set selected menu keys based on current route
	useEffect(() => {
		const path = location.pathname;

		if (path === "/") {
			setSelectedKeys(["home"]);
			return;
		}

		if (path === "/search") {
			setSelectedKeys(["search"]);
			return;
		}

		if (path === "/favorites") {
			setSelectedKeys(["favorites"]);
			return;
		}

		if (path.startsWith("/recipe/")) {
			setSelectedKeys([]);
			return;
		}

		// Tag pages (ID-based routes)
		const tagId = path.replace("/", "");
		if (tagId) {
			const iDNum = Number.parseInt(tagId);
			if (!Number.isNaN(iDNum)) {
				setSelectedKeys([tagId]);
				return;
			}
		}

		// Default fallback
		setSelectedKeys([]);
	}, [location.pathname]);

	const menuItems: MenuItem[] = [
		{
			key: "home",
			icon: <HomeOutlined style={{ color: "#de5542", fontSize: "18px" }} />,
			label: "Home",
		},
		{
			key: "search",
			icon: <SearchOutlined style={{ color: "#de5542", fontSize: "18px" }} />,
			label: "Search",
		},
		{
			key: "favorites",
			icon: <HeartOutlined style={{ color: "#f93117", fontSize: "18px" }} />,
			label: "Favorites",
		},
		{
			key: "cuisine",
			icon: <GlobalOutlined style={{ color: "#de5542", fontSize: "18px" }} />,
			label: "Cuisine",
			children: cuisineTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "dietary",
			icon: <HeartOutlined style={{ color: "#81994a", fontSize: "18px" }} />,
			label: "Dietary",
			children: dietaryTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "meal-type",
			icon: <CoffeeOutlined style={{ color: "#a8682d", fontSize: "18px" }} />,
			label: "Meal Type",
			children: mealTypeTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "difficulty",
			icon: (
				<ClockCircleOutlined style={{ color: "#f93117", fontSize: "18px" }} />
			),
			label: "Difficulty",
			children: difficultyTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "cooking-method",
			icon: <FireOutlined style={{ color: "#de5542", fontSize: "18px" }} />,
			label: "Cooking Method",
			children: cookingMethodTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "occasion",
			icon: <StarOutlined style={{ color: "#e0c995", fontSize: "18px" }} />,
			label: "Occasion",
			children: occasionTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "holiday",
			icon: <CalendarOutlined style={{ color: "#cc8d74", fontSize: "18px" }} />,
			label: "Holidays",
			children: holidayTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "seasonal",
			icon: <CloudOutlined style={{ color: "#91866c", fontSize: "18px" }} />,
			label: "Seasonal",
			children: seasonalTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "appliance",
			icon: <ToolOutlined style={{ color: "#385023", fontSize: "18px" }} />,
			label: "Appliance",
			children: applianceTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
		{
			key: "dish-style",
			icon: <StarOutlined style={{ color: "#81994a", fontSize: "18px" }} />,
			label: "Dish Style",
			children: dishStyleTags.map((tag) => ({
				key: `${tag.id}`,
				label: tag.label,
			})),
		},
	];

	const handleMenuSelect: MenuProps["onSelect"] = (prop) => {
		if (prop.keyPath?.length > 1) {
			// Tag ID is now the key directly
			const tagId = prop.key;
			navigate(`/${tagId}`);
		} else {
			// Handle special routes
			if (prop.key === "home") {
				navigate("/");
			} else if (prop.key === "search" || prop.key === "favorites") {
				navigate(`/${prop.key}`);
			} else {
				navigate(`/${prop.key}`);
			}
		}
		setSelectedKeys([prop.key]);

		// Close sidebar on mobile after selection
		if (isMobile) {
			setCollapsed(true);
		}
	};

	// Get title based on current route
	const currentTitle = useMemo(() => {
		const path = location.pathname;

		// Home page
		if (path === "/") {
			return "Home";
		}

		// Recipe detail page
		if (path.startsWith("/recipe/")) {
			return "Recipe Details";
		}

		// Search page
		if (path === "/search") {
			return "Search";
		}

		// Favorites page
		if (path === "/favorites") {
			return "Favorites";
		}

		// Tag pages (ID-based routes)
		const tagId = path.replace("/", "");
		if (tagId) {
			const iDNum = Number.parseInt(tagId);
			if (!Number.isNaN(iDNum)) {
				return mapTagByID[iDNum]?.label || "Recipes";
			}
		}

		// Fallback
		return "Recipes";
	}, [location.pathname]);

	return (
		<Container>
			<Layout style={{ height: "100%" }}>
				<Layout.Sider
					width="280px"
					trigger={null}
					collapsible
					collapsed={collapsed}
					collapsedWidth={isMobile ? 0 : 60}
					breakpoint="lg"
					onBreakpoint={(broken) => {
						setCollapsed(broken);
					}}
					style={{
						overflow: "auto",
						height: "100%",
						position: isMobile ? "fixed" : "relative",
						zIndex: isMobile ? 1000 : "auto",
					}}
				>
					<div className={classes.logoContainer}>
						<div className={classes.logo}>
							<img src={icon} alt="flame spoon logo" />
						</div>
						<button
							type="button"
							className={classes.collapseButton}
							onClick={() => setCollapsed(!collapsed)}
							aria-label={collapsed ? "Expand menu" : "Collapse menu"}
						>
							{collapsed ? "→" : "←"}
						</button>
					</div>

					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["home"]}
						items={menuItems}
						onSelect={handleMenuSelect}
						selectedKeys={selectedKeys}
					/>
				</Layout.Sider>
				{!collapsed && isMobile && (
					<button
						type="button"
						className={classes.backdrop}
						onClick={() => setCollapsed(true)}
						onKeyDown={(e) => {
							if (e.key === "Escape") setCollapsed(true);
						}}
						aria-label="Close menu"
					/>
				)}
				<Layout.Content style={{ display: "flex", flexDirection: "column" }}>
					<div className={classes.header}>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								gap: "15px",
							}}
						>
							{isMobile && collapsed && (
								<button
									type="button"
									className={classes.mobileMenuButton}
									onClick={() => setCollapsed(false)}
									aria-label="Open menu"
								>
									☰
								</button>
							)}
							<div>
								<h1>{currentTitle}</h1>
								<p>{dayjs().format("dddd, MMMM D, YYYY")}</p>
							</div>
						</div>
						<Tooltip
							title={`${favoritesCount} ${favoritesCount === 1 ? "favorite recipe" : "favorite recipes"}`}
							placement="bottom"
						>
							<Badge count={favoritesCount} showZero={false}>
								<div className={classes.favoritesCounter}>
									<HeartOutlined />
								</div>
							</Badge>
						</Tooltip>
					</div>
					<div style={{ flex: 1, overflow: "auto" }}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/search" element={<Search />} />
							<Route path="/favorites" element={<Favorites />} />
							<Route path="/recipe/:recipeID" element={<RecipeDetail />} />
							<Route path=":tagID" element={<RecipeTag />} />
						</Routes>
					</div>
				</Layout.Content>
			</Layout>
		</Container>
	);
};

export default App;
