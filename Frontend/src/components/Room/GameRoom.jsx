import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat/Chat';
import UserList from './Chat/UserList';
import history from '../../history';
import Screen from './Hangman/Screen';
import { newMasterListener, wordSetListener } from '../../actions/index';
import { hangmanAnimation as animate } from '../../animations';
const toggleMenu = () => {
    document.querySelector('.navbar-burger').classList.toggle('is-active')
    document.querySelector('#user-list').classList.toggle('is-active')
    document.querySelector('.fa-comment').classList.remove('is-active')
    document.querySelector('.messages-container').classList.remove('is-active')
}
class ChatRoom extends Component {
    componentDidMount() {
        //--Fixes a display issue in Safari
        document.querySelector('html').style.display = 'none';
        setTimeout(() => {
            document.querySelector('html').style.display = 'block';
        }, 50)
        //----------------------

        document.querySelector('title').textContent = 'Play | Hangman'
        document.getElementById('css-load').setAttribute('href', process.env.PUBLIC_URL + '/chatStyle.css')
        if (!this.props.room) {
            return history.push('/Hangman')
        }

        this.props.newMasterListener()
        this.props.wordSetListener()
        animate.turnOn('.screen')
        // animate.flicker('.screen')
        //flicker effect for crt screen. removed for accessibility
    }
    render() {
        return (
            <div className="columns is-multiline">
                <Screen />
                {this.props.connection ? '' : 'No Room'}
                <UserList toggleMenu={toggleMenu} />
                <Chat toggleMenu={toggleMenu} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        connection: state.connection,
        room: state.room.roomName
    })
}



export default connect(mapStateToProps, { newMasterListener, wordSetListener })(ChatRoom);
