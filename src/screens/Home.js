import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { HeaderNavigationBar } from '../components/menu/HeaderNavigationBar';
const Style = require('../components/styles/Style');

export class HomeScreen extends Component {
    render() {
        return (<View style={Style.body}> 
        <HeaderNavigationBar {...this.props} />
            <View style={Style.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    This is Home Screen
                </Text>
                
            </View>
        </View>);
    }
}