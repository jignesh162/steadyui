export class StrategyRequestModel {
  entryDateTime: Date;
  exitDateTime: Date;
  strikeAwayPoints: number;
  quantityOrPrice: string;
  initialAmount: number;
  stopLossPercentage: number;
  profitBookPercentage: number
}
