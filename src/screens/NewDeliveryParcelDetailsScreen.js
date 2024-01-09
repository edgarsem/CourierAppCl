import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, Text, KeyboardAvoidingView, ScrollView, Platform, Button } from "react-native";


function NewDeliveryParcelDetailsScreen({ navigation }) {
    const [ title, setTitle ] = useState('')
    const [ length, setLength ] = useState('')
    const [ width, setWidth ] = useState('')
    const [ height, setHeight ] = useState('')
    const [ weight, setWeight ] = useState('')
    const [ details, setDetails ] = useState('')


    return(
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "android" ? "height" : "height"}
            >
                <ScrollView 
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    paddingVertical: 0,
                }}>
                    <View style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        backgroundColor: '#ecf0f1',
                        borderWidth: 5,
                        borderColor: '#176B87' 
                    }}>
                        <View style={{justifyContent: 'space-evenly', borderColor: '#00A9FF',
                            borderWidth: 8,
                            borderRadius: 20,
                            borderCurve: 20,
                        }}
                        >
                           <View style={{
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <Text style={{
                                    marginLeft: 20,
                                    marginRight: 20,
                                    fontSize: 16,
                                    color: '#176B87',
                                    fontWeight: '600',
                                    textAlign: 'justify'}}>
                                    Title
                                </Text>
                                <TextInput
                                    style={{backgroundColor: 'white', width: 220, height: 40, marginEnd: 40}}
                                    value={title}
                                    onChangeText={text => setTitle(text)}
                                />
                            </View> 


                            <View style={{
                                
                                marginTop: 40,
                                marginLeft: 20,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                                }}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#176B87',
                                        fontWeight: '600',
                                        textAlign: 'justify'}}
                                        >
                                        Length(cm)
                                    </Text>
                                    <TextInput
                                        style={{backgroundColor: 'white', width: 70, height: 40, marginRight: 40}}
                                        value={length}
                                        onChangeText={text => setLength(text)}
                                        />
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#176B87',
                                        fontWeight: '600',
                                        textAlign: 'justify'}}
                                        >
                                        Width(cm)
                                    </Text>
                                    <TextInput
                                        style={{backgroundColor: 'white', width: 70, height: 40, marginRight: 40}}
                                        value={width}
                                        onChangeText={text => setWidth(text)}
                                        />
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#176B87',
                                        fontWeight: '600',
                                        textAlign: 'justify'}}>
                                        Height(cm)
                                    </Text>
                                    <TextInput
                                        style={{backgroundColor: 'white', width: 70, height: 40}}
                                        value={height}
                                        onChangeText={text => setHeight(text)}
                                        />
                                </View>
                            </View>


                            <View style={{
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                                <View style={{flexDirection: 'column',}}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#176B87',
                                        fontWeight: '600',
                                        textAlign: 'justify'}}>
                                        Weight(g)
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                    <TextInput
                                        style={{backgroundColor: 'white', width: 100, height: 40, marginRight: 40}}
                                        value={weight}
                                        onChangeText={text => setWeight(text)}
                                        />
                                    </View>
                        
                                </View>
                                </View>


                                <View style={{
                                    marginTop: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    }}>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#176B87',
                                            fontWeight: '600',
                                            textAlign: 'justify'}}
                                            >
                                            Details/Handling 
                                            </Text>
                                        <TextInput
                                            multiline
                                            style={{backgroundColor: 'white', height: 250, width: 300}}
                                            value={details}
                                            onChangeText={text => setDetails(text)}
                                            />
                                    </View>
                                </View>
                                
                                <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40}}>

                                
                                    <View style={{}}>
                                        <Button style={{
                                            }}
                                            title='Return'
                                            onPress={() => {navigation.replace("Home")}}
                                        />
                                    </View>
                                    <View style={{}}>
                                        <Button style={{
                                            }}
                                            title='Proceed'
                                            onPress={() => {navigation.replace("New Delivery Form 2#",
                                            {
                                                parcel: {
                                                    title: title,
                                                    length: length,
                                                    width: width,
                                                    height: height,
                                                    weight: weight,
                                                    details:details
                                                }
                                            }
                                            )}}
                                        />
                                    </View>

                                </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

    );
};

export default NewDeliveryParcelDetailsScreen;