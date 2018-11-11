import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
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
      if (pathname === item.path) {
        keys.push(item.name);
      }
    }
    return keys;
  };

  render() {
    const { siteInfo, pathname, menuData } = this.props;

    return (
      <Header>
        <div className="container">
          <div className={styles.title}>
            <Link to="/">{siteInfo.title}</Link>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            className={styles.menu}
            selectedKeys={this.getSelectedKeys(pathname, menuData)}
          >
            {this.getMenus(menuData)}
          </Menu>
        </div>
      </Header>
    );
  }
}

export default HeaderView;
