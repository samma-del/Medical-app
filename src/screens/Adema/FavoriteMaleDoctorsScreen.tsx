import React,{useState} from 'react';
import {Text,TextInput} from 'react-native';
import {Page,Header,DoctorCard,styles} from './AdemaUI';
const doctors=[['Dr. Michael Brown','Dermatologist | 4.8'],['Dr. James Miller','Skin specialist | 4.7'],['Dr. Daniel Lee','Dermatologist | 4.9']];
export default function FavoriteMaleDoctorsScreen({onBack,onDetails}:{onBack?:()=>void,onDetails?:()=>void}) {const [q,setQ]=useState('');return <Page><Header title="Male Doctors" onBack={onBack}/><Text style={styles.title}>Favorite Male Doctors</Text><Text style={styles.subtitle}>Find your saved specialists.</Text><TextInput style={styles.input} value={q} onChangeText={setQ} placeholder="Search doctors..."/>{doctors.filter(d=>d[0].toLowerCase().includes(q.toLowerCase())).map(d=><DoctorCard key={d[0]} name={d[0]} detail={d[1]} onPress={onDetails} heart/>)}</Page>}
