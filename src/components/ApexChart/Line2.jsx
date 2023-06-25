// import ReactApexChart from "react-apexcharts";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const Line = ({chartWidth = 350, label = ['', '', ''], spData1 = [1,1,1]}) => {
    var sparklineData = [20, 22, 23];
    var sparklineData2 = [20, 19, 25];
    // var label = ['a', 'v', 'c']
    const options = {
        chart: {
            id: 'sparkline3',
            group: 'sparklines',
            type: 'area',
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'smooth',
            width: 1
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 0,
              opacityFrom: 1,
              opacityTo: 0,
              stops: [0, 95, 100]
            },
            colors : ['#ff00ff', '#00ffff']
          },
          labels: label,
          xaxis: {
            type: 'text',
          },
          yaxis: {
            min: 0,
            show : false
          },
          colors: ['#ff00ff', '#00ffff'],
          //colors: ['#5564BE'],
          
    };
    const series = [
      {
        name: 'Tinggi',
        data: (spData1)
      },
      {
        name: 'Berat',
        data: (sparklineData2)
      }
    ];
    return (
      <>
        <ReactApexChart options={options} series={series} type="line" height={280} />
      </>
    );
  };
  
  export default Line;
  