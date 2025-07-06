import React from 'react';
import { healthRecommendations } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { AlertTriangle, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Recommendations: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Health Recommendations</h1>
        <Link 
          to="/symptom-checker" 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          Check New Symptoms
        </Link>
      </div>
      
      {healthRecommendations.length > 0 ? (
        <div className="space-y-6">
          {healthRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">
                    Recommendation from {format(parseISO(recommendation.generatedDate), 'MMMM d, yyyy')}
                  </h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download size={18} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-md font-medium text-gray-700 mb-2">Symptoms</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.symptoms.map((symptom) => (
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
                
                <div className="mb-4">
                  <h3 className="text-md font-medium text-gray-700 mb-2">Possible Conditions</h3>
                  <div className="space-y-3">
                    {recommendation.possibleConditions.map((condition, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{condition.condition}</span>
                            <span className="text-gray-500">{Math.round(condition.probability * 100)}% Match</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                condition.probability > 0.7 ? 'bg-red-500' :
                                condition.probability > 0.4 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${condition.probability * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{condition.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">Recommended Actions</h3>
                  <div className="space-y-3">
                    {recommendation.recommendedActions.map((action, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start p-3 rounded-lg ${
                          action.urgency === 'high' ? 'bg-red-50' :
                          action.urgency === 'medium' ? 'bg-yellow-50' :
                          'bg-green-50'
                        }`}
                      >
                        {action.urgency === 'high' && (
                          <AlertTriangle className="text-red-500 mr-3 mt-0.5" size={20} />
                        )}
                        <div>
                          <h4 className={`font-medium ${
                            action.urgency === 'high' ? 'text-red-700' :
                            action.urgency === 'medium' ? 'text-yellow-700' :
                            'text-green-700'
                          }`}>
                            {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                          </h4>
                          <p className={`text-sm mt-1 ${
                            action.urgency === 'high' ? 'text-red-600' :
                            action.urgency === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {action.description}
                          </p>
                          
                          {action.type === 'specialist' && (
                            <Link 
                              to="/appointments" 
                              className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              Book an appointment <ChevronRight size={16} />
                            </Link>
                          )}
                          
                          {action.type === 'medication' && (
                            <Link 
                              to="/prescriptions" 
                              className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              View related medications <ChevronRight size={16} />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Generated by HealthCare AI
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Full Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="text-blue-500" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Recommendations Yet</h2>
          <p className="text-gray-600 mb-6">
            Use our symptom checker to get personalized health recommendations based on your symptoms.
          </p>
          <Link 
            to="/symptom-checker" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Go to Symptom Checker
          </Link>
        </div>
      )}
    </div>
  );
};

export default Recommendations;