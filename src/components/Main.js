import React from 'react';
import nba from 'nba';
import { Profile } from "./Profile";
import { DataViewContainer } from "./DataViewContainer";
import { SearchBar } from "./SearchBar";
import { DEFAULT_PLAYER_INFO } from "../constants";

export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    };

    componentDidMount() {
        this.loadPlayerInfo('Stephen Curry');
    };

    loadPlayerInfo = (playerName) => {
        const {playerId} = nba.findPlayer(playerName)
        nba.stats.playerInfo({ PlayerID: playerId })
            .then((info) => {
                let playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                this.setState({ playerInfo });
            })
            .catch((e) => console.log(e));
    };

    render() {
        return (
            <div className={"main"}>
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className={"player"}>
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    };
}

