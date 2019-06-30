import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Row, Col } from 'antd';
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
                  <Row className={styles.blogMeta}>
                    <Col span={12}>
                      #{' '}
                      <Link to={`/blogs/category#${item.category.slug}`}>{item.category.name}</Link>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      {item.publish_dt}
                    </Col>
                  </Row>
                  {item.abstract && <div className={styles.blogAbstract}>{item.abstract}</div>}
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
