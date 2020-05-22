import {BAR_HEIGHT, EVENT_TYPES_TO, iconMap} from '../../../common/consts';
import AbstractSmartComponent from '../../abstracts/abstract-smart-component';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const ChartTitle = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPEND: `TIME SPEND`,
};

const ChartParameter = {
  FONT_SIZE: 13,
  FONT_SIZE_TITLE: 23,
  PADDING: 5,
  BAR_THICKNESS: 44,
  MIN_BAR_LENGTH: 50,
};

const getUniqItems = (item, index, array) => array.indexOf(item) === index;

const geUniqPoints = (points) => points.map((point) => point.type).filter(getUniqItems);

const calculateMoneyByType = (points, type) => {
  return points.reduce((total, point) => (point.type === type) ? total + point.price : total, 0);
};

const calculatePointsByTransport = (points, type) => points.filter((point) => point.type === type).length;

const getTimeDifference = (point) => {
  const startTime = moment(point.startTime);
  const endTime = moment(point.endTime);

  return endTime.diff(startTime, `hours`);
};

const calculateTimeSpent = (points, type) => {
  return points.reduce((total, point) => (point.type === type) ? total + getTimeDifference(point) : total, 0);
};

const getChartConfig = (title, types, data, formatter) => {
  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: ChartParameter.MIN_BAR_LENGTH,
        barThickness: ChartParameter.BAR_THICKNESS
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: ChartParameter.FONT_SIZE
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: ChartParameter.FONT_SIZE_TITLE,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: ChartParameter.PADDING,
            fontSize: ChartParameter.FONT_SIZE,
            callback: (type) => {
              return `${iconMap[type]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  };
};

const renderMoneyChart = (chartCtx, points) => {
  const types = geUniqPoints(points);
  const data = types.map((type) => calculateMoneyByType(points, type));
  const formatter = (val) => `€ ${val}`;

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, getChartConfig(ChartTitle.MONEY, types, data, formatter));
};

const renderTransportChart = (chartCtx, points) => {
  const types = geUniqPoints(points).filter((type) => EVENT_TYPES_TO.includes(type));
  const data = types.map((type) => calculatePointsByTransport(points, type));
  const formatter = (val) => `${val}x`;

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, getChartConfig(ChartTitle.TRANSPORT, types, data, formatter));
};

const renderTimeSpendChart = (chartCtx, points) => {
  const types = geUniqPoints(points);
  const data = types.map((type) => calculateTimeSpent(points, type));
  const formatter = (val) => `${val}H`;

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, getChartConfig(ChartTitle.TIME_SPEND, types, data, formatter));
};

const createStatistics = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(points) {
    super();

    this._points = points;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatistics();
  }

  show() {
    super.show();

    this.rerender(this._points);
  }

  recoveryListeners() {}

  rerender(points) {
    this._points = points;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const points = this._points.getPointsAll();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, points);
    this._transportChart = renderTransportChart(transportCtx, points);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, points);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }
}
