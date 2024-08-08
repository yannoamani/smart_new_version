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
        fontSize: 13,
        fontWeight: '7  00',
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
      borderColor:'#F38B2B',
      borderWidth:1,
      borderRadius:10,
      borderLeftColor: '#F38B2B',
      borderRightColor: '#1A9E47',
     //  borderBlockEndColor: '#1A9E47',
     //  borderBlockStartColor: '#F38B2B',
      borderRightColor: '#1A9E47',
      borderLeftColor: '#1A9E47',
      paddingLeft:20,
      padding:10,
      height:40
    },
    textarea:{
        height:100, borderColor:'black',borderWidth:1, 
        borderRadius:10, paddingLeft:10
    },
    button:{
        backgroundColor:'#F38B2B',
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
    borderColor:'#F38B2B',
    borderWidth:1,
    borderRadius:10,
    borderLeftColor: '#F38B2B',
    borderRightColor: '#1A9E47',
   //  borderBlockEndColor: '#1A9E47',
   //  borderBlockStartColor: '#F38B2B',
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

})
export default style