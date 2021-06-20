import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './DrilldownChart.css';
const percentage = 66;

export default function DrilldownChart() {
    return (
        <div className="d-flex justify-content-center DrilldownChart">
            <div  className="DrilldownChart_wrapper">
                <CircularProgressbar value={66} text='' />
                <div className="text_chart">
                    <h3 className="font_size_37 text-white text-center">
                        我的算力
                        <br />
                        487.26K
                    </h3>
                </div>
            </div>
        </div>
    )
}