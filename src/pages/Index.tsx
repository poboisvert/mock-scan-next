
import { TestRunner } from '@/components/TestRunner';
import { MockExample } from '@/components/MockExample';

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Testing & Mocking Playground
          </h1>
          <p className="text-lg text-gray-600">
            Learn about testing and mocking in TypeScript through interactive examples
          </p>
        </div>
        
        <TestRunner />
        <MockExample />
      </div>
    </div>
  );
};

export default Index;
