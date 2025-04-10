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
  const [avatar_url, setAvatarUrl] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata
      setFullname(metadata?.full_name ?? '')
      setUsername(metadata?.username ?? '')
      setAvatarUrl(metadata?.avatar_url ?? '')
      setSelectedCategories(metadata?.selected_categories ?? [])
      setLoading(false)
    }
  }, [user])

  async function updateProfile({
    username,
    fullname,
    selectedCategories,
    avatar_url,
  }: {
    username: string
    fullname: string
    selectedCategories: string[]
    avatar_url: string
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        selected_categories: selectedCategories,
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
          <Label>Select Categories</Label>
          <div className="space-y-2">
            {['food', 'housing', 'wellness', 'donate', 'volunteer'].map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    setSelectedCategories((prev) =>
                      e.target.checked
                        ? [...prev, category] // Add if checked
                        : prev.filter((c) => c !== category) // Remove if unchecked
                    );
                  }}
                />
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        <Button
          className="w-full"
          onClick={() => updateProfile({ fullname, username, selectedCategories, avatar_url })}
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
