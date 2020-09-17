import { graphql, Link } from "gatsby"
import React from "react"
import { Layout } from "../components/Layout"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        {data.projects.nodes.map(({ frontmatter, fields }) => (
          <div>
            <Link to={fields.path}>
              <h2>{frontmatter.title}</h2>
            </Link>
            <p>{frontmatter.date}</p>
            <p>{fields.readingTime.text}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectListing($skip: Int!, $limit: Int!) {
    projects: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
      filter: {
        frontmatter: {
          templateKey: { eq: "project-post" }
          published: { eq: true }
        }
      }
    ) {
      nodes {
        frontmatter {
          slug
          title
          date(formatString: "YYYY MMMM Do")
        }
        fields {
          readingTime {
            text
          }
          path
        }
      }
    }
  }
`