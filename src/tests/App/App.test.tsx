import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeContextProvider } from '../../context/themeContext';
import { CountriesContextProvider } from '../../context/countriesContext';
import App from '../../components/App/';

const queryClient = new QueryClient();

describe('App component', () => {

  const appComponent = 
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <CountriesContextProvider>
              <App />
          </CountriesContextProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
    </BrowserRouter>

  test('It should display skeletons when loading', () => {
    render(appComponent);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(4);
  });

  test('It should render cards after loading', async () => {
    render(appComponent);
    const cards = await screen.findAllByTestId("cards__infos");
    expect(cards).toHaveLength(250);
  });

  test('User can change theme', async () => {
    const user = userEvent.setup();
    render(appComponent);

    const themeButton = screen.getByRole("button");
    await user.click(themeButton);
    expect(themeButton).toHaveClass("header__button header__button--dark");
  });

  test('User can search a country with the search bar', async () => {
    const user = userEvent.setup();
    render(appComponent);

    await screen.findAllByTestId("cards__infos");

    const input = screen.getByRole("textbox");
    await user.type(input, "greece");
    expect(input).toHaveValue("greece");

    const card  = await screen.findAllByTestId("cards__infos");
    expect(card).toHaveLength(1);

    const capital = await screen.findByText(/athens/i);
    expect(capital).toBeInTheDocument();
  });

  test('It should have an error message when a country not found', async () => {
    const user = userEvent.setup();
    render(appComponent);

    await screen.findAllByTestId("cards__infos");
    const input = screen.getByRole("textbox");
    await user.type(input, "mozembique");

    const cards = screen.queryByTestId("cards__infos");
    expect(cards).not.toBeInTheDocument();
  });

  test('User can filter by region', async () => {
    const user = userEvent.setup();
    render(appComponent);

    await screen.findAllByTestId("cards__infos");

    const filter = screen.getAllByRole('listitem');
    const searchedRegion = filter.find(region => region.id === "Africa")
    if (searchedRegion) {
     await user.click(searchedRegion);
    }
    const cards = await screen.findAllByTestId("cards__infos");
    expect(cards).toHaveLength(60);
  });

  test('User can click on a card to get more infos', async () => {
    const user = userEvent.setup();
    render(appComponent);

    await screen.findAllByTestId("cards__infos");

    const mexicoCard = screen.getByText(/mexico city/i);
    await user.click(mexicoCard);
    await screen.findByText(/mexican peso/i);

    expect(window.location.pathname).toEqual("/country/MEX");

    const borderButtons = await screen.findAllByTestId("border");
    expect(borderButtons).toHaveLength(3);

    const belizeButton = screen.getByText(/belize/i);
    await user.click(belizeButton);
    await screen.findByText(/belmopan/i);
    expect(window.location.pathname).toEqual("/country/BLZ");

    const backButton = screen.getByRole("button", { name : /back/i });
    await user.click(backButton);
    await screen.findAllByTestId("cards__infos");
    expect(window.location.pathname).toEqual("/");
  });
})

