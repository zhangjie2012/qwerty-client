import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Icon } from 'antd';
import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingBlog: loading.effects['blog/fetchBlogDetail'],
}))
class BlogDetail extends Component {
  state = {
    slug: this.props.match.params.slug,
  };

  componentDidMount() {
    const { slug } = this.state;
    this.props.dispatch({
      type: 'blog/fetchBlogDetail',
      payload: {
        params: {
          slug,
        },
      },
    });
  }

  render() {
    const {
      blog: { articleDetail },
      loadingBlog,
    } = this.props;

    return (
      <Spin spinning={loadingBlog}>
        <div className={styles.content}>
          {articleDetail && (
            <div className={styles.article}>
              <h1 className={styles.title}>{articleDetail.title}</h1>

              {articleDetail.coverImg && (
                <div className={styles.coverImg}>
                  <img alt={articleDetail.coverImg} src={articleDetail.coverImg} />
                  <div className={styles.copyright}>{articleDetail.imgCopyRight}</div>
                </div>
              )}

              <div className={styles.contentX}>
                <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
              </div>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Icon type="calendar" /> {articleDetail.publishDT}
                </span>
                <span className={styles.metaItem}>
                  <Icon type="folder" /> {articleDetail.category.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </Spin>
    );
  }
}

export default BlogDetail;
