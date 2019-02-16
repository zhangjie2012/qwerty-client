import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import styles from './About.less';

@connect(({ about }) => ({
  about,
}))
class About extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'about/fetchUser',
    });
  }

  render() {
    const { user } = this.props.about;

    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>ABOUT</div>
        {user && (
          <Row gutter={16} className={styles.user}>
            <Col span={18}>
              <ul>
                <li>
                  常用昵称：
                  {user.nickname}
                </li>
                <li>
                  Github：
                  <a href={`https://github.com/${user.github}`}>{user.github}</a>
                </li>
                <li>
                  电子邮件：
                  {user.email}
                </li>
                <li>
                  目前职位：
                  {user.title}
                </li>
                <li>
                  职业经历：
                  {user.career}
                </li>
                <li>
                  在线社交：
                  {user.social.map(item => {
                    return (
                      <a className={styles.tag} key={item.label} href={item.link}>
                        {item.label}
                      </a>
                    );
                  })}
                </li>
                <li>
                  所在城市：
                  {user.city}
                </li>
              </ul>
            </Col>
            <Col span={6}>
              <img alt="头像" src={user.avatar} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default About;
