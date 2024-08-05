import { StyleSheet } from "react-native";

const style= StyleSheet.create({
    container: {
         flex: 1,
        padding: 5,
       
    },
       
    card:{
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1  ,
        borderColor: 'gray',
        padding: 10,
        margin: 5,
        // Add any additional styles as needed
    },
    posteItem:{
       color: "black",
       fontFamily: "serif",
       fontSize: 14,
       fontWeight: '600',
       textAlign: 'left',
       alignContent: 'flex-start',
       justifyContent: 'flex-center',
       alignSelf: 'center',
       },
       expire:{
        padding: 5,
        borderRadius: 10,
        color: "white",
        backgroundColor: "red",
        fontFamily: "serif",
        fontSize: 14,
        
        
        
        fontWeight: '600',
        textAlign: 'center',
        alignContent: 'flex-start',
        justifyContent: 'flex-center',
        alignSelf: 'center',
        borderRadius: 10,
       }
        
})

export default style