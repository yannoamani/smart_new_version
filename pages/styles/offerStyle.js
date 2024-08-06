import { StyleSheet } from "react-native";

const style= StyleSheet.create({
 container:{
    flex: 1,
    padding:10,
    backgroundColor:'#F1F2F4'
 },
 
 card:{
    backgroundColor: 'white',
        borderRadius: 10,
        
        borderColor: 'gray',
        padding: 10,
        marginTop: 20,
        
  shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
  shadowOpacity: 0.5,
  shadowRadius: 2, // Rayon de l'ombre
 },
 item:{
    flexDirection:'row', alignItems:'center', alignSelf:'center', width:'100%', 
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
       fontSize: 15,
       fontWeight: '500',
       textAlign: 'left',
       alignContent: 'flex-start',
     
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
     
},
sub:{
   fontSize: 15,
   fontWeight:'500',
   color:'black',
   marginTop: 4
}
});
export default style