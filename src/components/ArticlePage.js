import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ArticleContent from './ArticleContent';
import ArticleMetadata from './ArticleMetadata';
import ArticleTag from './ArticleTag';
import AuthorMetadata from './AuthorMetadata';
import SocialMedia from './SocialMedia';

const ArticlePage = ({ article: { data }, loading, error }) => {
  if (error) {
    return (<Redirect to="/notFound" />);
  }
  const image = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.exec(data.body) || [data.bannerImage];
  const imageUrl = image[0];
  window.prerenderReady = true;
  return (data ? (
    <div className="article-page">
      <Helmet>
        <title>Turbo Todo</title>
        <meta property="og:url" content={window.location.toString()} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.plainText.replace(/^"([\w\W]+)"$/, '$1').replace(/\\n/g, '').slice(0, 200).concat('...')} />
        <meta property="og:image" content={imageUrl} />
      </Helmet>
      <ArticleMetadata data={data} />
      <ArticleContent className="article-body" body={data.body} />
      <div className="tags">
        <ArticleTag tagList={data.tagList} />
      </div>
      <div className="ui grid">
        <div className="four column row bio-ratings">
          <AuthorMetadata user={data.user} className="left floated column" />
          <SocialMedia
            data={data}
            title={data.title}
          />
        </div>
      </div>
    </div>
  ) : <div />);
};

ArticlePage.propTypes = {
  article: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

ArticlePage.defaultProps = {
  loading: true,
  error: false
};

export default ArticlePage;
