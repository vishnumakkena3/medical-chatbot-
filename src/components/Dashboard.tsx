import React from 'react';
import { 
  Calendar, 
  Activity, 
  FileText, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Heart,
  Droplet
} from 'lucide-react';
import { appointments, healthRecommendations, prescriptions, healthStats } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const upcomingAppointments = appointments.filter(app => app.status === 'scheduled');
  const latestRecommendation = healthRecommendations[healthRecommendations.length - 1];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </div>
      </div>
      
      {/* Health Alert */}
      {latestRecommendation && latestRecommendation.recommendedActions.some(action => action.urgency === 'high') && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="text-red-500 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-red-800">Health Alert</h3>
              <p className="text-sm text-red-700 mt-1">
                {latestRecommendation.recommendedActions.find(action => action.urgency === 'high')?.description}
              </p>
              <Link to="/recommendations" className="text-sm font-medium text-red-800 hover:text-red-900 mt-2 inline-block">
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Appointments</p>
              <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Calendar className="text-blue-500" size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Next: {upcomingAppointments.length > 0 ? 
            `${format(parseISO(upcomingAppointments[0].date), 'MMM d')} at ${upcomingAppointments[0].time}` : 
            'None scheduled'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Recommendations</p>
              <p className="text-2xl font-bold">{healthRecommendations.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <Activity className="text-green-500" size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {format(parseISO(healthRecommendations[healthRecommendations.length - 1].generatedDate), 'MMM d, yyyy')}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Prescriptions</p>
              <p className="text-2xl font-bold">{prescriptions.length}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <FileText className="text-purple-500" size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Active: {prescriptions.filter(p => new Date(p.expiryDate) > new Date()).length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Health Score</p>
              <p className="text-2xl font-bold">85/100</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-full">
              <Heart className="text-yellow-500" size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span className="text-green-500 flex items-center">
              <TrendingUp size={12} className="mr-1" /> 3% improvement
            </span>
          </p>
        </div>
      </div>
      
      {/* Health Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Health Metrics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Heart className="text-red-500 mr-2" size={16} />
                  <span className="text-sm font-medium">Blood Pressure</span>
                </div>
                <span className="text-sm text-gray-500">Last 5 readings</span>
              </div>
              <div className="h-10 bg-gray-100 rounded-full overflow-hidden">
                {healthStats.monthlyBloodPressure.map((bp, index) => (
                  <div 
                    key={index}
                    className="relative h-full inline-block"
                    style={{ 
                      width: `${100 / healthStats.monthlyBloodPressure.length}%`,
                      backgroundColor: bp.systolic > 130 ? '#FCA5A5' : '#93C5FD'
                    }}
                  >
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white font-medium">
                      {bp.systolic}/{bp.diastolic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Activity className="text-green-500 mr-2" size={16} />
                  <span className="text-sm font-medium">Daily Steps</span>
                </div>
                <span className="text-sm text-gray-500">Last 7 days</span>
              </div>
              <div className="flex h-10">
                {healthStats.weeklyStepCount.map((steps, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-4 bg-green-400 rounded-t"
                      style={{ height: `${(steps / 10000) * 100}%`, maxHeight: '100%' }}
                    ></div>
                    <span className="text-xs mt-1">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Clock className="text-blue-500 mr-2" size={16} />
                  <span className="text-sm font-medium">Sleep Duration</span>
                </div>
                <span className="text-sm text-gray-500">Last 7 days</span>
              </div>
              <div className="h-10 bg-gray-100 rounded-full overflow-hidden flex">
                {healthStats.sleepData.map((hours, index) => (
                  <div 
                    key={index}
                    className="h-full"
                    style={{ 
                      width: `${100 / healthStats.sleepData.length}%`,
                      backgroundColor: hours < 7 ? '#FCA5A5' : hours > 8 ? '#93C5FD' : '#A7F3D0'
                    }}
                  >
                    <div className="h-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{hours}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Droplet className="text-purple-500 mr-2" size={16} />
                  <span className="text-sm font-medium">Hydration</span>
                </div>
                <span className="text-sm text-gray-500">Today's goal</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 rounded-full text-xs font-medium text-blue-100 text-center p-0.5 leading-none"
                  style={{ width: '75%' }}
                >
                  75% (1.5L / 2L)
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            <Link to="/appointments" className="text-sm text-blue-600 hover:text-blue-800">View All</Link>
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center min-w-16">
                    <p className="text-sm font-bold">{format(parseISO(appointment.date), 'MMM')}</p>
                    <p className="text-xl font-bold">{format(parseISO(appointment.date), 'd')}</p>
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{appointment.doctorName}</h3>
                    <p className="text-sm text-gray-500">{appointment.specialization}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto text-gray-300" size={40} />
              <p className="mt-2 text-gray-500">No upcoming appointments</p>
              <Link 
                to="/appointments" 
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Schedule Now
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Latest Recommendation */}
      {latestRecommendation && (
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Latest Health Recommendation</h2>
            <Link to="/recommendations" className="text-sm text-blue-600 hover:text-blue-800">View All</Link>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Based on your symptoms:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {latestRecommendation.symptoms.map((symptom) => (
                    <span 
                      key={symptom.id} 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        symptom.severity === 'mild' ? 'bg-green-50 text-green-700' :
                        symptom.severity === 'moderate' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}
                    >
                      {symptom.name} ({symptom.severity})
                    </span>
                  ))}
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Possible conditions:</p>
                  <div className="space-y-2 mt-2">
                    {latestRecommendation.possibleConditions.map((condition, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full max-w-xs">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{condition.condition}</span>
                            <span>{Math.round(condition.probability * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-600 rounded-full" 
                              style={{ width: `${condition.probability * 100}%` }}

                              
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Recommended actions:</p>
                  <ul className="mt-2 space-y-2">
                    {latestRecommendation.recommendedActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span 
                          className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 ${
                            action.urgency === 'low' ? 'bg-green-500' :
                            action.urgency === 'medium' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                        ></span>
                        <span className="text-sm">{action.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Generated on {format(parseISO(latestRecommendation.generatedDate), 'MMMM d, yyyy')}
              </span>
              <Link 
                to="/symptom-checker" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Check New Symptoms
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;