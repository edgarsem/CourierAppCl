import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, Text, KeyboardAvoidingView, ScrollView, Platform, Button, Pressable, Modal, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";

function NewDeliveryRecipientScreen({ navigation, route }) {
    
    const parcel = route.params.parcel
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ userPhone, setUserPhone ] = useState('')
    const [ userAddress, setUserAddress ] = useState('')
    const [ userGPS, setUserGPS ] = useState(null)
    const [ recipientName, setRecipientName ] = useState('')
    const [ recipientLastName, setRecipientLastName ] = useState('')
    const [ recipientPhone, setRecipientPhone ] = useState('')
    const [ recipientAddress, setRecipientAddress ] = useState('')
    const [ recipientGPS, setRecipientGPS ] = useState(null)
    const [ isUserLocation, setIsUserLocation ] = useState()
    const [ initialPosition, setInitialPosition ] = useState(null)
    const [ markerPosition, setMarkerPosition ] = useState(null)


    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
    
          Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
            timeInterval: 10000,
          }, (location) => {
            setInitialPosition({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            })
            setMarkerPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
          });
        })();
    }, []);


    const handleSetLocation = async () => {
        try {
        const address = await getAddressFromGPS(markerPosition);
            if (isUserLocation) {
                setUserAddress(address);
                setUserGPS(markerPosition);
            } else {
                setRecipientAddress(address);
                setRecipientGPS(markerPosition);
            }
        } catch (error) {
          console.error(error);
        }
        setModalVisible(false);
    };


    const handleIconPress = async (isUser) => {
        
        let address = isUser ? userAddress : recipientAddress;
        let GPSCoords;
        if (address) {
            try {
                const location = await getGPSFromAddress(address);
                if (location !== null) {
                    GPSCoords = location
                }
            } catch (error) {
                console.error(error);
            }
        }
    
        if (GPSCoords) {
          setMarkerPosition(GPSCoords);
        } else {
          setMarkerPosition(initialPosition);
        }
    
        setIsUserLocation(isUser);
        setModalVisible(true);
      };


    const handleMapPress = (e) => {
        setMarkerPosition(e.nativeEvent.coordinate);
    };

    const getGPSFromAddress = async (address) => {
        try {
          let result = await Location.geocodeAsync(address);
          if (result.length > 0) {
            let location = {
              latitude: result[0].latitude,
              longitude: result[0].longitude,
            };
            return location;
          }
        } catch (error) {
          console.error(error);
        }
        return null
      };


    const getAddressFromGPS = async (coordsGPS) => {
        try {
            let result = await Location.reverseGeocodeAsync(coordsGPS);
            if (result.length > 0) {
                let address = ` ${result[0].country} ${result[0].city} ${result[0].street} ${result[0].name}`;
                return address;
            }
        } catch (error) {
            console.error(error);
        }
        return '';
    };

    

    const renderMap = () => {
        if (markerPosition) {
            return (
            <MapView
              style={{ alignSelf: 'stretch', height: 600 }} 
              initialRegion={{
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}>
            <Marker
            coordinate={markerPosition}
            draggable
            onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
            />
            </MapView>
          );
        } else {
            return <Text style={{
                marginLeft: 20,
                marginRight: 20,
                fontSize: 14,
                color: '#3085C3',
                fontWeight: '600',
            }}>Getting your current location...</Text>;
        }
    };


    return(
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "android" ? "height" : "height"}
        >

    <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
    >
        <View style={{flex: 1,
            justifyContent: "center",
            alignItems: "center"}}
        >
          <View style={{
            width: 360,
            margin: 8,
            backgroundColor: "#00A9FF",
            borderRadius: 20,
            padding: 8,
            alignItems: "center"}}>
            {renderMap()}
            <View style={{alignSelf: 'stretch', flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginTop: 10, marginBottom: 10, marginLeft: 50, marginRight: 50}}>
                <Button
                color='#176B87'
                title='Close'
                onPress={() => {setModalVisible(!modalVisible)}
                }/>
                <Button
                color='#176B87'
                title='Set Location'
                onPress={() => {handleSetLocation()}}/>
            </View>
          </View>
        </View>
      </Modal>
            

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
                        <View style={{flexDirection: 'column'}}>
                          <View style={{
                              marginTop: 40,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                              }}>
                              <Text style={{
                                  marginLeft: 10,
                                  fontSize: 12,
                                  color: '#176B87',
                                  fontWeight: '600',
                                  textAlign: 'justify'}}>
                                  Your phone{"\n"}number:
                              </Text>
                              <TextInput
                                  style={{backgroundColor: 'white', width: 220, height: 40, marginEnd: 40}}
                                  value={userPhone}
                                  onChangeText={text => setUserPhone(text)}
                              />
                            </View> 


                            <View style={{
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <Text style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    fontSize: 12,
                                    color: '#176B87',
                                    fontWeight: '600',
                                    textAlign: 'justify'}}>
                                    Your{"\n"}Address:
                                </Text>
                                <TextInput
                                    style={{backgroundColor: 'white', width: 150, height: 40, marginEnd: 20}}
                                    value={userAddress}
                                    onChangeText={text => setUserAddress(text)}
                                />
                                <Pressable
                                    style={{
                                        borderColor: '#00A9FF',
                                        borderWidth: 5,
                                        borderRadius: 5,
                                        borderCurve: 5,
                                        marginEnd: 40,
                                    }}
                                    onPress={() => {handleIconPress(true)}}
                                >
                                    <Icon name='map' size={35} color='#00A9FF'/>
                                </Pressable>
                            </View>

                            <View style={{flexDirection: 'column'}}>
                                <View style={{
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 12,
                                    color: '#176B87',
                                    fontWeight: '600',
                                    textAlign: 'justify'}}>
                                    Recipients{"\n"}Name:
                                </Text>
                                <TextInput
                                    style={{backgroundColor: 'white', width: 220, height: 40, marginEnd: 40}}
                                    value={recipientName}
                                    onChangeText={text => setRecipientName(text)}
                                />
                                </View> 
                            </View>

                            <View style={{flexDirection: 'column'}}>
                                <View style={{
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 12,
                                    color: '#176B87',
                                    fontWeight: '600',
                                    textAlign: 'justify'}}>
                                    Recipients{"\n"}Last Name:
                                </Text>
                                <TextInput
                                    style={{backgroundColor: 'white', width: 220, height: 40, marginEnd: 40}}
                                    value={recipientLastName}
                                    onChangeText={text => setRecipientLastName(text)}
                                />
                                </View> 
                            </View>

                            <View style={{flexDirection: 'column'}}>
                                <View style={{
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 12,
                                    color: '#176B87',
                                    fontWeight: '600',
                                    textAlign: 'justify'}}>
                                    Recipients{"\n"}phone number:
                                </Text>
                                <TextInput
                                    style={{backgroundColor: 'white', width: 200, height: 40, marginEnd: 40}}
                                    value={recipientPhone}
                                    onChangeText={text => setRecipientPhone(text)}
                                />
                                </View> 
                            </View>


                            <View style={{flexDirection: 'column'}}>
                                <View style={{
                                marginTop: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 12,
                                    color: '#176B87',
                                    fontWeight: '600',
                                    textAlign: 'justify'}}>
                                    Recipients{"\n"}address:
                                </Text>
                                <TextInput
                                    style={{backgroundColor: 'white', width: 150, height: 40, marginEnd: 20}}
                                    value={recipientAddress}
                                />
                                <Pressable
                                    style={{
                                        borderColor: '#00A9FF',
                                        borderWidth: 5,
                                        borderRadius: 5,
                                        borderCurve: 5,
                                        marginEnd: 40,
                                    }}
                                    onPress={() => {handleIconPress(false)}}
                                >
                                    <Icon name='map' size={35} color='#00A9FF'/>
                                </Pressable>
                                </View> 
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
                                        onPress={() => {navigation.replace("New Delivery Checkout", 
                                        {
                                            parcel: {
                                                title: parcel.title,
                                                length: parcel.length,
                                                width: parcel.width,
                                                height: parcel.height,
                                                weight: parcel.weight,
                                                details: parcel.details,
                                                userPhone: userPhone,
                                                userAddress: userAddress,
                                                userGPS: userGPS,
                                                recipientName: recipientName,
                                                recipientLastName: recipientLastName,
                                                recipientPhone: recipientPhone,
                                                recipientAddress: recipientAddress,
                                                recipientGPS: recipientGPS
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

export default NewDeliveryRecipientScreen;