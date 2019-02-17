import React, { PureComponent } from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import Link from 'umi/link';

import styles from './Header.less';

const { Header } = Layout;

class HeaderView extends PureComponent {
  getMenus = menuData => {
    return menuData.map(item => {
      return (
        <Menu.Item key={item.name}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  getSelectedKeys = (pathname, menuData) => {
    const keys = [];
    for (const item of menuData) {
      // 前缀匹配
      if (item.matchPaths.some(path => pathname.startsWith(path))) {
        keys.push(item.name);
      }
    }
    return keys;
  };

  render() {
    const { siteInfo, pathname, menuData, isMobile } = this.props;

    const menu = (
      <Menu theme="dark" mode="vertical" selectedKeys={this.getSelectedKeys(pathname, menuData)}>
        {this.getMenus(menuData)}
      </Menu>
    );
    return (
      <Header>
        <div className="container">
          <div className={styles.title}>
            <Link to="/">{siteInfo.title}</Link>
          </div>
          {!isMobile ? (
            <Menu
              theme="dark"
              mode="horizontal"
              className={styles.menu}
              selectedKeys={this.getSelectedKeys(pathname, menuData)}
            >
              {this.getMenus(menuData)}
            </Menu>
          ) : (
            <Dropdown overlay={menu} trigger={['click']} className={styles.mobMenu}>
              <a>
                <Icon type="menu-fold" />
              </a>
            </Dropdown>
          )}
        </div>
      </Header>
    );
  }
}

export default HeaderView;
