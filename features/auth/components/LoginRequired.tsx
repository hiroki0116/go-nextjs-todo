import Result from 'antd/lib/result';
import Button from 'antd/lib/button';

const LoginRequired = () => {
  return (
    <Result
      className="bg-transparent"
      status="403"
      title={<span className='text-white'>403</span>}
      subTitle={<p className='text-white'>Please login to continue</p>}
      extra={<Button href="/" type="primary" className='rounded '>Home Page</Button>}
    />
  );
};

export default LoginRequired;
