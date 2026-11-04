import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';

export const C = { blue:'#2463FF', light:'#EAF0FF', pale:'#F5F8FF', ink:'#1C2B50', muted:'#77839A', white:'#FFFFFF' };
export const S = StyleSheet.create({
 page:{flex:1,backgroundColor:C.white}, wrap:{flex:1,width:'100%',maxWidth:440,alignSelf:'center',paddingHorizontal:24,paddingTop:35,paddingBottom:28},
 title:{fontSize:28,fontWeight:'800',color:C.ink,marginBottom:9}, sub:{fontSize:14,color:C.muted,lineHeight:22,marginBottom:24},
 label:{fontSize:13,fontWeight:'700',color:C.ink,marginBottom:7}, input:{backgroundColor:C.light,borderRadius:13,paddingHorizontal:16,paddingVertical:14,fontSize:15,color:C.ink,marginBottom:17},
 btn:{backgroundColor:C.blue,borderRadius:25,paddingVertical:15,alignItems:'center',marginTop:10}, btnText:{color:C.white,fontSize:15,fontWeight:'700'},
 link:{color:C.blue,fontWeight:'700'}, card:{backgroundColor:C.light,borderRadius:17,padding:16,marginBottom:12},
 row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}, small:{color:C.muted,fontSize:12},
});
export function Btn({title,onPress,secondary=false}:{title:string,onPress?:()=>void,secondary?:boolean}) {return <Pressable onPress={onPress} style={[S.btn,secondary&&{backgroundColor:'#AEC3FF'}]}><Text style={S.btnText}>{title}</Text></Pressable>}
export function Field({label,placeholder,secure=false,value,onChangeText}:{label:string,placeholder:string,secure?:boolean,value:string,onChangeText:(s:string)=>void}) {return <View><Text style={S.label}>{label}</Text><TextInput style={S.input} placeholder={placeholder} placeholderTextColor="#8798B7" secureTextEntry={secure} value={value} onChangeText={onChangeText} autoCapitalize="none" /></View>}
export function Back({onPress,title}:{onPress?:()=>void,title:string}) {return <Pressable onPress={onPress} style={{flexDirection:'row',alignItems:'center',marginBottom:27}}><Text style={{color:C.blue,fontSize:25,marginRight:15}}>{'\u2039'}</Text><Text style={{fontSize:18,fontWeight:'700',color:C.ink}}>{title}</Text></Pressable>}
export function Page({children}:{children:React.ReactNode}) {return <ScrollView style={S.page} contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps="handled"><View style={S.wrap}>{children}</View></ScrollView>}
