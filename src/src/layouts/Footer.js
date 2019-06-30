import React, { PureComponent } from 'react';
import { Layout, Icon, Divider } from 'antd';
import styles from './Footer.less';

const { Footer } = Layout;

class FooterView extends PureComponent {
  render() {
    const { siteInfo } = this.props;
    return (
      <Footer>
        <div className="container">
          <div className={styles.footer}>
            Copyright <Icon type="copyright" /> {siteInfo.copyright} {siteInfo.title}
            {siteInfo.ICP !== null &&
              siteInfo.ICP !== '' && (
                <>
                  <Divider type="vertical" />
                  <span>{siteInfo.ICP}</span>
                </>
              )}
            <Divider type="vertical" />
            Site power by{' '}
            <a
              href="https://github.com/zhangjie2012/qwerty"
              rel="noopener noreferrer"
              target="_blank"
            >
              qwerty
            </a>
          </div>
        </div>
      </Footer>
    );
  }
}

export default FooterView;
