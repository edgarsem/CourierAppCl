import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { View, TextInput, Text, Button, Modal } from "react-native";
import { handleCloseDelivery, handleCreateDeliveryInHistory, handleCreateNewPost, handleGetDelivery } from "../firebase/firebaseOperations";

import {default as Feather} from 'react-native-vector-icons/Feather';

function DeliveryCanceledScreen({ navigation, route }) {
    const { user } = useContext(PostContext);
    const [ delivery, setDelivery ] = useState()
    const deliveryId = route.params.deliveryId

    useEffect(() => {
        const getDelivery = async () => {
            try {
                const temp = await handleGetDelivery(deliveryId);
                setDelivery(temp);
            } catch (error) {
                console.log(error);
            }
        };
        getDelivery()
    }, []);

    const handleCloseScreen = async () => {
        try {
            handleCreateDeliveryInHistory(deliveryId, user.uid, user.name, user.lastName, delivery, 'canceled');
            navigation.navigate("Home")
        } catch (error) {
            (error == '[FirebaseError: Firebase: Error.]') ? alert(''.message) : alert(error.message);
            console.log("", error);
        }
    };


    return (
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
                                marginLeft: 30,
                                marginTop: 40,
                                marginRight: 30,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                                <Feather name='flag' size={60} color='#00A9FF'/>
                            </View>
    
                            <View style={{
                                marginLeft: 10,
                                marginTop: 40,
                                marginRight: 10,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <View style={{flexDirection: 'column', marginBottom: 40}}>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Delivery was canceled!
                                    </Text>
                                </View>
    
    
                            </View>
    
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40}}>
                                    <View style={{}}>
                                        <Button style={{
                                            }}
                                            title='Proceed'
                                            onPress={() => {handleCloseScreen()}}
                                        />
                                    </View>
    
                                </View>
                        </View>
                    </View>
      );
};

export default DeliveryCanceledScreen;