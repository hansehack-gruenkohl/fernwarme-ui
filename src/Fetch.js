import React from "react";

export default class Fetch extends React.Component {

    state = {
        responses: null
    }

    componentDidMount() {
        this.load()

        if (this.props.interval) {
            this.intervalJob = setInterval(this.load.bind(this), this.props.interval)
        }
    }

    componentWillUnmount() {
        if (this.intervalJob) {
            clearInterval(this.intervalJob)
        }
    }

    load() {
        Promise.all(
            this.props.urls.map(url => {
                return fetch(url)
                    .then(response => {
                        return response.json()
                    })
            })
        ).then(data => {
            this.setState({ responses: data })
        })
    }

    render() {
        if (this.state.responses) {
            return this.props.children(this.state.responses)
        }

        return null
    }
}