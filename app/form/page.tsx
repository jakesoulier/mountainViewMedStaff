// app/form/page.tsx
'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import RegisterForm from '../components/registerForm';

const FormContent: React.FC = () => {
  const searchParams = useSearchParams();
  const encodedTitle = searchParams.get('title') || 'defaultCollection__defaultType'; // Provide a default value

  // Decode the title and type from the encodedTitle
  const decodedTitle = decodeURIComponent(encodedTitle);
  const [eventTitle, eventType] = decodedTitle.split('__'); // Use double underscore as delimiter

  return (
    <div>
      <RegisterForm eventTitle={eventTitle} eventType={eventType} />
    </div>
  );
};

const FormPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormContent />
    </Suspense>
  );
};

export default FormPage;