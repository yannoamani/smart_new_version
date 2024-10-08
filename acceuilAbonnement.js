import { View , Text, StyleSheet, Pressable} from "react-native"
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";


const AcceuilAbonnement=()=>{
    const [policeBold, setPolices] = useState("Poppins_700Bold");
    const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
    const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");
    const navigation = useNavigation();
    return(
     <View style={style.container}>
        <Pressable style={[style.button,]} onPress={() => navigation.navigate("Abonnement")}> 
                <Text style={[style.textbutton, {fontFamily:policeRegular}]}>Faire un abonnement</Text>
        </Pressable>
        <View height={50}></View>
        <Pressable style={style.button} onPress={() => navigation.navigate("MyAbonnement")}> 
                <Text style={[style.textbutton, {fontFamily:policeRegular}]}>Mes  abonnements </Text>
        </Pressable>
        

     </View>
        
    )
}
const style= StyleSheet.create({
    container:{
        flex: 1,
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F1F2F4'
    },
    button:{
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
    textbutton:{
        color:'#FFFFFF',
        fontSize: 20,
    },
    
})
export  default AcceuilAbonnement