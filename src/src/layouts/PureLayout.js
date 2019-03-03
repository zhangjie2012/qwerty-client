import React from 'react';
import Media from 'react-media';
import { Layout } from 'antd';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Context from './MenuContext';

const { Content } = Layout;

// Conversion router to menu.
function formatter(data) {
  return data
    .map(item => {
      if (!item.name || !item.path || item.hideInMenu) {
        return null;
      }

      const result = {
        ...item,
      };
      if (item.routes) {
        const children = formatter(item.routes);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class PureLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchSiteInfo',
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }

  getMenuData() {
    const {
      route: { routes },
    } = this.props;
    return memoizeOneFormatter(routes);
  }

  getPageTitle = (pathname, title) => {
    let label = '';
    for (const item of this.getMenuData()) {
      if (item.matchPaths.some(path => pathname.startsWith(path))) {
        label = item.label; /* eslint-disable-line */
      }
    }
    return `${title} - ${label}`;
  };

  render() {
    const {
      children,
      location: { pathname },
      global: { siteInfo },
    } = this.props;
    const layout = (
      <Layout
        style={{
          minHeight: '100vh',
          background: '#f5f5f5',
        }}
      >
        <Content>{children}</Content>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname, siteInfo.title)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

export default connect(({ global }) => ({
  global,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <PureLayout {...props} isMobile={isMobile} />}
  </Media>
));
