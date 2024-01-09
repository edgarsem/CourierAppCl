import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestoreDatabase } from "../firebase/firebaseConfig";
import MapViewDirections from "react-native-maps-directions";
import { handleUpdateDeliveryState } from "../firebase/firebaseOperations";

function DeliveryStatusScreen({ navigation, route }) {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDDGK7Wsg291cIoGJX0QtCsXma7zVnuFB0';
    const deliveryId = route.params.deliveryId
    const parcel = route.params.parcel
    const [ currentLocation, setCurrentLocation ] = useState(null);
    const [ goalLocation, setGoalLocation ] = useState(parcel.userGPS);
    const [ courierLocation, setCourierLocation ] = useState(null);
    const [ deliveryStatus, setDeliveryStatus ] = useState('');
    const [ deliveryDetails, setDeliveryDetails ] = useState('');
    const [ cancelButtonState, setCancelButtonState ] = useState(true)

    useEffect(() => {
        const setStatus = (state) => {
                switch (state){
                    case 'accepted':
                        setDeliveryStatus('Accepted')
                        setDeliveryDetails('The courier is on his way to pick up your parcel...')
                        break;
                    case 'delivering':
                        setCancelButtonState(false)
                        setGoalLocation(parcel.recipientGPS)
                        setDeliveryStatus('Delivering')
                        setDeliveryDetails('The courier is delivering your parcel to your destination...')
                        break;
                    case 'completed':
                        setDeliveryStatus('Completed')
                        setDeliveryDetails('The courier has reached your destination...')
                        navigation.replace("Delivery Completed", {parcel: parcel, deliveryId: deliveryId})
                        break;
                    case 'canceled':
                        handleUpdateDeliveryState('canceled', deliveryId)
                        setDeliveryStatus('Canceled')
                        setDeliveryDetails('Your delivery has been canceled....')
                        navigation.replace("Delivery Canceled", {parcel: parcel, deliveryId: deliveryId})
                        break;
                    default:
                        break;
                }
        }
        const unsubscribe = onSnapshot(doc(firestoreDatabase, 'deliveries', deliveryId), (doc) => {
            if (doc.exists()) {
                const data = doc.data()
                setCourierLocation(data.courierGPS)
                setCurrentLocation(data.courierGPS)
                setStatus(data.status)
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ecf0f1',
            borderWidth: 5,
            borderColor: '#176B87' 
        }}>
            
            {courierLocation && (
            <MapView 
                style={{alignSelf: 'stretch', flex: 1}} 
                initialRegion={{
                    latitude: courierLocation.latitude,
                    longitude: courierLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    <MapViewDirections
                        origin={currentLocation}
                        destination={goalLocation}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={6}
                        strokeColor="red"
                        mode="DRIVING"
                    />
                    <Marker
                        coordinate={courierLocation}
                        pinColor={'red'}
                        title="Courier's Location"
                    />
                    <Marker
                        coordinate={parcel.userGPS}
                        pinColor={'blue'}
                        title="Your Location"
                    />
                    <Marker
                        coordinate={parcel.recipientGPS}
                        pinColor={'blue'}
                        title="Recipient's Location"
                    />

            </MapView>
            )}
            
            <View style={{ flex: 1 , flexDirection: 'column', alignItems: 'center'}}>
                <View style={{ marginVertical: 20, borderColor: '#00A9FF', borderWidth: 6, borderRadius: 10}}>
                    <Text style={{
                        marginLeft: 20,
                        marginRight: 20,
                        fontSize: 20,
                        color: '#006399',
                        fontWeight: '600',}}>
                        Delivery Status: {deliveryStatus}
                    </Text>
                </View>
                
                <Text style={{
                        marginLeft: 20,
                        marginRight: 20,
                        fontSize: 14,
                        color: '#3085C3',
                        fontWeight: '600',
                    }}>
                        {deliveryDetails}
                </Text>
                
                
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
                        Sender's location:
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
                        Recipient's location:
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
                </View>

                {cancelButtonState && (
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 40}}>
                    <View style={{}}>
                        <Button style={{
                            }}
                            title='Cancel'
                            onPress={() => {handleUpdateDeliveryState('canceled', deliveryId)}}
                        />
                    </View>
                </View>
                )}

            </View>
        </View>
    );
};

export default DeliveryStatusScreen;