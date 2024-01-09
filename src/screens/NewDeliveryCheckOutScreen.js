import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { View, TextInput, Text, KeyboardAvoidingView, ScrollView, Platform, Button, Modal } from "react-native";
import { styles } from "../styles/StyleSheet";
import { handleCloseDelivery, handleCreateNewPost, handleGetPost, handleOpenDelivery, handleUpdatePost, watchForDeliveryAccept } from "../firebase/firebaseOperations";

import {default as Feather} from 'react-native-vector-icons/Feather';
import {default as Octicons} from 'react-native-vector-icons/Octicons';

function NewDeliveryCheckOutScreen({ navigation, route }) {
    const parcel = route.params.parcel
    const { user } = useContext(PostContext);
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ distance, setDistance ] = useState()
    const [ duration, setDuration ] = useState()
    const [ cost, setCost ] = useState()
    const [ tempParcelId, setTempParcelId ] = useState(null)



    useEffect(() => {

        const GOOGLE_MAPS_APIKEY = 'AIzaSyDDGK7Wsg291cIoGJX0QtCsXma7zVnuFB0';
        const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${parcel.userGPS.latitude},${parcel.userGPS.longitude}&destination=${parcel.recipientGPS.latitude},${parcel.recipientGPS.longitude}&key=${GOOGLE_MAPS_APIKEY}`;

        fetch(directionsUrl)
        .then(response => response.json())
        .then(result => {
            if (result.routes.length) {
            const route = result.routes[0];

            setDistance((route.legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000).toFixed(1))
            setDuration((route.legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 60).toFixed(1))
            }
        })
        .catch(error => {
            console.error(error);
        });
    }, []);


    useEffect(() => {
        if (distance && duration) {
            setCost((
                3 + 
                ((parcel.length * parcel.width * parcel.height) * 0.000025) + 
                (parcel.weight * 0.00025) + 
                (distance * 0.25) +
                (duration * 0.05)
            ).toFixed(1));
        }
    }, [distance, duration, parcel]);


    const handleHireClick = async () => {
        setModalVisible(true);
        try {
            const tempDocRef = await handleOpenDelivery(user.uid, parcel, distance, duration, cost)
            setTempParcelId(tempDocRef)
            monitorDeliveryAccept(tempDocRef)
        } catch (error) {
            console.log(error);
        }
    }

    const monitorDeliveryAccept = async (deliveryId) => {
        try {
            const unsubscribe = await watchForDeliveryAccept(deliveryId, () => {
                console.log(distance + duration + cost)
                navigation.replace("Delivery Status", {deliveryId: deliveryId, parcel: parcel});
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelClick = async () => {
        setModalVisible(false);
        try {
            await handleCloseDelivery(tempParcelId)
            setTempParcelId(null)
        } catch (error) {
            console.log(error);
        }
        
    }



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
                    backgroundColor: "#ecf0f1",
                    borderRadius: 20,
                    padding: 8,
                    alignItems: "center",
                    borderColor: '#00A9FF',
                    borderWidth: 8,
                    borderRadius: 20,
                    borderCurve: 20,
                    paddingVertical: 60}}>
                    <Text style={[styles.titleStyle, {marginBottom: 10}]}>
                        Searching for courier...
                    </Text>
                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 40}]}>
                        This might take a while...
                    </Text>
                    <Button
                        title='Cancel'
                        onPress={() => {handleCancelClick()}}
                    />
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
                            <View style={{alignItems: 'center'}}>
                                <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    {parcel.title}
                                </Text>

                            </View>
                            <View style={{
                                marginLeft: 30,
                                marginTop: 40,
                                marginRight: 30,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <Feather name='home' size={60} color='#00A9FF'/>
                                <View style={{flexDirection: 'column', alignItems: 'center'}}>

                                    <Octicons name='package-dependents' size={50} color='#00A9FF'/>
                                    <Text style={styles.titleStyle}>
                                        {distance} km
                                    </Text>
                                </View>
                                <Feather name='map-pin' size={60} color='#00A9FF'/>
                            </View>

                            <View style={{
                                marginLeft: 10,
                                marginTop: 40,
                                marginRight: 10,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                                }}>
                                <View style={{flexDirection: 'column', marginBottom: 40}}>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Your location:
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    {parcel.userAddress}
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'column', marginBottom: 40}}>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Destination location:
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    {parcel.recipientAddress}
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'column', marginBottom: 40}}>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Approximate distance:
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    {distance} km
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'column', marginBottom: 40}}>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Approximate duration:
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    {duration} min
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'column', marginBottom: 40}}>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Cost:
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    {cost} Eur
                                    </Text>
                                </View>
                                
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40}}>

                                
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
                                            title='Hire courier'
                                            onPress={() => {handleHireClick()}}
                                        />
                                    </View>

                                </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

    );
};

export default NewDeliveryCheckOutScreen;