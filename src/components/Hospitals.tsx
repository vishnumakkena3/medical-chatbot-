import React, { useState } from 'react';
import { hospitals } from '../data/mockData';
import { Search, MapPin, Phone, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hospitals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  
  // Get unique specialties from all hospitals
  const allSpecialties = hospitals.reduce((acc: string[], hospital) => {
    hospital.specialties.forEach(specialty => {
      if (!acc.includes(specialty)) {
        acc.push(specialty);
      }
    });
    return acc;
  }, []);
  
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = searchTerm === '' || 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialty = selectedSpecialty === '' || hospital.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Hospitals</h1>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by hospital name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:w-1/3">
              <select
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {filteredHospitals.length} {filteredHospitals.length === 1 ? 'Hospital' : 'Hospitals'} Found
          </h2>
          
          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital) => (
                <div key={hospital.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300">
                  <img 
                    src={hospital.image || 'https://via.placeholder.com/400x200'} 
                    alt={hospital.name} 
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{hospital.name}</h3>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span className="text-gray-700">{hospital.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-gray-500 mb-3">
                      <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                      <span>{hospital.address}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <Phone size={16} className="mr-1" />
                      <span>{hospital.contact}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty, index) => (
                          <span 
                            key={index} 
                            className={`text-xs px-2 py-1 rounded ${
                              specialty === selectedSpecialty
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Link 
                        to="/doctors" 
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 text-center"
                      >
                        Find Doctors
                      </Link>
                      <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                        <ExternalLink size={16} className="mr-1" />
                        Website
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="mx-auto text-gray-300" size={40} />
              <p className="mt-2 text-gray-500">No hospitals found matching your criteria</p>
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

export default Hospitals;