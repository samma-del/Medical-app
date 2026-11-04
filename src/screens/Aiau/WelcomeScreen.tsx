import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Btn,C} from './ui';
export default function WelcomeScreen({onLogin,onSignUp}:{onLogin?:()=>void,onSignUp?:()=>void}) {return <View style={s.page}><View style={s.center}><Text style={s.flower}>{'\u273F'}</Text><Text style={s.brand}>Skin First</Text><Text style={s.tag}>Your Health, Our Priority</Text></View><View style={s.bottom}><Text style={s.intro}>Welcome to Skin First!{'\n'}Your journey to healthier skin starts here.</Text><Btn title="Log In" onPress={onLogin}/><Btn title="Sign Up" onPress={onSignUp} secondary/></View></View>}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'white',paddingHorizontal:26},center:{flex:1,justifyContent:'center',alignItems:'center'},flower:{fontSize:76,color:C.blue},brand:{fontSize:32,fontWeight:'700',color:C.blue},tag:{fontSize:13,color:C.blue,marginTop:5},bottom:{paddingBottom:50},intro:{textAlign:'center',color:'#77839A',lineHeight:23,marginBottom:20}});
