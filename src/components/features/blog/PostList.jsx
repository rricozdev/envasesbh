import PostCard from "./PostCard";

export default function PostList({ posts }) {
  if (!posts?.length) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">No hay publicaciones disponibles.</p>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <PostCard post={featured} featured />
      {rest.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
