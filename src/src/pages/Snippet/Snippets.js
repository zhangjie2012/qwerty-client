import React, { Component } from 'react';
import { connect } from 'dva';
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
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>CODE SNIPPETS</div>
      </div>
    );
  }
}

export default Snippets;
