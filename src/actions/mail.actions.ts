'use server';

import { TContactMail, TCooperationMail } from '@/types/mail.actions.types';

const BASE_URL = 'https://greenbus-backend.onrender.com/api/v1';

export const sendFeedback = async (body: TContactMail) => {
  const response = await fetch(`${BASE_URL}/mail/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const res = await response.json();
    console.log(res);
  }

  return null;
};

export const sendProposal = async (body: TCooperationMail) => {
  const response = await fetch(`${BASE_URL}/mail/proposal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error');
  }
  return null;
};
