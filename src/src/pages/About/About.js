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
                  <span className={styles.label}>常用昵称：</span>
                  <span className={styles.value}>{user.nickname}</span>
                </li>
                <li>
                  <span className={styles.label}>Github：</span>
                  <span className={styles.value}>
                    <a href={`https://github.com/${user.github}`}>{user.github}</a>
                  </span>
                </li>
                <li>
                  <span className={styles.label}>电子邮件：</span>
                  <span className={styles.value}>{user.email}</span>
                </li>
                <li>
                  <span className={styles.label}>目前职位：</span>
                  <span className={styles.value}>{user.title}</span>
                </li>
                <li>
                  <span className={styles.label}>职业经历：</span>
                  <span className={styles.value}>{user.career}</span>
                </li>
                <li>
                  <span className={styles.label}>在线社交：</span>
                  <span className={styles.value}>
                    {user.social.map(item => {
                      return (
                        <a className={styles.tag} key={item.label} href={item.link}>
                          {item.label}
                        </a>
                      );
                    })}
                  </span>
                </li>
                <li>
                  <span className={styles.label}>所在城市：</span>
                  <span className={styles.value}>{user.city}</span>
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
