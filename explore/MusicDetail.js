// * This screen will display details for the music and how to upgrade
// ! This needs to be updated and routed accordingly
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const MusicDetail = () => {
    const musicItems = [
        { title: 'Upgrade to Skimusic+', icon: 'music' },
        { title: 'Add to Favorite', icon: 'heart' },
        { title: 'Share', icon: 'share' },
        { title: 'Download', icon: 'download' },
        { title: 'View Album', icon: 'file-audio' },
        { title: 'View Artiste', icon: 'microphone' },
    ];

    const renderItem = (item) => (
        <TouchableOpacity style={styles.item} key={item.title}>
            <FontAwesome6 name={item.icon} size={20} color="#c6654a" />
            <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {musicItems.map(renderItem)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        paddingBottom: 80,
        // backgroundColor: '#222827',
    },
    item: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginVertical: 10,
    },
    itemText: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
    },
});

export default MusicDetail;
