import React, { Component } from 'react';
import { Platform, View, Text, Image, Title, Caption, Button, GridRow, ListView, TouchableOpacity, ImageBackground, Tile, Divider, Card, Subtitle} from '@shoutem/ui';
import { ScrollView, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { HeaderNavigationBar } from '../components/menu/HeaderNavigationBar';
import api from '../services/api';
import Carousel from 'react-native-snap-carousel';


const Style = require('../components/styles/Style');
const width = Dimensions.get('window').width;


export default class FilmDetail extends Component {
    constructor(props){
        super(props);
        this.state = { }
   }

    convertToDolar = value => {
        return (
        `$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` || uninformed
        );
    };

    componentDidMount(){
        this.loadFilm();
        this.loadCast();
    }

    loadFilm = async () => {
        const filmID = this.props.navigation.state.params.filmID;
        // const filmID = 598469;
        const response = await api.get(`/movie/${filmID}?api_key=7de1111e4ea9fa0dc45893f3c81297b3&language=en-US`);
        this.setState({
            results: response.data,
            overview: response.data.overview,
            poster: response.data.poster_path,
            title: response.data.title,
            tagline: response.data.tagline,
            genres: response.data.genres,
            releaseDate: response.data.release_date,
            budget: response.data.budget,
            revenue: response.data.revenue,
            runtime: response.data.runtime,
        });       
    }

    loadCast = async () => {
        const filmID = this.props.navigation.state.params.filmID;
        // const filmID = 598469;
        const response = await api.get(`/movie/${filmID}/credits?api_key=7de1111e4ea9fa0dc45893f3c81297b3&language=en-US`);
        this.setState({
            cast: response.data.cast,
            crew: response.data.crew
        })
    }


    renderCast ({item, index}) {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    styleName="medium-avatar"
                    style={{width: 75, height: 75}}
                    source={item.profile_path
                    ? {uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`}
                    : {uri: `http://www.globeinst.org/dev/wp-content/uploads/2016/06/people-placeholder-320x303.png`}}
                />
                <Text styleName="h-center">{item.name}</Text>
                <Caption styleName="h-center">{item.character}</Caption>
            </View>
        );
    }

    renderGenre ({item, index}) {
        return (
            <Button styleName="stacked clear">
                <Icon
                    name={"md-film"}
                    color="#000"
                    size={45}
                />
                <Text>{item.name}</Text>
            </Button>
        );
    }
      

    render() {
        const genres = this.state.genres;
        const cast = this.state.cast;
        const crew = this.state.crew;

        return (
            <ScrollView style={{backgroundColor:"#FFF"}}>
                <View>
                    <Image
                        styleName="large-portrait"
                        source={{ uri: `http://image.tmdb.org/t/p/w500/${this.state.poster}`}}
                    />

                    <Title styleName="h-center" style={Style.textPaddingTitle}>
                        {this.state.title}
                    </Title>

                    <Text styleName="h-center" numberOfLines={2} style={Style.textPaddingCaption}>
                        {this.state.tagline || ''}
                    </Text>

                    <Text style={Style.textPaddingSide}>
                        {this.state.overview || ''}
                    </Text>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Running Time: <Text>{this.state.runtime || ''}mins</Text></Subtitle>
                    </View>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Release Date: <Text>{this.state.releaseDate || ''}</Text></Subtitle>
                    </View>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Budget: <Text>{this.convertToDolar(this.state.budget || 0)}</Text></Subtitle>
                    </View>

                    <View style={Style.textPaddingTitle}>
                        <Subtitle>Revenue: <Text>{this.convertToDolar(this.state.revenue || 0)}</Text></Subtitle>
                    </View>
                </View>

                <View style={Style.textPaddingTitle}>
                    <Subtitle>Genres</Subtitle>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={genres}
                        renderItem={this.renderGenre}
                        sliderWidth={width}
                        itemWidth={125}
                        activeSlideAlignment="start"
                        layout={'default'}
                    />
                </View>

                <View style={Style.textPaddingTitle}>
                    <Subtitle style={Style.paddingTop30}>Casting</Subtitle>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={cast}
                        renderItem={this.renderCast}
                        sliderWidth={width}
                        itemWidth={150}
                        activeSlideAlignment="start"
                        layout={'default'}
                    />
                </View>

                <View style={Style.textPaddingTitle}>
                    <Subtitle style={Style.paddingTop30}>Crew</Subtitle>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={crew}
                        renderItem={this.renderCast}
                        sliderWidth={width}
                        itemWidth={150}
                        activeSlideAlignment="start"
                        layout={'default'}
                    />
                </View>
            </ScrollView>
        );
    }

}