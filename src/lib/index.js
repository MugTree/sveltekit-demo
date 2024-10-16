import { parse } from "node-html-parser";

export const getProductData = async () => {
  const markdown = import.meta.glob("../../data/products/**/*.md");
  const iterables = Object.entries(markdown);

  let products = await Promise.all(
    iterables.map(async ([path, product]) => {
      const a = await product();

      console.log("a :>> ", a.metadata);

      const html = parse(a.default.render().html);

      const prodctSlug = path
        .replace(/(\/index)?\.md/, "")
        .split("/")
        .pop();
      return {
        meta: a.metadata,
        slug: prodctSlug,
        url: "/product/" + prodctSlug,
        html: html,
      };
    })
  );

  console.log("products :>> ", products);

  return products;
};

export const getBlogData = async () => {
  const markdown = import.meta.glob("../../data/posts/**/*.md");
  const iterables = Object.entries(markdown);

  let posts = await Promise.all(
    iterables.map(async ([path, post]) => {
      const a = await post();

      console.log("a :>> ", a.metadata);

      const html = parse(a.default.render().html);

      const postSlug = path
        .replace(/(\/index)?\.md/, "")
        .split("/")
        .pop();

      return {
        meta: a.metadata,
        slug: postSlug,
        url: "/blog/" + postSlug,
        html: html,
      };
    })
  );

  console.log("posts :>> ", posts);

  return posts;
};
