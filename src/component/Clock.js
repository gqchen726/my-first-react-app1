import React from 'react';

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
        };
    }

    componentWillMount() {

        this.setState({
            date: new Date(),
        });
    }
    componentDidMount() {
        this.dateId = setInterval( () => {
            this.tick()
        },1000);
    }
    componentWillUnmount() {
        clearInterval(this.dateId)
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }


}