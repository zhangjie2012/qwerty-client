import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Icon, Spin, Tooltip } from 'antd';
import styles from './Topic.less';

@connect(({ topic, loading }) => ({
  topic,
  loadingComments: loading.effects['topic/fetchComments'],
}))
class Comments extends Component {
  state = {
    id: this.props.match.params.id,
  };

  componentDidMount() {
    const { id } = this.state;
    this.props.dispatch({
      type: 'topic/fetchComments',
      payload: {
        params: {
          id,
        },
      },
    });
  }

  render() {
    const {
      topic: { currentTopic, commentList },
      loadingComments,
    } = this.props;
    return (
      <div className={styles.content}>
        <Spin spinning={loadingComments}>
          <div className={styles.comment}>
            <div className={styles.title}>
              {currentTopic && (
                <Fragment>
                  <h1>
                    {currentTopic.title}
                    <span className={styles.bash}>#{currentTopic.id}</span>
                  </h1>

                  <Row className={styles.meta}>
                    <Col span={20}>
                      创建于 {currentTopic.createDT}
                      ，更新于 {currentTopic.updateDT}
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                      {currentTopic.archive ? (
                        <Tooltip title="已完结">
                          <Icon type="issues-close" className={styles.topicClose} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="更新中">
                          <Icon type="exclamation-circle" className={styles.topicOpen} />
                        </Tooltip>
                      )}
                    </Col>
                  </Row>
                </Fragment>
              )}
            </div>
            <div className={styles.commentList}>
              {commentList.map(comment => {
                return (
                  <Fragment key={comment.id}>
                    <div className={styles.commentBlock}>
                      <div className={styles.commentMeta}>
                        <Row>
                          <Col span={20}>创建于 {comment.createDT}</Col>
                          <Col span={4} style={{ textAlign: 'right' }}>
                            #{comment.id}
                          </Col>
                        </Row>
                      </div>
                      <div className={styles.commentContent}>
                        <div
                          className="markdownContent"
                          dangerouslySetInnerHTML={{ __html: comment.content }}
                        />
                      </div>
                    </div>
                    {comment.article !== null && (
                      <div className={styles.commentRel}>
                        <Icon type="share-alt" className={styles.commentAltIcon} />
                        {comment.article.createDT} 创建文章{' '}
                        <Link to={`/blog/${comment.article.slug}`}>{comment.article.title}</Link>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Comments;
