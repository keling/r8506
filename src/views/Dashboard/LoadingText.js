import React, { Component } from 'react'

export default class LoadingText extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: undefined
        }
    }

    // componentWillMount() {
    //     let data = this.props.data

    //     if (!isNaN(data)) {
    //         data = data.toLocaleString()
    //     }

    //     console.info(`this is dataaaaaaaaaa`, data)

    //     this.setState({
    //         data
    //     })
    // }

    com

    render() {
        return (
            this.props.data == undefined || this.props.data == null ?
                <i className="fa fa-spinner fa-spin fa-fw"></i> :
                this.props.data
        )
    }
}
