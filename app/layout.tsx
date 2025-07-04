import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"



export const metadata: Metadata = {
  title: "RAV",
  description: " ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
''
}

