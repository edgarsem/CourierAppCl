import React, {createContext, useState} from "react";
import uuid from 'react-native-uuid';

const PostContext = createContext();

const PostProvider = ({ children }) => {

    const [ user, setUser ] = useState({
        uid: null,
        name: null,
        lastName: null,
        email: null,
    });

    const setUserData = (newUser) => {
        setUser(newUser);
    };

    return (
        <PostContext.Provider value = {{ user, setUserData }}>
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };