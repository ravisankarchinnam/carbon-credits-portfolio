'use client';

import React, { useEffect, useState } from 'react'

export const AppContent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api')
        .then(response => response.text())
        .then(setMessage)
    }, []);
  return (
    <div>{message}</div>
  )
}
