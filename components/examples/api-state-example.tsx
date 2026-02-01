'use client'

import { useUsers } from '@/lib/hooks/use-swr'
import { DataList, DataTable, DataCard } from '@/components/ui/api-state'
import { ErrorBoundary } from '@/components/ui/error-boundary'

// Example: User List with API States
export function UserListExample() {
  const { data: users, error, isLoading, mutate } = useUsers({ page: 1, limit: 10 })

  return (
    <ErrorBoundary>
      <DataList
        loading={isLoading}
        error={error}
        data={users?.data}
        onRetry={() => mutate()}
        emptyTitle="No users found"
        emptyDescription="There are no users in the system yet."
        errorTitle="Failed to load users"
        errorDescription="Something went wrong while loading the user list."
        className="space-y-4"
      >
        <div className="space-y-3">
          {users?.data?.map((user: any) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataList>
    </ErrorBoundary>
  )
}

// Example: User Table with API States
export function UserTableExample() {
  const { data: users, error, isLoading, mutate } = useUsers({ page: 1, limit: 10 })

  return (
    <ErrorBoundary>
      <DataTable
        loading={isLoading}
        error={error}
        data={users?.data}
        onRetry={() => mutate()}
        emptyTitle="No users found"
        emptyDescription="There are no users in the system yet."
        errorTitle="Failed to load users"
        errorDescription="Something went wrong while loading the user table."
        columns={4}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Users
              </h2>
              <button className="btn bg-violet-500 text-white hover:bg-violet-600">
                Add User
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users?.data?.map((user: any) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DataTable>
    </ErrorBoundary>
  )
}

// Example: Dashboard Card with API States
export function DashboardCardExample() {
  const { data: stats, error, isLoading, mutate } = useUsers({ page: 1, limit: 1 }) // Mock stats

  return (
    <ErrorBoundary>
      <DataCard
        loading={isLoading}
        error={error}
        data={stats}
        onRetry={() => mutate()}
        emptyTitle="No statistics available"
        emptyDescription="There are no statistics to display at the moment."
        errorTitle="Failed to load statistics"
        errorDescription="Something went wrong while loading the dashboard statistics."
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats?.pagination?.total || 0}
            </p>
          </div>
          <div className="p-3 bg-violet-100 dark:bg-violet-900 rounded-full">
            <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm text-green-600 dark:text-green-400">
            +12% from last month
          </span>
        </div>
      </DataCard>
    </ErrorBoundary>
  )
}
