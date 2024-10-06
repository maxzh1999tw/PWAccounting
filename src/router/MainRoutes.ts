const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Starter',
            path: '/',
            component: () => import('@/views/StarterPage.vue')
        },
        {
            name: '帳戶管理',
            path: '/Account',
            component: () => import('@/views/account/ListPage.vue')
        },
        {
            name: '新增帳戶',
            path: '/Account/add',
            component: () => import('@/views/account/AddPage.vue')
        },
        {
            name: '編輯帳戶',
            path: '/Account/edit/:id',
            component: () => import('@/views/account/EditPage.vue')
        }
    ]
};

export default MainRoutes;
