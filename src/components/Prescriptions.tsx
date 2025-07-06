import React, { useState } from 'react';
import { prescriptions } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { FileText, Download, Calendar, Clock, User, Pill } from 'lucide-react';
import { jsPDF } from 'jspdf';

const Prescriptions: React.FC = () => {
  const [selectedPrescription, setSelectedPrescription] = useState(prescriptions[0]);
  
  const activePrescriptions = prescriptions.filter(p => new Date(p.expiryDate) > new Date());
  const expiredPrescriptions = prescriptions.filter(p => new Date(p.expiryDate) <= new Date());
  
  const handleDownloadPDF = () => {
    // In a real app, this would generate a proper PDF with formatting
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Medical Prescription', 105, 20, { align: 'center' });
    
    // Add doctor info
    doc.setFontSize(12);
    doc.text(`Dr. ${selectedPrescription.doctorName}`, 20, 40);
    doc.text(`Issued: ${format(parseISO(selectedPrescription.issueDate), 'MMMM d, yyyy')}`, 20, 50);
    
    // Add patient info
    doc.text('Patient: Vishnu makkena ', 20, 70);
    doc.text(`Diagnosis: ${selectedPrescription.diagnosis}`, 20, 80);
    
    // Add medications
    doc.setFontSize(14);
    doc.text('Prescribed Medications:', 20, 100);
    
    let yPos = 110;
    selectedPrescription.medications.forEach((med, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${med.name}`, 25, yPos);
      doc.setFontSize(10);
      doc.text(`Dosage: ${med.dosage}`, 30, yPos + 7);
      doc.text(`Frequency: ${med.frequency}`, 30, yPos + 14);
      doc.text(`Duration: ${med.duration}`, 30, yPos + 21);
      if (med.notes) {
        doc.text(`Notes: ${med.notes}`, 30, yPos + 28);
        yPos += 35;
      } else {
        yPos += 28;
      }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.text('This is an electronically generated prescription.', 105, 270, { align: 'center' });
    doc.text('Valid until: ' + format(parseISO(selectedPrescription.expiryDate), 'MMMM d, yyyy'), 105, 275, { align: 'center' });
    
    // Save the PDF
    doc.save(`prescription_${selectedPrescription.id}.pdf`);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Prescriptions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prescription List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold">Your Prescriptions</h2>
            </div>
            
            {activePrescriptions.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-500">Active</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {activePrescriptions.map((prescription) => (
                    <div 
                      key={prescription.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedPrescription.id === prescription.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg ${
                          selectedPrescription.id === prescription.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <FileText size={20} />
                        </div>
                        
                        <div className="ml-3">
                          <p className="font-medium">{prescription.diagnosis}</p>
                          <p className="text-sm text-gray-500">Dr. {prescription.doctorName}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Issued: {format(parseISO(prescription.issueDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {expiredPrescriptions.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-500">Expired</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {expiredPrescriptions.map((prescription) => (
                    <div 
                      key={prescription.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedPrescription.id === prescription.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg ${
                          selectedPrescription.id === prescription.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <FileText size={20} />
                        </div>
                        
                        <div className="ml-3">
                          <p className="font-medium">{prescription.diagnosis}</p>
                          <p className="text-sm text-gray-500">Dr. {prescription.doctorName}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Expired: {format(parseISO(prescription.expiryDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Prescription Details */}
        <div className="lg:col-span-2">
          {selectedPrescription ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedPrescription.diagnosis}</h2>
                    <p className="text-gray-500">Prescription #{selectedPrescription.id.slice(-6)}</p>
                  </div>
                  
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">Issue Date</span>
                    </div>
                    <p className="font-medium">
                      {format(parseISO(selectedPrescription.issueDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">Valid Until</span>
                    </div>
                    <p className={`font-medium ${
                      new Date(selectedPrescription.expiryDate) <= new Date() ? 'text-red-600' : ''
                    }`}>
                      {format(parseISO(selectedPrescription.expiryDate), 'MMMM d, yyyy')}
                      {new Date(selectedPrescription.expiryDate) <= new Date() && ' (Expired)'}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-500">
                      <User size={16} className="mr-2" />
                      <span className="text-sm">Prescribed By</span>
                    </div>
                    <p className="font-medium">Dr. {selectedPrescription.doctorName}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Medications</h3>
                  
                  <div className="space-y-4">
                    {selectedPrescription.medications.map((medication, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Pill size={20} />
                          </div>
                          
                          <div className="ml-3 flex-1">
                            <h4 className="font-medium">{medication.name}</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                              <div>
                                <p className="text-xs text-gray-500">Dosage</p>
                                <p className="text-sm">{medication.dosage}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Frequency</p>
                                <p className="text-sm">{medication.frequency}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Duration</p>
                                <p className="text-sm">{medication.duration}</p>
                              </div>
                            </div>
                            
                            {medication.notes && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500">Notes</p>
                                <p className="text-sm">{medication.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedPrescription.additionalNotes && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Additional Notes</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm">{selectedPrescription.additionalNotes}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
                <p className="text-sm text-gray-500">
                  This is an electronically generated prescription and is valid for the period specified above.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FileText className="mx-auto text-gray-300" size={40} />
              <p className="mt-2 text-gray-500">Select a prescription to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;