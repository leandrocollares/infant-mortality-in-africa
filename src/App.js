import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Header from './components/Header';
import Throbber from './components/Throbber';
import AfricaMap from './components/AfricaMap';
import Legend from './components/Legend';
import YearSlider from './components/YearSlider';
import africaData from './data/africaData';
import imrData from './data/imr.csv';

const App = () => {
  const [mapData, setMapData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2018);

  useEffect(() => {
    (async () => {
      const imrDataRead = await d3.csv(imrData);
      const imr = {};

      imrDataRead.forEach((item) => {
        imr[item.id] = item;
      });

      africaData.features.forEach((feature, index) => {
        const countryId = feature.id;
        const imrValues = imr[countryId] || {};

        if ('id' in imrValues && 'name' in imrValues) {
          delete imrValues.id;
          delete imrValues.name;
        }

        africaData.features[index].imr = imrValues;
      });
      setMapData(africaData);
    })();
  }, []);

  const colorScale = d3.scaleThreshold()
    .domain([10, 30, 50, 70, 90, 110, 170, 230])
    .range(d3.schemeOrRd[8]);

  return (
    <div className="app">
      <Header selectedYear={selectedYear} />

      {mapData ? (
        <>
          <AfricaMap
            data={mapData}
            colorScale={colorScale}
            selectedYear={selectedYear}
          />
        </>
      ) : <Throbber /> }

      <Legend colorScale={colorScale} />

      <YearSlider
        minValue={1960}
        maxValue={2018}
        onSetYear={setSelectedYear}
        selectedYear={selectedYear}
      />
      <p className="app__footer">
        Source:
        {' '}
        <a
          href="https://data.worldbank.org/indicator/SP.DYN.IMRT.IN"
          target="_blank"
          rel="noopener noreferrer"
        >
          World Bank
        </a>
        {' '}
        &middot;
        Data downloaded on 06 February 2020.
      </p>
    </div>
  );
};
export default App;
