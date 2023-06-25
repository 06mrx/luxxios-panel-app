import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Radial = ({value = 75, width=350}) => {
    const series = [value];
    const options = {
        chart: {
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              }
            },
          },
          labels: ['Cricket'],
    }
    return (
        <>
          <ReactApexChart options={options} series={series} type="radialBar" />
        </>
    );
};

export default Radial