import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlbumView = ({ route }) => {
    const { album } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{album.title}</Text>
            <Text style={styles.artist}>{album.artist}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    artist: {
        color: '#aaa',
        fontSize: 18,
    },
});

export default AlbumView;
