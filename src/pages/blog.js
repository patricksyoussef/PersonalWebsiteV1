import { graphql, Link } from "gatsby"
import React from "react"
import { Layout } from "../components/Layout"
import { Helmet } from "react-helmet"
import {IndexSection} from "../components/IndexSection"
import styled from "styled-components"
const _ = require("lodash")

const Container = styled.div`
  margin: 0 auto;
`
const TagCards = styled.div`
  padding: 0.5rem 1rem;
  display:flex;
  flex-wrap: wrap;
  margin: 0rem 0rem;
  margin-bottom: 1rem;
  border-left: solid 0.3rem;
  border-left-color: ${props => props.theme.colors.blue};
  background-color: ${props => props.theme.colors.bqbg};
  border-radius: 0.3rem;
`
const TagCard = styled.div`
  padding: 0.5rem;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  margin: 0.3rem 0;
  margin-right: 0.6rem;
  border-color: ${props => props.theme.colors.blue};
  transition: ${props => props.theme.anims.button};
  background-color: ${props => props.theme.colors.light1};
  &:hover {
      background-color: ${props => props.theme.colors.res_button};
    }
  font-family: ${props => props.theme.fonts.sub};
`
const Filters = styled.div`
  margin: 2rem 0rem;
  
  h1,h2 {
    font-family: ${props => props.theme.fonts.main};
  }
`

export default ({ data }) => {

  let tag_list = data.tags.group

  return (
    <Layout>
      <Helmet>
        <title>Blog | {data.site.siteMetadata.title}</title>
      </Helmet>
      <Container>
        <Filters>
          <h1>Filter Posts by Tag</h1>
          <TagCards>
            <Link to={"/blog/"}>
                <TagCard>All</TagCard>
            </Link>
            {tag_list.sort((a, b) => (b.totalCount - a.totalCount)).map(({ fieldValue }) => (
              <Link to={"/blog/tags/".concat(_.kebabCase(fieldValue))}>
                <TagCard>{fieldValue}</TagCard>
              </Link>
            ))}
          </TagCards>
        </Filters>
        <IndexSection
          data={data.blog}
          title={"All Posts"}
          linktext={""}
          path={"/blog/"}/>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query AllBlogPosts {
    blog: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          published: { eq: true }
        }
      }
    ) {
      nodes {
        frontmatter {
          slug
          title
          date(formatString: "YYYY MMMM Do")
          excerpt
          tags
        }
        fields {
          readingTime {
            text
          }
          path
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    tags: allMdx(filter: {frontmatter: {published: {eq: true}, templateKey: {eq: "blog-post"}}}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
