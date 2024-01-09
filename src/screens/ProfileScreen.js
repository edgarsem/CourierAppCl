import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from "../styles/StyleSheet";
import { PostContext } from '../contexts/PostContext';

const ProfileScreen = ({ navigation }) => {
    const { user } = useContext(PostContext);

    return(
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                padding: 8,
              }}
            behavior='padding'
        >
            <View style={{
                marginLeft: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                marginLeft: 30,
                marginRight: 30,
                borderColor: '#00A9FF',
                borderWidth: 8,
                padding: 8,
                borderRadius: 20,
                borderCurve: 20,
            }}>
                <Text style={[styles.titleStyle, {color: '#006399', marginBottom: 40, marginTop: 40, marginLeft: 20, height: 40}]}>
                    Name: {user.name}
                </Text>
                <Text 
                style={[styles.titleStyle, {color: '#006399', marginBottom: 40, marginTop: 40, marginLeft: 20, height: 40}]}
                >
                    Last Name: {user.lastName}
                </Text>
                <Text style={[styles.titleStyle, {color: '#006399', marginBottom: 40, marginTop: 40, marginLeft: 20, height: 40}]}>
                    Email: {user.email}
                </Text>
            </View>
            
            <View style={{
                marginTop: 30,
                marginLeft: 130, marginRight: 130, 
                justifyContent: 'space-around'}}>
                <Button style={{
                    }}
                    title='Return'
                    onPress={() => {navigation.navigate("Home")}}
                />
            </View>
            <View style={{
                marginTop: 30,
                marginLeft: 130, marginRight: 130, 
                justifyContent: 'space-around'}}>
                <Button style={{
                    }}
                    title='Log Out'
                    onPress={() => {navigation.replace("Login")}}
                />
            </View>
        </View>
    );
}


export default ProfileScreen;