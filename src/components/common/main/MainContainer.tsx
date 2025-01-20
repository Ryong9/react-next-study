import React, { ReactNode } from 'react'

interface IMainContainerProps {
  children: ReactNode
}

export const MainContainer = (props: IMainContainerProps) => {
  return (
    <main className="flex-grow p-4">
      <h1 className="text-2xl font-bold"></h1>
      {props.children}
    </main>
  )
}