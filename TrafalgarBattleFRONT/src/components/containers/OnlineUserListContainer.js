import React from 'react';
import { connect } from 'react-redux';

import { Image } from 'react-bootstrap';
import ButtonWithUser from './ButtonWithUser';

import { Table } from 'react-bootstrap';


class OnlineUserListContainer extends React.Component {

    renderOnlineUserList() {
        if (Array.isArray(this.props.onlineUsers)) {
            return this.props.onlineUsers.map((onlineUser) => {
                return (
                    <tr key={onlineUser.ConnectionId}>
                        <td><Image src={onlineUser.Avatar} id="brand" /></td>
                        <td>{onlineUser.Name}</td>
                        <td>
                            {(this.props.user.ConnectionId !== onlineUser.ConnectionId) ?
                            <ButtonWithUser onlineUser={onlineUser}>Défier</ButtonWithUser>
                            : null }
                        </td>
                    </tr>
                );
            });
        }
        else if (!Array.isArray(this.props.onlineUsers) && typeof this.props.onlineUsers === 'object' && this.props.onlineUsers !== null){
            return (
                <tr>
                    <td><Image src={this.props.onlineUsers.Avatar} id="brand" /></td>
                    <td>{this.props.onlineUsers.Name}</td>
                    <td>
                        {(this.props.user.ConnectionId !== this.props.onlineUsers.ConnectionId) ?
                            <ButtonWithUser onlineUser={this.props.onlineUsers}>Défier</ButtonWithUser>
                            : null }
                    </td>
                </tr>
            )
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Table striped condensed hover>
                <thead>
                <tr>
                    <th/>
                    <th>Joueur</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                    {this.renderOnlineUserList()}
                </tbody>
            </Table>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState.user,
        onlineUsers: store.onlineUsersState.onlineUsers
    };
};

export default connect(mapStateToProps)(OnlineUserListContainer);