import React, { useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

import type { NextPage } from 'next'

import useLocalStorage from 'use-local-storage'

import SwitchTheme from '../components/SwitchTheme'
import { ProjectPages } from '../utils/Constants'

interface IProject {
  title: string
  path: string
}

const Home: NextPage = () => {
  const [project, setProject] = useLocalStorage('project', null as IProject)
  const [index, setIndex] = useState(
    ProjectPages.findIndex(({ title }) => title === project?.title)
  )

  if (!project) {
    setProject(ProjectPages[~~(Math.random() * ProjectPages.length)])
  }

  const moveNext = () => {
    const next = (index + 1) % ProjectPages.length

    setIndex(next)
    setProject(ProjectPages[next])
  }

  const movePrevious = () => {
    let previous = index

    if (index === 0) {
      previous = ProjectPages.length
    }

    previous = previous - 1

    setIndex(previous)
    setProject(ProjectPages[previous])
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto">
        <div className="flex flex-col space-y-10">
          <div className="flex space-x-3">
            <button className="text-5xl font-extrabold" onClick={movePrevious}>
              <AiFillCaretLeft className="hover:text-zinc-600 dark:hover:text-zinc-300" />
            </button>
            <h1
              className="text-7xl font-extrabold hover:text-zinc-600 dark:hover:text-zinc-300 hover:cursor-pointer"
            >
              <a href={project?.path}>{`Steam  ${project?.title}`}</a>
            </h1>
            <button className="text-5xl font-extrabold" onClick={moveNext}>
              <AiFillCaretRight className="hover:text-zinc-600 dark:hover:text-zinc-300" />
            </button>
          </div>
          <div className="mx-auto drop-shadow scale-150">
            <SwitchTheme />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
