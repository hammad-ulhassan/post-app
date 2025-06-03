import { useEffect, useState } from 'react';
import { List, Card, Spin, Alert } from 'antd';
import type { Post } from '../../../models/post';

const PAGE_SIZE = 5;

const DashboardPage = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts: Post[]=[];
        setAllPosts(posts);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = allPosts.slice(start, start + PAGE_SIZE);

  if (loading) return <Spin tip="Loading posts..." />;
  if (error) return <Alert type="error" message="Error" description={error} />;

  return (
    <List
      itemLayout="vertical"
      dataSource={paginatedPosts}
      pagination={{
        current: currentPage,
        pageSize: PAGE_SIZE,
        total: allPosts.length,
        onChange: setCurrentPage,
        showSizeChanger: false,
      }}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card title={item.title}>{item.body}</Card>
        </List.Item>
      )}
    />
  );
};

export default DashboardPage;
