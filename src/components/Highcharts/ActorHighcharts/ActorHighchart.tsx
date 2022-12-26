import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IApiResponseFullActor } from '../../../api/apiMethods';

interface IActorHighchart extends HighchartsReact.Props {
  actor: IApiResponseFullActor | undefined;
}

const ActorHighchart: React.FC<IActorHighchart> = ({ actor }) => {
  const filteredMoviesList = actor?.movies.sort(
    (a, b) => Number(b.production_year) - Number(a.production_year)
  );

  let moviesYears = [] as string[] | undefined;
  let moviesRatings = [] as { name: string; y: number }[] | undefined;
  let moviesNames = [] as string[] | undefined;

  if (actor) {
    moviesYears = filteredMoviesList?.map(movie => movie.production_year);
    moviesRatings = filteredMoviesList?.map(movie => ({
      name: movie.production_year,
      y: Number(movie.imdb_rating),
    }));
    moviesNames = filteredMoviesList?.map(movies => movies.name);
  }

  const moviesQuantity = filteredMoviesList?.length ? filteredMoviesList.length : 0;

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      height: moviesQuantity < 8 ? '400px' : `${400 + (moviesQuantity - 8) * 50}px`,
    },
    title: {
      text: 'Рейтинг фільмографії актора',
      style: {
        fontFamily: 'Mulish',
        fontWeight: '700',
        fontSize: '24px',
        color: 'rgb(34, 34, 34)',
      },
    },
    xAxis: {
      categories: moviesNames,
      crosshair: true,
      title: {
        text: null,
      },
      labels: {
        style: {
          fontSize: '20px',
          fontFamily: 'Anonymous Pro',
          color: 'rgb(16, 16, 16)',
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        overflow: 'justify',
        style: {
          fontSize: '18px',
          fontFamily: 'Anonymous Pro',
          color: 'rgba(176, 170, 170, 1)',
        },
      },
      lineWidth: 1,
      gridLineColor: 'rgb(220, 215, 215)',
      // labels: {
      //   formatter: function () {
      //     return this.value + ' %';
      //   },
      //   useHTML: true,
      // },
    },
    tooltip: {
      backgroundColor: '#E1F6FF',
      borderColor: 'black',
      borderRadius: 0,
      borderWidth: 0,
      style: {
        fontFamily: 'Anonymous Pro',
        backgroundColor: '',
        fontSize: '16px',
        color: '#101010',
      },
      formatter() {
        return `<div><p>Рейтинг: ${this.y}</p></br><p>Рік випуску: ${this.key}</p></div>`;
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 1,
        borderColor: 'rgba(89, 193, 237, 0.61)',
        //Значення над серією
        // dataLabels: {
        //   enabled: true,
        // },
      },
    },
    series: [
      {
        type: 'column',
        name: 'Рейтинг',
        data: moviesRatings,
        color: 'rgba(60, 180, 231, 0.3)',
      },
    ],
    // series: [
    //   {
    //     type: 'column',
    //     name: 'Рейтинг фільму',
    //     data: moviesRatings,
    //     color: 'black',
    //     borderRadius: 8,
    //   },
    // ],
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />;
};

export default ActorHighchart;
