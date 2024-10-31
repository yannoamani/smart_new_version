import { StyleSheet, Text,FlatList, View , Pressable} from 'react-native'
import React ,{useState} from 'react'
import style from '../offerStyle'
import i18next from './service/i18next';
import { Ionicons } from "@expo/vector-icons";
import { useDispatch,useSelector } from 'react-redux';
import {changeLang} from './store/slice/translateTextSlice'
import { useTranslation } from 'react-i18next';

export default function Translate() {
  const {t} = useTranslation();
   const elment = useSelector(state => state.translate.lang) 
   console.log(elment);
    const dispatch = useDispatch();
    const [policeBold, setPolices] = useState("Poppins_700Bold");
  const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
  const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");
   const index=elment
    const language=[{'langage':t('french'), "val":"fr"},{'langage':t('english'), "val":"en"}];
    const renderItem = ({ item }) => {
       
        return(
<Pressable onPress={()=>{
    dispatch(changeLang(item.val))
    i18next.changeLanguage(item.val)
}}>
<View style={{ marginTop:10, padding:16, flexDirection:'row', justifyContent:'space-between', backgroundColor:'white',borderRadius:20, alignItems:'center'}}>
  <Text style={{fontFamily:policeRegular, fontSize:15}}>{item.langage}</Text>
  {
    index==item.val? <Ionicons name="checkmark" size={30} color={'green'}></Ionicons>:<></>
  }
  

  </View>
</Pressable>
        );
    }

  return (
    <View style={styles.container}>
     <FlatList
        data={language}
        renderItem={renderItem}
     />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        


    }
})