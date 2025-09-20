import Frame8 from '../assets/Frame 8.png';
import BackgroundImage from '../assets/pexels-elīna-arāja-3334452 1.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSendOTP = () => {
    navigate('/annexure-form');
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center " 
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        />
        <div className="relative z-10 max-w-md px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="">
              <img src={Frame8} alt="TransBnk Logo" className=" w-350 object-contain" />
            </div>
            
          </div>
          <p className="text-xl/7 text-white/90 font-medium text-center">
            Elevating Banking Journeys,<br/>Redefining Possibilities
          </p>
          <div className="mt-24 flex gap-10 text-sm text-white/70">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-16 px-6 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold py-2 rounded-lg mb-6" style={{ color: '#66BB94' }}>Request HUB</h2>
          <div className="rounded-2xl border border-slate-200 p-6 shadow-soft">
            <h3 className="text-2xl font-bold text-slate-900">Register Now</h3>
            <p className="text-sm text-slate-500 mt-1">Enter your email and phone number to sign in</p>

            <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email id<span className="text-red-500">*</span></label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone number<span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
              </div>
              <button
                type="button"
                onClick={handleSendOTP}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                style={{ backgroundColor: '#66BB94' }}
              >
                Send OTP
              </button>
            </form>
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">TransBnk © 2023</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
