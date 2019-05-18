import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, TextInput} from 'react-native';
const Style = require('../styles/Style');

export class HeaderNavigationBar extends Component {
    render() {
        return (<View style={Style.headerMenu}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 15 }}
                onPress={() => { this.props.navigation.openDrawer() }}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={{uri: 'https://png.icons8.com/menu-filled/1DB954'}}
                />
            </TouchableHighlight>
        </View>);
    }
}