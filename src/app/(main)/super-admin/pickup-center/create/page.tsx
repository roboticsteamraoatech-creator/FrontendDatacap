"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  centerName: string;
  address: string;
  contact: string;
  amount: number;
  operatingDays: string;
  operatingHours: string;
}

const CreatePickupCenter = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    centerName: '',
    address: '',
    contact: '',
    amount: 0,
    operatingDays: '',
    operatingHours: ''
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
    
    if (!formData.centerName.trim()) {
      newErrors.centerName = 'Center name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    }
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.operatingDays.trim()) {
      newErrors.operatingDays = 'Operating days are required';
    }
    
    if (!formData.operatingHours.trim()) {
      newErrors.operatingHours = 'Operating hours are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real app, this would be an API call to create the pickup center
      console.log('Creating pickup center:', formData);
      
      // Redirect to the list page after successful creation
      router.push('/super-admin/pickup-center');
    }
  };

  return (
    <div className="manrope ml-0 md:ml-[350px] pt-8 md:pt-8 p-4 md:p-8 min-h-screen bg-gray-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Add New Pickup Center</h1>
        <p className="text-gray-600">Fill in the details for the new pickup center</p>
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
                value={formData.centerName}
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
                value={formData.amount}
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
                value={formData.address}
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
                value={formData.contact}
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
                value={formData.operatingDays}
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
                value={formData.operatingHours}
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
              Create Pickup Center
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePickupCenter;