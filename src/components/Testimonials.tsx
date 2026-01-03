
import React from 'react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Mrs. Adeyemi",
      role: "Parent",
      text: "Fesola International has transformed my child's approach to learning. The teachers are incredibly supportive and professional.",
    },
    {
      name: "Mr. Chukwu",
      role: "Parent of Alumnus",
      text: "The foundation my son received here made his transition to secondary school seamless. Excellence is truly their culture.",
    },
    {
      name: "Dr. Fatima",
      role: "Guardian",
      text: "A world-class environment right here in Ikeja. We couldn't be happier with the progress we've seen in our wards.",
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 w-full bg-[#fdfcfb]">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black serif italic text-blue-900">Voices of our Community</h2>
        <div className="w-20 h-1 bg-blue-600/20 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <div key={idx} className="glass p-10 rounded-[3rem] border-white shadow-2xl hover:bg-white transition-all duration-500 hover:-translate-y-2 group">
            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <p className="text-slate-600 font-medium italic mb-8 leading-relaxed">"{rev.text}"</p>
            <div>
              <div className="font-black text-blue-900 serif text-lg">{rev.name}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rev.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
