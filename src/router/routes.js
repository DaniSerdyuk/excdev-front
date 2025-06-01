export default [
  {
    path: '',
    redirect: { name: 'home' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginScreen.vue'),
    meta: {
      isRequiredAuth: false,
    },
  },
  {
    component: () => import('@/views/EmptyScreen.vue'),
    path: '/',
    meta: {
      isRequiredAuth: true,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/DashboardScreen.vue'),
      },
      {
        path: '/transactions',
        name: 'transactions',
        component: () => import('@/views/TransactionsScreen.vue'),
      },
    ],
  },
];
