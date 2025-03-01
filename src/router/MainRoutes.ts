const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: '記錄管理',
            path: '/',
            component: () => import('@/views/record/ListPage.vue')
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
        },
        {
            name: '記帳類別管理',
            path: '/RecordCategory',
            component: () => import('@/views/recordCategory/ListPage.vue')
        },
        {
            name: '新增記帳類別',
            path: '/RecordCategory/add',
            component: () => import('@/views/recordCategory/AddPage.vue')
        },
        {
            name: '編輯記帳類別',
            path: '/RecordCategory/edit/:id',
            component: () => import('@/views/recordCategory/EditPage.vue')
        }
    ]
};

export default MainRoutes;
