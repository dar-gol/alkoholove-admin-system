export const getAlcohol = (): Promise<Alcohol> => fetch('/API.json').then((data) => data.json());
