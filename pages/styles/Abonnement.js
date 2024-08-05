import { StyleSheet } from "react-native";

const style=StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      period: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
      },
      price: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      description: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
      },
      payement:{
        textAlign: 'center',
        fontWeight:'bold',
        fontSize: 20,
        textDecorationLine: 'underline',
      },
      wallet:{
      flexDirection:'row',
      // justifyContent:'space-between',
      alignItems:'center',
      padding:4,
      
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
});
export default style;

