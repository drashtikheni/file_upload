import { Card, Image } from 'antd'
import classNames from 'classnames'
import React, { memo } from 'react'
import { postedByLabel } from '../../description/media.description'
import { areEqualProps, fileSize } from '../../utils/javascript'

const { Meta } = Card

const MediaCard = ({ media }) => {
  return (
    <Card
      style={{
        width: 240,
        height: 250,
      }}
      hoverable
      cover={
        <Image
          alt={media?.name}
          src={media?.link}
          className={classNames('card-cover')}
        />
      }
    >
      <Meta title={media?.name} description={fileSize(media?.size)} />
      <Meta
        title={' '}
        description={postedByLabel + media?.createdBy?.username}
      />
    </Card>
  )
}

export default memo(MediaCard, areEqualProps)
