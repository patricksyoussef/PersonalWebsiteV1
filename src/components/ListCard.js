import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  padding: 0.2rem 1rem;
`
const Post = styled.div`
  margin: 0.4rem ${props => props.theme.spacings.wall};
  transition: ${props => props.theme.anims.link};
  padding: 0.6rem;
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  border-radius: 0.4rem;

  &:hover {
    border-color: ${props => props.theme.colors.text_gray};
    box-shadow: ${props => props.theme.shadows.s1};
  }

  &:hover p {
    color: black;
  }

  p {
    transition: ${props => props.theme.anims.link};
    color: ${props => props.theme.colors.text_gray};
  }

  h2 {
    margin-bottom: 0.4rem;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

export const ListCard = ({ frontmatter, fields, excerpt }) => {
  return (
    <Container>
      <StyledLink to={fields.path}>
        <Post>
          <h2>{frontmatter.title}</h2>
          <p>
            {frontmatter.date} - {fields.readingTime.text}
          </p>
        </Post>
      </StyledLink>
    </Container>
  )
}
