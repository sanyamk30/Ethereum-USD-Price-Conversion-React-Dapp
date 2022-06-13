import {utils} from 'ethers';
import { createContext,useEffect,useRef,useState } from 'react';
import { getLatestPrice } from '../Calls/getLatestPrice';

interface AssetPriceContextProps { 
	conversionDate: number | null;
	conversionRate: number | null;
}

const UPDATE_INTERVAL_TIMEOUT = 180000 // 3 minutes

export const DEFAULT_CONTEXT: AssetPriceContextProps = {
	conversionDate: null,
	conversionRate: null
}

export const AssetPriceContext = createContext<AssetPriceContextProps>(DEFAULT_CONTEXT);

export const useAssetPrice = ():AssetPriceContextProps => {
	const [state,setState] = useState<AssetPriceContextProps>(DEFAULT_CONTEXT);
	const updateInterval = useRef<ReturnType<typeof setInterval>>();

	const updateAssetPrice = async () => {
		let conversionDate = null;
		let conversionRate = null;

		try {
			const roundData = await getLatestPrice();

			conversionDate = Number(roundData[3].toString()) * 1000;
			conversionRate = Number(utils.formatUnits(roundData[1],8));

			setState({conversionDate, conversionRate })
		}
		catch(error){
			console.log(error);
		}
	}

	const startUpdate = async () => {
		stopUpdate();

		await updateAssetPrice();

		updateInterval.current = setInterval(async () => {
			await updateAssetPrice();
		},UPDATE_INTERVAL_TIMEOUT)
	}

	const stopUpdate = () => {
		if(updateInterval.current){
			clearInterval(updateInterval.current);
		}
	}

	useEffect(() => {
		startUpdate();

		return stopUpdate;
	},[])

	return state;
}