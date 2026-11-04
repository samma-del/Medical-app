import React from 'react';
import {View,Text,Pressable,StyleSheet} from 'react-native';
import {C} from './ui';
export default function SplashScreen({onNext}:{onNext?:()=>void}) {return <Pressable onPress={onNext} style={s.root}><Text style={s.flower}>{'\u273F'}</Text><Text style={s.brand}>Skin{'\n'}First</Text><Text style={s.tag}>Your Health, Our Priority</Text><Text style={s.hint}>Tap to continue</Text></Pressable>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:C.blue,alignItems:'center',justifyContent:'center'},flower:{color:'white',fontSize:65},brand:{color:'white',fontSize:30,fontWeight:'300',textAlign:'center',lineHeight:34},tag:{color:'white',fontSize:11,marginTop:10},hint:{position:'absolute',bottom:48,color:'#DCE6FF',fontSize:12}});
