import React, { useState } from 'react';
import { doctors } from '../data/mockData';
import { Search, MapPin, Star, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  const specialties = [...new Set(doctors.map(doctor => doctor.specialization))];
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialization === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Doctors</h1>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by name, specialty, or hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 md:w-auto w-full justify-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Specialty</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSpecialty === ''
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSpecialty('')}
                >
                  All Specialties
                </button>
                
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSpecialty === specialty
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setSelectedSpecialty('');
                    setSearchTerm('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
          </h2>
          
          {filteredDoctors.length > 0 ? (
            <div className="space-y-6">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                      <img 
                        src={doctor.profilePicture || 'https://via.placeholder.com/150'} 
                        alt={doctor.name} 
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="md:w-3/4 md:pl-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <div className="flex items-center mt-1 md:mt-0">
                          <Star className="text-yellow-400 mr-1" size={16} />
                          <span className="text-gray-700">{doctor.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
                      
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin size={16} className="mr-1" />
                        <span>{doctor.hospital}</span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.availability.map((avail, index) => (
                            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {avail.day.substring(0, 3)}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link 
                          to="/appointments" 
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 text-center"
                        >
                          Book Appointment
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="mx-auto text-gray-300" size={40} />
              <p className="mt-2 text-gray-500">No doctors found matching your criteria</p>
              <button
                className="mt-3 px-4 py-2 text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setSelectedSpecialty('');
                  setSearchTerm('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;