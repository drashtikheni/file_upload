import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Card, Image, Modal } from 'antd'
import classNames from 'classnames'
import React, { memo } from 'react'
import mediaCardContainer from '../../container/mediaCard.container'
import {
  postedAtLabel,
  postedByLabel,
} from '../../description/media.description'
import { areEqualProps, fileSize, mimeType } from '../../utils/javascript'
import CardView from './CardView'

const { Meta } = Card
const { info } = Modal

const MediaCard = ({ media }) => {
  const { downloadMedia } = mediaCardContainer({ media })

  return (
    <Card
      style={{
        width: 260,
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
      actions={[
        <DownloadOutlined key="download" onClick={downloadMedia} />,
        <DeleteOutlined key="delete" />,
        <EyeOutlined
          key="info"
          onClick={() =>
            info({
              content: (
                <CardView
                  media={{
                    ...media,
                    size: fileSize(media?.size),
                    createdBy: media?.createdBy?.username,
                    createdAt: new Date(media?.createdAt).toLocaleString(),
                    type: mimeType(media?.link),
                  }}
                />
              ),
              icon: null,
            })
          }
        />,
      ]}
    >
      <Meta title={media?.name} description={fileSize(media?.size)} />
      <Meta
        title={' '}
        description={postedByLabel + media?.createdBy?.username}
      />

      <Meta
        title={' '}
        description={
          postedAtLabel + new Date(media?.createdAt).toLocaleString()
        }
      />
    </Card>
  )
}

export default memo(MediaCard, areEqualProps)
