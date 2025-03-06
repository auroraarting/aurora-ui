// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import ProductListingWrapper from "@/sections/products/ProductListingWrapper";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/Products.module.scss";

// IMAGES //

// DATA //

/** Products Page */
export default function Products() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Products"} Desc={""} OgImg={""} Url={"/products"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ProductsPage}>
				<ProductListingWrapper />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
