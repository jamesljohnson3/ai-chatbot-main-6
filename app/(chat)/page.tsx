import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth, currentUser } from "@clerk/nextjs";

import { getMissingKeys } from '../actions'



export default async function IndexPage() {
  const id = nanoid()
  const user = await currentUser()
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} 
      missingKeys={missingKeys} />
    </AI>
  )
}
