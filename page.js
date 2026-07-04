'use client';
import { useState } from 'react';
import { Phone, MapPin, Clock, CheckCircle, ShieldCheck, Award, Smile } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    treatment: 'General Checkup',
    appointment_date: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ patient_name: '', phone: '', treatment: 'General Checkup', appointment_date: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="bg-red-800 text-white text-center py-2 px-4 text-sm font-medium">
        ✨ Your smile means everything to us! Call us directly at 8378967688 for emergency care.
      </div>

      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white py-16 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
              <img 
                src="/bfa7ab7e7fbf45848e7b8e0daa144472.jpg" 
                alt="Dr. Prabhat Kawale" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <span className="bg-red-800 text-red-100 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Multispeciality Dental Clinic
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-3 mb-2 tracking-tight">Kiran Multispeciality Dental Clinic</h1>
            <p className="text-xl md:text-2xl mb-4 text-red-100 font-light">Transforming Smiles, Transforming Lives</p>
            <div className="border-t border-red-500/40 my-4"></div>
            <h2 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Award className="text-yellow-400 w-6 h-6" /> Dr. Prabhat Kawale
            </h2>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start text-sm">
              <div className="flex items-center gap-2 bg-red-800/40 px-4 py-3 rounded-lg border border-red-500/30">
                <MapPin className="text-red-200 w-5 h-5 flex-shrink-0" />
                <span className="text-left">Zarariya Complex, Near Snehal Talkies, Station Road, Tirora</span>
              </div>
              <div className="flex items-center gap-2 bg-red-800/40 px-4 py-3 rounded-lg border border-red-500/30">
                <Phone className="text-red-200 w-5 h-5 flex-shrink-0" />
                <span>+91 8378967688</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-8">
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">HEALTHY TEETH, BRIGHTER FUTURE</h3>
            <p className="mt-4 text-gray-600 leading-relaxed text-lg">
              Kiran Dental Clinic mein hum advanced technology, completely painless treatment protocols, aur strictly international standards ki hygiene & safety follow karte hain. Dr. Prabhat Kawale aur unki expert team aapko best oral care provide karne ke liye committed hai.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="text-red-600 w-5 h-5" /> Our Specialized Dental Treatments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Dental Implants', desc: 'Permanent solution for missing teeth' },
                { name: 'Root Canal Treatment', desc: 'Expert pain management' },
                { name: 'Orthodontic Treatment', desc: 'Braces for straight teeth' },
                { name: 'Teeth Whitening', desc: 'Instant shine & smile' },
                { name: 'Pediatric Dentistry', desc: 'Friendly kids dental care' },
                { name: 'Oral Surgery', desc: 'Advanced extractions' }
              ].map((service, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="font-semibold text-gray-900 block">{service.name}</span>
                  <span className="text-xs text-gray-500">{service.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-start gap-4">
            <Clock className="text-red-700 w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold text-red-800">We Are Working Today</h4>
              <p className="text-2xl font-black text-gray-900 mt-1">10:30 AM <span className="text-sm font-normal text-gray-500">TO</span> 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200/60 sticky top-6">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Book An Appointment</h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">Apni details bharein, doctor ko instant alert chala jayega.</p>
            
            {status === 'success' ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
                <CheckCircle className="text-green-600 w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold text-lg">Appointment Submitted!</h4>
                <p className="mt-2 text-sm text-green-700">Dr. Prabhat ke number par details bhej di gayi hain. Hum jald contact karenge.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Patient Name</label>
                  <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500" value={formData.patient_name} onChange={(e) => setFormData({...formData, patient_name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Mobile Number</label>
                  <input type="tel" required pattern="[0-9]{10}" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Select Treatment</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500" value={formData.treatment} onChange={(e) => setFormData({...formData, treatment: e.target.value})}>
                    <option>General Checkup</option>
                    <option>Root Canal Treatment</option>
                    <option>Dental Implants</option>
                    <option>Teeth Whitening</option>
                    <option>Kids Dental Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Preferred Date</label>
                  <input type="date" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500" value={formData.appointment_date} onChange={(e) => setFormData({...formData, appointment_date: e.target.value})} />
                </div>
                <button type="submit" disabled={status === 'submitting'} className="w-full bg-red-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-red-700 mt-2">
                  {status === 'submitting' ? 'Processing...' : 'Confirm Slot Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
