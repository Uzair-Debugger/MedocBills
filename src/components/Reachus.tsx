import { useState, ChangeEvent, FormEvent } from 'react';
import { CustomButton, Typography } from './layout';
import { RequestFormData } from '../constants/schema';
import { services_reachus, states } from '../constants/data';

const RequestCallBackForm = () => {
  const [formData, setFormData] = useState<RequestFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    state: '',
    date: '',
    message: '',
    notRobot: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = ['name', 'email', 'phone', 'message'];
    for (const field of requiredFields) {
      if (!formData[field as keyof RequestFormData]) {
        alert('Please fill in all required fields.');
        return;
      }
    }

    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      state: '',
      date: '',
      message: '',
      notRobot: false,
    });
  };

  return (
    <section aria-labelledby="request-callback-heading" className="min-h-screen bg-white font-sans text-gray-800 my-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side - Form */}
        <div className="bg-brand-blue p-8 md:p-12 lg:p-16">
          <Typography as="h1" id="request-callback-heading" variant="h1" className="text-white mb-10">
            Request For A Call Back
          </Typography>
          <form aria-label="Contact us form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-white border border-white rounded-md px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-white border border-white rounded-md px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone No."
                  className="w-full bg-white border border-white rounded-md px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="service" className="sr-only">Service</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-white border border-white rounded-md px-4 py-3 text-gray-800 appearance-none"
                  required
                >
                  <option value="" disabled>- Service -</option>
                  {services_reachus.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="state" className="sr-only">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-white border border-white rounded-md px-4 py-3 text-gray-800 appearance-none"
                  required
                >
                  <option value="" disabled>- State -</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="date" className="sr-only">Preferred Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-white border border-white rounded-md px-4 py-3 text-gray-800"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Message"
                className="w-full bg-white border border-white rounded-md px-4 py-4 text-gray-800 placeholder-gray-500 focus:outline-none resize-none"
                required
              />
            </div>

            {/* Simulated reCAPTCHA */}
            <div role="group" aria-label="I'm not a robot checkbox" className="flex h-16 w-full items-center justify-between rounded border border-gray-300 bg-white p-2 shadow-sm sm:w-[300px]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notRobot"
                  name="notRobot"
                  checked={formData.notRobot}
                  onChange={handleChange}
                  className="h-6 w-6 rounded-sm border-2 border-gray-300"
                />
                <label htmlFor="notRobot" className="text-sm text-gray-600">
                  I&apos;m not a robot
                </label>
              </div>
            </div>

            <CustomButton
              type="submit"
              variant="outline"
              className="w-full text-brand-blue font-bold py-3 rounded-md hover:bg-gray-100"
            >
              Submit Now
            </CustomButton>
          </form>
        </div>

        {/* Right Side - Reach Us + Map */}
        <div className="bg-white p-8 md:p-12 flex flex-col">
          <h2 className="text-3xl font-bold text-text-dark mb-8 underline decoration-brand-blue decoration-4 underline-offset-8">
            Reach Us
          </h2>

          <div className="space-y-6 mb-8 text-lg">
            <p className="flex items-center gap-3">
              <span className="text-brand-blue text-2xl" aria-hidden="true">📞</span>
               <span className="font-medium">(201) 371-3521</span>
             </p>
             <p className="flex items-center gap-3">
               <span className="text-brand-blue text-2xl" aria-hidden="true">✉️</span>
               <span className="font-medium">info@medocbills.com</span>
             </p>
             <p className="flex items-center gap-3">
               <span className="text-brand-blue text-2xl" aria-hidden="true">📍</span>
               <span className="font-medium">
                 835 Wilshire Blvd, Ste 500 #513, Los Angeles, CA 90017
               </span>
             </p>
           </div>

          {/* Google Map - lazy loaded */}
          <div className="flex-1 min-h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="MedocBills Office Location"
              src="https://maps.google.com/maps?width=100%25&height=450&hl=en&q=835%20Wilshire%20Blvd%20Ste%20500%20%23513%20Los%20Angeles%20CA%2090017&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              frameBorder={0}
              scrolling="no"
              className="border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestCallBackForm;