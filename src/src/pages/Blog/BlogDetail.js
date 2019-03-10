import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Spin, Icon, Form, Input, Button, Row, Col, Modal, Tooltip } from 'antd';
import Link from 'umi/link';
import styles from './Blog.less';

const PostCommentForm = props => {
  const { form, postComment } = props;

  const submitForm = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        let { username, email, website, comment } = values; /* eslint-disable-line */
        if (typeof website === 'undefined') {
          website = '';
        }
        postComment(username, email, website, comment);
      }
    });
  };

  return (
    <Form onSubmit={submitForm} layout="vertical">
      <Form.Item className={styles.formRow}>
        {form.getFieldDecorator('username', {
          rules: [{ required: true }],
        })(<Input placeholder="姓名（必填）" />)}
      </Form.Item>
      <Form.Item className={styles.formRow}>
        {form.getFieldDecorator('email', {
          rules: [{ required: true }],
        })(<Input placeholder="邮箱（必填）" />)}
      </Form.Item>
      <Form.Item className={styles.formRow}>
        {form.getFieldDecorator('website', {})(<Input placeholder="网站（选填）" />)}
      </Form.Item>
      <Form.Item className={styles.formRow}>
        {form.getFieldDecorator('comment', {
          rules: [{ required: true }],
        })(
          <Input.TextArea
            autosize={{ minRows: 4 }}
            placeholder="评论（必填)，支持 Markdown 语法 "
          />
        )}
      </Form.Item>
      <Form.Item className={styles.formRow}>
        <Button type="default" size="small" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

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
      blog: { articleDetail, comments },
      loadingBlog,
    } = this.props;

    return (
      <Spin spinning={loadingBlog}>
        <div className={styles.content}>
          {articleDetail && (
            <div className={styles.article}>
              <div className={styles.title}>
                <Row gutter={8} type="flex" align="bottom">
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
                    评论数量：
                    {articleDetail.commentCount}
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
          <div className={styles.comment}>
            {comments.length !== 0 && <div className={styles.commentDivHeader}>评论列表</div>}
            {comments.length !== 0 && (
              <div>
                {comments.map(comment => {
                  return (
                    <div key={comment.publish_dt} className={styles.commentRow}>
                      <div className={styles.commentMeta}>
                        <div className={styles.avatar}>
                          <img alt={comment.username} src={comment.avatar} />
                        </div>
                        <div className={styles.userInfo}>
                          <div className={styles.commentUser}>
                            {comment.website.length !== 0 ? (
                              <a href={comment.website} target="_blank" rel="noopener noreferrer">
                                {comment.username}
                              </a>
                            ) : (
                              comment.username
                            )}
                          </div>
                          <div className={styles.commentDate}>{comment.publishDT}</div>
                        </div>
                      </div>
                      <div className={styles.commentContent}>
                        <div
                          className="markdownContent"
                          dangerouslySetInnerHTML={{ __html: comment.content }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {articleDetail && (
              <Fragment>
                <div className={styles.commentDivHeader}>添加评论</div>

                <div className={styles.postComment}>
                  <PostCommentForm form={this.props.form} postComment={this.postComment} />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Spin>
    );
  }
}

export default BlogDetail;
