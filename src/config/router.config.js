export default [
  // app
  {
    path: '/pure',
    component: '../layouts/PureLayout',
    routes: [
      {
        path: '/pure/blog/:slug',
        matchPaths: ['/pure/blog'],
        name: 'blog',
        label: '博客纯享',
        component: './Blog/PureBlogDetail',
      },
    ],
  },
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
        path: '/snippets',
        name: 'snippets',
        label: '代码片段',
        matchPaths: ['/snippets', 'snippet'],
        component: './Snippet/Snippets',
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
        path: '/about',
        name: 'about',
        label: '关于',
        matchPaths: ['/about'],
        component: './About/About',
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
