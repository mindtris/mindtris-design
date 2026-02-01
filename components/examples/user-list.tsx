'use client'

import { useState } from 'react'
import { useUsers } from '@/lib/hooks/use-swr'
import { useUserMutations } from '@/lib/hooks/use-mutations'

export default function UserList() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  
  // Fetch users with SWR
  const { data: usersData, error, isLoading, mutate } = useUsers({ page, limit })
  
  // Mutations for user operations
  const { createUser, updateUser, deleteUser } = useUserMutations()
  
  const handleCreateUser = async () => {
    try {
      await createUser.mutate({
        data: {
          name: 'New User',
          email: 'newuser@example.com',
          role: 'user'
        }
      })
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }
  
  const handleUpdateUser = async (userId: string) => {
    try {
      await updateUser.mutate({
        id: userId,
        data: {
          name: 'Updated User'
        }
      })
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }
  
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser.mutate({ id: userId })
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading users: {error.message}</p>
        <button 
          onClick={() => mutate()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Users
          </h2>
          <button
            onClick={handleCreateUser}
            disabled={createUser.isLoading}
            className="btn bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50"
          >
            {createUser.isLoading ? 'Creating...' : 'Add User'}
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {usersData?.data?.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateUser(user.id)}
                      disabled={updateUser.isLoading}
                      className="text-violet-600 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-300 disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteUser.isLoading}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {usersData?.pagination && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, usersData.pagination.total)} of {usersData.pagination.total} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={!usersData.pagination.hasPrev}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={!usersData.pagination.hasNext}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
