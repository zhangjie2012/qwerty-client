import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Tag } from 'antd';
import Link from 'umi/link';
import styles from './Snippet.less';

@connect(({ snippet, loading }) => ({
  snippet,
  loadingSnippets: loading.effects['snippet/fetchSnippets'],
}))
class Snippets extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'snippet/fetchSnippets',
    });
  }

  render() {
    const { snippets } = this.props.snippet;
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>CODE SNIPPETS</div>
        <div className={styles.filter}>TODO: 按照编程语言筛选、关键字搜索</div>
        <div className={styles.snippetList}>
          {snippets.map(item => {
            return (
              <Row className={styles.snippetItem} key={item.id} type="flex" align="middle">
                <Col xs={20} className={styles.snippetTitle}>
                  <Link to={`/snippet/${item.id}`}>{item.title}</Link>
                </Col>
                <Col xs={4} style={{ textAlign: 'right' }}>
                  <Tag className={styles.snippetTag}>{item.pl_tag}</Tag>
                </Col>
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Snippets;
