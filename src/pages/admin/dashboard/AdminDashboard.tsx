import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='p-5'>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Informations produit</h3>

        <div className="grid grid-cols-[130px_1fr] gap-3 text-sm text-left">
          <span className="text-muted-foreground">Référence</span>
          <span className="font-medium">MBP-15-16-512</span>
          <span className="text-muted-foreground">Prix</span>
          <span className="font-medium">4534500 Ar</span>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard