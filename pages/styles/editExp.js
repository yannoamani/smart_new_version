import { StyleSheet } from 'react-native';

const style= StyleSheet.create({
    container:{
        flex: 1,
        padding:10,
        // alignContent:'center',
        // justifyContent:'center',
    },
    title:{

        fontFamily:'poppins',
        color: "black",
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    label:{

        fontFamily:'poppins',
        color: "gray",
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'left',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    input:{
        height:50,
        borderColor:"black",
        borderWidth:1,
        paddingLeft:10,
        borderRadius:10,
        width:'100%'
    },
    textarea:{
        height:100, borderColor:'black',borderWidth:1, 
        borderRadius:10, paddingLeft:10
    },
    button:{
        backgroundColor:'#00bfff',
        height:50,
        width:"100%",
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10

    },
    textButton:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    carre:{
        width:'100%',
        height:150,
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    
dropdown: {
    // margin: 16,
    height: 60,
    borderBottomColor: 'gray',
     width:"100%",
   
    // alignItems: 'center',
    // justifyContent: 'center',
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

})
export default style