import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import SplashScreen from './src/screens/Aiau/SplashScreen';
import WelcomeScreen from './src/screens/Aiau/WelcomeScreen';
import LoginScreen from './src/screens/Aiau/LoginScreen';
import LoginTwoScreen from './src/screens/Aiau/ForgotPasswordScreen';
import SignUpScreen from './src/screens/Aiau/SignUpScreen';
import SetPasswordScreen from './src/screens/Aiau/SetPasswordScreen';
import HomeScreen from './src/screens/Aiau/HomeScreen';
import DoctorsScreen from './src/screens/Aiau/DoctorsScreen';
import DoctorInfoScreen from './src/screens/Aiau/DoctorSearchScreen';
type Screen='splash'|'welcome'|'login'|'login2'|'signup'|'password'|'home'|'doctors'|'doctorInfo';
export default function App(){
 const [screen,setScreen]=useState<Screen>('splash');
 const [doctor,setDoctor]=useState('Dr. Sarah Wilson');
 const go=(s:Screen)=>setScreen(s);
 return <View style={styles.app}>
 {screen==='splash'&&<SplashScreen onNext={()=>go('welcome')}/>}
 {screen==='welcome'&&<WelcomeScreen onLogin={()=>go('login')} onSignUp={()=>go('signup')}/>}
 {screen==='login'&&<LoginScreen onBack={()=>go('welcome')} onLogin={()=>go('home')} onAlternate={()=>go('login2')} onSignUp={()=>go('signup')}/>}
 {screen==='login2'&&<LoginTwoScreen onBack={()=>go('login')} onLogin={()=>go('home')} onSignUp={()=>go('signup')}/>}
 {screen==='signup'&&<SignUpScreen onBack={()=>go('welcome')} onNext={()=>go('password')} onLogin={()=>go('login')}/>}
 {screen==='password'&&<SetPasswordScreen onBack={()=>go('signup')} onDone={()=>go('home')}/>}
 {screen==='home'&&<HomeScreen onDoctors={()=>go('doctors')} onProfile={()=>go('welcome')}/>}
 {screen==='doctors'&&<DoctorsScreen onBack={()=>go('home')} onDoctor={name=>{setDoctor(name);go('doctorInfo')}}/>}
 {screen==='doctorInfo'&&<DoctorInfoScreen doctor={doctor} onBack={()=>go('doctors')} onHome={()=>go('home')}/>}
 </View>
}
const styles=StyleSheet.create({app:{flex:1,backgroundColor:'white'}});
