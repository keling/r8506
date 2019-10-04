import React, { Component } from 'react'

import DashboardRow from './DashboardRow'
import DashboardForm from '../DashboardForm/DashboardForm'

export default class DashboardResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            params: {}
        }
    }

    // componentDidMount() {
    //     // console.info(`result dismount`, this.props.params)
    //     let params = Object.assign({}, this.props.params)

    //     delete params[`diseases`]

    //     this.setState({
    //         params
    //     })
    // }

    render() {
        // console.info(`result render`)
        return (
            this.props.params.diseases.map(disease => (
                <DashboardRow key={`disease-${disease.id}`} disease={disease} params={this.props.params} timestamp={this.props.timestamp} />
            ))
        )
    }
}
