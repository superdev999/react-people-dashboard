import React, { Component } from "react";

export default class PeopleItem extends Component {
    render() {
        const {index, selected, person} = this.props;

        return (
            <div className={"people-item" + (selected ? " selected-profile" : "")} key={person.name} onClick={() => this.props.selectProfile(index)}>
                <div className="people-item-avatar">
                    <img src={person.pic} />
                </div>
                <div className="people-item-name">
                    {person.name}
                </div>
            </div>
        )
    }
}
