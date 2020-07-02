export class OptionsTickGraphModel {
  optionsTickGraphLineList: OptionsTickGraphLineModel[];
}

export class OptionsTickGraphLineModel {
  name: string;
  series: GraphSeriesOnePointModel[];
}

export class GraphSeriesOnePointModel {
  name: Date;
  value: number;
}
