import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Spin } from 'antd';
import styles from './Microblog.less';

@connect(({ microblog, loading }) => ({
  microblog,
  loadingMicroblogs: loading.effects['microblog/fetchList'],
}))
class MicroblogList extends Component {
  state = {
    page: 1,
    perCount: 25,
  };

  componentDidMount() {
    const { page, perCount } = this.state;
    this.fetchMicroblogs(page, perCount);
  }

  fetchMicroblogs = (page, perCount) => {
    this.props.dispatch({
      type: 'microblog/fetchList',
      payload: {
        params: {
          page,
          per_count: perCount,
        },
      },
    });
  };

  prevPage = () => {
    const { perCount } = this.state;
    const { currentPage } = this.props.microblog;
    if (currentPage > 1) {
      this.fetchMicroblogs(currentPage - 1, perCount);
    }
  };

  nextPage = () => {
    const { perCount } = this.state;
    const { currentPage, totalPages } = this.props.microblog;
    if (currentPage < totalPages) {
      this.fetchMicroblogs(currentPage + 1, perCount);
    }
  };

  render() {
    const { microblogList, currentPage, totalPages } = this.props.microblog;
    const { loadingMicroblogs } = this.props;

    const Pagination = () => {
      if (totalPages > 1) {
        return (
          <Row className={styles.paginator}>
            <Col span={8}>
              {currentPage !== 1 && (
                <a onClick={this.prevPage}>
                  <Icon type="left-circle" /> prev
                </a>
              )}
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              {currentPage} of {totalPages}
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              {currentPage !== totalPages && (
                <a onClick={this.nextPage}>
                  next <Icon type="right-circle" />
                </a>
              )}
            </Col>
          </Row>
        );
      } else {
        return null;
      }
    };
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>MICRO.BLOG</div>
        <Spin spinning={loadingMicroblogs}>
          {microblogList.map(microblog => {
            return (
              <div key={microblog.id} className={styles.microblogRow}>
                <div className={styles.microblogMeta}>
                  <Icon type="calendar" /> {microblog.publishDT}
                </div>
                {microblog.cover_img && (
                  <div className={styles.microblogImg}>
                    <img alt="" src={microblog.cover_img} />
                  </div>
                )}
                <div className={styles.microblogContent}>
                  <div
                    className="markdownContent"
                    dangerouslySetInnerHTML={{ __html: microblog.content }}
                  />
                </div>
              </div>
            );
          })}
        </Spin>
        <Pagination />
      </div>
    );
  }
}

export default MicroblogList;
