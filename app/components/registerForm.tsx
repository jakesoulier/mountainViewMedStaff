// app/components/RegisterForm.tsx
'use client'
import { useForm } from 'react-hook-form';
import Header from '../components/header';
import "../assets/FormStyles.css";
import { db } from '@/firebaseConfig'; // Import the Firestore instance
import { collection, addDoc } from "firebase/firestore"; 
import { useRouter } from 'next/navigation';
import { RegisterFormData } from '../validationSchemas';


interface RegisterFormProps {
  eventTitle: string;
  eventType: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ eventTitle, eventType }) => {
  // console.log('here eventType: ', eventType)
  // console.log('here eventTitle: ', eventTitle)
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<RegisterFormData>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // console.log('its here')
    const docRef = await addDoc(collection(db, eventTitle), {
      ...data,
      title: eventTitle,
    });
      // console.log("Document written with ID: ", docRef.id);
      reset(); // Reset the form after successful submission
      router.push('/') // redirect to home page
    } catch (e) {
      // console.error("Error adding document: ", e);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Header title={`${eventTitle} - Form`} path={`/${eventTitle}`} gradientColor="#1b284f" cmePath={eventType}/>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-2xl rounded-lg m-5">
        <h1 className="text-right">{eventTitle}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            defaultValue={today}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.date && <p className="text-red-500 text-xs italic">{errors.date.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
          <input
            {...register('phone', { required: 'Phone number is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Receive Text Updates</label>
          <div className="flex space-x-2">
            <button type="button" onClick={() => setValue('textUpdates', 'Yes')} className={`py-2 px-4 rounded ${watch('textUpdates') === 'Yes' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>Yes</button>
            <button type="button" onClick={() => setValue('textUpdates', 'No')} className={`py-2 px-4 rounded ${watch('textUpdates') === 'No' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>No</button>
          </div>
          {errors.textUpdates && <p className="text-red-500 text-xs italic">{errors.textUpdates.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Receive a Calendar Invite</label>
          <div className="flex space-x-2">
            <button type="button" onClick={() => setValue('calendarInvite', 'Yes')} className={`py-2 px-4 rounded ${watch('calendarInvite') === 'Yes' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>Yes</button>
            <button type="button" onClick={() => setValue('calendarInvite', 'No')} className={`py-2 px-4 rounded ${watch('calendarInvite') === 'No' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>No</button>
          </div>
          {errors.calendarInvite && <p className="text-red-500 text-xs italic">{errors.calendarInvite.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">License</label>
          <div className="flex space-x-2">
            <button type="button" onClick={() => setValue('license', 'MD')} className={`py-2 px-4 rounded ${watch('license') === 'MD' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>MD</button>
            <button type="button" onClick={() => setValue('license', 'DO')} className={`py-2 px-4 rounded ${watch('license') === 'DO' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>DO</button>
            <button type="button" onClick={() => setValue('license', 'PA')} className={`py-2 px-4 rounded ${watch('license') === 'PA' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>PA</button>
            <button type="button" onClick={() => setValue('license', 'NP')} className={`py-2 px-4 rounded ${watch('license') === 'NP' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>NP</button>
            <button type="button" onClick={() => setValue('license', 'RN')} className={`py-2 px-4 rounded ${watch('license') === 'RN' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>RN</button>
          </div>
          {errors.license && <p className="text-red-500 text-xs italic">{errors.license.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">How to Attend</label>
          <div className="flex space-x-2">
            <button type="button" onClick={() => setValue('attendance', 'live')} className={`py-2 px-4 rounded ${watch('attendance') === 'live' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>Live</button>
            <button type="button" onClick={() => setValue('attendance', 'virtual')} className={`py-2 px-4 rounded ${watch('attendance') === 'virtual' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>Virtual</button>
            <button type="button" onClick={() => setValue('attendance', 'unsure')} className={`py-2 px-4 rounded ${watch('attendance') === 'unsure' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>Unsure</button>
          </div>
          {errors.attendance && <p className="text-red-500 text-xs italic">{errors.attendance.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Would you like updates about future CME events?</label>
          <div className="flex space-x-2">
            <button type="button" onClick={() => setValue('updates', 'yes')} className={`py-2 px-4 rounded ${watch('updates') === 'yes' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>Yes</button>
            <button type="button" onClick={() => setValue('updates', 'no')} className={`py-2 px-4 rounded ${watch('updates') === 'no' ? 'bg-mountainview-green text-white' : 'bg-gray-200'}`}>No</button>
          </div>
          {errors.updates && <p className="text-red-500 text-xs italic">{errors.updates.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">What is your current knowledge of the topic?</label>
          <textarea
            {...register('knowledge', { required: 'This field is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4} // Adjust the number of rows as needed
          />
          {errors.knowledge && <p className="text-red-500 text-xs italic">{errors.knowledge.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-mountainview-green hover:bg-mountainview-light-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
      <hr /> {/* Adds custom margin to bottom */}
    </>
  );
};

export default RegisterForm;