import { createSlice } from "@reduxjs/toolkit";
import translate from "translate";

translate.engine = "deepl"; 
translate.key ="98c4da1d-6d65-4402-9c30-510b68d6a3fa:fx";

export const  translateTextReducer= (texte,lang)=>async(dispatch)=>{
    // const { lang } = getState();
    console.log("CHANGEMENT DES VALEURS2",lang)
    dispatch(changeLang(lang))
    return await translate(texte, { from: 'en', to: lang });
}

export const translateTextSlice= createSlice({
    name:'translate',
    initialState:{lang:'fr'},
    reducers:{
        changeLang:(state,action)=>{
            console.log("CHANGEMENT DES VALEURS1",action.payload)
            const lang = action.payload ||"fr";
            return {...state,lang:lang}
        }
    }
})

export const {changeLang}= translateTextSlice.actions

export default translateTextSlice.reducer