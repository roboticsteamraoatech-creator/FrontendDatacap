"use client";

import React from 'react';

const ViewPickupCenter = ({ params }: { params: { id: string } }) => {
  // In a real implementation, this would fetch the specific pickup center data
  const pickupCenter = {
    id: params.id,
    centerName: 'Sample Center Name',
    address: 'Sample Address, City',
    contact: '+1 (555) 123-4567',
    amount: 1500,
    operatingDays: 'Monday - Saturday',
    operatingHours: '9:00 AM - 7:00 PM',
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">View Pickup Center</h1>
        <p className="text-gray-600">View details for {pickupCenter.centerName}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Center Name</label>
                <p className="text-gray-900">{pickupCenter.centerName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                <p className="text-gray-900">{pickupCenter.address}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Contact</label>
                <p className="text-gray-900">{pickupCenter.contact}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Operational Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                <p className="text-gray-900">{formatCurrency(pickupCenter.amount)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Operating Days</label>
                <p className="text-gray-900">{pickupCenter.operatingDays}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Operating Hours</label>
                <p className="text-gray-900">{pickupCenter.operatingHours}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dates</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Created Date</label>
                <p className="text-gray-900">{formatDate(pickupCenter.createdAt)}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Updated Date</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Updated</label>
                <p className="text-gray-900">{formatDate(pickupCenter.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPickupCenter;