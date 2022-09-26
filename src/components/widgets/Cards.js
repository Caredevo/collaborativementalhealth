import React, { Component } from 'react';

export class CardStep extends Component {

    render() {
        return (
            <div className='thirdhorizontalcard' style={{height:'700px', width:'900px'}}>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div style={{marginLeft:'50%'}}>{this.props.buttons}</div>
            </div>
        )
    }
}
