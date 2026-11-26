
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { languageReady } from './src/i18n';

//context
import { FavoritesProvider } from './src/context/FavoritesContext';
import { MessagesProvider } from './src/context/MessagesContext';

//data
import {
  BookingProvider,
  useBooking,
} from './src/context/BookingContext';

import { doctors } from './src/data/doctors';

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


function AppContent() {
  const { setSelectedDoctor } = useBooking();

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

  const [dermaStart, setDermaStart] =
  useState<'Profile' | 'Schedule'>('Profile');

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
          onDermacare={() => {
  setDermaStart('Profile');
  go('dermacare');
}}
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
    doctorName={doctor}
    onBack={() => go('doctors')}
    onHome={() => go('home')}
    onBook={() => {
      const currentDoctor = doctors.find(
        (item) => item.name === doctor
      );

      if (!currentDoctor) return;

      setSelectedDoctor(currentDoctor);
      setDermaStart('Schedule');
      go('dermacare');
    }}
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
    initialRoute={dermaStart}
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


export default function App() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    languageReady
      .then(() => {
        if (active) setReady(true);
      })
      .catch((error) => {
        console.warn(error);
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, []);

  if (failed) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Language initialization error</Text>
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator
          size="large"
          color="#2463FF"
        />
      </View>
    );
  }

  return (
    <FavoritesProvider>
      <MessagesProvider>
        <BookingProvider>
          <AppContent />
        </BookingProvider>
      </MessagesProvider>
    </FavoritesProvider>
  );
}


const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
