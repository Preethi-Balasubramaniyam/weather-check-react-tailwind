import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TransBnkLogo from '../assets/TransBnk Logo TM.png';

interface WeatherData {
  selectedCountry: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
}

interface FormData {
  [key: string]: WeatherData;
}

function AnnexureForm() {
  const [activeTab, setActiveTab] = useState('Form 1');
  const [activeSubTab, setActiveSubTab] = useState('API');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form-specific data storage
  const [formData, setFormData] = useState<FormData>({
    'Form 1': {
      selectedCountry: '',
      temperature: '',
      humidity: '',
      windSpeed: ''
    },
    'Form 2': {
      selectedCountry: '',
      temperature: '',
      humidity: '',
      windSpeed: ''
    },
    'Form 3': {
      selectedCountry: '',
      temperature: '',
      humidity: '',
      windSpeed: ''
    }
  });

  const navigate = useNavigate();

  const tabs = ['Form 1', 'Form 2', 'Form 3'];
  const subTabs = ['API', 'UI Journey'];

  const countries = [
    'United States',
    'United Kingdom', 
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
    'Brazil',
    'China'
  ];

  // Get current form data
  const currentFormData = formData[activeTab];

  // Update form data for current tab
  const updateCurrentFormData = (updates: Partial<WeatherData>) => {
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        ...updates
      }
    }));
  };

  // Fetch weather data from API
  const fetchWeatherData = async (country: string) => {
    if (!country) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=e7a2f2b1dbd9455789772331252009&q=${country}&aqi=no`
      );
      
      const weather = response.data.current;
      
      updateCurrentFormData({
        selectedCountry: country,
        temperature: weather.temp_c.toString(),
        humidity: weather.humidity.toString(),
        windSpeed: weather.wind_kph.toString()
      });
      
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle country selection
  const handleCountryChange = (country: string) => {
    updateCurrentFormData({ selectedCountry: country });
    if (country) {
      fetchWeatherData(country);
    } else {
      updateCurrentFormData({
        temperature: '',
        humidity: '',
        windSpeed: ''
      });
    }
  };

  // Handle form navigation
  const handlePreviousForm = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    } else {
      navigate('/');
    }
  };

  const handleNextForm = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 mb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center">
            <img src={TransBnkLogo} alt="TransBnk Logo" className="h-10 w-auto object-contain" />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white  p-8">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Annexure Form</h1>
            <p className="text-gray-500 text-lg">Select your services and provide required details</p>
          </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2  text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'text-white shadow-sm'
                    : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === tab ? { backgroundColor: '#66BB94' } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Tab Navigation with Radio Buttons */}
        <div className="mb-12">
          <div className="flex gap-8">
            {subTabs.map((subTab) => (
              <label
                key={subTab}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="radio"
                    name="subTab"
                    value={subTab}
                    checked={activeSubTab === subTab}
                    onChange={() => setActiveSubTab(subTab)}
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      activeSubTab === subTab
                        ? 'border-current'
                        : 'border-gray-300'
                    }`}
                    style={activeSubTab === subTab ? { borderColor: '#66BB94' } : {}}
                  >
                    {activeSubTab === subTab && (
                      <div 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: '#66BB94' }}
                      />
                    )}
                  </div>
                </div>
                <span 
                  className={`text-lg font-medium transition-colors ${
                    activeSubTab === subTab ? '' : 'text-gray-400'
                  }`}
                  style={activeSubTab === subTab ? { color: '#66BB94' } : {}}
                >
                  {subTab}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Weather Details Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Weather Details<span className="text-red-500">*</span>
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Country
            </label>
            <div className="relative max-w-sm">
              <select
                value={currentFormData.selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-500 focus:outline-none focus:ring-2 focus:border-transparent appearance-none"
                disabled={loading}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {loading && (
                <div className="absolute inset-y-0 right-10 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                </div>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Data Output Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Weather Data (Output)</h2>
            <button 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ color: '#66BB94', borderColor: '#66BB94' }}
            >
              <span className="text-lg">+</span>
              Add User
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6" style={{ backgroundColor: '#f5f5f5' }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Temperature (Celsius)
              </label>
              <input
                type="text"
                value={currentFormData.temperature}
                onChange={(e) => updateCurrentFormData({ temperature: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
                placeholder="Temperature will appear here"
                readOnly={currentFormData.selectedCountry !== ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Humidity
              </label>
              <input
                type="text"
                value={currentFormData.humidity}
                onChange={(e) => updateCurrentFormData({ humidity: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
                placeholder="Humidity will appear here"
                readOnly={currentFormData.selectedCountry !== ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                wind_kph
              </label>
              <input
                type="text"
                value={currentFormData.windSpeed}
                onChange={(e) => updateCurrentFormData({ windSpeed: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
                placeholder="Wind speed will appear here"
                readOnly={currentFormData.selectedCountry !== ''}
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <button
            onClick={handlePreviousForm}
            className="px-6 py-3 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Previous Form
          </button>
          
          <button 
            className="px-6 py-3 text-sm font-medium border rounded-lg hover:bg-gray-50 transition-colors"
            style={{ color: '#66BB94', borderColor: '#66BB94' }}
          >
            Save as draft
          </button>
          
          <button 
            onClick={handleNextForm}
            className={`px-6 py-3 text-sm font-medium text-white rounded-lg transition-colors ${
              tabs.indexOf(activeTab) === tabs.length - 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-90'
            }`}
            style={{ backgroundColor: '#66BB94' }}
            disabled={tabs.indexOf(activeTab) === tabs.length - 1}
          >
            Next Form
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AnnexureForm;