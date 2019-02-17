import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';

import styles from './Header.less';

const { Header } = Layout;
const { SubMenu } = Menu;

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
            <Menu
              theme="dark"
              mode="horizontal"
              className={styles.mobMenu}
              selectedKeys={this.getSelectedKeys(pathname, menuData)}
            >
              <SubMenu
                title={
                  <span>
                    <Icon type="menu-fold" />
                  </span>
                }
              >
                {this.getMenus(menuData)}
              </SubMenu>
            </Menu>
          )}
        </div>
      </Header>
    );
  }
}

export default HeaderView;
