import { Button, Card, DatePicker, Input, Select, Space, Tooltip, version } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React from "react";
import "../css/Login.css"
import PropTypes from "prop-types"
export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: null,
            prePhone:null,
            selected:'+86',
            phone:null,
            user: {
                fullPhoneNumber:null,
                passWord:null,
            },
        };
        this.saveSelected = this.saveSelected.bind(this);
        this.savePhone = this.savePhone.bind(this);
    }
    saveSelected(selected) {

        let phone = this.state.phone.target.value;
        if(phone) {
            let fullPhoneNumber = `${selected}${phone}`;
            this.setState({
                selected:selected,
                user: {
                    fullPhoneNumber: fullPhoneNumber,
                }
            });
        } else {
            this.setState({selected:selected});
        }
    }
    savePhone(event) {
        let phone = event.target.value;
        let {selected} = this.state;
        if(selected) {

            let fullPhoneNumber = `${selected}${phone}`;
            this.setState({
                phone:event,
                user: {
                    fullPhoneNumber: fullPhoneNumber,
                }
            });
        } else {
            this.setState({phone:phone});
        }

    }
    componentWillMount() {
        let optionsArr = ["+86","+1"];
        let options = optionsArr.map( (items) => <Select.Option key={items} >{items}</Select.Option>)
        this.setState({options:options});
    }



    render() {
        let {options} = this.state;
        let {selected} = this.state;
        let {phone} = this.state;

        return (
            <div className="Home-Login" align="center">

                <Card style={{background:"#fbc77b"}} bordered={false}>
                    <Input.Group compact>
                        <div>
                            <Select label={options} style={{width:'30%'}} value={selected} onChange={this.saveSelected}>
                                {options}
                            </Select>

                            <Input id='phone' style={{ width: '60%' }} allowClear={true} maxLength={11} onChangeCapture={this.savePhone}/>

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