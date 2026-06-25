import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { UserPlus } from 'lucide-react'
import { SearchInput } from '@/components/custom/SearchInput'
import { useCustomers } from '@/hooks/useCustomers'
import { ROUTES } from '@/constants'

export function CustomerPicker({ selectedCustomer, onSelect }) {
  const [search, setSearch] = useState('')
  const { data: customers, isLoading } = useCustomers({ search })

  if (selectedCustomer) {
    return (
      <div className="flex items-center justify-between rounded-lg border bg-accent p-4">
        <div>
          <p className="font-medium">{selectedCustomer.fullName}</p>
          <p className="text-sm text-muted-foreground">
            {selectedCustomer.customerId} &middot; {selectedCustomer.phone}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="text-sm font-medium text-primary hover:underline"
        >
          Change
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <SearchInput value={search} onChange={setSearch} placeholder="Search customers by name, email, or ID…" />
      <div className="max-h-72 space-y-1 overflow-y-auto rounded-lg border p-1">
        {isLoading ? (
          <p className="p-3 text-sm text-muted-foreground">Searching…</p>
        ) : !customers?.length ? (
          <p className="p-3 text-sm text-muted-foreground">No customers found.</p>
        ) : (
          customers.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm hover:bg-muted"
            >
              <span>
                <span className="block font-medium">{c.fullName}</span>
                <span className="block text-xs text-muted-foreground">
                  {c.customerId} &middot; {c.email}
                </span>
              </span>
            </button>
          ))
        )}
      </div>
      <Link
        to={ROUTES.ADMIN_CUSTOMER_NEW}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <UserPlus className="h-4 w-4" />
        Register a new customer instead
      </Link>
    </div>
  )
}
