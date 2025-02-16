import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, CheckCircle2, XCircle } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  status: 'pending' | 'passing' | 'failing';
  code: string;
  category: 'ui' | 'unit' | 'integration';
}

export const TestRunner = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: '1',
      name: 'should add two numbers correctly',
      status: 'pending',
      code: 'test("add", () => {\n  expect(add(2, 2)).toBe(4);\n});',
      category: 'unit'
    },
    {
      id: '2',
      name: 'should mock API call successfully',
      status: 'pending',
      code: 'test("api", async () => {\n  const mockData = { success: true, data: { id: 1 } };\n  const fetchData = jest.fn().mockResolvedValue(mockData);\n  const result = await fetchData();\n  expect(result).toEqual(mockData);\n});',
      category: 'integration'
    },
    {
      id: '3',
      name: 'Button should be disabled while loading',
      status: 'pending',
      code: 'test("button-loading", () => {\n  render(<Button loading={true}>Submit</Button>);\n  const button = screen.getByRole("button");\n  expect(button).toBeDisabled();\n  expect(button).toHaveClass("opacity-50");\n});',
      category: 'ui'
    },
    {
      id: '4',
      name: 'Modal should trap focus when open',
      status: 'pending',
      code: 'test("modal-focus", () => {\n  render(<Modal open={true} />);\n  expect(document.activeElement).toBeInTheDocument();\n});',
      category: 'ui'
    },
    {
      id: '5',
      name: 'Form validation shows error messages',
      status: 'pending',
      code: 'test("form-validation", async () => {\n  render(<ContactForm />);\n  const submitButton = screen.getByRole("button", { name: /submit/i });\n  await userEvent.click(submitButton);\n  expect(screen.getByText("Name must be at least 2 characters.")).toBeVisible();\n});',
      category: 'ui'
    },
    {
      id: '6',
      name: 'DataGrid interaction is under 200ms',
      status: 'pending',
      code: 'test("data-grid-performance", async () => {\n  const { container } = render(<DataGrid rows={1000} />);\n  performance.mark("start-interaction");\n  await userEvent.click(screen.getByRole("grid"));\n  performance.mark("end-interaction");\n  const measurement = performance.measure(\n    "interaction",\n    "start-interaction",\n    "end-interaction"\n  );\n  expect(measurement.duration).toBeLessThan(200);\n});',
      category: 'ui'
    },
    {
      id: '7',
      name: 'Menu interaction completes in 50ms',
      status: 'pending',
      code: 'test("menu-interaction-speed", async () => {\n  const { container } = render(<Menu />);\n  const observer = new PerformanceObserver((list) => {\n    const entries = list.getEntries();\n    const lastEntry = entries[entries.length - 1];\n    expect(lastEntry.duration).toBeLessThan(50);\n  });\n  observer.observe({ entryTypes: ["interaction"] });\n  await userEvent.click(screen.getByRole("menubutton"));\n});',
      category: 'ui'
    },
    {
      id: '8',
      name: 'Form submission INP under 100ms',
      status: 'pending',
      code: 'test("form-submission-inp", async () => {\n  const { container } = render(<ContactForm />);\n  performance.mark("inp-start");\n  await userEvent.click(screen.getByRole("button", { name: /submit/i }));\n  performance.mark("inp-end");\n  const interaction = performance.measure("inp", "inp-start", "inp-end");\n  expect(interaction.duration).toBeLessThan(100);\n});',
      category: 'ui'
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

      <div className="space-y-6">
        {Object.entries(
          testCases.reduce((acc, test) => {
            acc[test.category] = [...(acc[test.category] || []), test];
            return acc;
          }, {} as Record<string, TestCase[]>)
        ).map(([category, tests]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize text-gray-700">
              {category} Tests
            </h3>
            {tests.map((test) => (
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
        ))}
      </div>
    </Card>
  );
};
