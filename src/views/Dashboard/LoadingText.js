import React, { Component } from 'react'

import Utils from './Utils'

export default class LoadingText extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: undefined
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data == this.props.data) {
            return
        }

        this.setState({
            data: Utils.numberFormat(this.props.data)
        })
    }

    render() {
        return (
            this.state.data == undefined || this.state.data == null ?
                <i className="fa fa-spinner fa-spin fa-fw"></i> :
                this.state.data
        )
    }
}
