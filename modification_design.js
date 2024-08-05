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
    fontSize: 15,
    fontWeight: '300',
    color: "black",
    flexDirection: "column",
    textAlign: "left",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  inputCustom:{
    width: "100%",
    height: 55,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft:22,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
 },
 customButon:{
    backgroundColor: "#87CEEB",
    width: "100%",
    height: 48,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",

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
  margin: 16,
  height: 50,
  borderBottomColor: 'gray',
 
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderRadius: 10,
  borderColor: "black",
  borderWidth: 1,
  padding: 10,


  
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
