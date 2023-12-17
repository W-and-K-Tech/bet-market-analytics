export type GroupType = "stat_type" | "player_name" | "team_abbr";

export enum CurrencyType {
  USD = "usd",
  EUR = "eur",
  AUSD = "ausd",
  CAD = "cad",
}

export const currencySignMap = {
  [CurrencyType.USD]: "$",
  [CurrencyType.EUR]: "€",
  [CurrencyType.AUSD]: "A$",
  [CurrencyType.CAD]: "C$",
};

export enum TimeSpanOptions {
  Hourly = "hour",
  Minutely = "minute",
}

export const groupTitleMap: { [key in GroupType]: string } = {
  stat_type: "Stat",
  player_name: "Player",
  team_abbr: "Team",
};
