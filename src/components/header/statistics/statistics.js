import {BAR_HEIGHT, EVENT_TYPES_TO, iconMap} from '../../../common/consts';
import AbstractSmartComponent from '../../abstracts/abstract-smart-component';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

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

const renderMoneyChart = (chartCtx, points) => {
  const types = geUniqPoints(points);

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: types.map((eventType) => calculateMoneyByType(points, eventType)),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${iconMap[type]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (chartCtx, points) => {
  const types = geUniqPoints(points).filter((type) => EVENT_TYPES_TO.includes(type));

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: types.map((type) => calculatePointsByTransport(points, type)),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${iconMap[type]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpentChart = (chartCtx, points) => {
  const types = geUniqPoints(points);

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: types.map((type) => calculateTimeSpent(points, type)),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${iconMap[type]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      },
    }
  });
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
    const points = this._points.getPoints();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, points);
    this._transportChart = renderTransportChart(transportCtx, points);
    this._timeSpendChart = renderTimeSpentChart(timeSpendCtx, points);
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
