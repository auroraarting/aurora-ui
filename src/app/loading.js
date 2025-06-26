import Loader from "@/components/Loader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/** Loading  */
export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	// return <Loader />;
	return (
		<div className="Skeleton">
			<Skeleton count={1} height={"100vh"} duration={0.8} />
		</div>
	);
}
