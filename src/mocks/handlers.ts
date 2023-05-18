import { rest } from 'msw';
import { Countries } from '../interfaces/types';
import countries from './countries.json';

export const handlers = [
  // Get all countries
  rest.get<Countries[]>('https://restcountries.com/v2/all', (req, res, ctx) => {
    const countriesInfos = countries.map(country => country);
    return res(
      ctx.status(200),
      ctx.json(countriesInfos)
    )
  }),

  // Get country details
  rest.get<Countries>('https://restcountries.com/v2/alpha/:countryCode', (req, res, ctx) => {
    const { countryCode } = req.params;
    const countryInfos = countries.find(country => country.alpha3Code === countryCode);
    return res(
      ctx.status(200),
      ctx.json(countryInfos)
    )
  }),

  rest.get<Countries[]>('https://restcountries.com/v2/alpha', (req, res, ctx) => {
    const codes = req.url.searchParams.get('codes');
    const codesArray = codes?.split(',');
    const countriesInfos = countries.filter(country => codesArray?.includes(country.alpha3Code)).map(code => code);
    return res(
      ctx.status(200),
      ctx.json(countriesInfos)
    )
  })
];

