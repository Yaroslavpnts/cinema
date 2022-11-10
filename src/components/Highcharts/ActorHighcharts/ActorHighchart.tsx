import React, { useEffect, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Api, IApiResponseFullActor } from '../../../api/apiMethods';
import { useParams } from 'react-router-dom';

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

  let moviesYears;
  let moviesRatings;
  if (actor) {
    moviesYears = actor.movies.map(movie => movie.production_year);
    moviesRatings = actor.movies.map(movie => Number(movie.imdb_rating));

    //Для разработки, удалить потом
    moviesYears?.push('2001');
    moviesRatings?.push(5);
  }

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Рейтинг фільмографії',
    },
    //   subtitle: {
    //     text:
    //       'Source: ' +
    //       '<a href="https://www.ssb.no/en/statbank/table/08940/" ' +
    //       'target="_blank">SSB</a>',
    //   },
    xAxis: {
      categories: moviesYears,
      crosshair: true,
      title: {
        text: 'Рік виходу фільму',
      },
    },
    yAxis: {
      title: {
        //   useHTML: true,
        text: 'Рейтинг фільму',
      },
      labels: {
        formatter: function () {
          return this.value + ' %';
        },
        useHTML: true,
      },
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
      borderRadius: 10,
      borderWidth: 3,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
        //Значення над серією
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: 'column',
        name: 'Фільмів за рік',
        data: moviesRatings,
        color: 'black',
        borderRadius: 8,
      },
    ],
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} {...props} />
  );
};

export default ActorHighchart;
