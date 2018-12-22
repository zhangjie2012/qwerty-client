import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Icon, Spin, Tooltip, Modal } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { goToAnchor } from 'react-scrollable-anchor';
import styles from './Topic.less';

@connect(({ topic, loading }) => ({
  topic,
  loadingComments: loading.effects['topic/fetchComments'],
}))
class Comments extends Component {
  state = {
    id: this.props.match.params.id,
    metaVisible: false,
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

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      let { hash } = this.props.location;
      hash = hash.slice(1);
      if (hash.length !== 0) {
        goToAnchor(hash);
      }
    }
  }

  showMeta = flag => {
    this.setState({
      metaVisible: !!flag,
    });
  };

  render() {
    const { metaVisible } = this.state;
    const {
      topic: { currentTopic, commentList },
      loadingComments,
    } = this.props;

    if (!currentTopic) {
      return null;
    }

    return (
      <div className={styles.content}>
        <Spin spinning={loadingComments}>
          <div className={styles.comment}>
            <div className={styles.title}>
              <Row type="flex" align="middle">
                <Col span={22}>
                  <h1>{currentTopic.title}</h1>
                </Col>
                <Col span={2} className={styles.meta} style={{ textAlign: 'right' }}>
                  {currentTopic.archive ? (
                    <Tooltip title="已完结">
                      <Icon type="issues-close" className={styles.topicClose} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="更新中">
                      <Icon type="clock-circle" className={styles.topicOpen} />
                    </Tooltip>
                  )}
                  <Tooltip title="更多信息">
                    <a onClick={this.showMeta} style={{ marginLeft: 6 }}>
                      <Icon type="info-circle" />
                    </a>
                  </Tooltip>
                </Col>
              </Row>
            </div>

            <Modal
              title={currentTopic.title}
              onCancel={() => this.showMeta(false)}
              visible={metaVisible}
              footer={null}
            >
              <ul className={styles.commentMeta}>
                {currentTopic.tags.length !== 0 && (
                  <li>
                    主题标签：
                    {currentTopic.tags.map(tag => (
                      <span key={tag.name} style={{ marginRight: 6 }}>
                        {tag.name}
                      </span>
                    ))}
                  </li>
                )}
                <li>
                  跟踪次数：
                  {commentList.length}
                </li>
                <li>
                  创建时间：
                  {currentTopic.createDT}
                </li>
                <li>
                  更新时间：
                  {currentTopic.updateDT}
                </li>
              </ul>
            </Modal>

            <div className={styles.commentList}>
              {commentList.map(comment => {
                return (
                  <Fragment key={comment.id}>
                    <div className={styles.commentBlock} id={comment.id}>
                      <div className={styles.commentMeta}>
                        <Row>
                          <Col span={20}>{comment.createDT}</Col>
                          <Col span={4} style={{ textAlign: 'right' }}>
                            <CopyToClipboard text={`${window.location.href}`}>
                              <a href={`#${comment.id}`}>#{comment.id}</a>
                            </CopyToClipboard>
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
