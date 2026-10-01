import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { getCitiesThunk } from '@/store/thunks/locationThunks';

export const useCities = (country) => {
    const dispatch = useDispatch();

    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCities([]);

        if (!country) {
            return;
        }

        const fetchCities = async () => {
            try {
                const result = await dispatch(
                    getCitiesThunk(country)
                ).unwrap();

                setCities(result.cities);
            } catch (error) {
                toast.error(error, {
                    duration: 5000,
                });

                setCities([]);
            }
        };

        fetchCities();
    }, [country, dispatch]);

    return cities;
};