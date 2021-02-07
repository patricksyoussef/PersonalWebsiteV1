// Imports ListCard.js and iterated through the nodes that are passed into
// here. This creates the list of blog posts on the home page and on the 
// "All Posts" page.

import { Link } from "gatsby"
import React from "react"
import { Underline } from "./Underline"
import styled from "styled-components"
import { ListCard } from "./ListCard"

const Container = styled.div`
`

const TopContent = styled.span`
  * {
    margin: 0.2rem 0;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Content = styled.div`
margin: 0rem ${props => props.theme.spacings.wall};
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const LinkText = styled.h3`
  color: ${props => props.theme.colors.text_gray};
  transition: ${props => props.theme.anims.link};

  &:hover {
    color: ${props => props.theme.colors.text_dark};
  }
`

export const IndexSection = ({ data, title, path, linktext }) => (
  <Container>
    <div>
      <Underline>
        <TopContent>
          <h1>{title}</h1>
          <Link to={path}>
            <LinkText>{linktext}</LinkText>
          </Link>
        </TopContent>
      </Underline>
    </div>
    <Content>
      {data.nodes.map(({ frontmatter, fields, excerpt }) => (
        <ListCard
          frontmatter={frontmatter}
          fields={fields}
          excerpt={excerpt}
        ></ListCard>
      ))}
    </Content>
  </Container>
)
