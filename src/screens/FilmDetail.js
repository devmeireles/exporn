import React, { Component } from 'react';
import { Platform, View, Text, Image, Title, Caption, Button, GridRow, ListView, TouchableOpacity, ImageBackground, Tile, Divider, Card, Subtitle, Video} from '@shoutem/ui';
import { ScrollView, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import api from '../services/api';
import Carousel from 'react-native-snap-carousel';

const Style = require('../components/styles/Style');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class FilmDetail extends Component {
    constructor(props){
        super(props);
        this.state = { }
        this.renderCast = this.renderCast.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.filmTitle,
        };
    };

    convertToDolar = value => {
        return (
        `$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` || uninformed
        );
    };

    async componentDidMount(){
        this.loadFilm();
        this.loadCast();
        this.loadVideos();
    }

    loadFilm = async () => {
        const filmID = this.props.navigation.state.params.filmID;
        // const filmID = 458156;
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
            filmID: response.data.id
        });       
    }

    loadCast = async () => {
        const filmID = this.props.navigation.state.params.filmID;
        // const filmID = 458156;
        const response = await api.get(`/movie/${filmID}/credits?api_key=7de1111e4ea9fa0dc45893f3c81297b3&language=en-US`);
        this.setState({
            cast: response.data.cast,
            crew: response.data.crew
        })
    }

    loadVideos = async () => {
        const filmID = this.props.navigation.state.params.filmID;
        // const filmID = 35;
        const response = await api.get(`/movie/${filmID}/videos?api_key=7de1111e4ea9fa0dc45893f3c81297b3&language=en-US`);
        
        let trailers = response.data.results.filter(function(trailer){
            return trailer.type == 'Trailer';
        });

        this.setState({
            trailers: trailers
        });
    }


    renderCast ({item, index}) {
        return (
            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() =>  {this.props.navigation.navigate('PeopleDetail', {
                    peopleID: item.id,
                    peopleName: item.name
                })}}
            >
                <Image
                    styleName="medium-avatar"
                    style={{width: 75, height: 75}}
                    source={item.profile_path
                    ? {uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`}
                    : {uri: `http://www.globeinst.org/dev/wp-content/uploads/2016/06/people-placeholder-320x303.png`}}
                />
                <Text styleName="h-center">{item.name}</Text>
                <Caption styleName="h-center">{item.character ? item.character : item.job}</Caption>
            </TouchableOpacity>
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

    renderVideos({item, index}) {
        if(item.site == "YouTube"){
            return (
                <View>
                    <Video
                        key={index}
                        source={{ uri: `https://www.youtube.com/watch?v=${item.key}`}}
                        height={200}
                        width={width-35}
                    />
                </View>
            );
        }
    }   

    render() {
        const genres = this.state.genres;
        const cast = this.state.cast;
        const crew = this.state.crew;
        const videos = this.state.trailers;

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
                        <Subtitle>Running Time: <Text>{this.state.runtime || ''} mins</Text></Subtitle>
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

                <View style={Style.textPaddingTitle}>
                    <Subtitle style={Style.paddingTop30}>Videos</Subtitle>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={videos}
                        renderItem={this.renderVideos}
                        sliderWidth={width}
                        itemWidth={width-35}
                        activeSlideAlignment="start"
                        layout={'default'}
                        style={Style.paddingBottom20}
                    />
                </View>
            </ScrollView>
        );
    }

}