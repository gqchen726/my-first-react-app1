import { Button, Card, DatePicker, Input, Select, Space, Tooltip, version } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React from "react";
import "../css/Login.css"
import PropTypes from "prop-types"
import $ from "jquery/src/jquery"

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
            loginCheckUrl:`http://localhost:8000/login`,
            testText:'null',
            cardList: [],
            cardContentList:[],
            key: 'loginForPassword',
        };

        this.saveSelected = this.saveSelected.bind(this);
        this.savePhone = this.savePhone.bind(this);
        this.login = this.login.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
    }
    saveSelected(selected) {

        let {phone} = this.state;
        if(phone) {
            let fullPhoneNumber = `${selected}${phone.target.value}`;
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
        let fullPhoneNumber = `${selected}${phone}`;
        if(phone == null || phone === '' || phone === undefined) {
            console.log(phone);
        }
        if(selected) {

            this.setState({
                phone:event,
                user: {
                    fullPhoneNumber: fullPhoneNumber,

                }
            });
        } else {
            console.log('clean');
            this.setState({
                phone:event.target.value,
                user: {
                    fullPhoneNumber: fullPhoneNumber,
                }
            });
        }

    }
    login() {
        // let ajax = new Ajax();
        let {user} = this.state;
        let {loginCheckUrl} = this.state;
        let requestBody = {
            "name":user.fullPhoneNumber,
            "pwd":user.passWord,
        };
        let loginCheckUrl4Get = `${loginCheckUrl}?name=123&pwd=123`;
        // ajax.call(loginCheckUrl,requestBody,'POST')
        // ajax.call(loginCheckUrl4Get,null,'GET');

        $.ajax({
            url: "http://localhost:8000/login?name=123&pwd=123",
            // data: {name: 'jenny'},
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                console.log(data);
            }
        });



    }
    onTabChange(key,type) {
        this.setState({
           [type] :key
        });
        console.log(this);
    }
    componentWillMount() {
        let optionsArr = ["+86","+1"];
        let options = optionsArr.map( (items) => <Select.Option key={items} >{items}</Select.Option>)
        this.setState({
            options:options,
        });
    }



    render() {
        let {options} = this.state;
        let {selected} = this.state;
        let {phone} = this.state;
        const cardList = [
            {
                key: 'loginForPassword',
                tab: '密码登录'
            },
            {
                key: 'loginForCheckCode',
                tab: '验证码登录'
            }
        ];
        const loginForPassword = (
            <div>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>

                        <Input id='phone' style={{ width: '70%' }} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />

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
                <Button type={"primary"} style={{width:'60%'}} onClick={this.login}>登录</Button>
                <h6>{this.state.testText}</h6>
            </div>
        );
        const loginForCheckCode = (
            <div>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>

                        <Input id='phone' style={{ width: '50%' }} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />

                        <Button type={"primary"} style={{width:'60%'}} onClick={this.login}>获取验证码</Button>
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
                <Button type={"primary"} style={{width:'60%'}} onClick={this.login}>登录</Button>
                <h6>{this.state.testText}</h6>
            </div>
        );
        let cardContentList = {
            loginForPassword: loginForPassword,
            loginForCheckCodeL: loginForCheckCode,
        };
        let {key} = this.state;
        return (
            <div className="Home-Login" align="center">

                <Card
                    style={{ width: '130%' }}
                    title="Card title"
                    extra={<a href="#">More</a>}
                    tabList={cardList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {cardContentList[key]}
                </Card>


            </div>
        );
    }
}