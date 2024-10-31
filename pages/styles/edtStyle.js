import { StyleSheet } from "react-native";
const style= StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
    
    },
    card:{
        width: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        
     
      backgroundColor: 'white',
      marginBottom: 5,
      padding: 15,
      borderRadius: 18,
      marginBottom: 20,
    },
    itemCard:{
        color: "black",
        fontFamily: "serif",
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'left',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        // alignSelf: 'start',
    }
    
})
export default style