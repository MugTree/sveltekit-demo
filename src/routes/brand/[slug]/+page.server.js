import { getProductData } from "../../../lib/repo.js";

export async function load({ params }) {
  const { slug } = params;

  const products = await getProductData();
  const product = products.find((a) => a.slug === slug);
  const component = await import(`../../../../data/products/${slug}.md`);

  if (product === undefined) {
    throw error(404, "Article not found");
  }

  return {};
}
