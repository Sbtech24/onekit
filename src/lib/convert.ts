const API = "https://api.frankfurter.dev";



export default async function convert(base:string, quote:string, amount:number ) {
 const res = await fetch(`${API}/v2/rate/${base}/${quote}`);
  const data = await res.json();

  const result = (amount * data.rate).toFixed(2);
  return result;

}