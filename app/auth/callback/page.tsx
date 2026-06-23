import CallBackPage from '@/components/callback-page';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallBackPage />
    </Suspense>
  );
}
