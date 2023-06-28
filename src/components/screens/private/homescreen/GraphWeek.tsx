import { ScreenWidth, unitToPixels } from '../../../../helpers/screenUnit'
import {
  LineChart,
  BarChart
} from "react-native-chart-kit";

export function GraphWeek() {
    const dataGraph = {
        labels: ["22/06", "23/06", "24/06", "25/06", "26/06", "27/06", "28/06"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 65]
          }
        ]
      };

    return (
        <BarChart
            data={dataGraph}
            width={ScreenWidth() - ( unitToPixels(5) * 2)} // from react-native
            height={unitToPixels(55)}
            yAxisInterval={10} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              // strokeWidth: 7, // optional, default 3
              barPercentage: 0.5,
              propsForHorizontalLabels:{
                fontSize: "14",
                x: "30",
                dy: "5"
              },
            }}
            
            showBarTops={true}
            showValuesOnTopOfBars={true}
            style={{
              borderRadius: 16,
            }}
        />
    );
}