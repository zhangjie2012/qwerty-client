import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Row, Col, Switch, message } from 'antd';
import { zenburn } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { connect } from 'dva';
import styles from './Snippet.less';

@connect(({ snippet }) => ({
  snippet,
}))
class SnippetDetail extends Component {
  state = {
    id: this.props.match.params.id,
    showLineNum: false,
  };

  componentDidMount() {
    const { id } = this.state;
    this.props.dispatch({
      type: 'snippet/fetchSnippetDetail',
      id,
    });
  }

  changeShowLineNum = flag => {
    this.setState({
      showLineNum: flag,
    });
  };

  render() {
    const { showLineNum } = this.state;
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
          <Row className={styles.ctrl} type="flex" align="middle">
            <Col span={12}>
              <CopyToClipboard
                text={snippetDetail.code}
                onCopy={() => message.info('代码内容已复制到剪贴板')}
              >
                <a>复制代码</a>
              </CopyToClipboard>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              行号：
              <Switch checked={showLineNum} onChange={this.changeShowLineNum} size="small" />
            </Col>
          </Row>
          <div className={styles.code}>
            <SyntaxHighlighter
              language={snippetDetail.pl_tag}
              style={zenburn}
              showLineNumbers={showLineNum}
            >
              {snippetDetail.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}

export default SnippetDetail;
