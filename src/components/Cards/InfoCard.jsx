import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-medium text-gray-500">{label}</span>
        </div>
        <span className={`text-sm font-semibold ${color} px-2 py-1 rounded-md`}>{value}</span>
      </div>
    </div>
  )
}

export default InfoCard