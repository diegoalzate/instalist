import { Button, Input } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../client'
import dynamic from 'next/dynamic';
import { useProfile } from '../hooks'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import data from '@emoji-mart/data'
import { EmojiData, EmojiProps } from 'emoji-mart';

const Picker = (props: any) => {
  const ref: any = useRef()

  useEffect(() => {
    import('emoji-mart').then((EmojiMart) => {
      new EmojiMart.Picker({ ...props, data, ref } as any)
    })
  }, [])

  return <div ref={ref}/>
}

const CreateList = () => {
  const {data: profile} = useProfile()
  const [form, setForm] = useState({
    name: '',
    emoji: '⭐️',
  })
  const [showPicker, setShowPicker] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])
  
  const createList = async () => {
    const { data } = await supabase.from('lists').insert({
      name: form.name,
      emoji: form.emoji,
      profile_id: profile?.id
    })

    if (data) {
      setForm({
        name: '',
        emoji: '⭐️',
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((form) => ({ ...form, [name]: value }))
  }

  const onEmojiClick = (
    emoji: any
  ) => {
    setForm((form) => ({ ...form, emoji: emoji.native }))
    setShowPicker((value) => !value)
  }

  return (
    <div className="flex flex-col items-center grow">
      <h1 className="my-4 text-xl">
        create{' '}
        <span className="underline decoration-wavy decoration-blue-400">
          list
        </span>
      </h1>
      <div className="flex flex-col sm:w-96 flex-wrap p-4 space-y-3">
        <div className="flex space-x-3">
          <div className="flex w-14 flex-col space-y-2">
            <Button
              bgColor={'whiteAlpha.400'}
              border='1px'
              borderColor="red.400"
              id="emoji"
              name="emoji"
              className="grow-0 w-3"
              onClick={() => {
                setShowPicker((value) => !value)
              }}
            >
              {form.emoji}
            </Button>
            {showPicker && (
              <Picker
                onEmojiSelect={onEmojiClick}
                size={20}
                theme="light"
                emoji={form.emoji}
              />
            )}
          </div>
          <div className="flex grow flex-col space-y-2">
            <Input
              className="grow min-h-4 max-h-10"
              id="name"
              placeholder="list name"
              name="name"
              onChange={handleChange}
              value={form.name}
              type="text"
            />
          </div>
        </div>
        <Button
          onClick={createList}
          bgColor={'primary'}
          textColor={'whiteAlpha.900'}
        >
          save
        </Button>
      </div>
    </div>
  )
}

export default CreateList
