import React from 'react';
import {Text,Pressable} from 'react-native';
import {Page,Header,colors,styles,Button} from './AdemaUI';
const items=[['Skin Consultation','30 min | Skin health assessment'],['Acne Treatment','45 min | Personalized care'],['Skin Checkup','20 min | Preventive visit']];
export default function FavoriteDoctorServicesScreen({onBack,onFavorites}:{onBack?:()=>void,onFavorites?:()=>void}) {return <Page><Header title="Doctor Services" onBack={onBack}/><Text style={styles.title}>Saved Services</Text><Text style={styles.subtitle}>Services offered by your favorite specialists.</Text>{items.map(([name,detail])=><Pressable key={name} style={styles.card} onPress={onFavorites}><Text style={{color:colors.ink,fontWeight:'800',fontSize:16}}>{name}</Text><Text style={{color:colors.muted,marginTop:8}}>{detail}</Text><Text style={{color:colors.blue,marginTop:10}}>View service</Text></Pressable>)}<Button title="See All Favorite Services" onPress={onFavorites}/></Page>}
