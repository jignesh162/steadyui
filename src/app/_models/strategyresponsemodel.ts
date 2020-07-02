import { OptionsTickGraphModel } from './optiontickgraph';

export class StrategyResponseModel {
  id: String; //Current date time
  entryDateTime: Date; //From UI
  exitDateTime: Date; //From UI
  initialAmount: number; //From UI
  stopLossPercentage: number; //From UI
  profitBookPercentage: number; //From UI
  quantityOrPrice: string; //From UI
  strikeAwayPoints: number; //From UI

  strikeUsed: number; //Strike used for entry
  expiryDate: Date; // Expiry date used to calculate proft and loss
  peOptionsId: number; // Primary key of PE option
  ceOptionsId: number; // Primary key of CE option

  peLotQty: number; //bought PE lot quantity
  peBuyPrice: number; //entry PE price
  peBuyPricePerLot: number; //
  peBuyAmount: number; //Amount for PE

  ceLotQty: number; //bought PE lot quantity
  ceBuyPrice: number; //entry PE price
  ceBuyPricePerLot: number; //
  ceBuyAmount: number; //Amount for PE

  buyAmount: number;
  buyPercentage: number;
  buyDateTime: Date;

  highestAmountGoesTo: number; //highest total goes to irrespective of profit booking
  highestPercentage: number; //lowest percentage goes to irrespective of stop loss hit
  highestAmountDateTime: Date;

  lowestAmountGoesTo: number; //lowest total goes to irrespective of stop loss hit
  lowestPercentage: number; //highest percentage goes to irrespective of profit booking
  lowestAmountDateTime: Date;

  sellAmount: number;
  sellPercentage: number;
  sellDateTime: Date;

  peSellPrice: number; //entry PE price
  peSellPricePerLot: number; //
  peSellAmount: number; //Amount for PE

  ceSellPrice: number; //entry PE price
  ceSellPricePerLot: number; //
  ceSellAmount: number; //Amount for PE

  profitOrLossAmount: number;
  profitOrLossPercentage: number;
  profitOrLossDateTime: Date;

  deInvestmentAmount: number;

  balanceAmount: number;
  optionsTickGraph: OptionsTickGraphModel;
}
