import PostCompo from '@/views/post/PostCompo';
import PostWriteCompo from '@/views/post/write/PostWriteCompo';

export default [
    {
        name: 'PostWriteCompo',
        path: '/post/write',
        component: PostWriteCompo,
        props: true,
        meta: { hideBottom: true } // bottomCompo를 숨길지 결정하는 메타 데이터 추가
    },
    {
        name: 'PostCompo',
        path: '/post/:postType',
        component: PostCompo,
        props: true // 컴포넌트 내에서 postType으로 prop으로 접근 가능
    },
    
];
