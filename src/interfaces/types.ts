export interface Countries {
  name: string,
  alpha3Code: string,
  topLevelDomain: string[],
  capital: string,
  subregion: string,
  region: string,
  population: number,
  borders?: string[],
  nativeName: string,
  currencies: Currencies[]
  languages: Languages[],
  flags: {
    svg: string,
    png: string
  },
}

export interface Currencies {
  code : string,
  name: string,
  symbol: string
}

export interface Languages {
  iso639_1: string,
  iso639_2: string,
  name: string,
  nativeName: string
}
