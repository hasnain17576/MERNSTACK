import { Link } from 'react-router-dom';

const blogPosts = [
  { id: 1, title: 'First Post', content: 'This is my first blog...', date: 'May 5, 2025' },
  { id: 2, title: 'Second Post', content: 'This is my second blog...', date: 'May 4, 2025' },
];

function Home() {
  return (
    <div>
      <h2>Blog Posts</h2>
      {blogPosts.map((post) => (
        <div key={post.id}>
          <h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3>
          <p>{post.content}</p>
          <small>{post.date}</small>
        </div>
      ))}
    </div>
  );
}

export default Home;