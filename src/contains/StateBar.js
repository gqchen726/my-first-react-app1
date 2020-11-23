import React from "react";
import {PageHeader} from "antd";

export class StateBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user:null,
        };
    }

    componentWillMount() {
        let user = {
            "userName": "Tom"
        };
        this.setState({user:user});
    }

    render() {
        let user = this.state.user;
        return (
            <div>
                <PageHeader title={user.userName}>

                </PageHeader>
            </div>
        );
    }
}