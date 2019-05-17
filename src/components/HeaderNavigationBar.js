import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';

export class HeaderNavigationBar extends Component {
    render() {
        return (<View style={{
            height: 65,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 15 }}
                onPress={() => { this.props.navigation.openDrawer() }}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
                />
            </TouchableHighlight>
        </View>);
    }
}