import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Icon, Form, Row, Col, Modal, Tooltip } from 'antd';
import Link from 'umi/link';
import styles from './Blog.less';

@connect(({ blog, loading }) => ({
  blog,
  loadingBlog: loading.effects['blog/fetchBlogDetail'],
}))
@Form.create()
class BlogDetail extends Component {
  state = {
    slug: this.props.match.params.slug,
    metaVisible: false,
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

  componentWillUnmount() {
    this.props.dispatch({
      type: 'blog/clearBlogDetail',
    });
  }

  postComment = (username, email, website, comment) => {
    const { slug } = this.state;
    this.props.dispatch({
      type: 'blog/addComment',
      payload: {
        params: {
          slug,
          email,
          username,
          website,
          comment,
        },
      },
    });

    this.props.form.resetFields();
  };

  showMeta = flag => {
    this.setState({
      metaVisible: !!flag,
    });
  };

  render() {
    const { slug, metaVisible } = this.state;
    const {
      blog: { articleDetail },
      loadingBlog,
    } = this.props;

    return (
      <Spin spinning={loadingBlog}>
        <div className={styles.content}>
          {articleDetail && (
            <div className={styles.article}>
              <div className={styles.title}>
                <Row gutter={8} type="flex" align="middle">
                  <Col span={20}>
                    <h1>{articleDetail.title}</h1>
                  </Col>
                  <Col span={4} style={{ textAlign: 'right' }}>
                    <Link to={`/pure/blog/${slug}`} style={{ marginRight: 6 }}>
                      <Tooltip title="纯享版本">
                        <Icon type="block" />
                      </Tooltip>
                    </Link>
                    <a onClick={this.showMeta}>
                      <Tooltip title="更多信息">
                        <Icon type="info-circle" />
                      </Tooltip>
                    </a>
                  </Col>
                </Row>
              </div>

              <Modal
                title={articleDetail.title}
                onCancel={() => this.showMeta(false)}
                visible={metaVisible}
                footer={null}
              >
                <ul className={styles.blogMeta}>
                  <li>
                    文章分类：
                    <Link to={`/blogs/category#${articleDetail.category.slug}`}>
                      {articleDetail.category.name}
                    </Link>
                  </li>
                  <li>
                    发布时间：
                    {articleDetail.publishDT}
                  </li>
                  <li>
                    更新时间：
                    {articleDetail.updateDT}
                  </li>
                  <li>
                    PageView：
                    {articleDetail.pageViewCount}
                  </li>
                </ul>
              </Modal>

              {articleDetail.coverImg && (
                <div className={styles.coverImg}>
                  <img alt={articleDetail.coverImg} src={articleDetail.coverImg} />
                  <div className={styles.copyright}>{articleDetail.imgCopyRight}</div>
                </div>
              )}

              <div className="markdownContent">
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
