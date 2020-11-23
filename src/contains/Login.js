import {Button, Card, DatePicker, Input, Select, Space, Tooltip, version} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React from "react";
import ReactDOM from "react-dom";
import "../css/Login.css"
import {Option} from "antd/es/mentions";
export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: null,
            prePhone:null,
        };
    }

    componentWillMount() {
        let optionsArr = ["+86","+1"];
        let options = optionsArr.map( (items) => <Select.OptGroup key={items}>{items}</Select.OptGroup>)
        this.setState({options:options});
    }

    getPerPhone() {

    }

    render() {
        return (
            <div className="Home-Login" align="center">

                <Card style={{background:"#fbc77b"}} bordered={false}>
                    <Input.Group compact>
                        <div>
                            <Select  defaultValue="+86" label={this.state.options} style={{width:'30%'}}>
                                {this.state.options}
                            </Select>

                            <Input id='phone' style={{ width: '60%' }} allowClear={true} maxLength={11}/>

                        </div>
                        <br /><br />
                        <Tooltip placement={"right"} title={"密码的最大长度不可超过20"}>
                            <Input.Password style={ { width: '90%'} } maxLength={20}
                                            placeholder="input password" allowClear={true}
                                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Tooltip>
                    </Input.Group>
                    <br />
                    <Button type={"primary"} style={{width:'60%'}}>登录</Button>
                </Card>


            </div>
        );
    }
}