// * This is the music view component
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MusicDetail from './MusicDetail';

const MusicView = ({ route, navigation }) => {
    // Extract music details from route parameters
    const { music } = route.params;
    const { artist } = route.params;

    // State variables
    const [isFavorite, setIsFavorite] = useState(false); // State to track if the music is favorite
    const [isPause, setIsPause] = useState(false); // State to track play/pause
    const [isShuffled, setIsShuffled] = useState(false); // State to track shuffle mode
    const [isRepeatOne, setIsRepeatOne] = useState(false); // State to track repeat mode
    const [progress, setProgress] = useState(0); // State to track playback progress
    const [lyricsExpanded, setLyricsExpanded] = useState(false); // State to manage expanded/collapsed lyrics view
    const [musicExpanded, setMusicExpanded] = useState(false); // State to manage expanded/collapsed music details view
    const translateY = new Animated.Value(0); // Animated value for handling view transitions

    // UseEffect to simulate track progress and update progress bar
    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + 0.01;
                if (nextProgress >= 1) {
                    clearInterval(intervalId);
                    return 1;
                }
                return nextProgress;
            });
        }, 500);

        return () => clearInterval(intervalId); // Cleanup function to clear interval
    }, []); // Run effect only once on component mount

    // Toggle play/pause state
    const handlePlay = () => {
        setIsPause(!isPause);
        console.log('Play music:', music.title);
    };

    // Handle next track action
    const handleNext = () => {
        console.log('Next track');
    };

    // Handle previous track action
    const handlePrev = () => {
        console.log('Previous track');
    };

    // Toggle favorite state
    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    // Toggle shuffle state
    const handleToggleShuffle = () => {
        setIsShuffled(!isShuffled);
    };

    // Toggle repeat state
    const handleToggleRepeat = () => {
        setIsRepeatOne(!isRepeatOne);
    };

    // Toggle lyrics view and animate transition
    const toggleLyrics = () => {
        setLyricsExpanded(!lyricsExpanded);
        Animated.timing(translateY, {
            toValue: lyricsExpanded ? 0 : -500, // Slide up or down by 500 units
            duration: 300, // Animation duration
            useNativeDriver: true,
        }).start();
    };

    // Toggle expanded music details view and animate transition
    const togglePlayNext = () => {
        setMusicExpanded(!musicExpanded);
        Animated.timing(translateY, {
            toValue: musicExpanded ? 0 : -600, // Slide up or down by 600 units
            duration: 200, // Animation duration
            useNativeDriver: true,
        }).start();
    };


    return (
        <View style={styles.container}>

            <View style={styles.artistContainer}>
                {/* Go Back Button */}
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                {/* Open Music Options */}
                <TouchableOpacity style={styles.goBackButton} onPress={togglePlayNext}>
                    <FontAwesome6 name="ellipsis-vertical" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>


            {/* Album Art */}
            <Image source={music.thumbnail ? { uri: music.thumbnail } : null} style={styles.albumArt} />

            {/* Linear Gradient Background */}
            <LinearGradient colors={['#57301C', 'transparent']} style={styles.gradient}>

                {/* Music Player */}
                <View style={styles.musicPlayer}>
                    <View style={styles.artistContainer}>
                        {/* Music Title */}
                        <Text style={styles.title}>{music.title}</Text>
                        {/* Add to Favorite */}
                        <TouchableOpacity style={styles.additionalControlButton} onPress={handleToggleFavorite}>
                            <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? '#FF495C' : '#CCCCCC'} />
                        </TouchableOpacity>
                        {/* Open Play Next Queue */}
                        <TouchableOpacity style={styles.controlButton} onPress={() => navigation.navigate('Recommended', { music: music })}>
                            <FontAwesome name="bars" size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.artist}>
                        {/* Artiste Name */}
                        <TouchableOpacity onPress={() => navigation.navigate('ViewArtiste', { artistName: music.artist })}>
                            <Text style={styles.artist}>{music.artist}</Text>
                        </TouchableOpacity>
                    </Text>


                    {/* Progress Bar */}
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                    </View>

                    {/* Playback Controls */}
                    <View style={styles.controlsContainer}>
                        {/* Shuffle button with red color indication */}
                        <TouchableOpacity style={styles.additionalControlButton} onPress={handleToggleShuffle}>
                            <FontAwesome name="random" size={24} color={isShuffled ? '#FF495C' : '#CCCCCC'} />
                        </TouchableOpacity>
                        {/* Previous Song Button */}
                        <TouchableOpacity style={styles.controlButton} onPress={handlePrev}>
                            <FontAwesome name="step-backward" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        {/* Toggle Pause and Play Button */}
                        <TouchableOpacity style={styles.controlButton} onPress={handlePlay}>
                            <FontAwesome name={isPause ? 'play' : 'pause'} size={24} color={isPause ? '#FFF' : '#CCCCCC'} />
                        </TouchableOpacity>
                        {/* Next Song Button */}
                        <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
                            <FontAwesome name="step-forward" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        {/* Repeat button with red indicator */}
                        <TouchableOpacity style={styles.additionalControlButton} onPress={handleToggleRepeat}>
                            <FontAwesome name={isRepeatOne ? 'repeat' : 'repeat'} size={24} color={isRepeatOne ? '#FF495C' : '#CCCCCC'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>



            {/* Playing Next Section */}
            <Animated.View style={[styles.musicContainer, { transform: [{ translateY }] }]}>
                {musicExpanded && (
                    <View style={styles.musicContent}>
                        <TouchableOpacity style={styles.musicHeader} onPress={togglePlayNext}>
                            {/* <Text style={styles.lyricsHeaderText}>{lyricsExpanded ? 'Close Lyrics' : 'close'}</Text> */}
                            <FontAwesome name="times" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        {/* Display Music Details */}
                        <MusicDetail />
                    </View>
                )}
            </Animated.View>


            {/* Lyrics Section */}
            <Animated.View style={[styles.lyricsContainer, { transform: [{ translateY }] }]}>
                <TouchableOpacity style={styles.lyricsHeader} onPress={toggleLyrics}>
                    {/* Open and Close Lyrics */}
                    <Text style={styles.musicHeaderText}>{lyricsExpanded ? 'Close Lyrics' : 'Open Lyrics'}</Text>
                </TouchableOpacity>
                {lyricsExpanded && (
                    <View style={styles.lyricsContent}>
                        <Text style={styles.lyricsText}>
                            {/* Add your lyrics content here */}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit officiis aut magni aliquam rem voluptas vitae consequatur, nostrum minus libero quasi asperiores accusamus debitis, nihil molestiae, praesentium inventore excepturi. Minus, dolores ullam? Sit obcaecati debitis ipsa fuga repellendus. Illo, iusto. Neque consequuntur officiis, libero, fugit optio fuga, nesciunt ullam corrupti laborum adipisci nam maiores soluta sapiente. Unde, repellendus ipsum eos architecto mollitia temporibus illo repudiandae exercitationem corrupti adipisci velit, dolore at asperiores non voluptatibus, dolorem incidunt quaerat dicta ex consequuntur aspernatur amet. Aliquam vel, ullam ipsam fugiat nulla minus? Molestias ad at assumenda iure ipsa! Est qui tempora pariatur culpa asperiores ducimus amet quod velit quos, ratione sed, suscipit aliquam error explicabo id rerum voluptates odit minus nam blanditiis possimus, quibusdam at expedita. Optio laborum excepturi qui eveniet deleniti hic accusamus ipsam, sit esse nisi voluptatum maiores cumque aliquid numquam ad quod voluptate neque veritatis? Aspernatur blanditiis odit sed ducimus reprehenderit provident! Vero, earum quod consequatur atque veritatis facilis sint eaque repudiandae at iste necessitatibus totam sequi animi voluptatem, magnam dolor optio? Officia laboriosam culpa, necessitatibus id consequatur ratione fuga ut sit libero architecto eaque tempora minus suscipit placeat voluptatibus autem, natus quidem repudiandae magnam illum corrupti pariatur ad! Suscipit asperiores veniam dolores quis aspernatur alias consequuntur nihil et quo, explicabo minus pariatur doloribus quidem odit maiores! Consectetur eos veritatis, recusandae repudiandae expedita a ratione, ex ad, in molestias labore. Amet beatae atque quibusdam at quidem laborum sunt pariatur obcaecati exercitationem quisquam eius quis maiores, accusantium totam, libero dicta officia, sapiente nam veniam illum sequi corporis? Omnis ab repellendus ducimus, doloremque adipisci repudiandae officia libero cumque, impedit illo asperiores similique. Veniam ipsa esse alias commodi et! Doloribus, aliquid? Perferendis quasi sed in iure aut, magnam rerum facilis? Reprehenderit ipsam veritatis nostrum iure modi ab tempore suscipit atque. Nostrum, repellendus voluptatum.
                        </Text>
                    </View>
                )}
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 10,
        marginTop: 15,
        paddingTop: 30,
        paddingHorizontal: 3,
    },
    albumArt: {
        width: '95%',
        height: '50%',
        borderRadius: 10,
        marginBottom: 20,
    },
    musicPlayer: {
        // alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    artist: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'left', // Align text to the left
    },

    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 20,
    },
    controlButton: {
        padding: 10,
        borderRadius: 30,
    },
    additionalControlButton: {
        padding: 10,
    },
    progressBarContainer: {
        marginBottom: 20,
        width: 350,
        height: 5,
        backgroundColor: '#fe7958',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    goBackButton: {
        paddingVertical: 15,
        paddingTop: 50,
        // paddingLeft: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    lyricsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#57301C',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '100%',
    },
    musicContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#222827',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '100%',
    },
    lyricsHeader: {
        alignItems: 'center',
        marginBottom: 0,
    },
    musicHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 0,
    },
    lyricsHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    musicHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    lyricsText: {
        color: '#fff',
        marginTop: 20,
        fontSize: 14,
    },
    lyricsContent: {
        maxHeight: '100%',
        overflowY: 'auto',
    },
    musicContent: {
        maxHeight: '100%',
        overflowY: 'auto',
    },
    artistContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20,
        width: '90%', // Adjust the width as needed
    },
});

export default MusicView;
