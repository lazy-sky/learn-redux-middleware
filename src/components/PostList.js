import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../modules/posts';

function PostList() {
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러 발생!</div>
  if(!data) return <div>내용이 없습니다.</div>;

  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default PostList;