import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingBlogs: loading.effects['blog/fetchList'],
}))
class BlogList extends Component {
  state = {
    page: 1,
    perCount: 20,
  };

  componentDidMount() {
    const { page, perCount } = this.state;
    this.props.dispatch({
      type: 'blog/fetchList',
      payload: {
        params: {
          page,
          per_count: perCount,
        },
      },
    });
  }

  render() {
    const { currentPage, totalPages, articleList } = this.props.blog; /* eslint-disable-line */

    return (
      <div className={styles.content}>
        {articleList.map(item => {
          return (
            <div key={item.slug} className={styles.blogRow}>
              <div className={styles.blogTitle}>
                <Link to={item.slug}>{item.title}</Link>
              </div>
              <div className={styles.blogMeta}>
                {item.publish_dt}, <Link to={item.category.slug}>{item.category.name}</Link>
              </div>

              <div className={styles.blogAbstract}>{item.abstract}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default BlogList;
