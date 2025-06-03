import { Spin } from 'antd';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Spin size="large" tip="Loading..." />
  </div>
);

export default Loader;
