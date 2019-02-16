import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Icon, Spin, Tooltip } from 'antd';
import styles from './Topic.less';

@connect(({ topic, loading }) => ({
  topic,
  loadingTopics: loading.effects['topic/fetchTopics'],
}))
class Topics extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'topic/fetchTopics',
    });
  }

  render() {
    const {
      topic: { topicList, pinTopicList },
      loadingTopics,
    } = this.props;

    const TopicList = () => {
      return (
        <Fragment>
          <Row className={styles.pinTopicList} gutter={12}>
            {pinTopicList.map(item => {
              return (
                <Col span={8} key={item.id}>
                  <div className={styles.pinTopic}>
                    <div className={styles.topicTitle}>
                      <Link to={`/topic/${item.id}`}>{item.title}</Link>
                    </div>
                    <Row className={styles.topicAux}>
                      <Col span={12}>
                        {item.archive ? (
                          <span>
                            <Icon type="issues-close" className={styles.topicClose} /> CLOSED
                          </span>
                        ) : (
                          <span>
                            <Icon type="clock-circle" className={styles.topicOpen} /> UPDATING
                          </span>
                        )}
                      </Col>
                      <Col span={12}>
                        <Icon type="message" /> {item.comment_count}
                      </Col>
                    </Row>
                  </div>
                </Col>
              );
            })}
          </Row>
          <div className={styles.topicList}>
            {topicList.map(item => {
              return (
                <Row key={item.id} className={styles.commentRow}>
                  <Col span={1}>
                    {item.archive ? (
                      <Tooltip title="已完结">
                        <Icon type="issues-close" className={styles.topicClose} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="更新中">
                        <Icon type="clock-circle" className={styles.topicOpen} />
                      </Tooltip>
                    )}
                  </Col>
                  <Col span={21}>
                    <div className={styles.topicTitle}>
                      <Link to={`/topic/${item.id}`}>{item.title}</Link>
                    </div>
                  </Col>
                  <Col span={2} className={styles.commentCount}>
                    <Icon type="message" /> {item.comment_count}
                  </Col>
                </Row>
              );
            })}
          </div>
        </Fragment>
      );
    };

    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>TOPICS</div>
        <Spin spinning={loadingTopics}>
          <TopicList />
        </Spin>
      </div>
    );
  }
}

export default Topics;
