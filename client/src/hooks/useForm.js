// write your custom hook here to control your checkout form
import { useState } from 'react'

const useLocalStorage = (key , initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    })

    const setValue = value => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    return [storedValue, setValue];
};

const useForm = (initialValue) => {

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [values, setValues] = useLocalStorage('formValues', initialValue);
    
    const handleChanges = (e) => {
        setValues({ 
            ...values, 
            [e.target.name]: e.target.value }
            );
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessMessage(true);
      };

      return [values, showSuccessMessage, handleChanges, handleSubmit]
}

export default useForm()