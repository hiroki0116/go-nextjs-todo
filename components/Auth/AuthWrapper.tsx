import { useRouter } from 'next/router';
import Skeleton from 'antd/lib/skeleton';
import { isAuth } from 'utils/auth';
import LoginRequired from './LoginRequired';

const AuthWrapper = ({children}:{children:any}) => {
    const router = useRouter();
    if (!router.isReady) return (
        <div className='grid grid-cols-1 justify-items-center items-center'><Skeleton active /><Skeleton active /></div>
    );

    if (!isAuth()) return <LoginRequired />
  return (
    <>
        {children}
    </>
  )
}

export default AuthWrapper