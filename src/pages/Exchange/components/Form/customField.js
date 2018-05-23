import React from 'react'
import cx from 'classnames'
import Cleave from 'cleave.js/react';

const customField = (element) => ({
  field,
  form: { touched = {}, errors = {}, warning = {}, setFieldValue },
  elementPrepend,
  elementAppend,
  className,
  ...rest
}) => {
  const { name, onChange, value } = field
  let newClassName = ''
  if (touched[name]) {
    if (errors[name]) newClassName = 'has-error'
    else if (warning[name]) newClassName = 'has-warning'
  }

  const allElements = []
  if (elementPrepend) allElements.push(React.cloneElement(elementPrepend, { key: 0 }))
  allElements.push(React.createElement(element, {...rest, ...field, setFieldValue, key: 1, className: cx(className, newClassName) }))
  if (elementAppend) allElements.push(React.cloneElement(elementAppend, { key: 4 }))
  allElements.push(
    touched[name] &&
    ((errors[name] && <span key={2} className='w-100 text-danger text-left'>{errors[name]}</span>) ||
      (warning[name] && <span key={3} className='w-100 text-warning text-left'>{warning[name]}</span>))
  )
  return allElements
}

export const fieldInput = customField('input')

export const fieldCleave = customField(
  (props) => {
    const { onChange, onBlur, onFocus, value, propsCleave, className, name, setFieldValue } = props
    return (
      <Cleave
        {...propsCleave}
        name={name}
        onChange={(e) => setFieldValue(name, e.target.rawValue)}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        className={className}
      />
    )
  }
)

export default customField
