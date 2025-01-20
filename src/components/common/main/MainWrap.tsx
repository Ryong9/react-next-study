import React, { ReactNode } from 'react'
import { SideMenu } from './SideMenu'
import { MainContainer } from './MainContainer'

interface IMainWrapProps {
  children: ReactNode
}

export const MainWrap = (props: IMainWrapProps) => {
  return (
    <div className="flex h-full">
      <SideMenu />
      <MainContainer>
        {props.children}
      </MainContainer>
    </div>
  )
}