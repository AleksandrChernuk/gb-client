'use client';

import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import React, { useEffect, useState } from 'react';

function base64ToBlob(base64: string, mime = 'application/pdf') {
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

const OrderPdf = ({ orderId }: { orderId: string }) => {
  const [status, setStatus] = useState('');
  const [pdfBase64, setPdfBase64] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    getOrderStatusAndPdf(orderId)
      .then(({ status, pdf, orderNumber }) => {
        setStatus(status);
        setPdfBase64(pdf);
        setOrderNumber(orderNumber);
      })
      .catch(() => setStatus('error'));
  }, [orderId]);

  const handleDownload = () => {
    if (!pdfBase64) return;
    const blob = base64ToBlob(pdfBase64);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GreenBus_Order_${orderNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpen = () => {
    if (!pdfBase64) return;
    const blob = base64ToBlob(pdfBase64);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-24 bg-gray-700 p-3">
      <div>Статус: {status}</div>
      {pdfBase64 && (
        <div className="mt-3 flex space-x-3">
          <button onClick={handleDownload} className="py-2 px-3 bg-slate-800 rounded-md">
            Завантажити Ордер
          </button>
          <button onClick={handleOpen} className="py-2 px-3 bg-slate-800 rounded-md">
            Відкрити Ордер
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPdf;
