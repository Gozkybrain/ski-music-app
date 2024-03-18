const goBack = () => {
  navigation.goBack(); // Go back to the previous screen
};


{/* Go Back Button */}
        <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
          <Text style={styles.goBackButtonText}>&#x2190;</Text>
        </TouchableOpacity>




goBackButton: {
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 5,
  alignSelf: 'flex-start',
},

goBackButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  textAlign: 'left',
  fontWeight: 'bold',
},



