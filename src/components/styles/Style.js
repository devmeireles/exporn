import {StyleSheet, Dimensions} from 'react-native';

const PRIMARY_COLOR = "#191414";
const SECONDARY_COLOR = "#1DB954";
const TERTIARY_COLOR = "#FFF";

var WIDTH = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
    },

    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerMenu: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR
    },

});