import React from 'react';
import {ShotChart} from "./ShotChart";
import {CountSlider} from "./CountSlider";
import {Radio, Switch, Row, Col} from "antd";
import _ from 'lodash';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        charType: "hexbin",
        displayToolTips: true,
    };

    onMinCountChange = (minCount) => {
        this.setState({minCount});
    };

    onCharTypeChange = (e) => {
        this.setState({
            charType: e.target.value,
        });
    };

    onToolTipChange = (displayToolTips) => {
        this.setState({displayToolTips});
    };

    render() {
        const { charType, minCount, displayToolTips} = this.state;
        return (
            <div className={"data-view"}>
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={minCount}
                    displayToolTips={displayToolTips}
                    charType={charType}
                />
                <div className={"filters"}>
                {
                    charType === "hexbin" ?
                        <Row className={"filter-row"}>
                            <Col offset={5} span={2} className={"filter-label"}>
                                Shots:
                            </Col>
                            <Col span={16}>
                                <CountSlider
                                    className={"filter-control"}
                                    onChange={_.debounce(this.onMinCountChange, 500)}
                                    value = {minCount}
                                />
                            </Col>
                        </Row> : null
                }
                <Row className={"filter-row"}>
                    <Col offset={5} span={10}>
                        <RadioGroup
                            className={"filter-control"}
                            onChange={this.onCharTypeChange}
                            value={charType}>
                            <Radio value={"hexbin"}>Hexbin</Radio>
                            <Radio value={"scatter"}>Scatter</Radio>
                        </RadioGroup>
                    </Col>
                    <Col span={2}>
                        ToolTip:
                    </Col>
                    <Col span={3}>
                        <Switch
                            checkedChildren="On"
                            unCheckedChildren="Off"
                            defaultChecked
                            onChange={this.onToolTipChange}
                        />
                    </Col>
                </Row>
                </div>
            </div>
        );
    }
}