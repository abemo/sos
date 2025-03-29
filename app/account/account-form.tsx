'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatar_url, setAvatarUrl] = useState('')

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata
      setFullname(metadata?.full_name ?? '')
      setUsername(metadata?.username ?? '')
      setWebsite(metadata?.website ?? '')
      setAvatarUrl(metadata?.avatar_url ?? '')
      setLoading(false)
    }
  }, [user])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    fullname: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Account Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" value={user?.email ?? ''} disabled />
        </div>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <Button
          className="w-full"
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update Profile'}
        </Button>
        <form action="/auth/signout" method="post">
          <Button variant="secondary" className="w-full" type="submit">
            Sign out
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
