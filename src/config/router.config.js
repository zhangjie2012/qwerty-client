export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/blogs' },
      {
        path: '/blogs',
        name: 'blogs',
        label: '博客',
        matchPaths: ['/blogs', '/blog'],
        component: './Blog/BlogList',
      },
      {
        path: '/blogs/archive',
        component: './Blog/BlogArchive',
        hideInMenu: true,
      },
      {
        path: '/blogs/category',
        component: './Blog/BlogCategory',
        hideInMenu: true,
      },
      {
        path: '/blog/:slug',
        component: './Blog/BlogDetail',
        hideInMenu: true,
      },
      {
        path: '/topics',
        name: 'topics',
        label: '主题',
        matchPaths: ['/topics', '/topic'],
        component: './Topic/Topics',
      },
      {
        path: '/topic/:id',
        component: './Topic/Comments',
        hideInMenu: true,
      },
      {
        path: '/microblogs',
        name: 'microblogs',
        label: '微博',
        matchPaths: ['/microblog'],
        component: './Microblog/MicroblogList',
      },
      {
        path: '/resume',
        name: 'resume',
        label: '简历',
        matchPaths: ['/resume'],
        component: './Resume/Resume',
      },
      {
        name: 'exception',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
    ],
  },
  {
    component: '404',
  },
];
