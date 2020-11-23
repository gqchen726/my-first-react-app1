import {Clock} from "../component/Clock";
import {Switch} from "../component/Switch";
import React from "react";
import {Stars} from "../component/Stars";

const lisa = {
    'name':'lisa',
    'age':21,
    'country':'泰国'
};
const jennie = {
    'name':'jennie',
    'age':19,
    'country':'韩国'
};
const rose = {
    'name':'rose',
    'age':22,
    'country':'澳大利亚'
};
const jiso = {
    'name':'jiso',
    'age':21,
    'country':'韩国'
};
const stars = new Map(
    [
        ['lisa',lisa],
        ['jennie',jennie],
        ['rose',rose],
        ['jiso',jiso]
    ]
);

export class Home extends React.Component {

    render() {
        return (
            <div>
                <Clock />
                <Switch />
                {/*<Stars starMap={stars} />*/}
            </div>
        );
    }
}