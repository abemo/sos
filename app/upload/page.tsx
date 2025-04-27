'use client';

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const categories = ['Food', 'Housing', 'Wellness', 'Supplies', 'Donate', 'Volunteer']

const formFields: Record<string, { label: string; name: string; placeholder: string }[]> = {
  Food: [
    { label: 'Resource Name', name: 'name', placeholder: 'Enter resource name' },
    { label: 'Address', name: 'location', placeholder: 'Enter address' },
    { label: 'Phone Number', name: 'phone_number', placeholder: 'Enter phone number' },
    { label: 'Website', name: 'website', placeholder: 'Enter website URL' },
  ],
  Housing: [
    { label: 'Resource Name', name: 'name', placeholder: 'Enter resource name' },
    { label: 'Address', name: 'location', placeholder: 'Enter address' },
    { label: 'Phone Number', name: 'phone_number', placeholder: 'Enter phone number' },
    { label: 'Website', name: 'website', placeholder: 'Enter website URL' },
  ],
  Wellness: [
    { label: 'Resource Name', name: 'name', placeholder: 'Enter resource name' },
    { label: 'Specialty', name: 'area_of_speciality', placeholder: 'Enter specialty' },
    { label: 'Languages Spoken', name: 'languages_spoken', placeholder: 'Enter languages' },
    { label: 'Rate', name: 'rate', placeholder: 'Enter rate' },
    { label: 'Address', name: 'location', placeholder: 'Enter address' },
    { label: 'Phone Number', name: 'phone_number', placeholder: 'Enter phone number' },
    { label: 'Website', name: 'website', placeholder: 'Enter website URL' },
  ],
  Supplies: [
    { label: 'Resource Name', name: 'name', placeholder: 'Enter resource name' },
    { label: 'Address', name: 'location', placeholder: 'Enter address' },
    { label: 'Phone Number', name: 'phone_number', placeholder: 'Enter phone number' },
    { label: 'Website', name: 'website', placeholder: 'Enter website URL' },
  ],
  Donate: [
    { label: 'Resource Name', name: 'name', placeholder: 'Enter resource name' },
    { label: 'Address', name: 'location', placeholder: 'Enter address' },
    { label: 'Phone Number', name: 'phone_number', placeholder: 'Enter phone number' },
    { label: 'Website', name: 'website', placeholder: 'Enter website URL' },
  ],
  Volunteer: [
    { label: 'Resource Name', name: 'name', placeholder: 'Enter resource name' },
    { label: 'Roles Needed', name: 'roles_needed', placeholder: 'Enter roles needed' },
    { label: 'Address', name: 'location', placeholder: 'Enter address' },
    { label: 'Phone Number', name: 'phone_number', placeholder: 'Enter phone number' },
    { label: 'Website', name: 'website', placeholder: 'Enter website URL' },
  ],
}

export default function UploadResourcePage() {
  const supabase = createClient()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  // if the user is not logged in, redirect to login page
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
      }
    }
    checkSession()
  }, [])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value
    setSelectedCategory(category)
    setFormValues({})
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory) return
    setLoading(true)
    try {
      // get the logged-in user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) throw userError || new Error('Not signed in')

      const tableName = `user_${selectedCategory.toLowerCase()}`
      const payload = {
        ...formValues,
        category: selectedCategory.toLowerCase(),
        created_by: user.id,
      }
      // wrap payload in array
      const { error } = await supabase.from(tableName).insert([payload])
      if (error) throw error

      alert('Resource uploaded!')
      setSelectedCategory('')
      setFormValues({})
    } catch (err: any) {
      console.error('Upload error:', err)
      alert(`Failed to upload resource: ${err.message ?? err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Upload Resource
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="" disabled>Select category...</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="space-y-4">
              {formFields[selectedCategory].map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder={field.placeholder}
                    value={formValues[field.name] || ''}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading || !selectedCategory}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  )
}