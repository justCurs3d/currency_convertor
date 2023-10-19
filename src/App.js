import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';
import axios from 'axios';

function App() {

const [currency1, setCurrency1] = useState("USD")
const [currency2, setCurrency2] = useState("RUB")

const [value1, setValue1] = useState(1)
const [value2, setValue2] = useState(0)

const courseRef = useRef(0)

const fetchCourse = async () => {
  const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1.toLowerCase()}/${currency2.toLowerCase()}.json`)
  courseRef.current = response.data[currency2.toLowerCase()]
  onChangeValue(1, value1)
}


useEffect(() => {
  fetchCourse()
}, [currency1, currency2])



const onChangeValue = (id, value) => {
  if (id === 1) {
    setValue1(value)
    setValue2((value * courseRef.current).toFixed(2))
  }
  else {
    setValue2(value)
    setValue1((value / courseRef.current).toFixed(2))
  }
}

const onChangeCurrency = (id, currency) => {
  if (id === 1) {
    setCurrency1(currency)
  }
  else {
    setCurrency2(currency)
  }
}


  return (
    <div className="App">
      <Block value={value1} onChangeValue={onChangeValue} currency={currency1} onChangeCurrency={onChangeCurrency} id={1} />
      <Block value={value2} onChangeValue={onChangeValue} currency={currency2} onChangeCurrency={onChangeCurrency} id={2} />
    </div>
  );
}

export default App;
