import React from 'react';
import { useState } from 'react';
import styles from '@/styles/Home.module.css'

export default function Input({ onSendMessage }) {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };



    function onSubmit(e) {
        e.preventDefault();
        if (text.trim() !== '') {
            setText('');
            console.log('Sending message', text);
            onSendMessage(text);
        }
    }

    return (
        <div className={styles.input}>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    onChange={e => onChange(e)}
                    value={text}
                    type='text'
                    placeholder='Enter your message and press ENTER'
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit(e);
                        }
                    }}
                />
                <button>Send</button>
            </form>
        </div>
    );
}