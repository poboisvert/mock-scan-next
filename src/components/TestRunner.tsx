
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, CheckCircle2, XCircle } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  status: 'pending' | 'passing' | 'failing';
  code: string;
}

export const TestRunner = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: '1',
      name: 'should add two numbers correctly',
      status: 'pending',
      code: 'test("add", () => {\n  expect(add(2, 2)).toBe(4);\n});'
    },
    {
      id: '2',
      name: 'should mock API call successfully',
      status: 'pending',
      code: 'test("api", async () => {\n  const data = await fetchData();\n  expect(data).toBeDefined();\n});'
    }
  ]);

  const runTests = () => {
    setTestCases(cases => 
      cases.map(test => ({
        ...test,
        status: Math.random() > 0.3 ? 'passing' : 'failing'
      }))
    );
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Test Runner</h2>
        <Button 
          onClick={runTests}
          className="flex items-center gap-2 transition-all hover:scale-105"
        >
          <PlayCircle className="w-4 h-4" />
          Run Tests
        </Button>
      </div>

      <div className="space-y-4">
        {testCases.map((test) => (
          <div
            key={test.id}
            className="p-4 rounded-lg bg-gray-50 transition-all hover:bg-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {test.status === 'passing' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                {test.status === 'failing' && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                {test.status === 'pending' && (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <span className="font-medium">{test.name}</span>
              </div>
              <span className={`test-status test-status-${test.status}`}>
                {test.status}
              </span>
            </div>
            <pre className="code-font bg-gray-900 text-gray-100 p-4 rounded-md text-sm overflow-x-auto">
              {test.code}
            </pre>
          </div>
        ))}
      </div>
    </Card>
  );
};
