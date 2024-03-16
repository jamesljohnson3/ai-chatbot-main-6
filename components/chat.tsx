/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'

import { usePathname, useRouter } from 'next/navigation'
import { Message } from '@/lib/chat/actions'
import { toast } from 'sonner'
import { useAuth } from "@clerk/nextjs";

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string

  missingKeys: string[]
}

export function Chat({ id, className, missingKeys }: ChatProps) {
  
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  const isLoading = true

  const [_, setNewChatId] = useLocalStorage('newChatId', id)
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  if (!isLoaded || !userId) {
    return null;
  }
  // In case the user signs out while on the page.
  if (userId) {
  
   
  useEffect(() => {
    if (userId) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, userId, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel id={id} input={input} setInput={setInput} />
    </>
  )
}
 
}