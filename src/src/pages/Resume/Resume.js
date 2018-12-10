import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import styles from './Resume.less';

@connect(({ resume, loading }) => ({
  resume,
  loadingResume: loading.effects['resume/fetchResume'],
}))
class Resume extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'resume/fetchResume',
    });
  }

  render() {
    const { educationList, jobList } = this.props.resume;
    const { loadingResume } = this.props;
    return (
      <div className={styles.content}>
        <div className={styles.pageTitle}>RESUME</div>
        <Spin spinning={loadingResume}>
          <div className={styles.expBlock}>
            <h2>工作经历</h2>
            {jobList.map(job => {
              return (
                <Fragment key={job.start_dt}>
                  <h3>
                    <a href={job.company_site}>{job.company_name}</a>
                    <span className={styles.date}>
                      （{job.start_dt} ~ {job.end_dt}）
                    </span>
                  </h3>
                  <div className={styles.meta}>
                    {job.title} | {job.duties}
                  </div>
                  <h4>产品</h4>
                  <div className="markdownContent">
                    <div dangerouslySetInnerHTML={{ __html: job.product }} />
                  </div>
                  <h4>技术栈</h4>
                  <div className="markdownContent">
                    <div dangerouslySetInnerHTML={{ __html: job.tech_stack }} />
                  </div>
                </Fragment>
              );
            })}
          </div>

          <div className={styles.expBlock}>
            <h2>教育经历</h2>
            {educationList.map(education => {
              return (
                <Fragment key={education.start_dt}>
                  <h3>
                    <a href={education.school_site}>{education.school_name}</a>
                    <span className={styles.date}>
                      （{education.start_dt} ~ {education.end_dt}）
                    </span>
                  </h3>
                  <ul>
                    <li>
                      学位：
                      {education.degree}
                    </li>
                    <li>
                      专业：
                      {education.major}
                    </li>
                    <li>
                      核心课程：
                      {education.course}
                    </li>
                  </ul>
                </Fragment>
              );
            })}
          </div>
        </Spin>
      </div>
    );
  }
}

export default Resume;
