import React,{useState} from 'react';
import {View,Text,Pressable} from 'react-native';
import FavoriteDoctorsScreen from './FavoriteDoctorsScreen';
import FavoriteDoctorDetailsScreen from './FavoriteDoctorDetailsScreen';
import FavoriteDoctorServicesScreen from './FavoriteDoctorServicesScreen';
import FavoriteMaleDoctorsScreen from './FavoriteMaleDoctorsScreen';
import FavoriteServicesScreen from './FavoriteServicesScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import SettingsScreen from './SettingsScreen';
import NotificationSettingsScreen from './NotificationSettingsScreen';
type Screen='favorites'|'details'|'doctorServices'|'male'|'services'|'profile'|'edit'|'settings'|'notifications';
export default function AdemaFlow({onExit}:{onExit?:()=>void}) {const [screen,setScreen]=useState<Screen>('favorites');const go=(s:Screen)=>setScreen(s);const navigation=<View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#EAF0FF',padding:12}}>{([['Favorites','favorites'],['Services','services'],['Profile','profile'],['Settings','settings']] as const).map(([label,target])=><Pressable key={target} onPress={()=>go(target)}><Text style={{color:'#2463FF',fontWeight:'700'}}>{label}</Text></Pressable>)}</View>;let content:React.ReactNode;switch(screen){
case 'favorites':content=<FavoriteDoctorsScreen onBack={onExit} onDetails={()=>go('details')} onServices={()=>go('doctorServices')} onMale={()=>go('male')}/>;break;
case 'details':content=<FavoriteDoctorDetailsScreen onBack={()=>go('favorites')} onServices={()=>go('services')}/>;break;
case 'doctorServices':content=<FavoriteDoctorServicesScreen onBack={()=>go('favorites')} onFavorites={()=>go('services')}/>;break;
case 'male':content=<FavoriteMaleDoctorsScreen onBack={()=>go('favorites')} onDetails={()=>go('details')}/>;break;
case 'services':content=<FavoriteServicesScreen onBack={()=>go('favorites')}/>;break;
case 'profile':content=<ProfileScreen onBack={()=>go('favorites')} onEdit={()=>go('edit')} onSettings={()=>go('settings')}/>;break;
case 'edit':content=<EditProfileScreen onBack={()=>go('profile')}/>;break;
case 'settings':content=<SettingsScreen onBack={()=>go('profile')} onNotifications={()=>go('notifications')}/>;break;
case 'notifications':content=<NotificationSettingsScreen onBack={()=>go('settings')}/>;break;
}return <View style={{flex:1}}>{navigation}<View style={{flex:1}}>{content}</View></View>;}
