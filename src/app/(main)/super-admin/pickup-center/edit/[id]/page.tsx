"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PickupCenter {
  id: string;
  centerName: string;
  address: string;
  contact: string;
  amount: number;
  operatingDays: string;
  operatingHours: string;
}

const EditPickupCenter = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [pickupCenter, setPickupCenter] = useState<PickupCenter>({
    id: '',
    centerName: '',
    address: '',
    contact: '',
    amount: 0,
    operatingDays: '',
    operatingHours: ''
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Days options for dropdown
  const daysOptions = [
    'Monday - Friday',
    'Monday - Saturday',
    'Tuesday - Saturday',
    'Wednesday - Sunday',
    'Monday - Sunday',
    '24/7 (All Days)',
    'Weekdays Only',
    'Weekends Only',
    'Custom Schedule'
  ];

  // Simulate fetching pickup center data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockPickupCenter: PickupCenter = {
        id: params.id,
        centerName: 'Main Logistics Hub',
        address: '123 Main Street, Downtown, Cityville',
        contact: '+1 (555) 123-4567',
        amount: 1500,
        operatingDays: 'Monday - Saturday',
        operatingHours: '9:00 AM - 7:00 PM'
      };
      
      setPickupCenter(mockPickupCenter);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPickupCenter(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!pickupCenter.centerName.trim()) {
      newErrors.centerName = 'Center name is required';
    }
    
    if (!pickupCenter.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!pickupCenter.contact.trim()) {
      newErrors.contact = 'Contact is required';
    }
    
    if (pickupCenter.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!pickupCenter.operatingDays.trim()) {
      newErrors.operatingDays = 'Operating days are required';
    }
    
    if (!pickupCenter.operatingHours.trim()) {
      newErrors.operatingHours = 'Operating hours are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real app, this would be an API call to update the pickup center
      console.log('Updating pickup center:', pickupCenter);
      
      // Redirect back to the list page after successful update
      router.push('/super-admin/pickup-center');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
          .manrope { font-family: 'Manrope', sans-serif; }
        `}</style>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Edit Pickup Center</h1>
          <p className="text-gray-600">Editing details for pickup center</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-32 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Edit Pickup Center</h1>
        <p className="text-gray-600">Update details for {pickupCenter.centerName}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Center Name *
              </label>
              <input
                type="text"
                name="centerName"
                value={pickupCenter.centerName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B] ${
                  errors.centerName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter center name"
              />
              {errors.centerName && (
                <p className="mt-1 text-sm text-red-600">{errors.centerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($)*
              </label>
              <input
                type="number"
                name="amount"
                value={pickupCenter.amount}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B] ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={pickupCenter.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B] ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter full address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contact"
                value={pickupCenter.contact}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B] ${
                  errors.contact ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter contact number"
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Days *
              </label>
              <select
                name="operatingDays"
                value={pickupCenter.operatingDays}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B] ${
                  errors.operatingDays ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select operating days</option>
                {daysOptions.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              {errors.operatingDays && (
                <p className="mt-1 text-sm text-red-600">{errors.operatingDays}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Hours *
              </label>
              <input
                type="text"
                name="operatingHours"
                value={pickupCenter.operatingHours}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D2A8B] focus:border-[#5D2A8B] ${
                  errors.operatingHours ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 9:00 AM - 7:00 PM or 24/7"
              />
              {errors.operatingHours && (
                <p className="mt-1 text-sm text-red-600">{errors.operatingHours}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/super-admin/pickup-center')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#5D2A8B] text-white rounded-lg hover:bg-[#4a216d]"
            >
              Update Pickup Center
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPickupCenter;