import React, { useEffect, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Api, IApiResponseFullActor } from '../../../api/apiMethods';
import { useParams } from 'react-router-dom';
import { red } from '@mui/material/colors';

// interface IActorHighchart extends HighchartsReact.Props {
//   id: number;
// }

const ActorHighchart: React.FC<HighchartsReact.Props> = props => {
  const [actor, setActor] = useState<IApiResponseFullActor>();

  const { id } = useParams();

  useEffect(() => {
    const getActor = async (id: number) => {
      try {
        const { data } = await Api.fetchActor(id);
        setActor(data);
      } catch (error) {}
    };

    if (id) getActor(+id);
  }, [id]);

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
    description: 'Тестоий опис',
    id: 151,
    imdb_rating: '3',
    name: 'Тестова назва',
    poster_src: 'постер',
    production_year: '2020',
    rating: 'PG-13',
    wide_poster_src: 'широкий постер',
  });
  arr.push({
    description: 'Тестоий111 опис',
    id: 151,
    imdb_rating: '5',
    name: 'Тестова назва1111',
    poster_src: 'постер',
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
  console.log(filteredMoviesList);
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
    console.log(moviesNames);
  }

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Рейтинг фільмографії актора',
    },
    xAxis: {
      categories: moviesNames,
      crosshair: true,
      title: {
        text: null,
      },
    },
    yAxis: {
      title: {
        //   useHTML: true,
        text: 'Рейтинг фільму',
      },
      labels: {
        overflow: 'justify',
      },
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
      backgroundColor: 'blue',
      borderColor: 'black',
      borderRadius: 0,
      borderWidth: 0,
      formatter() {
        console.log(this);
        return `<div><div>Рейтинг фільму: ${this.y}</div></br><div>Рік випуску фільму: ${this.key}</div></div>`;
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 2,
        borderColor: 'red',
        //Значення над серією
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: 'column',
        name: 'Рейтинг',
        data: moviesRatings,
        color: 'black',
        borderRadius: 8,
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

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} {...props} />
  );
};

export default ActorHighchart;
