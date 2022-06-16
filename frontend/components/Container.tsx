import { useAuth } from '@/hooks/useAuth'
import { FC, ReactNode } from 'react'
import { Spin } from 'antd';

interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {

    const { isLoading } = useAuth()

    return !isLoading ? (
        <div className='body container'>{children}</div>
    ) : <div className='center'><Spin size="large" /></div>

}

export default Container