import React, { useEffect, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Api, IApiResponseFullActor } from '../../../api/apiMethods';
import { useParams } from 'react-router-dom';
import { red } from '@mui/material/colors';

interface IActorHighchart extends HighchartsReact.Props {
  actor: IApiResponseFullActor | undefined;
}

const ActorHighchart: React.FC<IActorHighchart> = ({ actor }) => {
  // "Для разработки", удалить потом
  let arr = [] as {
    description: string;
    id: number;
    imdb_rating: string;
    name: string;
    poster_src: string;
    production_year: string;
    rating: string;
    wide_poster_src: string;
  }[];

  if (actor) {
    arr = actor.movies;
  }
  arr.push({
    description: '',
    id: 151,
    imdb_rating: '3',
    name: 'Тестова назва123',
    poster_src:
      'https://static.kinoafisha.info/k/movie_posters/canvas/800x1200/upload/movie_posters/6/7/5/4366576/b76f8b3158a661a90432a60056468b3d.jpg',
    production_year: '2020',
    rating: 'PG-13',
    wide_poster_src: 'широкий постер',
  });
  arr.push({
    description: '',
    id: 151,
    imdb_rating: '5',
    name: 'Тестова назва123456',
    poster_src:
      'https://static.kinoafisha.info/k/movie_posters/canvas/800x1200/upload/movie_posters/6/7/5/4366576/b76f8b3158a661a90432a60056468b3d.jpg',
    production_year: '2010',
    rating: 'PG-13',
    wide_poster_src: 'широкий постер',
  });
  // конец "для разработки"

  // const filteredMoviesList = actor?.movies.sort(
  //   (a, b) => Number(b.production_year) - Number(a.production_year)
  // );
  const filteredMoviesList = arr.sort(
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

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      height:
        filteredMoviesList.length < 8 ? '400px' : `${400 + (filteredMoviesList.length - 8) * 50}px`,
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
    //   tooltip: {
    //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //     pointFormat:
    //       '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //       '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
    //     footerFormat: '</table>',
    //     shared: true,
    //     useHTML: true,
    //   },
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
      formatter(tooltip) {
        console.log(tooltip);
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
