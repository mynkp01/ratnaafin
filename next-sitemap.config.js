/** @type {import('next-sitemap').IConfig} */

module.exports = {
  generateRobotsTxt: true,
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  outDir: "public",
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [`/admin/`, `/api/`, `/search`, `/thank-you`],
      },
    ],
  },
  exclude: [`*/admin/*`, `*/api/*`, `*/search`, "*/thank-you"],
  // Default priority and changefreq for static pages
  priority: 0.8,
  changefreq: "monthly",
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => {
    try {
      const productPaths = [
        "/business-loan/overview",
        "/business-loan/interest-rates",
        "/business-loan/eligibility-document",
        "/business-loan/how-to-apply",
        "/business-loan/emi-calculator",
        "/machinery-loan/overview",
        "/machinery-loan/interest-rates",
        "/machinery-loan/eligibility-document",
        "/machinery-loan/how-to-apply",
        "/machinery-loan/emi-calculator",
      ];

      const productFields = productPaths.map((path) => ({
        loc: path,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.8,
      }));

      let blogFields = [];
      try {
        const getAllPosts = async (page = 1, allPosts = []) => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}/api/v1/blog-lookup?limit=100&page=${page}`, {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const { data } = await res.json();

          const posts = data?.docs;
          // If no posts returned, we've reached the end
          if (posts.length === 0) {
            return allPosts;
          }

          const updatedPosts = [...allPosts, ...posts];

          // If we got less than 100 posts, we're on the last page
          if (posts.length < 100) {
            return updatedPosts;
          }

          // Otherwise, fetch the next page
          return getAllPosts(page + 1, updatedPosts);
        };

        const allBlogs = await getAllPosts();

        let links = [];
        links = allBlogs.map((blog) => `blogs/${blog.Url}`);

        links = links.flat().filter(Boolean);
        console.log(`Found ${links.length} blog posts for sitemap`);

        blogFields = links.map((link) => ({
          loc: `/${link}`,
          lastmod: new Date().toISOString(),
          changefreq: "never",
          priority: 0.6,
        }));
      } catch (error) {
        console.log(`error from site map additionalPaths blogs : ${error}`);
        // Continue without blogs if error
      }

      return [...blogFields, ...productFields];
    } catch (error) {
      console.log(`error from site map additionalPaths : ${error}`);
      return [];
    }
  },
};
