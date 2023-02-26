import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../layout';
import Seo from '../components/SEO';
import config from '../../data/SiteConfig';


export default class PageTemplate extends Component {
  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.mdx;
    const page = postNode.frontmatter;

    if (!page.id) {
      page.id = slug;
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${page.title} – ${config.siteTitle}`}</title>
        </Helmet>
        <Seo postPath={slug} postNode={postNode} postSEO />
        <div className="container">
          <article>
            <header className="page-header">
             <script defer data-domain="sharektech.com" src="http://158.101.15.145/js/script.js"></script>
              <h1>{page.title}</h1>
            </header>
            <MDXRenderer>{postNode.body}</MDXRenderer>
          </article>
         
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      excerpt
      frontmatter {
        title
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
