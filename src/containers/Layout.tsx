import { Fragment } from 'react';
import { RouteChildrenProps } from 'react-router';
import Footer from './Footer';
import Header from './Header';

type IProps = {
    children: RouteChildrenProps<any> | React.ReactNode
}

const WebLayout = ( { children }: IProps) => {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    )
}

export default WebLayout;