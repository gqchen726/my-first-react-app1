import { Button, Card, DatePicker, Input, Select, Space, Tooltip, version } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React from "react";
import "../css/Login.css"
import PropTypes from "prop-types"
import $ from "jquery/src/jquery.js"

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
            loginCheckUrl:`http://localhost:8000/login`,
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
        this.saveName = this.saveName.bind(this);
        this.savePassword = this.savePassword.bind(this);
    }
    saveSelected(selected,event) {
        console.log(event);
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
        let {password} = this.state.user;
        if(fullPhoneNumber) {
            if(password) {
                this.setState({
                    user:{
                        fullPhoneNumber: fullPhoneNumber,
                        password: password
                    }
                })
            } else {
                this.setState({
                    user:{
                        fullPhoneNumber: fullPhoneNumber
                    }
                })
            }
        }else {
            this.setState({
                phone:event.target.value,
            });
        }
    }
    login() {
        let {user} = this.state;
        let requestBody = {
            "fullPhoneNumber": user.fullPhoneNumber,
            "password": user.password,
        };


        $.setHeader('Access-Control-Allow-Origin:*');//允许所有来源访问
        $.setHeader('Access-Control-Allow-Method:POST,GET');//允许访问的方式
        let {loginCheckUrl} = this.state;

        let contentType ="application/x-www-form-urlencoded; charset=utf-8";
        let ss = JSON.stringify(requestBody);
        $.support.cors = true;
        $.ajax({
            type:'post',
            dataType :'json',
            contentType:contentType,
            url:loginCheckUrl,
            data:{"params":ss},
            success:function(data){
               alert(data.user + ' login success!');

            },
            error:function(data){
                alert(data);
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
    saveName(name) {
        console.log(name);
    }
    savePassword(event) {
        let password = event.target.value;
        let {fullPhoneNumber} = this.state.user;
        if(password) {
            if (fullPhoneNumber) {
                this.setState({
                    user: {
                        fullPhoneNumber:this.state.user.fullPhoneNumber,
                        password:password
                    }
                })
            } else {
                this.setState({
                    user: {
                        password:password
                    }
                })
            }
        }

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
            <div style={{width:'100%'}}>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>
                        <span style={{width:'80%'}}>
                            <Input id='phone' style={{ width: '80%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />
                        </span>


                    </div>
                    <br /><br />
                    <Tooltip placement={"right"} title={"密码的最大长度不可超过20"}>
                        <Input.Password style={ { width: '100%'} } maxLength={20}
                                        placeholder="请输入密码" allowClear={true}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        onChange={this.savePassword}
                        />
                    </Tooltip>
                </Input.Group>
                <br />
                <Button type={"primary"} style={{width:'30%'}} onClick={this.login}>登陆</Button>
            </div>
        );
        /*
         * 验证码登陆卡片
         */
        const loginForCheckCode = (
            <div style={{width:'100%'}}>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>

                        <span style={{width:'80%'}}>
                                <Input id='phone' style={{ width: '50%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />

                                <Tooltip placement={'top'} title={'点此获取验证码'}>
                                    <Button style={{width:'30%'}} type={"primary"} onClick={this.getCheckCode}><span style={{font:{size:'11px'}}}>获取验证码</span></Button>
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
            </div>
        );


        let cardContentList = {
            loginForPassword: loginForPassword,
            loginForCheckCode: loginForCheckCode,
        };
        let {key} = this.state;


        let loginCard = (
            <Card
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
        let {options} = this.state;
        let {selected} = this.state;
        const customerRegisterCard = (

            <Card
                // style={{width:'160%'}}
                title="注册"
            >
                <div>
                    <Input.Group compact>
                        <Input id='name' style={{ width: '100%' }} placeholder={'请输入用户名'} allowClear={true} maxLength={30} onChangeCapture={this.saveName} />
                        <br /><br />
                        <div style={{width:'100%'}}>
                            <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                                {options}
                            </Select>

                            <span style={{width:'80%'}}>
                                <Input id='phone' style={{ width: '50%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />

                                <Tooltip placement={'top'} title={'点此获取验证码'}>
                                    <Button style={{width:'30%'}} type={"primary"} onClick={this.getCheckCode}><span style={{font:{size:'11px'}}}>获取验证码</span></Button>
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
                        <br /><br />
                        <Input id='name' style={{ width: '100%' }} placeholder={'请输入密码'} allowClear={true} maxLength={30} onChangeCapture={this.savePassword} />
                        <Input id='name' style={{ width: '100%' }} placeholder={'请再次输入密码'} allowClear={true} maxLength={30} onChangeCapture={this.savePassword} />
                    </Input.Group>
                    <br />
                    <Button type={"primary"} style={{width:'30%'}} onClick={this.login}>注册</Button>
                </div>
            </Card>

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
                    style={{ width: '100%' }}
                    extra={<Button type={"primary"} onClick={this.cardStateSwitch} >{this.state.isGoLogin ? "登陆":"注册"}</Button>}
                >
                    {
                        currentCard
                    }
                </Card>


            </div>
        );
    }
}
