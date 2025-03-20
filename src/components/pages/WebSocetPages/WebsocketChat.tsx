"use client";
import { FC, useEffect, useState, useRef } from "react";
import scss from "./WebsocketChat.module.scss";

interface ChatProps {
  data: {
    key: string;
    id: number;
    user_name: string;
  }
}



const WebsocketChat: FC<ChatProps> = ({ data }) => {
  const [messages, setMessages] = useState<{ text: string; type: "sent" | "received"; time: number; user_name: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const lokRes = localStorage.getItem("auth")
  const lok = lokRes ? JSON.parse(lokRes) : null

  useEffect(() => {
    const ws = new WebSocket(`ws://13.61.145.40/ws/chat/${data.key}/?token=${lok.access}`);

    ws.onopen = () => {
      console.log("WebSocket: Соединение установлено");
    };

    ws.onmessage = (event) => {
      console.log("WebSocket: Новое сообщение", event.data);
      try {
        const messageData = JSON.parse(event.data).message;
        const parsedMessage = JSON.parse(messageData);
        console.log("WebSocket: Распарсенное сообщение", parsedMessage);

        setMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg.time === parsedMessage.timestamp)) {
            return [
              ...prevMessages,
              {
                text: parsedMessage.text,
                type: parsedMessage.user_id === data.id ? "sent" : "received",
                time: parsedMessage.timestamp,
                user_name: parsedMessage.user_name,
              },
            ];
          }
          return prevMessages;
        });
      } catch (error) {
        console.error("WebSocket: Ошибка при разборе сообщения", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket: Ошибка", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket: Соединение закрыто", event);
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [data.key, lok.access, data.id]);

  useEffect(() => {
    // Прокрутка вниз при добавлении нового сообщения
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (socketRef.current && input.trim()) {
      const timestamp = Date.now(); // Уникальный timestamp для сообщения
      const messageData = {
        text: input,
        user_name: data.user_name,
        user_id: data.id,
        timestamp,
        type: "text",
        url_media: "",
        user_email: lok.email,
      };
      const mess = JSON.stringify(messageData);
      const message = { message: mess };
      socketRef.current.send(JSON.stringify(message));
  
      setMessages((prevMessages) => {
        // Проверяем, есть ли уже сообщение с таким timestamp
        if (!prevMessages.some((msg) => msg.time === timestamp)) {
          return [...prevMessages, { text: input, type: "sent", time: timestamp, user_name: data.user_name }];
        }
        return prevMessages;
      });
  
      setInput("");
    }
  };
  

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <section className={scss.chatContainer}>
      <div className={scss.messages}>
        {messages.map((message) => (
          <div key={message.time} className={`${scss[message.type]} ${scss.message}`}>
            <span className={scss.userName}>{message.user_name}</span>
            <span className={scss.messageText}>{message.text}</span>
            <span className={scss.timestamp}>{formatTime(message.time)}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={scss.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </section>
  );
};

export default WebsocketChat;
