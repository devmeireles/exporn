import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { HeaderNavigationBar } from '../components/HeaderNavigationBar';

export class ProfileScreen extends Component {

    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}> 
        <HeaderNavigationBar {...this.props} />
            <View style={{
                flex: 1,
                backgroundColor: '#4885ed',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    This is Profile Screen
                </Text>
                
            </View>
        </View>);
    }
}