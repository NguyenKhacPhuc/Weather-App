import React from 'react';
import {  ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image
    } from 'react-native';
import {Input} from "react-native-elements";
import {Font} from "expo";

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            temps:
                {aver:0,min: 10, max: 20}

            ,
            search : 'London',
            color: 'white'
            }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Merriweather-Black': require('assets/Fonts/Merriweather-Black.tff')
        });
        let response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + this.state.search + '&appId=ee1ed1ec123bbc30396844f1dd99fa2a&units=metric');
        let jsn = await response.json();
        this.setState({
            temps :
                {aver: jsn.list[0].main.temp,min: jsn.list[0].main.temp_min, max: jsn.list[0].main.temp_max},


        })
    }

    render() {

        const tabs = '       ---          ';
        if(this.state.isLoading) {
            return (

                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#yellow"/>

                </View>
            )
        }else {
            return (
                <View style = {styles.container}>
                    <View style = {styles.half1}>
                        <Input style = {styles.searchBar}
                            placeholder='Enter Location'
                        />
                        <ImageBackground style={{width: '100%', height: '100%'}}
                        source={{uri: 'https://i.pinimg.com/564x/b5/9c/e2/b59ce233ad9860559ce6515cf8aa2f5f.jpg'}}>
                        <Text style = {styles.city}> {this.state.search}</Text>
                            <Image  style={styles.icon} source={{uri: 'https://image.flaticon.com/icons/svg/2204/2204339.svg'}}/>
                            <Text style={styles.textModify} >{this.state.temps.aver}</Text>
                            <Text  style = {styles.tempMinMax}>{this.state.temps.min}{tabs}{this.state.temps.max}</Text>
                        </ImageBackground>
                    </View>
                    <View style = {styles.half2}>

                    </View>
                </View>
            );
        }

        }
    }
const styles = StyleSheet.create({
    container: {
     flex:1
    },
    half1: {
        flex:2,
        backgroundColor: 'white',
    },
    half2: {
        flex:0.5,
        backgroundColor: 'grey',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        borderWidth: 1,
        borderColor: '#fff'
    },
    searchBar: {
        backgroundColor: 'white'
    },
    textModify: {
        marginTop:'10%',
        marginLeft: '38%',
        fontSize: 40
    },
    tempMinMax:{
        marginLeft: '35%',
        fontFamily: "Merriweather-Black"
    },
    city:{
       textDecorationColor: 'blue',
        marginLeft:'25%',
        fontSize: 50
    },
    icon: {
        width: 200,
        height: 200,
        marginLeft: '25%',
        marginTop: '5%'
    }
});


