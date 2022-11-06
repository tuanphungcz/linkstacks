import { ONE_MILLION } from './constant';

export const truncateUrl = (url: string) => {
  if (url.length > 6) {
    return url.slice(0, 4) + '...' + url.slice(-3);
  }
  return url;
};

export const mapResultsFromTx = results =>
  results
    .filter(
      tx =>
        tx.tx_type === 'contract_call' && tx.contract_call.function_name === 'buy-coffee'
    )
    .map(tx => {
      const { function_args } = tx.contract_call;
      const name = function_args?.[1].repr.replace(`u"`, '').slice(0, -1);
      const amount = function_args?.[2].repr.replace(`u`, '');
      const message = function_args?.[0].repr.replace(`u"`, '').slice(0, -1);

      return {
        id: tx.tx_id,
        timestamp: tx.burn_block_time,
        name,
        amount: amount / ONE_MILLION,
        message,
        senderAddress: tx.sender_address,
        txStatus: tx.tx_status
      };
    })
    .reverse();
