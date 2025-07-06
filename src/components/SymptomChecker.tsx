import React, { useState } from 'react';
import { Search, Plus, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { commonSymptoms } from '../data/mockData';
import { Symptom } from '../types';

const SymptomChecker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredSymptoms = searchTerm 
    ? commonSymptoms.filter(symptom => 
        symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
    
  const handleAddSymptom = (symptomId: string, symptomName: string) => {
    if (selectedSymptoms.some(s => s.id === symptomId)) return;
    
    const newSymptom: Symptom = {
      id: symptomId,
      name: symptomName,
      severity: 'moderate',
      duration: '1 day',
      description: ''
    };
    
    setSelectedSymptoms([...selectedSymptoms, newSymptom]);
    setSearchTerm('');
  };
  
  const handleRemoveSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };
  
  const handleSeverityChange = (symptomId: string, severity: 'mild' | 'moderate' | 'severe') => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === symptomId ? { ...s, severity } : s
      )
    );
  };
  
  const handleDurationChange = (symptomId: string, duration: string) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === symptomId ? { ...s, duration } : s
      )
    );
  };
  
  const handleDescriptionChange = (symptomId: string, description: string) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === symptomId ? { ...s, description } : s
      )
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Symptom Checker</h1>
      
      {!showResults ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Enter Your Symptoms</h2>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for symptoms (e.g., headache, fever, cough)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {searchTerm && filteredSymptoms.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {filteredSymptoms.map(symptom => (
                    <li 
                      key={symptom.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => handleAddSymptom(symptom.id, symptom.name)}
                    >
                      <span>{symptom.name}</span>
                      <Plus size={16} className="text-blue-600" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {selectedSymptoms.length > 0 ? (
            <div className="space-y-4 mb-6">
              <h3 className="font-medium text-gray-700">Selected Symptoms</h3>
              
              {selectedSymptoms.map(symptom => (
                <div key={symptom.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{symptom.name}</h4>
                    <button 
                      onClick={() => handleRemoveSymptom(symptom.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Severity
                      </label>
                      <div className="flex space-x-2">
                        {(['mild', 'moderate', 'severe'] as const).map((severity) => (
                          <button
                            key={severity}
                            type="button"
                            className={`px-3 py-1.5 text-sm rounded-full ${
                              symptom.severity === severity
                                ? severity === 'mild' 
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : severity === 'moderate'
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                  : 'bg-red-100 text-red-800 border-red-300'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            } border`}
                            onClick={() => handleSeverityChange(symptom.id, severity)}
                          >
                            {severity.charAt(0).toUpperCase() + severity.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <select
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={symptom.duration}
                        onChange={(e) => handleDurationChange(symptom.id, e.target.value)}
                      >
                        <option value="Less than a day">Less than a day</option>
                        <option value="1 day">1 day</option>
                        <option value="2-3 days">2-3 days</option>
                        <option value="4-7 days">4-7 days</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="More than 2 weeks">More than 2 weeks</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Details (optional)
                    </label>
                    <textarea
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                      placeholder="Describe any specific details about this symptom..."
                      value={symptom.description || ''}
                      onChange={(e) => handleDescriptionChange(symptom.id, e.target.value)}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg mb-6">
              <Search className="mx-auto text-gray-300" size={40} />
              <p className="mt-2 text-gray-500">Search and add symptoms to get personalized health recommendations</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              className={`px-6 py-3 rounded-lg text-white font-medium ${
                selectedSymptoms.length > 0
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={selectedSymptoms.length === 0 || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Symptoms...
                </span>
              ) : (
                'Get Recommendations'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Analysis Results</h2>
              <button
                onClick={() => setShowResults(false)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Check Different Symptoms
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Based on your symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom) => (
                  <span 
                    key={symptom.id} 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      symptom.severity === 'mild' ? 'bg-green-50 text-green-700' :
                      symptom.severity === 'moderate' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }`}
                  >
                    {symptom.name} ({symptom.severity})
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Possible Conditions</h3>
              
              <div className="space-y-4">
                {/* Dynamically generated based on symptoms */}
                {selectedSymptoms.some(s => s.name.toLowerCase().includes('headache')) && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Migraine</h4>
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
                        65% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      A neurological condition characterized by recurrent headaches that can cause throbbing pain, often accompanied by nausea, vomiting, and sensitivity to light and sound.
                    </p>
                    <div className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      <span>Learn more</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                )}
                
                {selectedSymptoms.some(s => s.name.toLowerCase().includes('fever') || s.name.toLowerCase().includes('cough')) && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Common Cold</h4>
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        78% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      A viral infection of the upper respiratory tract that primarily affects the nose and throat. Symptoms typically include runny nose, sore throat, cough, and mild fever.
                    </p>
                    <div className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      <span>Learn more</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                )}
                
                {selectedSymptoms.some(s => s.name.toLowerCase().includes('chest pain') || s.name.toLowerCase().includes('breath')) && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Anxiety</h4>
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
                        55% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      A mental health condition characterized by feelings of worry, nervousness, or unease about something with an uncertain outcome. Physical symptoms can include rapid heartbeat, shortness of breath, and chest tightness.
                    </p>
                    <div className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      <span>Learn more</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                )}
                
                {/* Default condition if none of the above match */}
                {!selectedSymptoms.some(s => 
                  s.name.toLowerCase().includes('headache') || 
                  s.name.toLowerCase().includes('fever') || 
                  s.name.toLowerCase().includes('cough') ||
                  s.name.toLowerCase().includes('chest pain') ||
                  s.name.toLowerCase().includes('breath')
                ) && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">General Fatigue</h4>
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        60% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      A state of tiredness that can be caused by various factors including stress, poor sleep, or mild illness. It's often temporary and resolves with rest.
                    </p>
                    <div className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      <span>Learn more</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Note: These are potential matches based on your symptoms and should not be considered as a definitive diagnosis.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Recommended Actions</h3>
              
              <div className="space-y-3">
                {selectedSymptoms.some(s => s.severity === 'severe') && (
                  <div className="flex items-start p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="text-red-500 mr-3 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-medium text-red-700">Seek Immediate Medical Attention</h4>
                      <p className="text-sm text-red-600 mt-1">
                        Your symptoms indicate a potentially serious condition that requires prompt medical evaluation.
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedSymptoms.some(s => s.name.toLowerCase().includes('headache')) && (
                  <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <span className="text-blue-700 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Rest in a quiet, dark room</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Reduce exposure to light and noise which can aggravate headache symptoms.
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedSymptoms.some(s => s.name.toLowerCase().includes('fever') || s.name.toLowerCase().includes('cough')) && (
                  <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <span className="text-blue-700 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Stay hydrated and get plenty of rest</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Drink fluids regularly and allow your body time to recover.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <span className="text-blue-700 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Schedule a consultation with a healthcare provider</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      For a comprehensive evaluation and personalized treatment plan.
                    </p>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                <strong>Disclaimer:</strong> This information is provided for educational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Save Your Results</h2>
            <p className="text-gray-600 mb-4">
              Save these results to your health profile for future reference and to track your health over time.
            </p>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Save to My Health Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                Download PDF Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;