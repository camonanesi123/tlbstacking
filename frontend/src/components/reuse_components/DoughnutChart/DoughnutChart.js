import DonutChart from 'react-donut-chart';
//things I would never do:
export default function DoughnutChart() {
	return (
		<DonutChart className="fill_white" colors={['#A0A0A0', '#19B819', '#FF0000', '#F55B08']}
			data={[{
				label: '惰性矿工',
				value: 8
			},
			{
				label: '普通矿工',
				value: 50,
				//isEmpty: true
			},
			{
				label: '超级矿工',
				value: 19,
				//isEmpty: true
			},
			{
				label: '优质矿工',
				value: 23,
				//isEmpty: true
			},
			]} />
	)
}