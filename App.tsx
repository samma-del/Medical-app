
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Aiau screens
import SplashScreen from './src/screens/Aiau/SplashScreen';
import WelcomeScreen from './src/screens/Aiau/WelcomeScreen';
import LoginScreen from './src/screens/Aiau/LoginScreen';
import SignUpScreen from './src/screens/Aiau/SignUpScreen';
import SetPasswordScreen from './src/screens/Aiau/SetPasswordScreen';
import HomeScreen from './src/screens/Aiau/HomeScreen';
import DoctorsScreen from './src/screens/Aiau/DoctorsScreen';
import DoctorInfoScreen from './src/screens/Aiau/DoctorSearchScreen';

// Adema screens
import AdemaFlow from './src/screens/Adema/AdemaFlow';

// Samal screens
import AppointmentDetails from './src/screens/Samal/AppointmentDetails';
import AllAppointments from './src/screens/Samal/AllAppointments';
import CancelAppointment from './src/screens/Samal/CancelAppointment';
import Review from './src/screens/Samal/Review';
import PaymentMethod from './src/screens/Samal/PaymentMethod';
import AddCard from './src/screens/Samal/AddCard';
import PaymentSummary from './src/screens/Samal/PaymentSummary';
import PaymentSuccess from './src/screens/Samal/PaymentSuccess';

// Dermacare navigation
import DermacareNavigator from './src/components/dermacare/DermacareNavigator';

type Screen =
  | 'splash'
  | 'welcome'
  | 'login'
  | 'signup'
  | 'password'
  | 'home'
  | 'doctors'
  | 'doctorInfo'
  | 'adema'
  | 'dermacare'
  | 'appointments'
  | 'appointmentDetails'
  | 'cancelAppointment'
  | 'review'
  | 'paymentMethod'
  | 'addCard'
  | 'paymentSummary'
  | 'paymentSuccess';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');

  const [doctor, setDoctor] = useState<string>('');

  const [previousScreen, setPreviousScreen] =
    useState<Screen>('home');

  const [paymentMethod, setPaymentMethod] =
    useState('Card');

  const go = (next: Screen) => {
    setPreviousScreen(screen);
    setScreen(next);
  };

  return (
    <View style={styles.app}>

      {/* AIAU */}

      {screen === 'splash' && (
        <SplashScreen
          onNext={() => go('welcome')}
        />
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
          onDermacare={() => go('dermacare')}
        />
      )}

      {screen === 'doctorInfo' && (
  <DoctorInfoScreen
    doctorName={doctor}
    onBack={() => go('doctors')}
    onHome={() => go('home')}
  />
)}
      {screen === 'doctorInfo' && (
        <DoctorInfoScreen
          doctorName={doctor}
          onBack={() => go('doctors')}
          onHome={() => go('home')}
        />
      )}

      {/* ADEMA */}

      {screen === 'adema' && (
        <AdemaFlow
          onExit={() => go('home')}
        />
      )}

      {/* DERMACARE */}

      {screen === 'dermacare' && (
        <DermacareNavigator
          onExit={() => go('home')}
        />
      )}

      {/* SAMAL */}

      {screen === 'appointments' && (
        <AllAppointments
          onBack={() => go('home')}
          onDetails={() => go('appointmentDetails')}
          onCancel={() => go('cancelAppointment')}
          onReview={() => go('review')}
          onRebook={() => go('paymentMethod')}
        />
      )}

      {screen === 'appointmentDetails' && (
        <AppointmentDetails
          onBack={() => go('appointments')}
        />
      )}

      {screen === 'cancelAppointment' && (
        <CancelAppointment
          onBack={() => go('appointments')}
          onConfirm={(reason) => {
            console.log('Cancel reason:', reason);
            go('appointments');
          }}
        />
      )}

      {screen === 'review' && (
        <Review
          onBack={() => go('appointments')}
          onSubmit={(rating, comment) => {
            console.log('Rating:', rating);
            console.log('Comment:', comment);
            go('appointments');
          }}
        />
      )}

      {screen === 'paymentMethod' && (
        <PaymentMethod
          onBack={() => go('home')}
          onAddCard={() => go('addCard')}
          onContinue={(method) => {
            setPaymentMethod(method);
            go('paymentSummary');
          }}
        />
      )}

      {screen === 'addCard' && (
        <AddCard
          onBack={() => go('paymentMethod')}
          onSave={(name, lastFour) => {
            console.log('Cardholder:', name);
            console.log('Card ending:', lastFour);
            setPaymentMethod('Card');
            go('paymentSummary');
          }}
        />
      )}

      {screen === 'paymentSummary' && (
        <PaymentSummary
          onBack={() => go('paymentMethod')}
          onChangeMethod={() => go('paymentMethod')}
          onPay={() => go('paymentSuccess')}
        />
      )}

      {screen === 'paymentSuccess' && (
        <PaymentSuccess
          onBack={() => go('paymentSummary')}
          onDone={() => go('appointments')}
        />
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
