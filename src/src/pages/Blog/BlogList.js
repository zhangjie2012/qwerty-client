import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Row, Divider } from 'antd';
import Link from 'umi/link';

import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingBlogs: loading.effects['blog/fetchList'],
}))
class BlogList extends Component {
  state = {
    page: 1,
    perCount: 1000,
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
    const { articleList } = this.props.blog;
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>BLOGS</div>
        <Spin spinning={loadingBlogs}>
          <div className={styles.blogList}>
            {articleList.map(item => {
              return (
                <div key={item.slug} className={styles.blogRow}>
                  <div className={styles.blogTitle}>
                    <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                  </div>
                  {item.abstract && <div className={styles.blogAbstract}>{item.abstract}</div>}
                  <Row className={styles.blogMeta}>
                    {item.publish_dt}
                    <Divider type="vertical" />
                    <Link to={`/blogs/category#${item.category.slug}`}>{item.category.name}</Link>
                  </Row>
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    );
  }
}

export default BlogList;
