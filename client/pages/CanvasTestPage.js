import React from 'react';
import {connect} from 'react-redux';

import CommonLayout from "../layouts/CommonLayout";
import Canvas from "../components/canvas/Canvas";



class CanvasTestPage extends React.Component {

    render() {
        const {} = this.props;

        return (
            <CommonLayout>
                <div className={'test-page canvas'}>
                    <Canvas/>
                </div>
            </CommonLayout>
        )
    }
}

export default connect(
    state => ({
        frame: state.test.frame,
        stem: state.test.stem
    }),
    {

    }
)(CanvasTestPage)
