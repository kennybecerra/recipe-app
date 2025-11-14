import { Card, Skeleton } from "antd";
import classes from "./index.module.scss";

const RecipeCardSkeleton = () => {
	return (
		<Card
			hoverable={false}
			style={{ width: 250 }}
			rootClassName={classes.card}
			styles={{
				body: {
					padding: 15,
				},
			}}
		>
			<Skeleton.Image
				style={{
					width: "100%",
					height: "100%",
				}}
			/>
			<div style={{ marginTop: 15 }}>
				<Skeleton paragraph={{ rows: 2 }} title={{ width: "80%" }} />
			</div>
		</Card>
	);
};

export default RecipeCardSkeleton;
