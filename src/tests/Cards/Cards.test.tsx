import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CountriesContextProvider } from '../../context/countriesContext';
import { ThemeContextProvider } from '../../context/themeContext';
import Cards from '../../components/Cards';

const queryClient = new QueryClient();

describe('Cards component', () => {

  const cardsComponent = 
    <MemoryRouter initialEntries={["/"]}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={
            <ThemeContextProvider>
              <CountriesContextProvider>
                <Cards />
              </CountriesContextProvider>
            </ThemeContextProvider>
          } />
        </Routes>
      </QueryClientProvider>
  </MemoryRouter>

  test('It should display skeletons when loading', () => {
    render(cardsComponent);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(4);
  })
  
  test('It should render cards', async () => { 
    render(cardsComponent);
    const cards = await screen.findAllByTestId("cards__infos");
    expect(cards).toHaveLength(250);
  });

  test('It should display country\'s informations', async () => {
    render(cardsComponent);

    const population = 13452;

    const countryName = await screen.findByText(/anguilla/i);
    const countryPopulation = await screen.findByText(population.toLocaleString("en-US"));
    const countryCapital = await screen.findByText("Mariehamn");
    const countryFlag = await screen.findByRole("img", { name: /anguilla/i});

    expect(countryName).toBeInTheDocument();
    expect(countryPopulation).toBeInTheDocument();
    expect(countryCapital).toBeInTheDocument();
    expect(countryFlag).toHaveAttribute("src", "https://flagcdn.com/w320/ai.png");
  });
});
