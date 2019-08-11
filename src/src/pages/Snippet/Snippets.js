import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Tag, Spin } from 'antd';
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
    const { loadingSnippets, snippet } = this.props;
    const { snippets } = snippet;
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>CODE SNIPPETS</div>
        <Spin spinning={loadingSnippets}>
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
        </Spin>
      </div>
    );
  }
}
export default Snippets;
