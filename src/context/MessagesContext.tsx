
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type Message = {
  id: string;
  doctorId: number;
  text: string;
  time: string;
  createdAt: number;
  sender: 'user';
};

type MessagesContextType = {
  messages: Message[];
  sendMessage: (
    doctorId: number,
    text: string
  ) => void;
  getMessages: (doctorId: number) => Message[];
  getLastMessage: (
    doctorId: number
  ) => Message | undefined;
};

const MessagesContext =
  createContext<MessagesContextType | undefined>(
    undefined
  );

export function MessagesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const sendMessage = (
    doctorId: number,
    text: string
  ) => {
    const cleanText = text.trim();

    if (!cleanText) {
      return;
    }

    const now = new Date();

    const newMessage: Message = {
      id:
        Date.now().toString() +
        Math.random().toString(36).slice(2),

      doctorId,

      text: cleanText,

      time: now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }),

      createdAt: now.getTime(),

      sender: 'user',
    };

    setMessages((previous) => [
      ...previous,
      newMessage,
    ]);
  };

  const getMessages = (doctorId: number) => {
    return messages.filter(
      (message) =>
        message.doctorId === doctorId
    );
  };

  const getLastMessage = (doctorId: number) => {
    const doctorMessages =
      getMessages(doctorId);

    return doctorMessages[
      doctorMessages.length - 1
    ];
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        sendMessage,
        getMessages,
        getLastMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error(
      'MessagesProvider is not connected'
    );
  }

  return context;
}
