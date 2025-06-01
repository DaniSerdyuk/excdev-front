import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { getTokenFromLocalStorage } from '@/services/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRoutes = ['login'];

  if (authRoutes.includes(to.name) && getTokenFromLocalStorage()) {
    return next({ name: 'home' });
  }

  if (to.meta.isRequiredAuth && !getTokenFromLocalStorage()) {
    return next({ name: 'login' });
  }

  return next();
});

export default router;
