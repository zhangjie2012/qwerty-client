import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { zenburn } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { connect } from 'dva';
import styles from './Snippet.less';

@connect(({ snippet }) => ({
  snippet,
}))
class SnippetDetail extends Component {
  state = {
    id: this.props.match.params.id,
  };

  componentDidMount() {
    const { id } = this.state;
    this.props.dispatch({
      type: 'snippet/fetchSnippetDetail',
      id,
    });
  }

  render() {
    const { snippetDetail } = this.props.snippet;
    if (snippetDetail == null) {
      return null;
    }

    return (
      <div className={styles.content}>
        <div className={styles.detail}>
          <div className={styles.title}>
            <h1>{snippetDetail.title}</h1>
          </div>
          <div className={styles.desc}>
            {snippetDetail.desc !== '' && (
              <div
                className="markdownContent"
                dangerouslySetInnerHTML={{ __html: snippetDetail.desc }}
              />
            )}
          </div>
          <div className={styles.code}>
            <SyntaxHighlighter language={snippetDetail.pl_tag} style={zenburn}>
              {snippetDetail.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}

export default SnippetDetail;
