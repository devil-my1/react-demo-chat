
"use client"
import Messages from '@/components/Messages'
import Input from '@/components/Input'
import Members from '@/components/Members'
import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css'



function randomName() {
  const adjectives = [
    'autumn', 'hidden', 'bitter', 'misty', 'silent', 'empty', 'dry', 'dark',
    'summer', 'icy', 'delicate', 'quiet', 'white', 'cool', 'spring', 'winter',
    'patient', 'twilight', 'dawn', 'crimson', 'wispy', 'weathered', 'blue',
    'billowing', 'broken', 'cold', 'damp', 'falling', 'frosty', 'green', 'long',
    'late', 'lingering', 'bold', 'little', 'morning', 'muddy', 'old', 'red',
    'rough', 'still', 'small', 'sparkling', 'shy', 'wandering',
    'withered', 'wild', 'black', 'young', 'holy', 'solitary', 'fragrant',
    'aged', 'snowy', 'proud', 'floral', 'restless', 'divine', 'polished',
    'ancient', 'purple', 'lively', 'nameless'
  ];
  const nouns = [
    'waterfall', 'river', 'breeze', 'moon', 'rain', 'wind', 'sea', 'morning',
    'snow', 'lake', 'sunset', 'pine', 'shadow', 'leaf', 'dawn', 'glitter',
    'forest', 'hill', 'cloud', 'meadow', 'sun', 'glade', 'bird', 'brook',
    'butterfly', 'bush', 'dew', 'dust', 'field', 'fire', 'flower', 'firefly',
    'feather', 'grass', 'haze', 'mountain', 'night', 'pond', 'darkness',
    'snowflake', 'silence', 'sound', 'sky', 'shape', 'surf', 'thunder',
    'violet', 'water', 'wildflower', 'wave', 'water', 'resonance', 'sun',
    'wood', 'dream', 'cherry', 'tree', 'fog', 'frost', 'voice', 'paper', 'frog',
    'smoke', 'star'
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

let chat_ws = new WebSocket('wss://ka82oviirc.execute-api.ap-northeast-1.amazonaws.com/production/')

chat_ws.addEventListener('open', e => {
  console.log('WebSocket is connected', e);
});

chat_ws.addEventListener('close', e => console.log('WebSocket Connection is closed', e));


export default function Home() {
  const [messages, setMessages] = useState([]);

  const [me, setMe] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const [members, setMembers] = useState([{
    id: "1",
    clientData: {
      color: 'blue',
      username: 'bluemoon',
    },
  }]);

  useEffect(() => {
    chat_ws.onmessage = (e) => {
      console.log('message received', JSON.parse(e.data));
      setMessages((prevMessages) => [...prevMessages, JSON.parse(e.data)])
    }
  }, []);


  const onSendMessage = (message) => {
    const newMessage = {
      me: true, // Set to true when the message is from the current user
      messageData: message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    const payload = {
      action: 'sendmessage',
      message: message,
    };

    chat_ws.send(JSON.stringify(payload));
  }

  return (
    <>
      <main className={styles.app}>
        <div className={styles.appContent}>
          <Members members={members} me={me} />
          <Messages messages={messages} />
          {/* <TypingIndicator members={members.filter(m => m.typing && m.id !== me.id)} /> */}
          <Input
            onSendMessage={onSendMessage}
          />
        </div>
      </main>
    </>
  )
}
