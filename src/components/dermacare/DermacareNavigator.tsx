
import React from 'react';
import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DoctorProfileScreen,
  ScheduleScreen,
} from './screens/doctor';

import AllAppointments from '../../screens/Samal/AllAppointments';
import AppointmentDetails from '../../screens/Samal/AppointmentDetails';
import CancelAppointment from '../../screens/Samal/CancelAppointment';
import Review from '../../screens/Samal/Review';
import PaymentMethod from '../../screens/Samal/PaymentMethod';
import AddCard from '../../screens/Samal/AddCard';
import PaymentSummary from '../../screens/Samal/PaymentSummary';
import PaymentSuccess from '../../screens/Samal/PaymentSuccess';

const Stack = createNativeStackNavigator();

type Props = {
  onExit: () => void;
};

export default function DermacareNavigator({ onExit }: Props) {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DoctorProfile"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="DoctorProfile"
            component={DoctorProfileScreen}
          />

          <Stack.Screen
            name="Schedule"
            component={ScheduleScreen}
          />

          <Stack.Screen name="PaymentMethod">
            {({ navigation }) => (
              <PaymentMethod
                onBack={() => navigation.goBack()}
                onAddCard={() => navigation.navigate('AddCard')}
                onContinue={() => navigation.navigate('PaymentSummary')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="AddCard">
            {({ navigation }) => (
              <AddCard
                onBack={() => navigation.goBack()}
                onSave={() => navigation.navigate('PaymentSummary')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="PaymentSummary">
            {({ navigation }) => (
              <PaymentSummary
                onBack={() => navigation.goBack()}
                onChangeMethod={() => navigation.navigate('PaymentMethod')}
                onPay={() => navigation.navigate('PaymentSuccess')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="PaymentSuccess">
            {({ navigation }) => (
              <PaymentSuccess
                onBack={() => navigation.goBack()}
                onDone={() => navigation.navigate('AllAppointments')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="AllAppointments">
            {({ navigation }) => (
              <AllAppointments
                onBack={onExit}
                onDetails={() => navigation.navigate('AppointmentDetails')}
                onCancel={() => navigation.navigate('CancelAppointment')}
                onReview={() => navigation.navigate('Review')}
                onRebook={() => navigation.navigate('Schedule')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="AppointmentDetails">
            {({ navigation }) => (
              <AppointmentDetails
                onBack={() => navigation.goBack()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="CancelAppointment">
            {({ navigation }) => (
              <CancelAppointment
                onBack={() => navigation.goBack()}
                onConfirm={() => navigation.navigate('AllAppointments')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Review">
            {({ navigation }) => (
              <Review
                onBack={() => navigation.goBack()}
                onSubmit={() => navigation.navigate('AllAppointments')}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
