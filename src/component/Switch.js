import React from 'react';

export class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSwitchOn: true,
        });
        this.handleClick = this.handleClick.bind(this);
    }
    // once
    // handleClick() {
    //     this.setState({
    //         isSwitchOn: !this.state.isSwitchOn
    //     });
    // }
    //twice
    // handleClick() {
    //     this.setState(state => ({
    //         isSwitchOn: !state.isSwitchOn,
    //     }));
    // }
    //thrid
    handleClick = () => {
        this.setState({
            isSwitchOn: !this.state.isSwitchOn
        });
    };
    render() {
        return (
            <div>
                <button
                    // once
                    // third
                    onClick={this.handleClick}
                    // towice
                    // onClick={ () => this.handleClick()}
                >
                    {this.state.isSwitchOn ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    }
}