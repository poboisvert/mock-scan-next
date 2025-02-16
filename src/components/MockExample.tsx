
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

export const MockExample = () => {
  const [showingMock, setShowingMock] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowingMock(true);
    setLoading(false);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Mock Data Example</h2>
      <div className="mb-4">
        <Button
          onClick={fetchUser}
          disabled={loading}
          className="transition-all hover:scale-105"
        >
          {loading ? 'Fetching...' : 'Fetch User Data'}
        </Button>
      </div>
      
      {showingMock && (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <pre className="code-font bg-gray-900 text-gray-100 p-4 rounded-md">
            {JSON.stringify(mockUser, null, 2)}
          </pre>
          <p className="mt-4 text-sm text-gray-600">
            This is mock data that would typically come from an API. In tests,
            we can mock the API call to return this data consistently.
          </p>
        </div>
      )}
    </Card>
  );
};
