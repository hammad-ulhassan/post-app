import { Card, Menu, type MenuProps } from 'antd';
import { useState } from 'react';

const items = [
  {
    label: 'All Posts',
    key: 'all',
  },
  {
    label: 'Latest Posts',
    key: 'latest',
  },
  {
    label: 'Archived',
    key: 'archived',
  },
];
const DashboardPage = () => {
  const [current, setCurrent] = useState('all');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <Card>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </Card>
  );
};

export default DashboardPage;
