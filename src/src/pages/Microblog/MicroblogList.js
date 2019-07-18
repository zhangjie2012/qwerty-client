import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Pagination } from 'antd';
import styles from './Microblog.less';

@connect(({ microblog, loading }) => ({
  microblog,
  loadingMicroblogs: loading.effects['microblog/fetchList'],
}))
class MicroblogList extends Component {
  state = {
    perCount: 25,
  };

  componentDidMount() {
    const { perCount } = this.state;
    this.fetchMicroblogs(1, perCount);
  }

  changePage = page => {
    const { perCount } = this.state;
    this.fetchMicroblogs(page, perCount);
  };

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

  render() {
    const { avatar, microblogList, currentPage, totalCount } = this.props.microblog;
    const { loadingMicroblogs } = this.props;
    const { perCount } = this.state;
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>MICRO.BLOG</div>
        <Spin spinning={loadingMicroblogs}>
          {microblogList.map(microblog => {
            return (
              <div key={microblog.id} className={styles.microblogRow}>
                <div className={styles.avatar}>
                  <img alt={avatar} src={avatar} />
                </div>
                <div className={styles.microblog}>
                  <div className={styles.meta}>{microblog.publishDT}</div>
                  {microblog.cover_img && (
                    <div className={styles.coverImg}>
                      <img alt={microblog.cover_img} src={microblog.cover_img} />
                    </div>
                  )}
                  <div className={styles.microContent}>
                    <div
                      className="markdownContent"
                      dangerouslySetInnerHTML={{ __html: microblog.content }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Spin>

        <Pagination
          className={styles.paginator}
          current={currentPage}
          pageSize={perCount}
          total={totalCount}
          hideOnSinglePage
          onChange={this.changePage}
          size="small"
        />
      </div>
    );
  }
}

export default MicroblogList;
