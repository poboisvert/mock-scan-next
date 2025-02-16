
interface ApiResponse {
  success: boolean;
  data: any;
}

export const fetchData = async (): Promise<ApiResponse> => {
  // This is a mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          id: 1,
          name: "Test User",
          email: "test@example.com"
        }
      });
    }, 500);
  });
};
