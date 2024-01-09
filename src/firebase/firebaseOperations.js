import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { child, equalTo, onValue, orderByChild, push, query, ref, remove, set, update } from 'firebase/database';
import { database, firestoreDatabase } from './firebaseConfig';
import { PostContext } from '../contexts/PostContext';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

export const handleCreateUser = (uid, name, lastName, email) => {
    const postData = {
        name: name,
        lastName: lastName,
        email: email,
        posts: [],
    };
    const updates = {};
    updates['user/' + uid] = postData;
    update(ref(database), updates);
    const userData = {
        uid: uid,
        name: name,
        lastName: lastName,
        email: email,
    };
    return userData
}

export const handleGetUserData = (uid) => {
    return new Promise((resolve, reject) => {
        const userRef = ref(database, 'user/' + uid);
        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = {
                    uid: uid,
                    name: snapshot.val().name,
                    lastName: snapshot.val().lastName,
                    email: snapshot.val().email
                };
                resolve(userData);
            } else {
                reject("User data not found");
            }
        }, (error) => {
            reject(error);
        });
    });
};


export const handleOpenDelivery = async (uid, parcel, distance, duration, cost) => {
    try{
        const docRef = await addDoc(collection(firestoreDatabase, "deliveries"), {
            title: parcel.title,
            length: parcel.length,
            width: parcel.width,
            height: parcel.height,
            weight: parcel.weight,
            details: parcel.details,
            userPhone: parcel.userPhone,
            userAddress: parcel.userAddress,
            userGPS: parcel.userGPS,
            recipientName: parcel.recipientName,
            recipientLastName: parcel.recipientLastName,
            recipientPhone: parcel.recipientPhone,
            recipientAddress: parcel.recipientAddress,
            recipientGPS: parcel.recipientGPS,
            distance: distance,
            duration: duration,
            cost: cost,
            userUID: uid,
            courierUID: null,
            courierGPS: null,
            status: 'open'
        });
        return(docRef.id);
    } catch(e) {
        return null;
    }
};

export const handleCloseDelivery = async (id) => {
    try {
        await deleteDoc(doc(firestoreDatabase, "deliveries", id));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }

};

export const watchForDeliveryAccept = async (id, onAcceptedCallback) => {
    const docRef = doc(firestoreDatabase, 'deliveries', id);

    const unsub = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            if (data.status === 'accepted') {
                unsub();
                onAcceptedCallback();
            }
        } else {
            console.log("No!");
        }
    }, (error) => {
        console.log(error);
    });

    return unsub;
};

export const handleGetDelivery = async (uid) => {
    console.log(uid)
    const docRef = doc(firestoreDatabase, "deliveries", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No!");
    }
}

export const handleCreateDeliveryInHistory = (deliveryId, uid, name, lastName, parcel, status) => {
    const postData = {
        userUID: uid,
        title: parcel.title,
        length: parcel.length,
        width: parcel.width,
        height: parcel.height,
        weight: parcel.weight,
        details: parcel.details,
        userName: name,
        userLastName: lastName,
        userPhone: parcel.userPhone,
        userAddress: parcel.userAddress,
        recipientName: parcel.recipientName,
        recipientLastName: parcel.recipientLastName,
        recipientPhone: parcel.recipientPhone,
        recipientAddress: parcel.recipientAddress,
        distance: parcel.distance,
        duration: parcel.duration,
        cost: parcel.cost,
        courierUID: parcel.courierUID,
        status: status
    };
    const updates = {};
    updates['deliveries/' + deliveryId] = postData;
    update(ref(database), updates);
}



export const handleUpdateDeliveryState = async (newState, deliveryId) => {
    const deliveryDocRef = doc(firestoreDatabase, 'deliveries', deliveryId);
    await updateDoc(deliveryDocRef, {
        status: newState,
    });
};


export const handleGetDeliveryHistory = (uid) => {
    return new Promise((resolve, reject) => {
        const reff = ref(database, 'deliveries/');
        const values = query(reff, orderByChild('userUID'), equalTo(uid));
        onValue(values, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
                resolve(dataArray);
            } else {
                resolve([]);
            }
        }, (error) => {
            reject(error);
        });
    });
};