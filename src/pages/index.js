import React, { useMemo } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Home from "../components/Home/Home";

const HomePage = ({ data }) => {
  const usableData = useMemo(() => {
    return data.allMarkdownRemark.edges.map(edge => {
      return {
        ...edge.node.frontmatter,
        slug: edge.node.fields.slug
      };
    });
  }, [data]);

  return (
    <Layout>
      <Home data={usableData} />
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            category
            email
            name
            telephone
            templateKey
            title
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
            links {
              label
              link
              type
            }
            location {
              address_components {
                long_name
                short_name
                types
              }
              geometry {
                location {
                  lat
                  lng
                }
                viewport {
                  northeast {
                    lat
                    lng
                  }
                  southwest {
                    lat
                    lng
                  }
                }
              }
              opening_hours {
                open_now
                periods {
                  close {
                    day
                    time
                  }
                  open {
                    day
                    time
                  }
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
