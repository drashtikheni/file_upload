import React, { memo } from 'react'
import { cardViewFields } from '../../description/media.description'
import { areEqualProps } from '../../utils/javascript'

const CardView = ({ media }) => {
  return (
    <table>
      {cardViewFields.map(field => (
        <tr key={field.valueKey}>
          <td style={{ width: '30%' }}>
            <b>{field.label}</b>
          </td>
          <td>{media?.[field.valueKey]}</td>
        </tr>
      ))}
    </table>
  )
}

export default memo(CardView, areEqualProps)
