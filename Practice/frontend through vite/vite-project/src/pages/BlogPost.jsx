import { useParams } from 'react-router-dom';

const blogPosts = [
  { id: 1, title: 'First Post', content: 'This is my first blog post content...', date: 'May 5, 2025' },
  { id: 2, title: 'Second Post', content: 'This is my second blog post content...', date: 'May 4, 2025' },
];

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  return post ? (
    <div>
      <h2>{post.title}</h2>
      <small>{post.date}</small>
      <p>{post.content}</p>
    </div>
  ) : (
    <h2>Post not found!</h2>
  );
}

export default BlogPost;