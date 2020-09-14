const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      blogs: allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: {
          frontmatter: {
            published: { eq: true }
            templateKey: { eq: "blog-post" }
          }
        }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      projects: allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: {
          frontmatter: {
            published: { eq: true }
            templateKey: { eq: "project" }
          }
        }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  // Split result to use in for loop
  const tmp = _.toPairs(result.data)

  // Resolve templates
  blog_post = path.resolve("./src/templates/blog-post.js")
  blog_list = path.resolve("./src/templates/blog-list.js")

  tmp.forEach(([key, arr]) => {
    // Creates Single pages
    arr.nodes.forEach(post => {
      createPage({
        path: post.frontmatter.slug,
        component: key === "blogs" ? blog_post : "",
        context: {
          slug: post.frontmatter.slug,
        },
      })
    })

    _.chunk(arr.nodes, 2).forEach((posts, i) => {
      createPage({
        path: i === 0 ? `/blog/` : `/blog/page${i + 1}/`,
        component: key === "blogs" ? blog_list : "",
        context: {
          slugs: posts.map(post => post.frontmatter.slug),
        },
      })
    })
  })
}
