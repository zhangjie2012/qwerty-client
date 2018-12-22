import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Icon, Spin, Tooltip, Tag } from 'antd';
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
      topic: { topicList },
      loadingTopics,
    } = this.props;

    const TopicList = () => {
      return (
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
                    {item.tags.map(tag => {
                      return (
                        <Tag className={styles.topicTag} key={tag.slug} color={tag.color}>
                          {tag.name}
                        </Tag>
                      );
                    })}
                  </div>
                </Col>
                <Col span={2} className={styles.commentCount}>
                  {!item.archive &&
                    item.pin && <Icon type="pushpin" theme="twoTone" className={styles.topicPin} />}
                  <Icon type="message" /> {item.comment_count}
                </Col>
              </Row>
            );
          })}
        </div>
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
