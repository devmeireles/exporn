import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HeaderNavigationBar } from '../components/menu/HeaderNavigationBar';

export default class Info extends Component {

    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}> 
        <HeaderNavigationBar {...this.props} />
            <View style={{
                flex: 1,
                backgroundColor: '#A4AD45',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    This is Info Screen
                </Text>
                
            </View>
        </View>);
    }

}