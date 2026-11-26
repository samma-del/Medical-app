
import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';
import { getDoctorById } from '../../../data/doctors';

import { Page, T, BottomNav } from '../ui';
import { colors } from '../theme';

import {
  searchDoctors,
  Doctor,
} from '../../../data/doctors';

import {
  useMessages,
} from '../../../context/MessagesContext';


/* 15. Notification */
type N = { id: number; day: string; title: string; time: string; hl?: boolean; icon: keyof typeof Ionicons.glyphMap };
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tortor placerat.';
const data: N[] = [
  { id: 1, day: 'Today', title: 'Scheduled Appointment', time: '2H', icon: 'calendar-outline' },
  { id: 2, day: 'Today', title: 'Scheduled Change', time: '4H', icon: 'calendar-outline', hl: true },
  { id: 3, day: 'Today', title: 'Medical Notes', time: '6H', icon: 'document-text-outline' },
  { id: 4, day: 'Yesterday', title: 'Scheduled Appointment', time: '1D', icon: 'calendar-outline' },
  { id: 5, day: '15 April', title: 'Medical History Update', time: '5D', icon: 'medkit-outline' },
];
export function NotificationScreen() {
  const [items, setItems] = useState(data);
  const [showNew, setShowNew] = useState(true);
  const days = Array.from(new Set(items.map((i) => i.day)));
  return (
    <Page title="Notification" scroll={false}
      right={<Pressable onPress={() => setShowNew(!showNew)} style={{ height: 22, paddingHorizontal: 10, borderRadius: 11, backgroundColor: colors.soft, flexDirection: 'row', alignItems: 'center' }}>           <T style={{ color: colors.primary, fontSize: 11, fontWeight: '600' }}>New</T>           <Ionicons name="chevron-down" size={12} color={colors.primary} style={{ marginLeft: 3 }} />         </Pressable>}
      bottom={<BottomNav active={1} />}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {days.map((d, di) => (
          <View key={d}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: di ? 10 : 0, marginBottom: 8 }}>
              <View style={{ paddingHorizontal: 18, height: 26, borderRadius: 13, backgroundColor: colors.soft, justifyContent: 'center' }}>
                <T style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>{d}</T>
              </View>
              {di === 0 ? <T style={{ marginLeft: 'auto', color: colors.primary, fontSize: 11, fontWeight: '700' }} onPress={() => setItems(items.map((i) => ({ ...i, hl: false })))}>Mark all</T> : null}
            </View>
            {items.filter((i) => i.day === d).map((n) => (
              <Pressable key={n.id} onPress={() => setItems(items.map((i) => ({ ...i, hl: i.id === n.id })))}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: -10, borderRadius: 10, backgroundColor: n.hl ? colors.soft : 'transparent' }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={n.icon} size={20} color="#fff" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <T style={{ fontSize: 14, fontWeight: '700' }}>{n.title}</T>
                  <T numberOfLines={2} style={{ fontSize: 10, color: '#555', lineHeight: 15, marginTop: 2 }}>{lorem}</T>
                </View>
                <T style={{ fontSize: 11, color: colors.grey, marginLeft: 8 }}>{n.time}</T>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </Page>
  );
}

/* 16. Message */

export function MessageScreen() {
  const navigation = useNavigation();

  const [query, setQuery] =
    useState('');

  const route = useRoute();

const params = route.params as
  | { doctorId?: number }
  | undefined;

const [selectedDoctor, setSelectedDoctor] =
  useState<Doctor | null>(() => {
    return params?.doctorId !== undefined
      ? getDoctorById(params.doctorId) ?? null
      : null;
  });

  const [messageText, setMessageText] =
    useState('');

  const scrollRef =
  useRef<React.ComponentRef<typeof ScrollView>>(null);

  const {
    sendMessage,
    getMessages,
    getLastMessage,
  } = useMessages();

  const filteredDoctors = searchDoctors(query)
    .sort((a, b) => {
      const first =
        getLastMessage(a.id)?.createdAt ?? 0;

      const second =
        getLastMessage(b.id)?.createdAt ?? 0;

      return second - first;
    });

  const currentMessages = selectedDoctor
    ? getMessages(selectedDoctor.id)
    : [];

  const handleSend = () => {
    if (
      !selectedDoctor ||
      !messageText.trim()
    ) {
      return;
    }

    sendMessage(
      selectedDoctor.id,
      messageText
    );

    setMessageText('');
  };

  const handleBack = () => {
    if (selectedDoctor) {
      setSelectedDoctor(null);
      setMessageText('');
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // CHAT SCREEN

  if (selectedDoctor) {
    return (
      <KeyboardAvoidingView
        style={chatStyles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        {/* Chat header */}

        <View style={chatStyles.header}>
          <Pressable onPress={handleBack}>
            <Ionicons
              name="chevron-back"
              size={27}
              color="#2463FF"
            />
          </Pressable>

          {selectedDoctor.image ? (
            <Image
              source={{
                uri: selectedDoctor.image,
              }}
              style={chatStyles.smallAvatar}
            />
          ) : (
            <View style={chatStyles.smallAvatar}>
              <Ionicons
                name="person-outline"
                size={25}
                color="#2463FF"
              />
            </View>
          )}

          <View style={{ flex: 1 }}>
            <Text style={chatStyles.headerName}>
              {selectedDoctor.name}
            </Text>

            <Text style={chatStyles.subtitle}>
              {selectedDoctor.specialty}
            </Text>
          </View>
        </View>

        {/* Demo notice */}

        <View style={chatStyles.demoBanner}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#2463FF"
          />

          <Text style={chatStyles.demoText}>
            Demo chat. Messages are not sent
            to the doctor. Do not enter
            personal or medical information.
          </Text>
        </View>

        {/* Messages */}

        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={
            chatStyles.messagesContainer
          }
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({
              animated: true,
            })
          }
        >
          {currentMessages.length === 0 && (
            <View style={chatStyles.empty}>
              <Ionicons
                name="chatbubbles-outline"
                size={70}
                color="#A9BFFF"
              />

              <Text style={chatStyles.emptyTitle}>
                Start a conversation
              </Text>

              <Text style={chatStyles.emptyText}>
                Write a test message below.
              </Text>
            </View>
          )}

          {currentMessages.map((message) => (
            <View
              key={message.id}
              style={chatStyles.messageRow}
            >
              <View style={chatStyles.bubble}>
                <Text style={chatStyles.messageText}>
                  {message.text}
                </Text>
              </View>

              <View style={chatStyles.messageMeta}>
                <Text style={chatStyles.time}>
                  {message.time}
                </Text>

                <Text style={chatStyles.time}>
                  Saved locally
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Message input */}

        <View style={chatStyles.inputBar}>
          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Write here..."
            placeholderTextColor="#8798B7"
            style={chatStyles.messageInput}
            multiline
            maxLength={2000}
          />

          <Pressable
            accessibilityLabel="Send demo message"
            onPress={handleSend}
            disabled={!messageText.trim()}
            style={[
              chatStyles.sendButton,
              !messageText.trim() && {
                opacity: 0.5,
              },
            ]}
          >
            <Ionicons
              name="send"
              size={21}
              color="#2463FF"
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // DOCTOR LIST SCREEN

  return (
    <View style={chatStyles.container}>

      <View style={chatStyles.header}>
        <Pressable onPress={handleBack}>
          <Ionicons
            name="chevron-back"
            size={27}
            color="#2463FF"
          />
        </Pressable>

        <Text style={chatStyles.title}>
          Messages
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={
          chatStyles.listContainer
        }
      >
        <Text style={chatStyles.mainTitle}>
          Your conversations
        </Text>

        <Text style={chatStyles.description}>
          Choose a doctor for a demo conversation.
        </Text>

        {/* Search */}

        <View style={chatStyles.searchBox}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#2463FF"
          />

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search doctors..."
            placeholderTextColor="#8798B7"
            style={chatStyles.searchInput}
          />

          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery('')}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#2463FF"
              />
            </Pressable>
          )}
        </View>

        <Text style={chatStyles.sectionTitle}>
          Doctors
        </Text>

        {filteredDoctors.map((doctor) => {
          const lastMessage =
            getLastMessage(doctor.id);

          return (
            <Pressable
              key={doctor.id}
              style={chatStyles.doctorCard}
              onPress={() => {
                setSelectedDoctor(doctor);
                setMessageText('');
              }}
            >
              {doctor.image ? (
                <Image
                  source={{
                    uri: doctor.image,
                  }}
                  style={chatStyles.avatar}
                />
              ) : (
                <View style={chatStyles.avatar}>
                  <Ionicons
                    name="person-outline"
                    size={28}
                    color="#2463FF"
                  />
                </View>
              )}

              <View style={chatStyles.doctorInfo}>
                <Text style={chatStyles.doctorName}>
                  {doctor.name}
                </Text>

                <Text style={chatStyles.specialty}>
                  {doctor.specialty}
                </Text>

                <Text
                  style={chatStyles.lastMessage}
                  numberOfLines={1}
                >
                  {lastMessage
                    ? lastMessage.text
                    : 'No messages yet'}
                </Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                {lastMessage && (
                  <Text style={chatStyles.time}>
                    {lastMessage.time}
                  </Text>
                )}

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#2463FF"
                />
              </View>
            </Pressable>
          );
        })}

        {filteredDoctors.length === 0 && (
          <View style={chatStyles.empty}>
            <Ionicons
              name="search-outline"
              size={55}
              color="#A9BFFF"
            />

            <Text style={chatStyles.emptyTitle}>
              No doctors found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2463FF',
  },

  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2463FF',
  },

  subtitle: {
    fontSize: 12,
    color: '#8798B7',
    marginTop: 4,
  },

  smallAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E8EEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 30,
  },

  mainTitle: {
    color: '#18213D',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#8798B7',
    marginBottom: 20,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EEFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 25,
  },

  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: '#18213D',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#18213D',
    marginBottom: 15,
  },

  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EEFF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    gap: 12,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#CDD9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  doctorInfo: {
    flex: 1,
    gap: 5,
  },

  doctorName: {
    color: '#18213D',
    fontSize: 15,
    fontWeight: '700',
  },

  specialty: {
    color: '#2463FF',
    fontSize: 13,
  },

  lastMessage: {
    color: '#8798B7',
    fontSize: 13,
  },

  demoBanner: {
    backgroundColor: '#E8EEFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 15,
    borderRadius: 12,
    gap: 8,
  },

  demoText: {
    flex: 1,
    color: '#2463FF',
    fontSize: 12,
    lineHeight: 18,
  },

  messagesContainer: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    flexGrow: 1,
  },

  messageRow: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },

  bubble: {
    maxWidth: '82%',
    backgroundColor: '#DCE4FF',
    borderRadius: 20,
    borderBottomRightRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },

  messageText: {
    color: '#18213D',
    fontSize: 14,
    lineHeight: 21,
  },

  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },

  time: {
    color: '#2463FF',
    fontSize: 11,
  },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#2463FF',
    borderRadius: 35,
    padding: 8,
    margin: 15,
    gap: 10,
  },

  messageInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    maxHeight: 110,
    fontSize: 14,
    color: '#18213D',
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 55,
    gap: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#18213D',
  },

  emptyText: {
    fontSize: 14,
    color: '#8798B7',
    textAlign: 'center',
  },
});
