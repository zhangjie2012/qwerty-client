import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Link from 'umi/link';

import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingBlogs: loading.effects['blog/fetchList'],
}))
class BlogList extends Component {
  state = {
    page: 1,
    perCount: 6,
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
        <Spin spinning={loadingBlogs}>
          <div className={styles.blogList}>
            {articleList.map(item => {
              return (
                <div key={item.slug} className={styles.blogRow}>
                  <div className={styles.blogMeta}>{item.publish_dt}</div>
                  <div className={styles.blogTitle}>
                    <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                  </div>
                  {item.abstract && <div className={styles.blogAbstract}>{item.abstract}</div>}
                </div>
              );
            })}
          </div>
          <div className={styles.more}>
            更多文章，见 <Link to="/blogs/archive">列表</Link> &&{' '}
            <Link to="/blogs/category">分类</Link>。
          </div>
        </Spin>
      </div>
    );
  }
}

export default BlogList;
