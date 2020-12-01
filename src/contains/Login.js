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
            selected:'+86',
            phone:null,
            user: {
                fullPhoneNumber:null,
                passWord:null,
            },
            loginCheckUrl:`http://localhost:8000/user/login`,
            testText:'null',
            cardList: [],
            cardContentList:[],
            key: 'loginForPassword',
            isGoLogin:false,
        };
        this.getCheckCode = this.getCheckCode.bind(this);
        this.saveSelected = this.saveSelected.bind(this);
        this.savePhone = this.savePhone.bind(this);
        this.login = this.login.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.cardStateSwitch = this.cardStateSwitch.bind(this);
        this.renderLoginCard = this.renderLoginCard.bind(this);
        this.renderRegisterCard = this.renderRegisterCard.bind(this);
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
            this.setState({
                phone:null,
            })
        }
        if(selected) {
            this.setState({
                phone:event,
                user: {
                    fullPhoneNumber: fullPhoneNumber,

                }
            });
        } else {
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
            "phoneNumber":user.fullPhoneNumber,
            "password":user.passWord,
        };
        let loginCheckUrl4Get = `${loginCheckUrl}?name=123&pwd=123`;
        // ajax.call(loginCheckUrl,requestBody,'POST')
        // ajax.call(loginCheckUrl4Get,null,'GET');

        $.ajax({
            url: `http://localhost:8000/login`,
            data: {user:requestBody},
            type: "POST",
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
    }
    getCheckCode() {

    }
    cardStateSwitch() {
        let {isGoLogin} = this.state;
        this.setState({
           isGoLogin: !isGoLogin
        });
    }
    componentWillMount() {
        let optionsArr = ["+86","+1"];
        let options = optionsArr.map( (items) => <Select.Option key={items} >{items}</Select.Option>)
        this.setState({
            options:options,
        });
    }


    renderLoginCard() {
        let {options} = this.state;
        let {selected} = this.state;
        let {phone} = this.state;
        const cardList = [
            {
                key: 'loginForPassword',
                tab: '密码登陆'
            },
            {
                key: 'loginForCheckCode',
                tab: '验证码登陆'
            }
        ];
        /*
         * 密码登陆卡片
         */
        const loginForPassword = (
            <div>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>

                        <Input id='phone' style={{ width: '80%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />

                    </div>
                    <br /><br />
                    <Tooltip placement={"right"} title={"密码的最大长度不可超过20"}>
                        <Input.Password style={ { width: '100%'} } maxLength={20}
                                        placeholder="请输入密码" allowClear={true}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Tooltip>
                </Input.Group>
                <br />
                <Button type={"primary"} style={{width:'50%'}} onClick={this.login}>登陆</Button>
                <h6>{this.state.testText}</h6>
            </div>
        );
        /*
         * 验证码登陆卡片
         */
        const loginForCheckCode = (
            <div>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>

                        <span style={{width:'80%'}}>
                            <Input id='phone' style={{ width: '60%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />

                            <Tooltip placement={'top'} title={'点此获取验证码'}>
                                <Button style={{width:'20%'}} type={"primary"} onClick={this.getCheckCode}><span style={{font:{size:'11px'}}}>获取验证码</span></Button>
                            </Tooltip>
                        </span>
                    </div>
                    <br /><br />
                    <Tooltip placement={"right"} title={"请输入6位的短信验证码"}>
                        <Input.Password style={ { width: '100%'} } maxLength={20}
                                        placeholder="请输入验证码" allowClear={true}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Tooltip>
                </Input.Group>
                <br />
                <Button type={"primary"} style={{width:'30%'}} onClick={this.login}>登陆</Button>
                <h6>{this.state.testText}</h6>
            </div>
        );


        let cardContentList = {
            loginForPassword: loginForPassword,
            loginForCheckCode: loginForCheckCode,
        };
        let {key} = this.state;


        let loginCard = (
            <Card
                // style={{ width: '130%' }}
                title="登陆"
                tabList={cardList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {cardContentList[key]}
            </Card>
        );
        return loginCard;
    }

    renderRegisterCard() {
        const customerRegisterCard = (
            <div>

            </div>
        );
        return customerRegisterCard;
    }

    render() {
        let {isGoLogin} = this.state;
        let currentCard;

        if(!isGoLogin) {
            let loginCard = this.renderLoginCard();
            currentCard = loginCard;
        } else {
            let customerRegisterCard = this.renderRegisterCard();
            currentCard = customerRegisterCard;
        }
        return (
            <div className="Home-Login" align="center">

                <Card
                    style={{ width: '130%' }}
                    extra={<Button type={"primary"} style={{width:'100%'}} onClick={this.cardStateSwitch} >{this.state.isGoLogin ? "登陆":"注册"}</Button>}
                >
                    {
                        currentCard
                    }
                </Card>


            </div>
        );
    }
}
