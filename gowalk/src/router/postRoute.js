import PostCompo from '@/views/post/PostCompo';

export default [
    {
        name: 'PostCompo',
        path: '/post/:postType',
        component: PostCompo,
        props: true // 컴포넌트 내에서 postType으로 prop으로 접근 가능하다.
    },
];
