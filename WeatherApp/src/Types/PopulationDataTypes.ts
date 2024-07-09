export type populationCounts = {
  year: string;
  value: string;
};

export type PopulationData = {
  city: string;
  country: string;
  populationCounts: populationCounts;
};

export type condition = {
  text: string,
  icon: string
}

export type Current = {
  temp_c: number,
  condition: condition,
  feelslike_c: number,
  humidity: number,
  wind_kph: number
}