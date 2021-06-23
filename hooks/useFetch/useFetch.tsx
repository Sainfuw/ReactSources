import { useState, useEffect, useRef } from "react";
export interface BreakingBadQuote {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

export interface QuoteInterface {
  data: BreakingBadQuote;
  loading: boolean;
  error: string;
}

const initialState: QuoteInterface = {
  data: {} as BreakingBadQuote,
  loading: true,
  error: "",
};

export const useFetch = (url: string): QuoteInterface => {
  const isMounted = useRef(true);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState(initialState);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: "",
            data: data[0],
          });
        }
      })
      .catch(() => {
        setState({
          data: {} as BreakingBadQuote,
          loading: false,
          error: "No se pudo cargar la info",
        });
      });
  }, [url]);

  return state;
};
