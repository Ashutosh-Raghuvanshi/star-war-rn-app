import SearchScreen from './src/screen/SearchScreen';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import SavedKeywordProvider from './src/provider/SavedKeywords';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <SavedKeywordProvider>
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    </SavedKeywordProvider>
  );
}