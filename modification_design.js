import { StyleSheet } from "react-native";

const modif = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent",
    alignItems: "center",

  },
  container: {
    flex: 1,
    // backgroundColor: "red",
    width: "100%",
    
  },
  containerPicture: {
    height: "20%",
    width: "auto",
    alignItems: "center",
    // backgroundColor:"#87CEEB",
  },
  customText:{
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  customText2:{
    color: "black",
    fontSize: 18,
    fontWeight: '300',
    textAlign: "center",
    color: "grey",
  },
  labelText: {
   color: "black",
      fontSize: 14,
      fontWeight: '500',
      color: "black",
      flexDirection: "column",
      textAlign: "left",
      alignContent: "flex-start",
      justifyContent: "flex-start",
      alignSelf: "flex-start",
  },
  inputCustom:{
  borderColor:'#F38B2B',
   borderWidth:1,
   borderRadius:10,
   borderLeftColor: '#F38B2B',
   borderRightColor: '#1A9E47',
   borderRightColor: '#1A9E47',
   borderLeftColor: '#1A9E47',
   paddingLeft:20,
   padding:10,
   height:40
 },
 customButon:{
  backgroundColor: '#F38B2B',
  width: '100%',
  elevation: 5,
  borderRadius: 10,
  
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 4 }, 
  shadowOpacity: 0.5,
  shadowRadius: 4, 
 
  elevation: 10, 
 

 },
 textCustomButton:{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",

 },
 customButonInscription:{
    backgroundColor: "grey",
    width: "100%",
    height: 48,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",

 },
 modalVIew:{
    flex: 1,
    // backgroundColor: "transparent",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
 },
 modalText:{
  fontSize: 30,
  fontWeight: "bold",
  color: "black",
  textAlign: 'center',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
  alignSelf: 'flex-start',
},
modalText2:{
  fontSize:15,
  fontWeight: '700',
  color: "gray",
  textAlign: 'left',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
  alignSelf: 'flex-start',
},
 

// la page inscrioption de l'utilisateur
headerInscription:{
  color: "black",
  textAlign: "left",
  fontSize: 20,
  fontWeight: "bold",
  

},
dropdown: {
  borderColor:'#F38B2B',
   borderWidth:1,
   borderRadius:10,
   borderLeftColor: '#F38B2B',
   borderRightColor: '#1A9E47',
   borderRightColor: '#1A9E47',
   borderLeftColor: '#1A9E47',
   paddingLeft:20,
   padding:10,
   height:40


  
},
icon: {
  marginRight: 5,
},
placeholderStyle: {
  fontSize: 16,
},
selectedTextStyle: {
  fontSize: 16,
},
iconStyle: {
  width: 20,
  height: 20,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},

});
export default modif;
