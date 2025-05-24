// import React, { useState } from 'react';
// import { QrReader } from 'react-qr-reader';

// const QRScanner = () => {
//   const [scanResult, setScanResult] = useState('');

//   const handleScan = (data) => {
//     if (data) {
//       setScanResult(data); // Set the scanned result
//       window.location.href = data; // Redirect to the scanned URL
//     }
//   };

//   const handleError = (err) => {
//     console.error(err); // Handle scanning errors
//   };

//   return (
//     <div className="qr-scanner-container">
//       <h2>Scan QR Code</h2>
//       <QrReader
//         delay={300}
//         style={{ width: '100%' }}
//         onError={handleError}
//         onScan={handleScan}
//       />
//       {scanResult && (
//         <div className="scan-result">
//           <p>Scanned Result: {scanResult}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRScanner;
