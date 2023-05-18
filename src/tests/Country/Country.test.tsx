import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CountriesContextProvider } from '../../context/countriesContext';
import { ThemeContextProvider } from '../../context/themeContext';
import Country from '../../components/Country';

const queryClient = new QueryClient();

describe('Country component', () => {

  const countryComponent =
  <QueryClientProvider client={queryClient}>
   <MemoryRouter initialEntries={["/country/AGO"]}>
      <ThemeContextProvider>
        <CountriesContextProvider>
          <Routes>
            <Route path='/country/:code' element={<Country />} />
          </Routes>
        </CountriesContextProvider>
      </ThemeContextProvider>
    </MemoryRouter>
  </QueryClientProvider>

  test('It should display spinner when loading', () => {
    render(countryComponent);
    const spinnerMessage = screen.getByText(/loading.../i);
    expect(spinnerMessage).toBeInTheDocument();
  });

  test('It should render country component with data', async () => {
    render(countryComponent);
    const text = await screen.findByText(/luanda/i);
    expect(text).toBeInTheDocument();
  });

  test('It should change URL when user clicked on a border countries button', async () => {

    const user = userEvent.setup();

    render(countryComponent);

    const button = await screen.findByRole('button', {name: /zambia/i});
    await user.click(button);

    const zambiaCapital = await screen.findByText(/lusaka/i);
    expect(zambiaCapital).toBeInTheDocument();
  });
});