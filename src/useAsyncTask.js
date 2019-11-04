import { useEffect, useState, useCallback, useMemo } from 'react';

export const useAsyncTask = (asyncFunc, params) => {

    const [reloadNum, setReloadNum] = useState(0);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const task = useCallback(async () => {
        setLoading(true);
        try {
            let result = await asyncFunc();
            setData(result);
            setLoading(false);
            setError(null);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    }, [...params]);

    function triggleReload() {
        setReloadNum(reloadNum + 1);
    }

    useEffect(() => {
        task();
    }, [task, reloadNum, ...params]);

    return useMemo(() => ({
        error: error,
        loading: loading,
        data: data,
        setData: (arg) => { setData(arg) },
        reload: () => { triggleReload() }

    }), [error, loading, data, setData, triggleReload]);

}