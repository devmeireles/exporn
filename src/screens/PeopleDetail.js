import React, { Component } from 'react';
import { Platform, View, Text, Image, Title, Caption, Button, GridRow, ListView, TouchableOpacity, ImageBackground, Tile, Divider, Card, Subtitle, Video} from '@shoutem/ui';
import { ScrollView, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import api from '../services/api';
import Carousel from 'react-native-snap-carousel';

import { StackActions, NavigationActions } from 'react-navigation';


const Style = require('../components/styles/Style');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class PeopleDetail extends Component {
    constructor(props){
        super(props);
        this.state = { }
        this.renderCast = this.renderCast.bind(this);
        this.renderCrew = this.renderCrew.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.peopleName,
        };
    };

    async componentDidMount(){
        this.loadPeople();
        this.loadMovieCredits();
    }

    loadPeople = async () => {
        const peopleID = this.props.navigation.state.params.peopleID;
        // const peopleID = 138;
        const response = await api.get(`/person/${peopleID}/?api_key=7de1111e4ea9fa0dc45893f3c81297b3&language=en-US`);
        
        this.setState({
            photo: response.data.profile_path,
            name: response.data.name,
            biography: response.data.biography,
            birthday: response.data.birthday,
            place: response.data.place_of_birth,
        });
    }

    loadMovieCredits = async () => {
        const peopleID = this.props.navigation.state.params.peopleID;
        // const peopleID = 138;
        const response = await api.get(`/person/${peopleID}/movie_credits?api_key=7de1111e4ea9fa0dc45893f3c81297b3&language=en-US`);
        
        this.setState({
            cast: response.data.cast,
            crew: response.data.crew,
            castCount: Object.keys(response.data.cast).length,
            crewCount: Object.keys(response.data.crew).length
        });
    }

    renderCast ({item, index}) {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate(
                    {
                        routeName: 'FilmDetail',
                        params: {
                            filmID: item.id,
                            filmTitle: item.name
                        }
                    }
                )
            ],
          });
          
        return (
            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={ () => {this.props.navigation.dispatch(resetAction);}}
                key={index}
            >
                <Image
                    styleName="large-portrait"
                    source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
                />
                <Subtitle styleName="h-center">{item.title}</Subtitle>
                <Text styleName="h-center">{item.character}</Text>
            </TouchableOpacity>
        );
    }

    renderCrew ({item, index}) {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate(
                    {
                        routeName: 'FilmDetail',
                        params: {
                            filmID: item.id,
                            filmTitle: item.name
                        }
                    }
                )
            ],
          });

        return (
            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={ () => {this.props.navigation.dispatch(resetAction);}}
                key={index}
            >
                <Image
                    styleName="large-portrait"
                    source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
                />
                <Subtitle styleName="h-center">{item.title}</Subtitle>
                <Text styleName="h-center">{item.department}</Text>
            </TouchableOpacity>
        );
    }

    render(){
        const cast = this.state.cast;
        const crew = this.state.crew;

        return(
            <ScrollView style={{backgroundColor:"#FFF"}}>
                <View>
                    <Image
                        styleName="large-portrait"
                        source={{ uri: `http://image.tmdb.org/t/p/w500/${this.state.photo}`}}
                    />

                    <Title styleName="h-center" style={Style.textPaddingTitle}>
                        {this.state.name}
                    </Title>

                    <Text style={Style.textPaddingSide}>
                        {this.state.biography || ''}
                    </Text>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Birthday: <Text>{this.state.birthday || ''}</Text></Subtitle>
                    </View>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Place of birthday: <Text>{this.state.place || ''}</Text></Subtitle>
                    </View>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Cast participation: <Text>{this.state.castCount || ''}</Text></Subtitle>
                    </View>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Crew participation: <Text>{this.state.crewCount || ''}</Text></Subtitle>
                    </View>
                </View>

                <View style={Style.textPaddingTitle}>
                    <Title styleName="h-center" style={Style.paddingTop30}>Casts</Title>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={cast}
                        renderItem={this.renderCast}
                        sliderWidth={width}
                        itemWidth={width-45}
                        activeSlideAlignment="center"
                        // layout={'default'}
                    />
                </View>

                <View style={Style.textPaddingTitle}>
                    <Title styleName="h-center" style={Style.paddingTop30}>Crews</Title>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={crew}
                        renderItem={this.renderCrew}
                        sliderWidth={width}
                        itemWidth={width-45}
                        activeSlideAlignment="center"
                        // layout={'default'}
                    />
                </View>
            </ScrollView>
        )
    }

}