// 'use client';

// import { useState } from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { useRouter } from 'next/navigation';

// export default function UploadBookPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     category: 'Technology',
//     cover: '',
//     description: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     setErrorMsg('');

//     try {
//       const res = await fetch('/api/books', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         router.push('/books');
//       } else {
//         setErrorMsg(data.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error(err);
//       setErrorMsg('Failed to connect to server');
//     }
//     finally {
//       setIsSubmitted(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
//       {/* Background Neon Aura Effects */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
//       <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

//       <Navbar />

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full relative z-10">

//         {/* Hero Header */}
//         <div className="text-center mb-10 space-y-3">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
//             <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
//             Community Publisher
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//             Publish a New Book
//           </h1>
//           <p className="text-sm text-slate-400 max-w-lg mx-auto">
//             Expand the community archive. Fill in the details below to list your title instantly.
//           </p>
//         </div>

//         {/* Error Notification */}
//         {errorMsg && (
//           <div className="mb-8 p-4 text-xs font-semibold text-rose-400 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center flex items-center justify-center gap-2 shadow-lg">
//             <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>{errorMsg}</span>
//           </div>
//         )}

//         {/* Form Card Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

//           {/* Main Upload Form */}
//           <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
//             <form onSubmit={handleSubmit} className="space-y-6">

//               {/* Book Title */}
//               <div>
//                 <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
//                   Book Title <span className="text-indigo-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g. Master in Web Development"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               {/* Author & Category */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
//                     Author <span className="text-indigo-400">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g. John Doe"
//                     value={formData.author}
//                     onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                     className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
//                     Category <span className="text-indigo-400">*</span>
//                   </label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer"
//                   >
//                     <option value="Technology" className="bg-slate-900 text-slate-200">Technology</option>
//                     <option value="Fiction" className="bg-slate-900 text-slate-200">Fiction</option>
//                     <option value="Biography" className="bg-slate-900 text-slate-200">Biography</option>
//                     <option value="Mystery" className="bg-slate-900 text-slate-200">Mystery</option>
//                     <option value="Science" className="bg-slate-900 text-slate-200">Science</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Cover Image URL */}
//               <div>
//                 <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
//                   Cover Image URL <span className="text-slate-600 font-normal">(Optional)</span>
//                 </label>
//                 <input
//                   type="url"
//                   placeholder="https://images.unsplash.com/photo-..."
//                   value={formData.cover}
//                   onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
//                   className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
//                   Book Synopsis
//                 </label>
//                 <textarea
//                   rows={4}
//                   placeholder="Briefly describe the plot or key takeaways..."
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-none"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitted}
//                 className="w-full py-4 px-6 text-xs font-extrabold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 transition-all shadow-xl shadow-indigo-600/25 rounded-2xl flex items-center justify-center gap-2"
//               >
//                 {isSubmitted ? (
//                   <>
//                     <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>
//                     <span>Publishing to Catalog...</span>
//                   </>
//                 ) : (
//                   <span>Publish Book</span>
//                 )}
//               </button>

//             </form>
//           </div>

//           {/* Live Cover Card Preview */}
//           <div className="lg:col-span-5 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center text-center relative overflow-hidden">
//             <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-4">
//               Live Card Preview
//             </span>

//             <div className="w-36 h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl mb-4 relative group">
//               <img
//                 src={
//                   formData.cover ||
//                   'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop'
//                 }
//                 alt="Live Preview"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="space-y-1 w-full px-2">
//               <h3 className="font-bold text-white text-base line-clamp-1">
//                 {formData.title || 'Your Book Title'}
//               </h3>
//               <p className="text-xs text-slate-400 line-clamp-1">
//                 {formData.author || 'Author Name'}
//               </p>
//               <div className="pt-2">
//                 <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
//                   {formData.category}
//                 </span>
//               </div>
//             </div>

//             <p className="text-[11px] text-slate-500 mt-6 leading-relaxed">
//               This preview shows how your book card will render in the primary catalog grid once saved.
//             </p>
//           </div>

//         </div>

//       </div>

//       <Footer />
//     </main>
//   );
// }


'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function UploadBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Technology',
    cover: '',
    description: '',
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle direct file upload to Cloudinary via /api/upload
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg('');

    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, cover: data.url }));
      } else {
        setErrorMsg(data.error || 'Failed to upload cover image.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Image upload server error.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/books');
      } else {
        setErrorMsg(data.message || 'Something went wrong while saving the book.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to connect to server.');
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Neon Aura Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full relative z-10">

        {/* Hero Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Community Publisher
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Publish a New Book
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Expand the community archive. Fill in the details below to list your title instantly.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-8 p-4 text-xs font-semibold text-rose-400 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center flex items-center justify-center gap-2 shadow-lg">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Upload Form */}
          <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Book Title */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Book Title <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master in Web Development"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                    Author <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                    Category <span className="text-indigo-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="Technology" className="bg-slate-900 text-slate-200">Technology</option>
                    <option value="Fiction" className="bg-slate-900 text-slate-200">Fiction</option>
                    <option value="Biography" className="bg-slate-900 text-slate-200">Biography</option>
                    <option value="Mystery" className="bg-slate-900 text-slate-200">Mystery</option>
                    <option value="Science" className="bg-slate-900 text-slate-200">Science</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary File Upload Input */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Book Cover Image <span className="text-slate-600 font-normal">(Cloudinary Storage)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30 file:cursor-pointer cursor-pointer bg-slate-950/60 border border-slate-800 rounded-2xl p-2 transition-all"
                />
                {uploadingImage && (
                  <p className="text-[11px] text-indigo-400 mt-2 animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    Uploading cover to Cloudinary...
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Book Synopsis
                </label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe the plot or key takeaways..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted || uploadingImage}
                className="w-full py-4 px-6 text-xs font-extrabold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 transition-all shadow-xl shadow-indigo-600/25 rounded-2xl flex items-center justify-center gap-2"
              >
                {isSubmitted ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Publishing to Catalog...</span>
                  </>
                ) : (
                  <span>Publish Book</span>
                )}
              </button>

            </form>
          </div>

          {/* Live Cover Card Preview */}
          <div className="lg:col-span-5 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center text-center relative overflow-hidden">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-4">
              Live Card Preview
            </span>

            <div className="w-36 h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl mb-4 relative group flex items-center justify-center">
              {uploadingImage ? (
                <div className="p-4 text-center">
                  <svg className="w-6 h-6 animate-spin text-indigo-400 mx-auto mb-2" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-[10px] text-indigo-400 font-semibold">Processing...</span>
                </div>
              ) : (
                <img
                  src={
                    formData.cover ||
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop'
                  }
                  alt="Live Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="space-y-1 w-full px-2">
              <h3 className="font-bold text-white text-base line-clamp-1">
                {formData.title || 'Your Book Title'}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1">
                {formData.author || 'Author Name'}
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {formData.category}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-6 leading-relaxed">
              This preview shows how your book card will render in the primary catalog grid once saved.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}