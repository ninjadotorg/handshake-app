import React from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import validator from './validator';
import './styles.scss';

const renderField = (field) => {
  const { input, meta, placeholder } = field;
  const { onChange, onFocus, onBlur, value } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className="currency-input-field">
      <CurrencyInput placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} markError={shouldShowError} />
      {
        shouldShowError &&
        <span className="error">{meta.error}</span>
      }
    </div>
  );
};

export default renderField;
export const currencyValidator = validator;