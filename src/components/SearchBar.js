import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';
import {PROFILE_PIC_URL_PREFIX} from "../constants";

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    onSelect = (value) => {
        this.props.loadPlayerInfo(value);

    };

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] :
                nba.searchPlayers(value).map(
                    (player) => <Option key={player.playerId} value={player.fullName}>
                        <img
                            className={"player-option-image"}
                            src={`${PROFILE_PIC_URL_PREFIX}${player.playerId}.png`}
                            alt={"Profile"}
                        />
                        <span className={"player-option-label"}>{player.fullName}</span>
                    </Option>),
        });
    };

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                dataSource={dataSource}
                className={"search-bar"}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                optionLabelProp={"value"}
                size={"large"}
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        );
    }
}