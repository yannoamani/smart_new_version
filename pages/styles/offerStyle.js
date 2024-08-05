import { StyleSheet } from "react-native";

const style= StyleSheet.create({
 container:{
    flex: 1,
    padding:5
 },
 
 card:{
    backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1  ,
        borderColor: 'gray',
        padding: 10,
        margin: 5,
 },
 item:{
    flexDirection:'row', alignItems:'center', width:'100%'
 },
 
 image:{
     height: 40, width: 40 ,resizeMode:'cover'
 },
 imageSize:{
    height: "100%", width: "100%" 
 },
 title:{
  
        fontFamily:'poppins',
       color: "black",
       fontFamily: "serif",
       fontSize: 14,
       fontWeight: 'bold',
       textAlign: 'left',
       alignContent: 'flex-start',
       justifyContent: 'flex-center',
       alignSelf: 'center',
    //    flex:1
},
categorie:{
    color:'black',
     flex: 1, fontSize: 15
     ,fontWeight:'500'
},
containerRow:{
    flexDirection:'row',
     alignItems:'center', width:'100%'
},
publication:{
    color:'black',
     flex: 1, fontSize: 15
     ,fontWeight:'500',
     textAlign: 'right',
     alignContent: 'flex-end',
     
}
});
export default style