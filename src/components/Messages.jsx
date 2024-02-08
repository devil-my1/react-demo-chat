import { useEffect, useRef } from 'react';
import React from 'react';
import styles from '@/styles/Home.module.css'

export default function Messages({ messages }) {
    console.log(messages);
    const bottomRef = useRef(null);
    useEffect(() => {
        if (bottomRef && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    });
    return (
        <ul className={styles.messagesList}>
            {messages.map((m, i) => Message(m, i))}
            <div ref={bottomRef}></div>
        </ul>
    );
}

function Message({ messageData, me, id }, idx) {
    // 1
    // const { username, color } = member.clientData;
    // 2
    const className = me ?
        `${styles.messagesMessage} ${styles.currentMember}` : styles.messagesMessage;
    // 3
    return (
        <li key={idx} className={className}>
            <span
                className={styles.avatar}
                style={{ backgroundColor: "red" }}
            />
            <div className={styles.messageContent}>
                <div className={styles.username}>
                    {me ? "You" : "test"}
                </div>
                <div className={styles.text}>{messageData}</div>
            </div>
        </li>
    );
}