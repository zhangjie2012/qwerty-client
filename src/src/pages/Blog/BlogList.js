import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Pagination } from 'antd';
import Link from 'umi/link';

import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingBlogs: loading.effects['blog/fetchList'],
}))
class BlogList extends Component {
  state = {
    page: 1,
    perCount: 10,
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

  changePages = (page, pageSize) => {
    this.setState({
      page,
    });

    this.props.dispatch({
      type: 'blog/fetchList',
      payload: {
        params: {
          page,
          per_count: pageSize,
        },
      },
    });
  };

  render() {
    const { loadingBlogs } = this.props;
    const { currentPage, totalPages, articleList } = this.props.blog;
    const { perCount } = this.state;
    return (
      <div className={styles.content}>
        <Spin spinning={loadingBlogs}>
          <div className={styles.blogList}>
            {articleList.map(item => {
              return (
                <div key={item.slug} className={styles.blogRow}>
                  <div className={styles.blogTitle}>
                    <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                  </div>
                  <div className={styles.blogMeta}>
                    {item.publish_dt} | <Link to={item.category.slug}>{item.category.name}</Link>
                  </div>
                  <div className={styles.blogAbstract}>{item.abstract}</div>
                </div>
              );
            })}
          </div>
          <div className={styles.pagination}>
            <Pagination
              simple
              hideOnSinglePage
              current={currentPage}
              pageSize={perCount}
              total={perCount * totalPages}
              onChange={this.changePages}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

export default BlogList;
