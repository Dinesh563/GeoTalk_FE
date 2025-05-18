// src/api/messages.js

const BASE_URL = process.env.BACKEND_BASE_URL || 'http://localhost:4000';
const GetMessages = BASE_URL + '/msgs';
const PutMessagePath = BASE_URL + '/PutMessage';

export const fetchMessages = async (latitude, longitude) => {
    const response = await fetch(`${GetMessages}?latitude=${latitude}&longitude=${longitude}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.json();
};

export const PostMessageAPI = async (payload) => {
    const res = await fetch(PutMessagePath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
    }

    return res.json(); // If no data returned, change to `return;`
};
