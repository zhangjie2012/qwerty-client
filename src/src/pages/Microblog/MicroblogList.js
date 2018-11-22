import React, { Component } from 'react';
import { connect } from 'dva';
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

    this.props.dispatch({
      type: 'microblog/fetchList',
      payload: {
        params: {
          page,
          per_count: perCount,
        },
      },
    });
  }

  render() {
    const { microblogList } = this.props.microblog;

    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>MICRO.BLOG</div>
        {microblogList.map(microblog => {
          return (
            <div className={styles.microblogRow}>
              <div className={styles.microblogMeta}>{microblog.publishDT}</div>
              {microblog.cover_img && (
                <div className={styles.microblogImg}>
                  <img alt="" src={microblog.cover_img} />
                </div>
              )}
              <div className={styles.microblogContent}>{microblog.content}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MicroblogList;
