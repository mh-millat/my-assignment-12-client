

// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import App from "./App.jsx";
// // import "./index.css";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import AuthProvider from "./contexts/AuthContext.jsx";
// // import { Toaster } from "react-hot-toast";

// // const queryClient = new QueryClient();

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <QueryClientProvider client={queryClient}>
// //       <AuthProvider>
// //         <App />
// //         <Toaster position="top-center" />
// //       </AuthProvider>
// //     </QueryClientProvider>
// //   </React.StrictMode>
// // );




// // main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import "./index.css";
// import AuthProvider from './contexts/AuthContext'; // ✅ ADD THIS LINE

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider> {/* ✅ Wrap App with AuthProvider */}
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import AuthProvider from "./contexts/AuthContext";
// import { Toaster } from "react-hot-toast";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <AuthProvider>
//           <App />
//           <Toaster position="top-center" />
//         </AuthProvider>
//       </BrowserRouter>
//     </QueryClientProvider>
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-center" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
