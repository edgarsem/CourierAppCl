import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles/StyleSheet";

import {default as AntDesign} from 'react-native-vector-icons/AntDesign';
import {default as Entypo} from 'react-native-vector-icons/Entypo';

function MainScreen({ navigation }) {

    return(
        <View style={{
        paddingHorizontal: 60,
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 100,
        borderWidth: 5,
        borderColor: '#176B87',
        backgroundColor: '#fff',
        }}>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Pressable
                    style={{
                        width: 190,
                        borderWidth: 8,
                        borderColor: '#00A9FF',
                        borderRadius: 20,
                        borderCurve: 20,
                        marginBottom: 40,
                    }}
                    onPress={() => {navigation.navigate("New Delivery Form 1#")}}
                >
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <AntDesign name='export' size={100} color='#00A9FF'/>
                        <Text style={styles.titleStyle}>New Delivery</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={{
                        width: 190,
                        borderWidth: 8,
                        borderColor: '#00A9FF',
                        borderRadius: 20,
                        borderCurve: 20,
                        marginBottom: 40,
                    }}
                    onPress={() => {navigation.navigate("History")}}
                >
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Entypo name='text-document' size={110} color='#00A9FF'/>
                        <Text style={styles.titleStyle}>Deliveries</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={{
                        width: 190,
                        borderWidth: 8,
                        borderColor: '#00A9FF',
                        borderRadius: 20,
                        borderCurve: 20,
                        marginBottom: 40,
                    }}
                    onPress={() => {navigation.navigate("Profile")}}
                >
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <AntDesign name='user' size={100} color='#00A9FF'/>
                        <Text style={styles.titleStyle}>Profile</Text>
                    </View>
                </Pressable>
            </View>
        </View>

    );
};

export default MainScreen;