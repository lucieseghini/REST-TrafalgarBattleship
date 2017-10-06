import React from 'react';

import Header from '../common/Header';
import Footer from '../common/Footer';

class MainLayout extends React.Component {
    render () {
        return (
            <div>
                <Header show={(window.location.pathname !== "/")}/>
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </div>
        )
    }
}

export default MainLayout;
