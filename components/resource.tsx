"use client"

import { useEffect, useState } from 'react'
import { getData } from "@/components/get-data"

// Mock data to use until your DB is ready
const getMockData = (slug: string) => {
  return {
    resource: {
      title: `Guide to ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
      description: `This comprehensive resource covers everything you need to know about ${slug}. Learn the fundamentals, advanced techniques, and best practices for implementing ${slug} in your projects.`,
      imageUrl: "/api/placeholder/800/400"
    },
    user: {
      username: "Jane Developer",
      email: "jane@example.com",
      phone: "(555) 123-4567",
      avatarUrl: "/api/placeholder/100/100"
    }
  }
}

export default function Resource({ slug }: Readonly<{ slug: string }>) {
  const [resourceData, setResourceData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        // When DB is ready, uncomment this:
        // const data = await getData({
        //   table: 'users_public',
        //   query: '*',
        // })
        // setResourceData(data)
        
        // Mock data for now
        setResourceData(getMockData(slug))
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, []) // Added slug as dependency to reload when it changes

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (!resourceData) {
    return <div>Resource not found</div>
  }

  const { resource, user } = resourceData

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content column */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
          <div className="mb-6">
            <img 
              src={resource.imageUrl} 
              alt="Resource visual" 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700">{resource.description}</p>
          </div>
        </div>
        
        {/* Contact sidebar */}
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={user.avatarUrl} 
                alt="User avatar" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{user.username}</h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-gray-700">{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}