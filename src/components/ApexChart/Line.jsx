// import ReactApexChart from "react-apexcharts";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const Line = ({ chartWidth = 350, label = ['', '', ''], spData1 = [1, 1, 1], spData2  = [1, 1, 1], legendName= '', unit='' }) => {
  const options = {
    chart: {
      id: 'sparkline3',
      group: 'sparklines',
      type: 'area',
      sparkline: {
        enabled: false
      },
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    fill: {
      colors: ['#ff00ff', '#00ffff']
    },
    labels: label,
    xaxis: {
      type: 'month',
    },
    yaxis: {
      min: 0,
      show: false
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, opts) {
        return val + ' ' + unit
      },
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined
      }
    },
    colors: ['#ff00ff', '#00ffff'],
    //colors: ['#5564BE'],

  };
  const series = [
    {
      name: legendName,
      data: (spData1)
    },
    {
      name: 'Standar',
      data: (spData2)
    }
  ];
  return (
    <>
      <ReactApexChart options={options} series={series} type="line" height={280} />
    </>
  );
};

export default Line;
