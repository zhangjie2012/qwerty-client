import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import Link from 'umi/link';
import styles from './Pure.less';

@connect(({ global, blog }) => ({
  global,
  blog,
}))
class PureBlogDetail extends Component {
  state = {
    slug: this.props.match.params.slug,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchSiteInfo',
    });

    const { slug } = this.state;
    dispatch({
      type: 'blog/fetchBlogDetail',
      payload: {
        slug,
      },
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'blog/clearBlogDetail',
    });
  }

  render() {
    const {
      blog: { articleDetail },
      global: { siteInfo },
    } = this.props;
    return (
      <Fragment>
        <div className={styles.content}>
          {articleDetail && (
            <Fragment>
              <h1 className={styles.pageHeader}>{articleDetail.title}</h1>

              <div className={styles.meta}>
                <span style={{ marginRight: 12 }}>
                  <Icon type="user" />{' '}
                  <Link to="/">
                    {siteInfo.username}
                    独酌逸醉
                  </Link>
                </span>
                <span>
                  <Icon type="calendar" /> {articleDetail.publishDT}
                </span>
              </div>

              {articleDetail.coverImg && (
                <div className={styles.coverImg}>
                  <img alt={articleDetail.coverImg} src={articleDetail.coverImg} />
                  <div className={styles.copyright}>{articleDetail.imgCopyRight}</div>
                </div>
              )}

              <div className={styles.markdownContent}>
                <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

export default PureBlogDetail;
