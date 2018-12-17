import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Link from 'umi/link';

import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingArchive: loading.effects['blog/fetchArchive'],
}))
class BlogArchive extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'blog/fetchArchive',
    });
  }

  render() {
    const {
      blog: { archive },
      loadingArchive,
    } = this.props;
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>BLOG ARCHIVE</div>
        <Spin spinning={loadingArchive}>
          <div className={styles.archive}>
            {archive.map(item => {
              return (
                <div key={item.year} className={styles.archiveRow}>
                  <h2>{item.year}</h2>
                  <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                    {item.articles.map(article => {
                      return (
                        <li key={article.slug}>
                          {article.publishDT}：
                          <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    );
  }
}

export default BlogArchive;
