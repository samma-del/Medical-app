
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import SplashScreen from './src/screens/Aiau/SplashScreen';
import WelcomeScreen from './src/screens/Aiau/WelcomeScreen';
import LoginScreen from './src/screens/Aiau/LoginScreen';
import SignUpScreen from './src/screens/Aiau/SignUpScreen';
import SetPasswordScreen from './src/screens/Aiau/SetPasswordScreen';
import HomeScreen from './src/screens/Aiau/HomeScreen';
import DoctorsScreen from './src/screens/Aiau/DoctorsScreen';
import DoctorInfoScreen from './src/screens/Aiau/DoctorSearchScreen';

import AdemaFlow from './src/screens/Adema/AdemaFlow';

type Screen =
  | 'splash'
  | 'welcome'
  | 'login'
  | 'signup'
  | 'password'
  | 'home'
  | 'doctors'
  | 'doctorInfo'
  | 'adema';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [doctor, setDoctor] = useState('Dr. Sarah Wilson');

  const go = (next: Screen) => setScreen(next);

  return (
    <View style={styles.app}>
      {screen === 'splash' && (
        <SplashScreen onNext={() => go('welcome')} />
      )}

      {screen === 'welcome' && (
        <WelcomeScreen
          onLogin={() => go('login')}
          onSignUp={() => go('signup')}
        />
      )}

      {screen === 'login' && (
        <LoginScreen
          onBack={() => go('welcome')}
          onLogin={() => go('home')}
          onAlternate={() => go('signup')}
          onSignUp={() => go('signup')}
        />
      )}

      {screen === 'signup' && (
        <SignUpScreen
          onBack={() => go('welcome')}
          onNext={() => go('password')}
          onLogin={() => go('login')}
        />
      )}

      {screen === 'password' && (
        <SetPasswordScreen
          onBack={() => go('signup')}
          onDone={() => go('home')}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          onDoctors={() => go('doctors')}
          onProfile={() => go('adema')}
        />
      )}

      {screen === 'doctors' && (
        <DoctorsScreen
          onBack={() => go('home')}
          onDoctor={(name) => {
            setDoctor(name);
            go('doctorInfo');
          }}
        />
      )}

      {screen === 'doctorInfo' && (
        <DoctorInfoScreen
          doctor={doctor}
          onBack={() => go('doctors')}
          onHome={() => go('home')}
        />
      )}

      {screen === 'adema' && (
        <AdemaFlow onExit={() => go('home')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
