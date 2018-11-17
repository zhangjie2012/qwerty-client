import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Spin, Icon, Form, Input, Button } from 'antd';
import Link from 'umi/link';
import styles from './Blog.less';

const PostCommentForm = props => {
  const { form, postComment } = props;

  const submitForm = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        let { username, website, comment } = values; /* eslint-disable-line */
        if (typeof website === 'undefined') {
          website = '';
        }
        postComment(username, website, comment);
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

    this.props.dispatch({
      type: 'blog/fetchBlogComments',
      payload: {
        slug,
      },
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'blog/clearBlogDetail',
    });
  }

  postComment = (username, website, comment) => {
    const { slug } = this.state;
    this.props.dispatch({
      type: 'blog/addComment',
      payload: {
        params: {
          slug,
          username,
          website,
          comment,
        },
      },
    });

    this.props.form.resetFields();
  };

  render() {
    const {
      blog: { articleDetail, comments },
      loadingBlog,
    } = this.props;

    return (
      <Spin spinning={loadingBlog}>
        <div className={styles.content}>
          {articleDetail && (
            <div className={styles.article}>
              <h1 className={styles.title}>{articleDetail.title}</h1>

              {articleDetail.coverImg && (
                <div className={styles.coverImg}>
                  <img alt={articleDetail.coverImg} src={articleDetail.coverImg} />
                  <div className={styles.copyright}>{articleDetail.imgCopyRight}</div>
                </div>
              )}

              <div className="markdownContent">
                <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
              </div>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Icon type="calendar" /> {articleDetail.publishDT}
                </span>
                <span className={styles.metaItem}>
                  <Icon type="folder" />{' '}
                  <Link to={`/blogs/category#${articleDetail.category.slug}`}>
                    {articleDetail.category.name}
                  </Link>
                </span>
                {articleDetail.commentCount !== 0 && (
                  <span className={styles.metaItem}>
                    <Icon type="message" /> {articleDetail.commentCount}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className={styles.comment}>
            {comments.length !== 0 && <div className={styles.commentDivHeader}>评论列表</div>}
            {comments.length !== 0 &&
              comments.map(comment => {
                return (
                  <div key={comment.publish_dt} className={styles.commentRow}>
                    <div className={styles.commentMeta}>
                      {comment.website.length !== 0 ? (
                        <a href={comment.website} target="_blank" rel="noopener noreferrer">
                          {comment.username}
                        </a>
                      ) : (
                        comment.username
                      )}
                      <span className={styles.commentDate}>（{comment.publishDT}）</span>
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
