"use client"

import { useEffect, useState } from 'react'
import { useSidebar } from "@/components/ui/sidebar"
import { getResourceDetails } from "@/components/get-data"
import ToggleFavoriteButton from "@/components/toggle-favorite-button"

// Category-specific components
interface Resource {
  name: string;
  website?: string;
  location?: string;
  phone_number?: string;
  area_of_speciality?: string;
  languages_spoken?: string;
  rate?: string;
  roles_needed?: string;
  more_details?: string;
  slug: string;
}

const DonateResource = ({ resource }: { resource: Resource }) => {
  const { name, website } = resource;
  
  return (
    <>
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <p className="text-gray-700">
            This is an online-only donation resource. Please visit the website for more information on how to contribute.
          </p>
        </div>
      </div>
      
      <div className="lg:w-1/3">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          {website && (
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Website</h3>
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            </div>
          )}
          
          {!website && (
            <p className="text-gray-500 italic">No contact information available</p>
          )}
        </div>
      </div>
    </>
  );
};

const FoodResource = ({ resource }: { resource: Resource }) => {
  const { name, location, website, phone_number } = resource;
  
  return (
    <>
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          
          {location && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Location</h3>
              <p className="text-gray-700">{location}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="lg:w-1/3">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            {website && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              </div>
            )}
            
            {phone_number && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <a href={`tel:${phone_number}`} className="text-green-600 hover:underline">
                    {phone_number}
                  </a>
                </div>
              </div>
            )}
            
            {!website && !phone_number && (
              <p className="text-gray-500 italic">No contact information available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Main Resource component that selects the appropriate view based on category
export default function Resource({ slug }: { slug: string }) {
  const [resourceData, setResourceData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { toggleSidebar, open } = useSidebar()

  // Open sidebar when component mounts if not already open
  useEffect(() => {
    if (!open) {
      toggleSidebar()
    }
  }, [])

  // Extract category from slug
  const category = slug ? slug.split("-")[0] : '';

  // Fetch resource data
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true)
        const resource = await getResourceDetails(slug)
        setResourceData(resource)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load resource details")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [slug]) // Reload when slug changes

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  // Render error state
  if (error || !resourceData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Resource not found</h2>
          <p className="text-gray-500">The requested resource could not be loaded</p>
        </div>
      </div>
    )
  }

  console.log("resourceData", resourceData)

  // Get category-specific component based on the slug's first part
  const getCategoryComponent = () => {
    switch (category) {
      case 'donate':
        return <DonateResource resource={resourceData} />;
      case 'food':
        return <FoodResource resource={resourceData} />;
      case 'housing':
        return <HousingResource resource={resourceData} />;
      case 'supplies':
        return <SuppliesResource resource={resourceData} />;
      case 'volunteer':
        return <VolunteerResource resource={resourceData} />;
      case 'wellness':
        return <WellnessResource resource={resourceData} />;
      default:
        return <FoodResource resource={resourceData} />;
    }
  };

  // Get badge color based on category
  const getCategoryBadgeColor = () => {
    switch (category) {
      case 'donate':
        return 'bg-purple-100 text-purple-800';
      case 'food':
        return 'bg-green-100 text-green-800';
      case 'housing':
        return 'bg-blue-100 text-blue-800';
      case 'supplies':
        return 'bg-yellow-100 text-yellow-800';
      case 'volunteer':
        return 'bg-red-100 text-red-800';
      case 'wellness':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const { name } = resourceData;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header section with name and category */}
      <div className="mb-6 border-b pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryBadgeColor()}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </div>
          </div>
          <ToggleFavoriteButton slug={slug} mode="text" />
        </div>
      </div>

      {/* Render the appropriate component based on category */}
      <div className="flex flex-col lg:flex-row gap-8">
        {getCategoryComponent()}
      </div>
    </div>
  )
}

const HousingResource = ({ resource }: { resource: Resource }) => {
  const { name, location, website, phone_number } = resource;
  
  // Check if website is properly formatted
  const isValidWebsite = website && /^(https?:\/\/|www\.|.*\.(com|org|net|edu|gov|io|co)).*/i.test(website);
  
  return (
    <>
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          
          {location && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Location</h3>
              <p className="text-gray-700">{location}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="lg:w-2/3">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            {isValidWebsite && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              </div>
            )}
            
            {phone_number && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <a href={`tel:${phone_number}`} className="text-green-600 hover:underline">
                    {phone_number}
                  </a>
                </div>
              </div>
            )}
            
            {!isValidWebsite && !phone_number && (
              <p className="text-gray-500 italic">No contact information available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SuppliesResource = ({ resource }: { resource: Resource }) => {
  const { name, website } = resource;
  
  return (
    <>
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <p className="text-gray-700">
            This is an online-only supplies resource. Please visit the website for more information.
          </p>
        </div>
      </div>
      
      <div className="lg:w-1/3">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          {website && (
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Website</h3>
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            </div>
          )}
          
          {!website && (
            <p className="text-gray-500 italic">No contact information available</p>
          )}
        </div>
      </div>
    </>
  );
};

const VolunteerResource = ({ resource }: { resource: Resource }) => {
  const { name, location, website, phone_number, roles_needed, more_details } = resource;
  
  return (
    <>
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          
          {location && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Location</h3>
              <p className="text-gray-700">{location}</p>
            </div>
          )}
          
          {roles_needed && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Roles Needed</h3>
              <p className="text-gray-700">{roles_needed}</p>
            </div>
          )}
          
          {more_details && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Additional Information</h3>
              <p className="text-gray-700">{more_details}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="lg:w-1/3">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            {website && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              </div>
            )}
            
            {phone_number && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <a href={`tel:${phone_number}`} className="text-green-600 hover:underline">
                    {phone_number}
                  </a>
                </div>
              </div>
            )}
            
            {!website && !phone_number && (
              <p className="text-gray-500 italic">No contact information available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const WellnessResource = ({ resource }: { resource: Resource }) => {
  const { name, location, website, phone_number, area_of_speciality, languages_spoken, rate } = resource;
  
  // Check if website is properly formatted
  const isValidWebsite = website && /^(https?:\/\/|www\.|.*\.(com|org|net|edu|gov|io|co)).*/i.test(website);
  
  // Check if phone_number is an email instead
  const isEmail = phone_number && phone_number.includes('@');
  
  return (
    <>
      <div className="lg:w-1/2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          
          {location && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Location</h3>
              <p className="text-gray-700">{location}</p>
            </div>
          )}
          
          {area_of_speciality && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Area of Specialty</h3>
              <p className="text-gray-700">{area_of_speciality}</p>
            </div>
          )}
          
          {languages_spoken && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Languages Spoken</h3>
              <p className="text-gray-700">{languages_spoken}</p>
            </div>
          )}
          
          {rate && (
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Rate</h3>
              <p className="text-gray-700">{rate}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="lg:w-1/2">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            {isValidWebsite && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              </div>
            )}
            
            {phone_number && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
                  {isEmail ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{isEmail ? 'Email' : 'Phone'}</h3>
                  {isEmail ? (
                    <a href={`mailto:${phone_number}`} className="text-green-600 hover:underline">
                      {phone_number}
                    </a>
                  ) : (
                    <a href={`tel:${phone_number}`} className="text-green-600 hover:underline">
                      {phone_number}
                    </a>
                  )}
                </div>
              </div>
            )}
            
            {!isValidWebsite && !phone_number && (
              <p className="text-gray-500 italic">No contact information available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
