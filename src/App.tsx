import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AssetPriceContext, useAssetPrice } from './Contexts/AssetPriceContext';
import EthBalance from './Ethereum/USD/EthBalance';

function App() {

	const assetPrice = useAssetPrice();


  return (
   <AssetPriceContext.Provider value={assetPrice}>
	   <div>
		   <h1>
		   ChainLink Data Feed Example
		   </h1>
		   <EthBalance />
	   </div>
	   </AssetPriceContext.Provider>
  );
}

export default App;
