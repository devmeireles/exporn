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

    paddingTop20: {
        paddingTop: 20
    },

    paddingLeft20: {
        paddingLeft: 20
    },

    paddingBottom20: {
        paddingBottom: 20
    },

    paddingTop30: {
        paddingTop: 30
    },

    textPaddingSide: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    textPaddingTitle: {
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 20,
        paddingLeft: 20
    },

    textPaddingCaption: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    }

});