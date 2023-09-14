import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import AuthStoreProvider from '@/context/AuthStoreContext'
import DialogueContextProvider from '@/context/DialogueContext'
import CreateTeamContextProvider from '@/context/CreateTeamContext'
import TeamsContextProvider from '@/context/TeamsModalContext'
import { StyledEngineProvider } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <StyledEngineProvider injectFirst>
        <TeamsContextProvider>
          <CreateTeamContextProvider>
            <DialogueContextProvider>
              <AuthStoreProvider>
                <body className={`${inter.className} bg-blue-300`}>{children}
                  <ToastContainer />
                </body>
              </AuthStoreProvider>
            </DialogueContextProvider>
          </CreateTeamContextProvider>
        </TeamsContextProvider>
      </StyledEngineProvider>
    </html>
  )
}
