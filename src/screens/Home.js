import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight} from "react-native";
import {GridRow, Screen, NavigationBar, ListView, TouchableOpacity, ImageBackground, Tile, Title, Subtitle, Divider, Card, Image, View, Caption, Text, Spinner, Heading, Button} from '@shoutem/ui';
import api from '../services/api';

import { HeaderNavigationBar } from '../components/menu/HeaderNavigationBar';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount(){
        this.loadFilms();
    }

    state = {
        results: [],
        page:1,
    }

    loadFilms = async (page = 1) => {
        const response = await api.get(`/trending/movie/day?api_key=7de1111e4ea9fa0dc45893f3c81297b3&language=en-US&page=${page}`);
        const {results,  ...filmInfo} = response.data;
        this.setState({
            results: [... this.state.results, ...results],
            filmInfo,
            page
        });
    }

    loadMore = () => {
        const {page, filmInfo} = this.state;
        if(page === filmInfo.pages) return;

        const pageNumber = page + 1;

        this.loadFilms(pageNumber);
        //this.props.navigation.navigate('Film')
    }


    renderRow(rowData, sectionId, index) {
        if (index % 4 == 0) {
            return (
            <TouchableOpacity
                onPress={() =>  {this.props.navigation.navigate('FilmDetail', {
                    filmID: rowData[0].id,
                    filmTitle: rowData[0].title
                })}}
                key={index}
            >
                <ImageBackground
                styleName="large"
                source={{uri: `http://image.tmdb.org/t/p/w500/${rowData[0].backdrop_path}`}}
                >
                <Tile>
                    <Title styleName="md-gutter-bottom">{rowData[0].title}</Title>
                </Tile>
                </ImageBackground>
                <Divider styleName="line" />
            </TouchableOpacity>
            );
        }
    
        const cellViews = rowData.map((item, id) => {
            return (
                <TouchableOpacity
                onPress={() =>  {this.props.navigation.navigate('FilmDetail', {
                    filmID: item.id,
                    filmTitle: item.title
                })}}
                    key={id}
                    styleName="flexible"
                >
                    <Card styleName="flexible">
                        <Image
                            styleName="medium-wide"
                            source={{uri: `http://image.tmdb.org/t/p/w500/${item.backdrop_path}`}}
                        />
                        <View styleName="content">
                            <Subtitle numberOfLines={3}>{item.title}</Subtitle>
                        </View>
                    </Card>
                </TouchableOpacity>
            );
        });
    
        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        );
    }

    filmDetail = (index) => {
        console.log(`you pressed ${index}`);
    }
      
    render() {
        const results = this.state.results;
        let isFirstArticle = true;
        const groupedData = GridRow.groupByRows(results, 2, () => {
            if (isFirstArticle) {
            isFirstArticle = false;
            return 2;
            }
            return 1;
        });
    
        return (
            <Screen>
                <ListView
                    data={groupedData}
                    renderRow={this.renderRow}
                    onLoadMore={this.loadMore}
                    loadMoreSpinner={<Spinner />}
                />
            </Screen>
        );
    }
}