import React,{useContext} from 'react'
import { AssetPriceContext } from '../../Contexts/AssetPriceContext';

const BALANCE_ETH = 1;

const EthBalance = () => {

	const {conversionRate,conversionDate} = useContext(AssetPriceContext);

	const balanceUSD = conversionRate ? BALANCE_ETH * conversionRate : '...';
	const updatedAt = conversionDate ? new Intl.DateTimeFormat(undefined,{dateStyle:'full',timeStyle:'medium'}).format(new Date(conversionDate)) : '...';

  return (
	<div><h1>ETH BALANCE</h1>
		<div><p>My balance is {BALANCE_ETH} ETH / {balanceUSD} USD </p>
		<p>Updated at {updatedAt}</p></div>
	</div>
  )
}

export default EthBalance