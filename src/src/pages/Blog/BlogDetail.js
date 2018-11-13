import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
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
            <div className={styles.articleDetail}>
              <div className={styles.articleTitle}>{articleDetail.title}</div>
              <div className={styles.articleMeta}>
                发布于 {articleDetail.publishDT}
                ，更新于 {articleDetail.updateDT}
                ，分类：
                {articleDetail.category.name}
              </div>
              {articleDetail.coverImg && (
                <div className={styles.coverImg}>
                  <img alt={articleDetail.coverImg} src={articleDetail.coverImg} />
                  <div className={styles.copyright}>{articleDetail.imgCopyRight}</div>
                </div>
              )}
              <div className={styles.articleContent}>
                <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
              </div>
            </div>
          )}
        </div>
      </Spin>
    );
  }
}

export default BlogDetail;
