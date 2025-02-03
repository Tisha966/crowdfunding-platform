import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode'; // Using qrcode library

const QRCodeGenerator = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL("https://your-crowdfunding-link.com"); // Your crowdfunding link
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Error generating QR code', err);
      }
    };

    generateQRCode();
  }, []);

  return (
    <div className="qr-code-container">
      <h2>Share This Link via QR Code</h2>
      {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" /> : <p>Loading...</p>}
    </div>
  );
};

export default QRCodeGenerator;
