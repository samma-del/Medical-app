
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
import {
  ProfileScreen,
  PasswordManagerScreen,
  PrivacyPolicyScreen,
  LogoutScreen,
} from './screens/account';

import {
  HelpFAQScreen,
  HelpContactScreen,
} from './screens/help';

import {
  NotificationScreen,
  MessageScreen,
} from './screens/inbox';

const Stack = createNativeStackNavigator();

type Props = {
  onExit: () => void;
  initialRoute?: 'Profile' | 'Schedule';
};

export default function DermacareNavigator({
  onExit,
  initialRoute = 'Profile',
}: Props) {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
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


           
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
/>

<Stack.Screen
  name="PasswordManager"
  component={PasswordManagerScreen}
/>

<Stack.Screen
  name="PrivacyPolicy"
  component={PrivacyPolicyScreen}
/>

<Stack.Screen
  name="HelpFAQ"
  component={HelpFAQScreen}
/>

<Stack.Screen
  name="HelpContact"
  component={HelpContactScreen}
/>

<Stack.Screen
  name="Notification"
  component={NotificationScreen}
/>

<Stack.Screen
  name="Message"
  component={MessageScreen}
/>

<Stack.Screen
  name="Logout"
  component={LogoutScreen}
/>

        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
