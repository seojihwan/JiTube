import React from 'react'
import { IVideo } from '../store'

export const Video: React.FC<IVideo> = (props) => {
  console.log(props)
  return <div>{JSON.stringify(props)}</div>
}