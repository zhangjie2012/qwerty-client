import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Link from 'umi/link';
import { goToAnchor } from 'react-scrollable-anchor';
import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingCategory: loading.effects['blog/fetchCategory'],
}))
class BlogCategory extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'blog/fetchCategory',
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.blog.categories !== prevProps.blog.categories) {
      let { hash } = this.props.location;
      hash = hash.slice(1);
      if (hash.length !== 0) {
        goToAnchor(hash);
      }
    }
  }

  render() {
    const {
      blog: { categories },
      loadingCategory,
    } = this.props;
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>BLOG CATEGORIES</div>
        <Spin spinning={loadingCategory}>
          <div className={styles.archive}>
            {categories.map(item => {
              return (
                <div key={item.category.slug} className={styles.archiveRow}>
                  <h2 id={item.category.slug}>{item.category.name}</h2>
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

export default BlogCategory;
