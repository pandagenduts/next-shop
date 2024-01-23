'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function TanstackQueryProvier({ children }: { children: React.ReactNode }) {
  const client = new QueryClient()

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
