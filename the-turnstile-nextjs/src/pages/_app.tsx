import type { AppProps } from "next/app";

import "../styles/globals.css";

import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ServiceWorkerRegister />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
